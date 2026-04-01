import { LockableSection } from '../../ui/LockableSection';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Textarea } from '../../ui/Textarea';

export default function Model4() {
  const { watch, register } = useFormContext();
  
  const muscleTone = watch('muscleTone');
  const muscleStrength = watch('muscleStrength');
  const jointExcursion = watch('jointExcursion');
  const walking = watch('walking');
  const prosthesis = watch('prosthesis');
  const respiratoryFunction = watch('respiratoryFunction');
  const cough = watch('cough');

  return (
    <LockableSection title="4. Modello di Attività ed Esercizio Fisico">
      
      <div className="space-y-6">
        <h4 className="font-semibold text-slate-700 border-b border-slate-200 pb-2">Dati Soggettivi</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select 
            name="energyLevel" 
            label="Grado di energia percepito per le attività desiderate/necessarie" 
            options={[
              { label: 'Ottimo', value: 'Ottimo' },
              { label: 'Buono', value: 'Buono' },
              { label: 'Sufficiente', value: 'Sufficiente' },
              { label: 'Insufficiente', value: 'Insufficiente' }
            ]} 
          />
          <Input name="leisureActivities" label="Attività di svago svolte prima del ricovero" />
        </div>
        <Input name="exerciseRoutine" label="Esercizio fisico svolto prima del ricovero (tipo e regolarità)" />

        <div className="mt-6 pt-4 border-t border-slate-200">
          <h5 className="font-medium text-slate-700 mb-2">Abilità percepita secondo Scala funzionale</h5>
          <p className="text-xs text-slate-500 mb-4">
            0 = Completamente autonomo | 1 = Ausili | 2 = Assistenza/supervisione persona | 3 = Assistenza + ausili | 4 = Dipendente, non partecipa
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 bg-white p-4 rounded-lg border border-slate-200">
            {[
              { id: 'funcAlimentazione', label: 'Alimentazione' },
              { id: 'funcCuraAspetto', label: 'Cura dell\'aspetto' },
              { id: 'funcBagno', label: 'Fare il bagno' },
              { id: 'funcMobilitaGen', label: 'Mobilità generale' },
              { id: 'funcGabinetto', label: 'Uso del gabinetto' },
              { id: 'funcCucinare', label: 'Cucinare' },
              { id: 'funcMobilitaLetto', label: 'Mobilità a letto' },
              { id: 'funcCasa', label: 'Mantenimento casa' },
              { id: 'funcVestirsi', label: 'Vestirsi' },
              { id: 'funcSpesa', label: 'Fare la spesa' }
            ].map(item => (
              <Input key={item.id} name={item.id} label={item.label} type="number" min="0" max="4" />
            ))}
          </div>
        </div>

        <h4 className="font-semibold text-slate-700 border-b border-slate-200 pb-2 mt-8">Esame Fisico</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Select 
                name="assumedPosition" 
                label="Posizione assunta" 
                className="flex-1"
                options={[
                  { label: 'Libera', value: 'Libera' },
                  { label: 'A letto con decubito', value: 'A letto' }
                ]} 
              />
              {watch('assumedPosition') === 'A letto' && (
                <Select 
                  name="decubitusType" 
                  label="Decubito" 
                  className="flex-1"
                  options={[
                    { label: 'Indifferente', value: 'Indifferente' },
                    { label: 'Preferito', value: 'Preferito' },
                    { label: 'Obbligato', value: 'Obbligato' }
                  ]} 
                />
              )}
            </div>
            
            <div className="flex flex-col gap-2">
              <Select 
                name="muscleTone" 
                label="Tono e trofismo" 
                options={[
                  { label: 'Normale', value: 'Normale' },
                  { label: 'Alterazioni', value: 'Alterazioni' }
                ]} 
              />
              {muscleTone === 'Alterazioni' && <Input name="muscleToneAlterations" label="Sede e tipo" className="text-sm" />}
            </div>
            
            <div className="flex flex-col gap-2">
              <Select 
                name="muscleStrength" 
                label="Forza muscolare" 
                options={[
                  { label: 'Normale', value: 'Normale' },
                  { label: 'Alterazioni', value: 'Alterazioni' }
                ]} 
              />
              {muscleStrength === 'Alterazioni' && <Input name="muscleStrengthAlterations" label="Sede, tipo e caratteristiche" className="text-sm" />}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Select 
                name="jointExcursion" 
                label="Escursione articolare" 
                options={[
                  { label: 'Normale', value: 'Normale' },
                  { label: 'Alterazioni', value: 'Alterazioni' }
                ]} 
              />
              {jointExcursion === 'Alterazioni' && <Input name="jointExcursionAlterations" label="Sede e tipo" className="text-sm" />}
            </div>

            <Select 
              name="balance" 
              label="Equilibrio" 
              options={[
                { label: 'Stabile', value: 'Stabile' },
                { label: 'Instabile', value: 'Instabile' }
              ]} 
            />

            <div className="flex flex-col gap-2">
              <Select 
                name="walking" 
                label="Deambulazione" 
                options={[
                  { label: 'Nella norma', value: 'Nella norma' },
                  { label: 'Alterazioni', value: 'Alterazioni' }
                ]} 
              />
              {walking === 'Alterazioni' && <Input name="walkingAlterations" label="Specificare tipo alterazione" className="text-sm" />}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700 w-48">Utilizzo di protesi e/o ausili:</span>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('prosthesis')} /> No
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('prosthesis')} /> Sì
              </label>
            </div>
            {prosthesis === 'true' && <Input name="prosthesisDetails" label="Specificare presidio e lateralità" />}
          </div>

          <div className="bg-white p-4 border border-slate-200 rounded-lg">
            <Input name="barthelScore" label="Valutazione ADL: Punteggio scala Barthel" type="number" />
          </div>
        </div>

        <Textarea name="generalAppearance" label="Aspetto generale (cura dell'aspetto, igiene, livello di energia)" rows={2} className="mt-4" />

        <h4 className="font-semibold text-slate-700 border-b border-slate-200 pb-2 mt-8">Funzione Respiratoria</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex gap-4 bg-white p-3 rounded-md border border-slate-200">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
                <input type="radio" value="Autonomo" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('respiratoryFunction')} /> Respiro autonomo
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
                <input type="radio" value="Supportato" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('respiratoryFunction')} /> Respiro supportato
              </label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input name="respiratoryRate" label="Frequenza respiratoria" />
              <Input name="spo2" label="SPO2 %" />
            </div>

            <Select 
              name="breathingDepth" 
              label="Profondità" 
              options={[
                { label: 'Normale', value: 'Normale' },
                { label: 'Superficiale', value: 'Superficiale' },
                { label: 'Profondo', value: 'Profondo' }
              ]} 
            />

            <div className="bg-white p-3 border border-slate-200 rounded-md">
              <label className="text-sm font-medium text-slate-700 mb-2 block">Qualità:</label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input type="radio" value="Eupnea" className="text-emerald-600 focus:ring-emerald-500" {...register('breathingQuality')} /> Eupnea
                </label>
                <div className="flex gap-2 items-center">
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input type="radio" value="Dispnea" className="text-emerald-600 focus:ring-emerald-500" {...register('breathingQuality')} /> Dispnea:
                  </label>
                  {watch('breathingQuality') === 'Dispnea' && (
                    <div className="flex gap-3 ml-2">
                      <label className="flex items-center gap-1 text-xs"><input type="radio" value="sforzo" {...register('dyspneaType')} /> sforzo</label>
                      <label className="flex items-center gap-1 text-xs"><input type="radio" value="riposo" {...register('dyspneaType')} /> riposo</label>
                      <label className="flex items-center gap-1 text-xs"><input type="radio" value="ortopnea" {...register('dyspneaType')} /> ortopnea</label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-3 border border-slate-200 rounded-md">
              <label className="text-sm font-medium text-slate-700 mb-2 block">Alterazioni:</label>
              <div className="flex flex-wrap gap-4">
                {['Tachipnea', 'Bradipnea', 'Polipnea', 'Pause di apnea'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" value={opt} className="text-emerald-600 focus:ring-emerald-500 rounded" {...register('breathingAlterations')} />
                    {opt}
                  </label>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Input name="breathingPathological" label="Respiro patologico (tipo)" className="text-xs" />
                <Input name="breathingOtherAlterations" label="Altro" className="text-xs" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Select 
                name="respiratoryNoises" 
                label="Rumori respiratori" 
                options={[
                  { label: 'Assenti', value: 'Assenti' },
                  { label: 'Presenti', value: 'Presenti' }
                ]} 
              />
              {watch('respiratoryNoises') === 'Presenti' && <Input name="respiratoryNoisesDetails" label="Caratteristiche" className="text-sm" />}
            </div>

            <div className="flex flex-col gap-2">
              <Select 
                name="coughReflex" 
                label="Riflesso della tosse" 
                options={[
                  { label: 'Assente', value: 'Assente' },
                  { label: 'Presente', value: 'Presente' }
                ]} 
              />
            </div>

            <div className="flex flex-col gap-2">
              <Select 
                name="cough" 
                label="Tosse" 
                options={[
                  { label: 'Assente', value: 'Assente' },
                  { label: 'Presente', value: 'Presente' }
                ]} 
              />
              {cough === 'Presente' && <Input name="coughDetails" label="Caratteristiche" className="text-sm" />}
            </div>

            <div className="flex flex-col gap-2">
              <Select 
                name="sputum" 
                label="Espettorato" 
                options={[
                  { label: 'Assente', value: 'Assente' },
                  { label: 'Presente', value: 'Presente' }
                ]} 
              />
              {watch('sputum') === 'Presente' && <Input name="sputumDetails" label="Caratteristiche" className="text-sm" />}
            </div>

            <Select 
              name="sputumAbility" 
              label="Capacità di espettorare" 
              options={[
                { label: 'Assente', value: 'Assente' },
                { label: 'Presente', value: 'Presente' }
              ]} 
            />

            {respiratoryFunction === 'Supportato' && (
              <div className="bg-slate-50 p-4 border border-slate-200 rounded-lg space-y-3">
                <Input name="respiratoryDevice" label="Tipologia di presidio utilizzato" />
                <Input name="respiratorySupport" label="Tipologia di supporto utilizzato" />
              </div>
            )}
          </div>
        </div>

        <h4 className="font-semibold text-slate-700 border-b border-slate-200 pb-2 mt-8">Funzione Cardiaca e Vascolare</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input name="pulseRate" label="Frequenza (Polso)" type="number" />
              <Input name="pulseLocation" label="Sede rilevazione" />
            </div>
            
            <div className="bg-white p-3 border border-slate-200 rounded-md">
              <div className="flex gap-4 mb-2">
                <label className="flex items-center gap-1 text-sm"><input type="radio" value="Normale" {...register('pulseType')} /> Normale</label>
                <label className="flex items-center gap-1 text-sm"><input type="radio" value="Tachicardia" {...register('pulseType')} /> Tachicardia</label>
                <label className="flex items-center gap-1 text-sm"><input type="radio" value="Bradicardia" {...register('pulseType')} /> Bradicardia</label>
              </div>
              <div className="flex gap-4 mb-2 pt-2 border-t border-slate-100">
                <span className="text-sm font-medium text-slate-700">Ritmo:</span>
                <label className="flex items-center gap-1 text-sm"><input type="radio" value="Ritmico" {...register('pulseRhythm')} /> Ritmico</label>
                <label className="flex items-center gap-1 text-sm"><input type="radio" value="Aritmico" {...register('pulseRhythm')} /> Aritmico</label>
              </div>
              <div className="flex gap-4 pt-2 border-t border-slate-100">
                <span className="text-sm font-medium text-slate-700">Ampiezza:</span>
                <label className="flex items-center gap-1 text-sm"><input type="radio" value="Pieno" {...register('pulseAmplitude')} /> Pieno</label>
                <label className="flex items-center gap-1 text-sm"><input type="radio" value="Debole" {...register('pulseAmplitude')} /> Debole</label>
                <label className="flex items-center gap-1 text-sm"><input type="radio" value="Filiforme" {...register('pulseAmplitude')} /> Filiforme</label>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input name="bloodPressureValue" label="Pressione Arteriosa (valore)" />
              <Input name="bloodPressureLocation" label="Sede di rilevazione" />
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-1 text-sm"><input type="checkbox" value="Ortostatismo" {...register('bloodPressurePosture')} /> Ortostatismo</label>
              <label className="flex items-center gap-1 text-sm"><input type="checkbox" value="Clinostatismo" {...register('bloodPressurePosture')} /> Clinostatismo</label>
            </div>
            <Input name="capillaryRefill" label="Refill capillare" className="max-w-[200px]" />
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-slate-200">
          <Textarea 
            name="model4Notes" 
            label="Eventuali note aggiuntive sul Modello Di Attività ed Esercizio Fisico" 
            rows={3}
          />
          
          <div className="mt-6 p-4 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">Valutazione Modello 4</span>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                <input 
                  type="radio" 
                  value="FUNZIONALE" 
                  className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                  {...register('model4Status')}
                />
                FUNZIONALE
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                <input 
                  type="radio" 
                  value="DISFUNZIONALE" 
                  className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                  {...register('model4Status')}
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
