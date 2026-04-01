import { LockableSection } from '../../ui/LockableSection';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';

export default function Model5() {
  const { watch, register } = useFormContext();

  const sleepRested = watch('sleepRested');
  const sleepFallAsleepDiff = watch('sleepFallAsleepDiff');
  const sleepMaintainDiff = watch('sleepMaintainDiff');
  const sleepMeds = watch('sleepMeds');

  return (
    <LockableSection title="5. Modello di Riposo e di Sonno">
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input name="sleepHours" label="Numero ore di sonno per notte" type="number" />
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700 w-64">Si sente riposato al risveglio?</span>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('sleepRested')} /> Sì
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('sleepRested')} /> No
              </label>
            </div>
            {sleepRested && <Input name="sleepRestedNotes" label="Note" />}
          </div>

          <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700 w-64">Ha difficoltà ad addormentarsi?</span>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('sleepFallAsleepDiff')} /> No
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('sleepFallAsleepDiff')} /> Sì
              </label>
            </div>
            {sleepFallAsleepDiff === 'true' && <Input name="sleepFallAsleepDiffNotes" label="Note" />}
          </div>

          <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700 w-64">Ha difficoltà a mantenere il sonno?</span>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('sleepMaintainDiff')} /> No
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('sleepMaintainDiff')} /> Sì
              </label>
            </div>
            {sleepMaintainDiff === 'true' && <Input name="sleepMaintainDiffNotes" label="Note" />}
          </div>

          <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700 w-64">Farmaci per favorire il sonno?</span>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('sleepMeds')} /> No
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('sleepMeds')} /> Sì
              </label>
            </div>
            {sleepMeds === 'true' && <Input name="sleepMedsDetails" label="Tipologia e dosaggio" />}
          </div>
        </div>

        <Textarea name="sleepObservation" label="Se appropriato, osservare il modello del sonno" rows={2} />

        <div className="pt-6 mt-6 border-t border-slate-200">
          <Textarea 
            name="model5Notes" 
            label="Eventuali note aggiuntive sul Modello di Riposo e di Sonno" 
            rows={3}
          />
          
          <div className="mt-6 p-4 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">Valutazione Modello 5</span>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                <input 
                  type="radio" 
                  value="FUNZIONALE" 
                  className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                  {...register('model5Status')}
                />
                FUNZIONALE
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                <input 
                  type="radio" 
                  value="DISFUNZIONALE" 
                  className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                  {...register('model5Status')}
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
