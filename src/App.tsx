import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Save, FolderOpen, Stethoscope, Activity, ClipboardList, BedDouble, Trash2, HeartPulse, PanelLeftClose, PanelLeftOpen, NotebookPen, Pill, Bandage, Search, Syringe } from 'lucide-react';
import { saveAs } from 'file-saver';
import type { NursingAssessment } from './types/form';
import { defaultValues } from './types/form';
import { SearchDialog } from './components/ui/SearchDialog';
import { Toast } from './components/ui/Toast';
import type { ToastType } from './components/ui/Toast';
import type { SearchEntry, TabId } from './search-index';

// Import Tabs
import GeneralInfoTab from './components/tabs/GeneralInfoTab';
import AssessmentTab from './components/tabs/AssessmentTab';
import type { AssessmentSubTabId } from './components/tabs/AssessmentTab';
import ScalesTab from './components/tabs/ScalesTab';
import CarePlanTab from './components/tabs/CarePlanTab';
import MonitoringSection from './components/tabs/MonitoringSection';
import FluidBalanceSection from './components/tabs/FluidBalanceSection';
import DiagnosticExamsSection from './components/tabs/DiagnosticExamsSection';
import DailyAssessmentTab from './components/tabs/DailyAssessmentTab';
import MedicationsTab from './components/tabs/MedicationsTab';
import DevicesTab from './components/tabs/DevicesTab';
import SpecialProceduresTab from './components/tabs/SpecialProceduresTab';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [assessmentSubTab, setAssessmentSubTab] = useState<AssessmentSubTabId>('initial');
  const [isSaved, setIsSaved] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState<ToastType | null>(null);
  const [pendingHighlight, setPendingHighlight] = useState<string | null>(null);
  const pendingScrollRef = useRef<string | null>(null);
  const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const methods = useForm<NursingAssessment>({
    defaultValues: defaultValues,
  });

  // Load from local storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('nursing-assessment-draft');
    if (savedData) {
      try {
        methods.reset(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved data");
      }
    }
  }, [methods]);

  // Auto-save to local storage on change (debounced 500ms)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const subscription = methods.watch((value) => {
      setIsSaved(false);
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.setItem('nursing-assessment-draft', JSON.stringify(value));
      }, 500);
    });
    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [methods]);

  // Cmd+K / Ctrl+K to open search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(o => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Scroll to element after tab switch
  useEffect(() => {
    if (!pendingScrollRef.current) return;
    const id = pendingScrollRef.current;
    pendingScrollRef.current = null;
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, [activeTab, assessmentSubTab]);

  // Apply CSS Custom Highlight after navigation
  useEffect(() => {
    if (!pendingHighlight) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cssHL = (CSS as any).highlights as Map<string, unknown> | undefined;
    if (!cssHL || typeof (window as any).Highlight === 'undefined') return;

    requestAnimationFrame(() => {
      cssHL.clear();
      if (highlightTimerRef.current) clearTimeout(highlightTimerRef.current);

      // Determine the active container
      const containerId = activeTab === 'assessment'
        ? `tc-sub-${assessmentSubTab}`
        : `tc-${activeTab}`;
      const container = document.getElementById(containerId);
      if (!container) return;

      const words = pendingHighlight.toLowerCase().split(/\s+/).filter(Boolean);
      const ranges: Range[] = [];

      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const text = node.textContent?.toLowerCase() ?? '';
        for (const word of words) {
          let pos = 0;
          while (true) {
            const idx = text.indexOf(word, pos);
            if (idx === -1) break;
            const range = new Range();
            range.setStart(node, idx);
            range.setEnd(node, idx + word.length);
            ranges.push(range);
            pos = idx + 1;
          }
        }
      }

      if (ranges.length === 0) { setPendingHighlight(null); return; }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cssHL.set('search-result', new (window as any).Highlight(...ranges));

      // Scroll to first match
      const firstEl = (ranges[0].startContainer as Text).parentElement;
      firstEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Auto-clear after 3 s
      highlightTimerRef.current = setTimeout(() => {
        cssHL.clear();
        setPendingHighlight(null);
      }, 3000);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingHighlight, activeTab, assessmentSubTab]);

  const handleNavigate = useCallback((entry: SearchEntry, query: string) => {
    setActiveTab(entry.tab);
    if (entry.assessmentSubTab) setAssessmentSubTab(entry.assessmentSubTab);
    if (entry.elementId) pendingScrollRef.current = entry.elementId;
    if (query.trim()) setPendingHighlight(query.trim());
    setSearchOpen(false);
  }, []);

  const handleExportJson = () => {
    const data = methods.getValues();

    // Validate required fields before saving
    const missing = [
      !data.studentFirstName && 'Nome',
      !data.studentLastName  && 'Cognome',
      !data.studentId        && 'Matricola',
      !data.academicYear     && 'Anno accademico',
      !data.courseYear       && 'Anno di corso',
    ].filter(Boolean) as string[];

    if (missing.length > 0) {
      alert(`Compila i seguenti campi obbligatori prima di salvare:\n• ${missing.join('\n• ')}`);
      setActiveTab('general');
      return;
    }

    const slug = (s: string) => s.replace(/\s+/g, '-').replace(/\//g, '-').toLowerCase();
    const namePart    = `${slug(data.studentLastName)}-${slug(data.studentFirstName)}`;
    const idPart      = data.studentId;
    const yearPart    = slug(data.academicYear);
    const coursePart  = slug(data.courseYear);

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, `cartella-${namePart}-${idPart}-${yearPart}-${coursePart}.json`);
    setIsSaved(true);
    setToast('save');
  };

  const handleDeleteAll = () => {
    methods.reset(defaultValues);
    localStorage.removeItem('nursing-assessment-draft');
    setIsSaved(true);
    setShowDeleteModal(false);
    setDeleteConfirmed(false);
    setToast('delete');
  };

  const handleImportJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const parsed = JSON.parse(content);
          methods.reset(parsed);
          setIsSaved(true);
          setToast('load');
        } catch (err) {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
  };

  const tabs = [
    { id: 'general',     label: 'Dati Generali',             icon: <ClipboardList size={18} /> },
    { id: 'assessment',  label: 'Accertamento',               icon: <Stethoscope size={18} /> },
    { id: 'scales',      label: 'Scale Valutazione',          icon: <Activity size={18} /> },
    { id: 'monitoring',  label: 'Monitoraggio',               icon: <HeartPulse size={18} /> },
    { id: 'diary',        label: 'Diario',                     icon: <NotebookPen size={18} /> },
    { id: 'medications',  label: 'Farmaci',                    icon: <Pill size={18} /> },
    { id: 'devices',      label: 'Presidi e Medicazioni',      icon: <Bandage size={18} /> },
    { id: 'careplan',     label: 'Piano Assistenza',           icon: <BedDouble size={18} /> },
    { id: 'procedures',   label: 'Procedure Speciali',          icon: <Syringe size={18} /> },
  ] as const;

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen flex flex-col bg-slate-50">
        {/* Header */}
        <header className="bg-emerald-700 text-white shadow-md sticky top-0 z-50 print:hidden">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center gap-4">
            <div className="flex items-center gap-2 min-w-0">
              <Stethoscope className="h-6 w-6 flex-shrink-0" />
              <h1 className="text-base sm:text-xl font-bold tracking-tight truncate">
                <span className="hidden sm:inline">Piano di assistenza infermieristica ad uso didattico</span>
                <span className="sm:hidden">Piano assistenza</span>
              </h1>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-px h-6 bg-white/20" />

              <label className="cursor-pointer bg-emerald-600 hover:bg-emerald-500 px-2.5 py-1.5 rounded-md flex items-center gap-1.5 text-sm font-medium shadow-sm transition-colors border border-emerald-500/50">
                <FolderOpen size={16} />
                <span className="hidden sm:inline">Carica da file</span>
                <input type="file" accept=".json" className="hidden" onChange={handleImportJson} />
              </label>

              <button
                type="button"
                onClick={handleExportJson}
                className="bg-emerald-600 hover:bg-emerald-500 px-2.5 py-1.5 rounded-md flex items-center gap-1.5 text-sm font-medium shadow-sm transition-colors relative border border-emerald-500/50"
              >
                <Save size={16} />
                <span className="hidden sm:inline">Salva su file</span>
                {!isSaved && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-400 rounded-full shadow-sm"></span>
                )}
              </button>

              <div className="w-px h-6 bg-white/20 mx-1" />

              <button
                type="button"
                onClick={() => { setShowDeleteModal(true); setDeleteConfirmed(false); }}
                className="bg-emerald-800/60 hover:bg-rose-900/60 px-2.5 py-1.5 rounded-md flex items-center gap-1.5 text-sm font-medium transition-colors border border-white/10 text-white/70 hover:text-rose-200"
              >
                <Trash2 size={16} />
                <span className="hidden sm:inline">Cancella tutto</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 flex flex-col md:flex-row gap-6">
          
          {/* Sidebar Nav */}
          <aside className={`flex-shrink-0 print:hidden transition-all duration-200 ${sidebarCollapsed ? 'w-full md:w-14' : 'w-full md:w-64'}`}>
            <div className="md:sticky md:top-24 md:h-[calc(100vh-7rem)] flex flex-col">
              {!sidebarCollapsed && (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="mb-2 flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-700 hover:border-slate-300 text-sm transition-colors shadow-sm w-full"
                  title="Cerca (⌘K)"
                >
                  <Search size={15} className="flex-shrink-0" />
                  <span className="flex-1 text-left">Cerca...</span>
                  <kbd className="inline-flex items-center px-1 py-0.5 text-xs text-slate-400 border border-slate-200 rounded font-mono">⌘K</kbd>
                </button>
              )}
              <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0 flex-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={(e) => { e.preventDefault(); setActiveTab(tab.id); }}
                    title={sidebarCollapsed ? tab.label : undefined}
                    className={`flex items-center rounded-lg text-left whitespace-nowrap transition-all ${
                      sidebarCollapsed ? 'justify-center px-3 py-3' : 'gap-3 px-4 py-3'
                    } ${
                      activeTab === tab.id
                        ? 'bg-emerald-50 text-emerald-800 font-semibold shadow-sm border border-emerald-200'
                        : 'text-slate-600 hover:bg-white hover:shadow-sm border border-transparent'
                    }`}
                  >
                    <span className={`flex-shrink-0 ${activeTab === tab.id ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {tab.icon}
                    </span>
                    {!sidebarCollapsed && tab.label}
                  </button>
                ))}
              </nav>
              <button
                onClick={() => setSidebarCollapsed(c => !c)}
                className={`hidden md:flex items-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white border border-transparent transition-all px-3 py-3 ${sidebarCollapsed ? 'justify-center' : 'gap-3'}`}
                title={sidebarCollapsed ? 'Espandi' : undefined}
              >
                {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <><PanelLeftClose size={18} /><span className="text-sm">Comprimi</span></>}
              </button>
            </div>
          </aside>

          {/* Form Content */}
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 min-h-[700px]">
            <form className="p-6 h-full" onSubmit={(e) => e.preventDefault()}>
              <div className="hidden print:block mb-6 pb-4 border-b-2 border-emerald-700">
                <h1 className="text-2xl font-bold text-emerald-800">Cartella Infermieristica Didattica</h1>
                <p className="text-slate-500 text-sm mt-1">Piano di assistenza infermieristica a uso didattico</p>
              </div>
              <div id="tc-general" className={activeTab === 'general' ? 'block' : 'hidden print:block print:break-after-page'}>
                <GeneralInfoTab />
              </div>
              <div id="tc-assessment" className={activeTab === 'assessment' ? 'block' : 'hidden print:block print:break-after-page'}>
                <AssessmentTab activeSubTab={assessmentSubTab} setActiveSubTab={setAssessmentSubTab} />
              </div>
              <div id="tc-scales" className={activeTab === 'scales' ? 'block' : 'hidden print:block print:break-after-page'}>
                <ScalesTab />
              </div>
              <div id="tc-monitoring" className={activeTab === 'monitoring' ? 'block space-y-8' : 'hidden print:block print:break-after-page'}>
                <MonitoringSection />
                <FluidBalanceSection />
                <DiagnosticExamsSection />
              </div>
              <div id="tc-diary" className={activeTab === 'diary' ? 'block' : 'hidden print:block print:break-after-page'}>
                <DailyAssessmentTab />
              </div>
              <div id="tc-medications" className={activeTab === 'medications' ? 'block' : 'hidden print:block print:break-after-page'}>
                <MedicationsTab />
              </div>
              <div id="tc-devices" className={activeTab === 'devices' ? 'block' : 'hidden print:block print:break-after-page'}>
                <DevicesTab />
              </div>
              <div id="tc-careplan" className={activeTab === 'careplan' ? 'block' : 'hidden print:block print:break-after-page'}>
                <CarePlanTab />
              </div>
              <div id="tc-procedures" className={activeTab === 'procedures' ? 'block' : 'hidden print:block'}>
                <SpecialProceduresTab />
              </div>
            </form>
          </div>
        </main>
      </div>
      {/* Toast notifications */}
      {toast && <Toast type={toast} onDone={() => setToast(null)} />}

      {/* Search dialog */}
      {searchOpen && (
        <SearchDialog onNavigate={handleNavigate} onClose={() => setSearchOpen(false)} />
      )}

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-rose-100 p-2 rounded-full">
                <Trash2 className="text-rose-600" size={22} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">Cancella tutti i dati</h2>
            </div>
            <p className="text-slate-600 mb-2">
              Questa azione eliminerà <strong>permanentemente</strong> tutti i dati inseriti, inclusi tutti i modelli, le scale e il piano assistenziale.
            </p>
            <p className="text-slate-600 mb-6">
              Non sarà possibile recuperare i dati cancellati. Hai già salvato un backup?
            </p>
            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={deleteConfirmed}
                onChange={(e) => setDeleteConfirmed(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-rose-600"
              />
              <span className="text-sm text-slate-700">
                Ho capito che questa azione è <strong>irreversibile</strong> e voglio cancellare tutto.
              </span>
            </label>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Annulla
              </button>
              <button
                type="button"
                onClick={handleDeleteAll}
                disabled={!deleteConfirmed}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-rose-700"
              >
                Sì, cancella tutto
              </button>
            </div>
          </div>
        </div>
      )}
    </FormProvider>
  );
}

export default App;