import { useState } from 'react';
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



type SubTabId = 'model1' | 'model2' | 'model3' | 'model4' | 'model5' | 'model6' | 'model7' | 'model8' | 'model9' | 'model10' | 'model11';

export default function AssessmentTab() {
  const [activeSubTab, setActiveSubTab] = useState<SubTabId>('model1');

  const tabs = [
    { id: 'model1', label: '1. Salute' },
    { id: 'model2', label: '2. Nutrizione' },
    { id: 'model3', label: '3. Eliminazione' },
    { id: 'model4', label: '4. Attività' },
    { id: 'model5', label: '5. Riposo' },
    { id: 'model6', label: '6. Cognitivo' },
    { id: 'model7', label: '7. Percezione/Sé' },
    { id: 'model8', label: '8. Ruoli' },
    { id: 'model9', label: '9. Sessualità' },
    { id: 'model10', label: '10. Coping' },
    { id: 'model11', label: '11. Valori' },


  ] as const;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="text-center pb-6 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800">Accertamento Infermieristico</h2>
        <p className="text-slate-500">Modelli di Gordon</p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2 print:hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={(e) => { e.preventDefault(); setActiveSubTab(tab.id); }}
            className={`px-4 py-2 rounded-t-lg font-medium text-sm transition-colors border-b-2 ${
              activeSubTab === tab.id
                ? 'bg-emerald-50 text-emerald-700 border-emerald-600'
                : 'text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="print:block">
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
