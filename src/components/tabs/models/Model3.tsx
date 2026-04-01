import { LockableSection } from '../../ui/LockableSection';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Textarea } from '../../ui/Textarea';

export default function Model3() {
  const { watch, register } = useFormContext();
  
  const incontinenceAids = watch('incontinenceAids');
  const urinaryCatheter = watch('urinaryCatheter');
  const urinaryStoma = watch('urinaryStoma');
  const bowelIncontinenceAids = watch('bowelIncontinenceAids');
  const laxatives = watch('laxatives');
  const bowelStoma = watch('bowelStoma');
  const drains = watch('drains');
  const otherUrinaryAlterations: string[] = Array.isArray(watch('otherUrinaryAlterations')) ? watch('otherUrinaryAlterations') : [];
  const bowelAlterationsTypes: string[] = Array.isArray(watch('bowelAlterationsTypes')) ? watch('bowelAlterationsTypes') : [];

  return (
    <LockableSection title="3. Modello di Eliminazione">
      
      <div className="space-y-8">
        {/* ELIMINAZIONE URINARIA */}
        <div>
          <h4 className="font-semibold text-slate-700 mb-4 uppercase text-sm tracking-wider">Eliminazione Urinaria</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <span className="text-sm font-medium text-slate-700 w-32">Minzione:</span>
                <Select 
                  name="urinationType" 
                  label="" 
                  className="flex-1"
                  options={[
                    { label: 'Spontanea/controllata', value: 'Spontanea' },
                    { label: 'Alterazioni riferite', value: 'Alterazioni' }
                  ]} 
                />
              </div>
              
              {watch('urinationType') === 'Spontanea' && (
                <Input name="urinationFrequency" label="Numero di minzioni/die" type="number" />
              )}
            </div>
          </div>

          {watch('urinationType') === 'Alterazioni' && (
            <div className="mt-4 p-4 bg-white border border-slate-200 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Incontinenza Urinaria:</label>
                  <div className="space-y-2">
                    {['Diurna', 'Enuresi', 'Occasionale', 'Da stress', 'Da urgenza', 'Riflessa', 'Funzionale', 'Totale'].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" value={opt} className="text-emerald-600 focus:ring-emerald-500 rounded" {...register('urinaryIncontinenceTypes')} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Ritenzione Urinaria:</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                      <input type="radio" value="Cronica" className="text-emerald-600 focus:ring-emerald-500" {...register('urinaryRetention')} /> Cronica
                    </label>
                    <label className="flex flex-col gap-1 text-sm text-slate-600 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input type="radio" value="Acuta" className="text-emerald-600 focus:ring-emerald-500" {...register('urinaryRetention')} /> Acuta
                      </div>
                      {watch('urinaryRetention') === 'Acuta' && (
                        <Input name="urinaryRetentionResidue" label="Specificare residuo" className="ml-5 text-xs" />
                      )}
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700 block mb-2">Altre Alterazioni:</label>
                  <div className="space-y-2">
                    {['Disuria', 'Stranguria', 'Nicturia', 'Tenesmo'].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" value={opt} className="text-emerald-600 focus:ring-emerald-500 rounded" {...register('otherUrinaryAlterations')} />
                        {opt}
                      </label>
                    ))}
                    <label className="flex flex-col gap-1 text-sm text-slate-600 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" value="Pollachiuria" className="text-emerald-600 focus:ring-emerald-500 rounded" {...register('otherUrinaryAlterations')} />
                        Pollachiuria
                      </div>
                      {otherUrinaryAlterations.includes('Pollachiuria') && (
                        <Input name="pollakiuriaFrequency" label="n. minzioni/die" className="ml-5 text-xs" />
                      )}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-3">
              <Select 
                name="urineCharacteristics" 
                label="Caratteristiche delle urine" 
                options={[
                  { label: 'Normali', value: 'Normali' },
                  { label: 'Alterazioni', value: 'Alterazioni' }
                ]} 
              />
              {watch('urineCharacteristics') === 'Alterazioni' && (
                <Textarea name="urineAlterationsDescription" label="Specificare eventuali alterazioni (consultando l'esame chimico-fisico urine se necessario)" rows={2} />
              )}
            </div>

            <div className="space-y-3">
              <Input name="diuresis24h" label="Diuresi nelle 24 ore (ml/die)" type="number" />
              <div className="flex flex-wrap gap-4 mt-2">
                {['Nessuna alterazione', 'Anuria', 'Oliguria', 'Poliuria'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input type="radio" value={opt} className="text-emerald-600 focus:ring-emerald-500" {...register('diuresisAlteration')} />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-6">
            <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700 w-48">Utilizzo di presidi per incontinenza:</span>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('incontinenceAids')} /> No
                </label>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('incontinenceAids')} /> Sì
                </label>
              </div>
              {incontinenceAids === 'true' && <Input name="incontinenceAidsDetails" label="Specificare presidio" />}
            </div>

            <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700 w-48">Catetere vescicale:</span>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="No" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('urinaryCatheter')} /> No
                </label>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="A permanenza" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('urinaryCatheter')} /> A permanenza
                </label>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="A intermittenza" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('urinaryCatheter')} /> A intermittenza
                </label>
              </div>
              {urinaryCatheter && urinaryCatheter !== 'No' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-4 border-l-2 border-emerald-100 mt-2">
                  <Input name="urinaryCatheterDate" label="Posizionato il" type="date" />
                  <Input name="urinaryCatheterDetails" label="Tipo, calibro, materiale" />
                  <Select 
                    name="urinaryCatheterManagement" 
                    label="Autogestione" 
                    options={[
                      { label: 'Sì', value: 'Si' },
                      { label: 'No', value: 'No' }
                    ]} 
                  />
                  {watch('urinaryCatheterManagement') === 'No' && (
                    <Input name="urinaryCatheterManagedBy" label="Gestita da" />
                  )}
                </div>
              )}
            </div>

            <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700 w-48">Stomia urinaria:</span>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('urinaryStoma')} /> No
                </label>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('urinaryStoma')} /> Sì
                </label>
              </div>
              {urinaryStoma === 'true' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-emerald-100 mt-2">
                  <Input name="urinaryStomaDetails" label="Tipo, sede" />
                  <Select 
                    name="urinaryStomaManagement" 
                    label="Autogestione" 
                    options={[
                      { label: 'Sì', value: 'Si' },
                      { label: 'No', value: 'No' }
                    ]} 
                  />
                  {watch('urinaryStomaManagement') === 'No' && (
                    <Input name="urinaryStomaManagedBy" label="Gestita da" />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ELIMINAZIONE INTESTINALE */}
        <div className="pt-6 border-t border-slate-300">
          <h4 className="font-semibold text-slate-700 mb-4 uppercase text-sm tracking-wider">Eliminazione Intestinale</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Input name="bowelFrequency" label="Frequenza abituale" />
            <Input name="lastBowelMovement" label="Data ultima evacuazione" type="date" />
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-4">
              <span className="text-sm font-medium text-slate-700 w-32 mt-1">Alterazioni:</span>
              <div className="flex-1 space-y-2">
                <div className="flex gap-4 mb-2">
                  <label className="flex items-center gap-1 cursor-pointer text-sm">
                    <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('bowelAlterations')} /> No
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer text-sm">
                    <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('bowelAlterations')} /> Sì
                  </label>
                </div>
                {watch('bowelAlterations') === 'true' && (
                  <div className="flex flex-wrap gap-6 bg-white p-3 border border-slate-200 rounded-md">
                    <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                      <input type="checkbox" value="Stipsi" className="text-emerald-600 focus:ring-emerald-500 rounded" {...register('bowelAlterationsTypes')} /> Stipsi
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                      <input type="checkbox" value="Diarrea" className="text-emerald-600 focus:ring-emerald-500 rounded" {...register('bowelAlterationsTypes')} /> Diarrea
                    </label>
                    <div className="flex flex-col gap-1">
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="checkbox" value="Incontinenza" className="text-emerald-600 focus:ring-emerald-500 rounded" {...register('bowelAlterationsTypes')} /> Incontinenza
                      </label>
                      {bowelAlterationsTypes.includes('Incontinenza') && (
                        <div className="flex gap-4 ml-6">
                          <label className="flex items-center gap-1 cursor-pointer text-xs text-slate-500">
                            <input type="radio" value="Occasionale" className="text-emerald-600 focus:ring-emerald-500" {...register('bowelIncontinenceType')} /> Occasionale
                          </label>
                          <label className="flex items-center gap-1 cursor-pointer text-xs text-slate-500">
                            <input type="radio" value="Cronica" className="text-emerald-600 focus:ring-emerald-500" {...register('bowelIncontinenceType')} /> Cronica
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700 w-48">Utilizzo di presidi per incontinenza:</span>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('bowelIncontinenceAids')} /> No
                </label>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('bowelIncontinenceAids')} /> Sì
                </label>
              </div>
              {bowelIncontinenceAids === 'true' && <Input name="bowelIncontinenceAidsDetails" label="Specificare presidio" />}
            </div>

            <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700 w-48">Utilizzo di lassativi:</span>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('laxatives')} /> No
                </label>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('laxatives')} /> Sì
                </label>
              </div>
              {laxatives === 'true' && <Input name="laxativesDetails" label="Specificare tipo e frequenza di assunzione" />}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3">
              <div className="flex gap-4">
                <Select 
                  name="stoolCharacteristics" 
                  label="Caratteristiche delle feci" 
                  className="w-48"
                  options={[
                    { label: 'Normali', value: 'Normali' },
                    { label: 'Alterazioni', value: 'Alterazioni' }
                  ]} 
                />
                {watch('stoolCharacteristics') === 'Alterazioni' && (
                  <Input name="stoolAlterationsDetails" label="Specificare alterazioni" className="flex-1" />
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input name="bristolScale" label="SCALA BRISTOL: Tipo" />
                <Input name="romaIIIScale" label="SCALA ROMA III" />
              </div>
            </div>
          </div>
          
          <h5 className="font-semibold text-slate-700 mt-6 mb-3">Esame fisico addome</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 border border-slate-200 rounded-lg">
            <Select 
              name="abdomenExam" 
              label="Addome" 
              options={[
                { label: 'Trattabile', value: 'Trattabile' },
                { label: 'Globoso', value: 'Globoso' }
              ]} 
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 block">Peristalsi</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="Assente" className="text-emerald-600 focus:ring-emerald-500" {...register('peristalsis')} /> Assente
                </label>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="Presente" className="text-emerald-600 focus:ring-emerald-500" {...register('peristalsis')} /> Presente
                </label>
              </div>
              {watch('peristalsis') === 'Presente' && (
                <div className="flex flex-wrap gap-4 pl-4 mt-2">
                  <label className="flex items-center gap-1 cursor-pointer text-sm text-slate-500">
                    <input type="radio" value="Ipoattiva" className="text-emerald-600 focus:ring-emerald-500" {...register('peristalsisType')} /> Ipoattiva
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer text-sm text-slate-500">
                    <input type="radio" value="Fisiologica" className="text-emerald-600 focus:ring-emerald-500" {...register('peristalsisType')} /> Fisiologica
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer text-sm text-slate-500">
                    <input type="radio" value="Iperattiva" className="text-emerald-600 focus:ring-emerald-500" {...register('peristalsisType')} /> Iperattiva
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700 w-48">Stomia intestinale:</span>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('bowelStoma')} /> No
                </label>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('bowelStoma')} /> Sì
                </label>
              </div>
              {bowelStoma === 'true' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-emerald-100 mt-2">
                  <Input name="bowelStomaDetails" label="Tipo, sede" />
                  <Select 
                    name="bowelStomaManagement" 
                    label="Autogestione" 
                    options={[
                      { label: 'Sì', value: 'Si' },
                      { label: 'No', value: 'No' }
                    ]} 
                  />
                  {watch('bowelStomaManagement') === 'No' && (
                    <Input name="bowelStomaManagedBy" label="Gestita da" />
                  )}
                </div>
              )}
            </div>

            <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700 w-48">Drenaggi:</span>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('drains')} /> No
                </label>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('drains')} /> Sì
                </label>
              </div>
              {drains === 'true' && <Input name="drainsDetails" label="Specificare sede, tipo e sistema di raccolta" />}
            </div>
            
            <Textarea name="eliminationOtherObservations" label="Altre osservazioni" rows={2} />
          </div>

          <div className="pt-6 mt-6 border-t border-slate-200">
            <Textarea 
              name="model3Notes" 
              label="Eventuali note aggiuntive sul Modello Di Eliminazione" 
              rows={3}
            />
            
            <div className="mt-6 p-4 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">Valutazione Modello 3</span>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                  <input 
                    type="radio" 
                    value="FUNZIONALE" 
                    className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                    {...register('model3Status')}
                  />
                  FUNZIONALE
                </label>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                  <input 
                    type="radio" 
                    value="DISFUNZIONALE" 
                    className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                    {...register('model3Status')}
                  />
                  DISFUNZIONALE
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LockableSection>
  );
}
