import { LockableSection } from '../../ui/LockableSection';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';

export default function Model11() {
  const { watch, register } = useFormContext();

  const religiousConflicts = watch('religiousConflicts');
  const religiousRestrictionsModel11 = watch('religiousRestrictionsModel11');
  const religiousAssistance = watch('religiousAssistance');

  return (
    <LockableSection title="11. Modello di Valori e Convinzioni
        (compilare solo se pertinente)">
      
      <div className="space-y-6">
        <Textarea 
          name="lifeGoalsSatisfaction" 
          label="Grado di soddisfazione rispetto ai progetti di vita ritenuti più importanti e al loro raggiungimento:" 
          rows={4}
        />
        
        <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-700 w-3/4">I suoi valori/credo religiosi entrano in conflitto con le scelte terapeutiche, le procedure mediche e i processi assistenziali?</span>
            <label className="flex items-center gap-1 cursor-pointer text-sm">
              <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('religiousConflicts')} /> No
            </label>
            <label className="flex items-center gap-1 cursor-pointer text-sm">
              <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('religiousConflicts')} /> Sì
            </label>
          </div>
          {religiousConflicts === 'true' && <Input name="religiousConflictsReason" label="Perché" />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700 w-48">Restrizioni legate alla religione/cultura:</span>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('religiousRestrictionsModel11')} /> No
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('religiousRestrictionsModel11')} /> Sì
              </label>
            </div>
            {religiousRestrictionsModel11 === 'true' && <Input name="religiousRestrictionsDetails" label="Specificare" />}
          </div>

          <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700 w-48">Richieste di assistenza religiosa:</span>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('religiousAssistance')} /> No
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('religiousAssistance')} /> Sì
              </label>
            </div>
            {religiousAssistance === 'true' && <Input name="religiousAssistanceDetails" label="Specificare" />}
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-slate-200">
          <Textarea 
            name="model11Notes" 
            label="Eventuali note aggiuntive sul Modello di Valori e Convinzioni" 
            rows={3}
          />
          
          <div className="mt-6 p-4 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">Valutazione Modello 11</span>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                <input 
                  type="radio" 
                  value="FUNZIONALE" 
                  className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                  {...register('model11Status')}
                />
                FUNZIONALE
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                <input 
                  type="radio" 
                  value="DISFUNZIONALE" 
                  className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                  {...register('model11Status')}
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
