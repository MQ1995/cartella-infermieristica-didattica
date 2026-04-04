import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { nursingAssessmentSchema, type NursingAssessment } from './core/store/schema';
import { Stethoscope, Save, Heart, Utensils, Activity, Toilet } from 'lucide-react';
import Model1 from './features/assessment/models/Model1';
import Model2 from './features/assessment/models/Model2';
import Model3 from './features/assessment/models/Model3';
import VitalSignsSection from './features/monitoring/VitalSignsSection';
import { cn } from './shared/utils/cn';
import { usePersistence } from './shared/hooks/usePersistence';

function App() {
  const [activeTab, setActiveTab] = useState<'model1' | 'model2' | 'model3' | 'monitoring'>('model1');

  const methods = useForm<NursingAssessment>({
    resolver: zodResolver(nursingAssessmentSchema) as any,
    defaultValues: {
      patient: { firstName: '', lastName: '', gender: 'M', age: 0 },
      model1: { generalHealth: '', healthPromotion: '' },
      model2: { weight: 0, height: 0, bmi: 0 },
      model3: { urinaryAlterations: [], bowelAlterations: [] },
      vitalSigns: []
    }
  });

  usePersistence(methods);

  const navigation = [
    { id: 'model1', label: '1. Salute', icon: Heart },
    { id: 'model2', label: '2. Nutrizione', icon: Utensils },
    { id: 'model3', label: '3. Eliminazione', icon: Toilet },
    { id: 'monitoring', label: 'Monitoraggio', icon: Activity },
  ];

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-slate-100 flex flex-col">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 text-white p-2 rounded-xl shadow-lg shadow-emerald-200">
                <Stethoscope size={20} />
              </div>
              <h1 className="text-lg font-black text-slate-800 uppercase">Cartella <span className="text-emerald-600 font-extrabold italic">v2</span></h1>
            </div>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all">
              Save Draft
            </button>
          </div>
        </header>

        <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-8 p-8">
          <aside className="w-full md:w-64 space-y-2">
            {navigation.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all border",
                  activeTab === tab.id 
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-xl shadow-emerald-100" 
                    : "bg-white text-slate-600 border-slate-200/50 hover:bg-slate-50"
                )}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </aside>

          <section className="flex-1">
            {activeTab === 'model1' && <Model1 />}
            {activeTab === 'model2' && <Model2 />}
            {activeTab === 'model3' && <Model3 />}
            {activeTab === 'monitoring' && <VitalSignsSection />}
          </section>
        </div>
      </div>
    </FormProvider>
  );
}

export default App;
