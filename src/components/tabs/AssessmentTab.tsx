import { useState } from 'react';
import { ClipboardList, Heart, Utensils, Toilet, Dumbbell, BedDouble, Brain, MirrorRound, Users, VenusAndMars, Anchor, Church } from 'lucide-react';
import InitialAssessmentSection from './InitialAssessmentSection';
import Model1 from './models/Model1';
import Model2 from './models/Model2';
import Model3 from './models/Model3';
import Model4 from './models/Model4';
import Model5 from './models/Model5';
import Model6 from './models/Model6';
import Model7 from './models/Model7';
import Model8 from './models/Model8';
import Model9 from './models/Model9';
import Model10 from './models/Model10';
import Model11 from './models/Model11';



type SubTabId = 'initial' | 'model1' | 'model2' | 'model3' | 'model4' | 'model5' | 'model6' | 'model7' | 'model8' | 'model9' | 'model10' | 'model11';

export default function AssessmentTab() {
  const [activeSubTab, setActiveSubTab] = useState<SubTabId>('initial');

  const tabs = [
    { id: 'initial',  label: 'Dati Iniziali',                        icon: <ClipboardList size={14} /> },
    { id: 'model1',  label: '1. Percezione e Gestione della Salute', icon: <Heart size={14} /> },
    { id: 'model2',  label: '2. Nutrizione e Metabolismo',           icon: <Utensils size={14} /> },
    { id: 'model3',  label: '3. Eliminazione',                       icon: <Toilet size={14} /> },
    { id: 'model4',  label: '4. Attività ed Esercizio Fisico',       icon: <Dumbbell size={14} /> },
    { id: 'model5',  label: '5. Riposo e Sonno',                     icon: <BedDouble size={14} /> },
    { id: 'model6',  label: '6. Cognitivo e Percettivo',             icon: <Brain size={14} /> },
    { id: 'model7',  label: '7. Percezione e Concetto di Sé',        icon: <MirrorRound size={14} /> },
    { id: 'model8',  label: '8. Ruoli e Relazioni',                  icon: <Users size={14} /> },
    { id: 'model9',  label: '9. Sessualità e Riproduzione',          icon: <VenusAndMars size={14} /> },
    { id: 'model10', label: '10. Coping e Tolleranza allo Stress',   icon: <Anchor size={14} /> },
    { id: 'model11', label: '11. Valori e Convinzioni',              icon: <Church size={14} /> },
  ] as const;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2 print:hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={(e) => { e.preventDefault(); setActiveSubTab(tab.id); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-t-lg font-medium text-sm transition-colors border-b-2 ${
              activeSubTab === tab.id
                ? 'bg-emerald-50 text-emerald-700 border-emerald-600'
                : 'text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            {tab.icon}{tab.label}
          </button>
        ))}
      </div>

      <div className="print:block">
        <div className={activeSubTab === 'initial' ? 'block' : 'hidden print:block print:break-after-page'}>
          <InitialAssessmentSection />
        </div>
        <div className={activeSubTab === 'model1' ? 'block' : 'hidden print:block print:break-after-page'}>
          <Model1 />
        </div>
        <div className={activeSubTab === 'model2' ? 'block' : 'hidden print:block print:break-after-page'}>
          <Model2 />
        </div>
        <div className={activeSubTab === 'model3' ? 'block' : 'hidden print:block print:break-after-page'}>
          <Model3 />
        </div>
        <div className={activeSubTab === 'model4' ? 'block' : 'hidden print:block print:break-after-page'}>
          <Model4 />
        </div>
        <div className={activeSubTab === 'model5' ? 'block' : 'hidden print:block print:break-after-page'}>
          <Model5 />
        </div>
        <div className={activeSubTab === 'model6' ? 'block' : 'hidden print:block print:break-after-page'}>
          <Model6 />
        </div>
        <div className={activeSubTab === 'model7' ? 'block' : 'hidden print:block print:break-after-page'}>
          <Model7 />
        </div>
        <div className={activeSubTab === 'model8' ? 'block' : 'hidden print:block print:break-after-page'}>
          <Model8 />
        </div>
        <div className={activeSubTab === 'model9' ? 'block' : 'hidden print:block print:break-after-page'}>
          <Model9 />
        </div>
        <div className={activeSubTab === 'model10' ? 'block' : 'hidden print:block print:break-after-page'}>
          <Model10 />
        </div>
        <div className={activeSubTab === 'model11' ? 'block' : 'hidden print:block print:break-after-page'}>
          <Model11 />


        </div>
      </div>
    </div>
  );
}
