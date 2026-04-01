import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';

export default function Model6() {
  const { watch, register } = useFormContext();
  
  const orientation = watch('orientation');
  const collaboration = watch('collaboration');
  const speech = watch('speech');
  const memory = watch('memory');
  const concentration = watch('concentration');
  const vision = watch('vision');
  const hearing = watch('hearing');
  const pain = watch('pain');

  return (
    <section className="bg-slate-50 p-6 rounded-xl border border-emerald-100">
      <h3 className="text-lg font-semibold text-emerald-700 mb-4 border-b border-emerald-100 pb-2">
        6. Modello Cognitivo e Percettivo
      </h3>
      
      <div className="space-y-8">
        <div>
          <h4 className="font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4 uppercase text-sm tracking-wider">Stato di Coscienza e Neurologico</h4>
          <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-4">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-sm font-medium text-slate-700">Stato di coscienza:</span>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="Vigile" className="text-emerald-600 focus:ring-emerald-500" {...register('consciousness')} /> Vigile
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="Confuso" className="text-emerald-600 focus:ring-emerald-500" {...register('consciousness')} /> Confuso
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="Soporoso" className="text-emerald-600 focus:ring-emerald-500" {...register('consciousness')} /> Soporoso
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="Stuporoso" className="text-emerald-600 focus:ring-emerald-500" {...register('consciousness')} /> Stuporoso
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="Coma" className="text-emerald-600 focus:ring-emerald-500" {...register('consciousness')} /> Coma
              </label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="avpuScore" label="Valutazione dello stato neurologico: Scala AVPU" />
              <Input name="gcsScore" label="Punteggio GCS (se necessario)" />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-sm font-medium text-slate-700">Altre valutazioni:</span>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="checkbox" value="Agitato" className="text-emerald-600 focus:ring-emerald-500 rounded" {...register('otherNeurologicalEvaluations')} /> Agitato
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="checkbox" value="Sedato" className="text-emerald-600 focus:ring-emerald-500 rounded" {...register('otherNeurologicalEvaluations')} /> Sedato
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="checkbox" value="Altro" className="text-emerald-600 focus:ring-emerald-500 rounded" {...register('otherNeurologicalEvaluations')} /> Altro
              </label>
              <Input name="rassScore" label="(Scala di RASS allegata)" className="max-w-[150px] text-xs" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4 uppercase text-sm tracking-wider">Orientamento</h4>
            <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700 w-32">Orientato:</span>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500" {...register('orientation')} /> Sì
                </label>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500" {...register('orientation')} /> No
                </label>
              </div>

              {orientation === 'false' && (
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-slate-700 block">Specificare:</span>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" value="Tempo" className="text-emerald-600 focus:ring-emerald-500 rounded" {...register('disorientationTypes')} /> Tempo
                      </label>
                      <label className="flex items-center gap-1 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" value="Spazio" className="text-emerald-600 focus:ring-emerald-500 rounded" {...register('disorientationTypes')} /> Spazio
                      </label>
                      <label className="flex items-center gap-1 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" value="Sul sé" className="text-emerald-600 focus:ring-emerald-500 rounded" {...register('disorientationTypes')} /> Sul sé
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-2">
                    <label className="flex items-center gap-1 text-sm text-slate-600 cursor-pointer">
                      <input type="radio" value="Temporaneo" className="text-emerald-600 focus:ring-emerald-500" {...register('disorientationDuration')} /> Temporaneo
                    </label>
                    <label className="flex items-center gap-1 text-sm text-slate-600 cursor-pointer">
                      <input type="radio" value="Permanente" className="text-emerald-600 focus:ring-emerald-500" {...register('disorientationDuration')} /> Permanente
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4 uppercase text-sm tracking-wider">Collaborazione</h4>
            <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3">
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input type="radio" value="Collaborante con tutti" className="text-emerald-600 focus:ring-emerald-500" {...register('collaboration')} />
                  Collaborante con tutti
                </label>
                {collaboration === 'Collaborante con tutti' && <Input name="collaborationDetails" label="Specificare in cosa" />}
                
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input type="radio" value="Collaborante solo con familiari" className="text-emerald-600 focus:ring-emerald-500" {...register('collaboration')} />
                  Collaborante solo con i familiari
                </label>
                {collaboration === 'Collaborante solo con familiari' && <Input name="collaborationFamilyDetails" label="Specificare" />}
                
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input type="radio" value="Parzialmente collaborante" className="text-emerald-600 focus:ring-emerald-500" {...register('collaboration')} />
                  Parzialmente collaborante
                </label>
                {collaboration === 'Parzialmente collaborante' && <Input name="collaborationPartialDetails" label="Specificare" />}
                
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input type="radio" value="Non collaborante" className="text-emerald-600 focus:ring-emerald-500" {...register('collaboration')} />
                  Non collaborante
                </label>
                
                <label className="flex flex-col gap-1 text-sm text-slate-700 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input type="radio" value="Altro" className="text-emerald-600 focus:ring-emerald-500" {...register('collaboration')} />
                    Altro
                  </div>
                  {collaboration === 'Altro' && <Input name="collaborationOtherDetails" label="Specificare" />}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4 uppercase text-sm tracking-wider">Linguaggio</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 border border-slate-200 rounded-lg">
            <Input name="spokenLanguage" label="Lingua parlata" />
            
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-700">Eloquio:</span>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Normale" className="text-emerald-600" {...register('speech')} /> Normale</label>
                <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Disartria" className="text-emerald-600" {...register('speech')} /> Disartria</label>
                <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Afasia" className="text-emerald-600" {...register('speech')} /> Afasia</label>
              </div>
              {speech === 'Afasia' && <Input name="aphasiaType" label="Specificare tipo" />}
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-700">Comprensione:</span>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Buona" className="text-emerald-600" {...register('comprehension')} /> Buona</label>
                <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Parzialmente compromessa" className="text-emerald-600" {...register('comprehension')} /> Parzialmente compromessa</label>
                <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Totalmente compromessa" className="text-emerald-600" {...register('comprehension')} /> Totalmente compromessa</label>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-700">Atteggiamento al colloquio:</span>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Disponibile" className="text-emerald-600" {...register('attitude')} /> Disponibile</label>
                <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Interessato" className="text-emerald-600" {...register('attitude')} /> Interessato</label>
                <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Taciturno" className="text-emerald-600" {...register('attitude')} /> Taciturno</label>
                <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Indifferente" className="text-emerald-600" {...register('attitude')} /> Indifferente</label>
                <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Aggressivo" className="text-emerald-600" {...register('attitude')} /> Aggressivo</label>
                <div className="flex items-center gap-1 text-sm cursor-pointer">
                  <input type="radio" value="Altro" className="text-emerald-600" {...register('attitude')} /> Altro
                  {watch('attitude') === 'Altro' && <Input name="attitudeOther" label="" placeholder="Specificare" className="w-full" />}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4 uppercase text-sm tracking-wider">Altre Abilità Cognitive</h4>
            <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-slate-700">Memoria:</span>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Normale" className="text-emerald-600" {...register('memory')} /> Normale</label>
                  <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Alterata" className="text-emerald-600" {...register('memory')} /> Alterata</label>
                </div>
                {memory === 'Alterata' && <Input name="memoryAlterationDetails" label="Specificare" />}
              </div>
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                <span className="text-sm font-medium text-slate-700">Capacità di mantenere la concentrazione:</span>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Normale" className="text-emerald-600" {...register('concentration')} /> Normale</label>
                  <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Alterata" className="text-emerald-600" {...register('concentration')} /> Alterata</label>
                </div>
                {concentration === 'Alterata' && <Input name="concentrationAlterationDetails" label="Specificare" />}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4 uppercase text-sm tracking-wider">Sensi</h4>
            <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-slate-700">Vista:</span>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Normale" className="text-emerald-600" {...register('vision')} /> Normale</label>
                  <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Occhiali" className="text-emerald-600" {...register('vision')} /> Occhiali</label>
                  <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Lenti a contatto" className="text-emerald-600" {...register('vision')} /> Lenti a contatto</label>
                  <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Alterazioni" className="text-emerald-600" {...register('vision')} /> Alterazioni</label>
                </div>
                {vision === 'Alterazioni' && <Input name="visionAlterationDetails" label="Specificare" />}
              </div>
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                <span className="text-sm font-medium text-slate-700">Udito:</span>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Normale" className="text-emerald-600" {...register('hearing')} /> Normale</label>
                  <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Protesi" className="text-emerald-600" {...register('hearing')} /> Protesi</label>
                  <label className="flex items-center gap-1 text-sm cursor-pointer"><input type="radio" value="Alterazioni" className="text-emerald-600" {...register('hearing')} /> Alterazioni</label>
                </div>
                {hearing === 'Alterazioni' && <Input name="hearingAlterationDetails" label="Specificare" />}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4 uppercase text-sm tracking-wider">Dolore</h4>
          <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700 w-48">Il paziente riferisce dolore?</span>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('pain')} /> No
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('pain')} /> Sì
              </label>
            </div>

            {pain === 'true' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-emerald-100 pt-2">
                <Input name="painLocation" label="Sede" />
                <Input name="painTime" label="Tempo (comparsa e durata)" />
                <Input name="painQuality" label="Qualità" />
                <Input name="painFactors" label="Fattori aggravanti o allevianti" />
                <Input name="painNrs" label="Intensità del dolore (NRS da 0 a 10) / Altra Scala" type="number" className="bg-emerald-50" />
                <Textarea name="painTreatment" label="Trattamento farmacologico e non farmacologico in corso" rows={2} />
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-slate-200">
          <Textarea 
            name="model6Notes" 
            label="Eventuali note aggiuntive sul Modello Cognitivo e Percettivo" 
            rows={3}
          />
          
          <div className="mt-6 p-4 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">Valutazione Modello 6</span>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                <input 
                  type="radio" 
                  value="FUNZIONALE" 
                  className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                  {...register('model6Status')}
                />
                FUNZIONALE
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                <input 
                  type="radio" 
                  value="DISFUNZIONALE" 
                  className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                  {...register('model6Status')}
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
