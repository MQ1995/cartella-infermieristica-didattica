import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Save, FolderOpen, Printer, Stethoscope, Activity, ClipboardList, BedDouble } from 'lucide-react';
import { saveAs } from 'file-saver';
import type { NursingAssessment } from "./types/form";
import { defaultValues } from './types/form';
import { generateDocx } from "./utils/docxExport";
import { Download } from "lucide-react";

// Import Tabs
import GeneralInfoTab from './components/tabs/GeneralInfoTab';
import AssessmentTab from './components/tabs/AssessmentTab';
import ScalesTab from './components/tabs/ScalesTab';
import CarePlanTab from './components/tabs/CarePlanTab';

type TabId = 'general' | 'assessment' | 'scales' | 'careplan';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [isSaved, setIsSaved] = useState(true);

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

  // Auto-save to local storage on change
  useEffect(() => {
    const subscription = methods.watch((value) => {
      localStorage.setItem('nursing-assessment-draft', JSON.stringify(value));
      setIsSaved(false);
    });
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  const handleExportJson = () => {
    const data = methods.getValues();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const fileName = data.studentName ? `assessment-${data.studentName.replace(/\s+/g, '-').toLowerCase()}` : 'assessment-draft';
    saveAs(blob, `${fileName}.json`);
    setIsSaved(true);
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
        } catch (err) {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
  };

  const tabs = [
    { id: 'general', label: 'Dati Generali', icon: <ClipboardList size={18} /> },
    { id: 'assessment', label: 'Accertamento', icon: <Stethoscope size={18} /> },
    { id: 'scales', label: 'Scale Valutazione', icon: <Activity size={18} /> },
    { id: 'careplan', label: 'Piano Assistenza', icon: <BedDouble size={18} /> },
  ] as const;

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen flex flex-col print:bg-white print:text-black">
        {/* Header - Hidden on Print */}
        <header className="bg-indigo-600 text-white shadow-md print:hidden sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-6 w-6" />
              <h1 className="text-xl font-bold">Cartella Infermieristica</h1>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <label className="cursor-pointer bg-indigo-500 hover:bg-indigo-400 px-3 py-1.5 rounded-md flex items-center gap-2 text-sm transition-colors">
                <FolderOpen size={16} />
                Carica
                <input type="file" accept=".json" className="hidden" onChange={handleImportJson} />
              </label>
              <button 
                type="button"
                onClick={handleExportJson}
                className="bg-indigo-500 hover:bg-indigo-400 px-3 py-1.5 rounded-md flex items-center gap-2 text-sm transition-colors relative"
              >
                <Save size={16} />
                Salva Backup
                {!isSaved && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full"></span>
                )}
              </button>
              <button 
                type="button"
                onClick={() => window.print()}
                className="bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <Printer size={16} />
                Stampa PDF
              </button>
              <button 
                type="button"
                onClick={() => generateDocx(methods.getValues())}
                className="bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <Download size={16} />
                Esporta DOCX

              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 flex flex-col md:flex-row gap-6">
          
          {/* Sidebar Nav - Hidden on Print */}
          <aside className="w-full md:w-64 flex-shrink-0 print:hidden">
            <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0 md:sticky md:top-24">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={(e) => { e.preventDefault(); setActiveTab(tab.id); }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm border border-indigo-100'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className={activeTab === tab.id ? 'text-indigo-600' : 'text-slate-400'}>
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Form Content */}
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 print:border-none print:shadow-none min-h-[600px]">
            <form className="p-6 h-full print:p-0">
              <div className={activeTab === 'general' ? 'block' : 'hidden print:block print:break-after-page'}>
                <GeneralInfoTab />
              </div>
              <div className={activeTab === 'assessment' ? 'block' : 'hidden print:block print:break-after-page'}>
                <AssessmentTab />
              </div>
              <div className={activeTab === 'scales' ? 'block' : 'hidden print:block print:break-after-page'}>
                <ScalesTab />
              </div>
              <div className={activeTab === 'careplan' ? 'block' : 'hidden print:block print:break-after-page'}>
                <CarePlanTab />
              </div>
            </form>
          </div>
        </main>
      </div>
    </FormProvider>
  );
}

export default App;