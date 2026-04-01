import { useFormContext } from 'react-hook-form';
import { Select } from '../../ui/Select';
import { Textarea } from '../../ui/Textarea';

export default function Model7() {
  const { watch, register } = useFormContext();

  const interviewAttitude = watch('interviewAttitude');

  return (
    <section className="bg-slate-50 p-6 rounded-xl border border-emerald-100">
      <h3 className="text-lg font-semibold text-emerald-700 mb-4 border-b border-emerald-100 pb-2">
        7. Modello di Percezione e Concetto del Sé
      </h3>
      
      <div className="space-y-6">
        <h4 className="font-semibold text-slate-700 border-b border-slate-200 pb-2">Dati Soggettivi</h4>
        <Textarea 
          name="selfDescription" 
          label="Come descrive se stesso? Ha notato qualche cambiamento nel modo in cui si sente rispetto a se stesso o al suo corpo da quando è iniziata la malattia?" 
          rows={4}
        />

        <h4 className="font-semibold text-slate-700 border-b border-slate-200 pb-2 mt-8">Esame Fisico</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-lg border border-slate-200">
          <Select 
            name="eyeContact" 
            label="Contatto oculare" 
            options={[
              { label: 'Presente', value: 'Presente' },
              { label: 'A tratti assente', value: 'A tratti assente' },
              { label: 'Assente', value: 'Assente' }
            ]} 
          />
          
          <Textarea 
            name="voicePatterns" 
            label="Modelli della voce e della parola" 
            rows={2}
          />
        </div>

        <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3 mt-4">
          <label className="text-sm font-semibold text-slate-700 block mb-2">Atteggiamento al colloquio:</label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input type="radio" value="Rilassato" className="text-emerald-600 focus:ring-emerald-500" {...register('interviewAttitude')} /> Rilassato
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input type="radio" value="Nervoso" className="text-emerald-600 focus:ring-emerald-500" {...register('interviewAttitude')} /> Nervoso
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input type="radio" value="Assertivo" className="text-emerald-600 focus:ring-emerald-500" {...register('interviewAttitude')} /> Assertivo
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input type="radio" value="Passivo" className="text-emerald-600 focus:ring-emerald-500" {...register('interviewAttitude')} /> Passivo
            </label>
            <div className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input type="radio" value="Altro" className="text-emerald-600 focus:ring-emerald-500" {...register('interviewAttitude')} /> Altro
              {interviewAttitude === 'Altro' && (
                <input 
                  type="text" 
                  className="ml-2 px-2 py-1 border border-slate-300 rounded text-sm focus:ring-emerald-500" 
                  placeholder="Specificare"
                  {...register('interviewAttitudeOther')} 
                />
              )}
            </div>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-slate-200">
          <Textarea 
            name="model7Notes" 
            label="Eventuali note aggiuntive sul Modello di Percezione e Concetto di sé" 
            rows={3}
          />
          
          <div className="mt-6 p-4 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">Valutazione Modello 7</span>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                <input 
                  type="radio" 
                  value="FUNZIONALE" 
                  className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                  {...register('model7Status')}
                />
                FUNZIONALE
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                <input 
                  type="radio" 
                  value="DISFUNZIONALE" 
                  className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                  {...register('model7Status')}
                />
                DISFUNZIONALE
              </label>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
