import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';

export default function Model8() {
  const { watch, register } = useFormContext();

  const occupationalRole = watch('occupationalRole');
  const livingSituation = watch('livingSituation');
  const supportSystemRaw = watch('supportSystem');
  const supportSystem: string[] = Array.isArray(supportSystemRaw) ? supportSystemRaw : [];

  return (
    <section className="bg-slate-50 p-6 rounded-xl border border-emerald-100">
      <h3 className="text-lg font-semibold text-emerald-700 mb-4 border-b border-emerald-100 pb-2">
        8. Modello di Ruoli e Relazioni
      </h3>
      
      <div className="space-y-6">
        <h4 className="font-semibold text-slate-700 border-b border-slate-200 pb-2">Dati Soggettivi</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 border border-slate-200 rounded-lg">
          <Input name="maritalStatusRoles" label="Stato civile" />
          <Input name="educationLevel" label="Livello di scolarità" />
        </div>

        <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-4">
          <label className="text-sm font-semibold text-slate-700 block">Ruolo professionale:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <input type="radio" value="Occupato" className="text-emerald-600 focus:ring-emerald-500" {...register('occupationalRole')} /> 
              <span className="text-sm text-slate-700 w-24">Occupato/a</span>
              {occupationalRole === 'Occupato' && <Input name="occupationalActivityType" label="" placeholder="Tipo di Attività" className="flex-1 text-xs" />}
            </div>
            <div className="flex items-center gap-2">
              <input type="radio" value="Pensionato" className="text-emerald-600 focus:ring-emerald-500" {...register('occupationalRole')} /> 
              <span className="text-sm text-slate-700 w-24">Pensionato/a</span>
              {occupationalRole === 'Pensionato' && <Input name="occupationalPrevious" label="" placeholder="Occupazione precedente" className="flex-1 text-xs" />}
            </div>
            <div className="flex items-center gap-2">
              <input type="radio" value="Casalingo" className="text-emerald-600 focus:ring-emerald-500" {...register('occupationalRole')} /> 
              <span className="text-sm text-slate-700">Casalingo/a</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="radio" value="Disoccupato" className="text-emerald-600 focus:ring-emerald-500" {...register('occupationalRole')} /> 
              <span className="text-sm text-slate-700 w-24">Disoccupato</span>
              {occupationalRole === 'Disoccupato' && <Input name="occupationalDesired" label="" placeholder="Occupazione desiderata" className="flex-1 text-xs" />}
            </div>
            <div className="flex items-center gap-2">
              <input type="radio" value="Studente" className="text-emerald-600 focus:ring-emerald-500" {...register('occupationalRole')} /> 
              <span className="text-sm text-slate-700 w-24">Studente</span>
              {occupationalRole === 'Studente' && <Input name="occupationalEnrolled" label="" placeholder="Iscritto a" className="flex-1 text-xs" />}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-700 w-16">Vive:</span>
            <label className="flex items-center gap-1 cursor-pointer text-sm">
              <input type="radio" value="Da solo" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('livingSituation')} /> da solo
            </label>
            <label className="flex items-center gap-1 cursor-pointer text-sm">
              <input type="radio" value="In famiglia" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('livingSituation')} /> in famiglia
            </label>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="Altro" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('livingSituation')} /> altro
              </label>
              {livingSituation === 'Altro' && (
                <input 
                  type="text" 
                  className="px-2 py-1 border border-slate-300 rounded text-sm focus:ring-emerald-500" 
                  placeholder="Specificare"
                  {...register('livingSituationOther')} 
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <Textarea name="familyStructure" label="Struttura e ruolo famigliare (moglie/marito/figli)" rows={2} />
            <Textarea name="significantRelationships" label="Relazioni significative extra famigliari: (amici/gruppi sociali di appartenenza ecc..)" rows={2} />
          </div>
        </div>

        <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3">
          <label className="text-sm font-semibold text-slate-700 block mb-2">Sistema di supporto:</label>
          <div className="flex flex-wrap gap-4">
            {['coniuge', 'figli', 'parenti', 'nessuno'].map((opt) => (
              <label key={opt} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                <input type="checkbox" value={opt} className="text-emerald-600 focus:ring-emerald-500 rounded" {...register('supportSystem')} />
                {opt}
              </label>
            ))}
            <div className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
              <input type="checkbox" value="Altra persona" className="text-emerald-600 focus:ring-emerald-500 rounded" {...register('supportSystem')} /> Altra persona
              {supportSystem?.includes('Altra persona') && (
                <input 
                  type="text" 
                  className="ml-2 px-2 py-1 border border-slate-300 rounded text-sm focus:ring-emerald-500 w-32" 
                  placeholder="Specificare"
                  {...register('supportSystemOther')} 
                />
              )}
            </div>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-slate-200">
          <Textarea 
            name="model8Notes" 
            label="Eventuali note aggiuntive sul Modello di Ruoli e Relazioni" 
            rows={3}
          />
          
          <div className="mt-6 p-4 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">Valutazione Modello 8</span>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                <input 
                  type="radio" 
                  value="FUNZIONALE" 
                  className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                  {...register('model8Status')}
                />
                FUNZIONALE
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                <input 
                  type="radio" 
                  value="DISFUNZIONALE" 
                  className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                  {...register('model8Status')}
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
