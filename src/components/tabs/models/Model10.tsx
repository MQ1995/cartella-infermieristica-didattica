import { LockableSection } from '../../ui/LockableSection';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '../../ui/Textarea';
import { Input } from '../../ui/Input';

export default function Model10() {
  const { register } = useFormContext();

  return (
    <LockableSection title="10. Modello di Coping e Tolleranza allo Stress">
      
      <div className="space-y-6">
        <Textarea 
          name="lifeChanges" 
          label="Cambiamenti importanti nella sua vita nell'ultimo anno?" 
          rows={3}
        />
        
        <Textarea 
          name="healthConcerns" 
          label="Preoccupazioni inerenti la propria salute o l'istituzionalizzazione?" 
          rows={3}
        />
        
        <Textarea 
          name="stressors" 
          label="Altre situazioni problematiche vissute come agenti stressanti (situazione famigliare attuale o passata, situazione economica/lavorativa, preoccupazioni inerenti la salute della persona significativa, preoccupazioni riguardo la modifica del proprio ruolo):" 
          rows={4}
        />
        
        <Textarea 
          name="copingBehaviors" 
          label="Comportamenti o azioni messe in atto per affrontare agenti stressanti:" 
          rows={3}
        />

        <Input name="copingReferencePersons" label="Persone di riferimento in grado di aiutarla:" />

        <div className="pt-6 mt-6 border-t border-slate-200">
          <Textarea 
            name="model10Notes" 
            label="Eventuali note aggiuntive sul Modello di Coping e Tolleranza allo Stress" 
            rows={3}
          />
          
          <div className="mt-6 p-4 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">Valutazione Modello 10</span>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                <input 
                  type="radio" 
                  value="FUNZIONALE" 
                  className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                  {...register('model10Status')}
                />
                FUNZIONALE
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                <input 
                  type="radio" 
                  value="DISFUNZIONALE" 
                  className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                  {...register('model10Status')}
                />
                DISFUNZIONALE
              </label>
            </div>
          </div>
        </div>

      </div>
    </LockableSection>
  );
}
