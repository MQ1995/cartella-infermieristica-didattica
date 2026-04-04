import { useFormContext, useWatch } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Textarea } from '../../ui/Textarea';
import { LockableSection } from '../../ui/LockableSection';

const SUB     = 'text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 mb-4';
const DIVIDER = 'border-t border-slate-200 my-5';
const RADIO   = 'w-4 h-4 text-emerald-600 focus:ring-emerald-500';
const RL      = 'flex items-center gap-1.5 cursor-pointer text-sm text-slate-700';
const CL      = 'flex items-center gap-2 cursor-pointer text-sm text-slate-700';
const CB      = 'w-4 h-4 text-emerald-600 focus:ring-emerald-500 rounded border-slate-300';
const BOX     = 'rounded-lg border border-slate-200 p-3 space-y-3';

export default function Model4() {
  const { register } = useFormContext();

  const assumedPosition    = useWatch({ name: 'assumedPosition' });
  const muscleTone         = useWatch({ name: 'muscleTone' });
  const muscleStrength     = useWatch({ name: 'muscleStrength' });
  const jointExcursion     = useWatch({ name: 'jointExcursion' });
  const walking            = useWatch({ name: 'walking' });
  const prosthesis         = useWatch({ name: 'prosthesis' });
  const respiratoryFunction = useWatch({ name: 'respiratoryFunction' });
  const breathingQuality   = useWatch({ name: 'breathingQuality' });
  const respiratoryNoises  = useWatch({ name: 'respiratoryNoises' });
  const cough              = useWatch({ name: 'cough' });
  const sputum             = useWatch({ name: 'sputum' });

  return (
    <LockableSection title="4. Attività ed esercizio fisico">
      <div className="space-y-5">

        {/* ── Dati soggettivi ── */}
        <p className={SUB}>Dati soggettivi</p>
        <div className="grid grid-cols-1 @md:grid-cols-2 gap-3">
          <Select
            name="energyLevel"
            label="Grado di energia percepito per le attività"
            options={[
              { label: 'Ottimo',        value: 'Ottimo' },
              { label: 'Buono',         value: 'Buono' },
              { label: 'Sufficiente',   value: 'Sufficiente' },
              { label: 'Insufficiente', value: 'Insufficiente' },
            ]}
          />
          <Input name="leisureActivities" label="Attività di svago prima del ricovero" />
        </div>
        <Input name="exerciseRoutine" label="Esercizio fisico prima del ricovero (tipo e regolarità)" />

        <div className={DIVIDER} />

        {/* ── Scala funzionale ADL ── */}
        <p className={SUB}>Scala funzionale ADL</p>
        <p className="text-xs text-slate-500 -mt-2 mb-2">
          0 = Completamente autonomo · 1 = Ausili · 2 = Assistenza / supervisione · 3 = Assistenza + ausili · 4 = Dipendente, non partecipa
        </p>
        <div className={`${BOX} !space-y-0`}>
          <div className="grid grid-cols-2 @md:grid-cols-5 gap-3 p-1">
            {[
              { id: 'funcAlimentazione',  label: 'Alimentazione' },
              { id: 'funcCuraAspetto',    label: "Cura dell'aspetto" },
              { id: 'funcBagno',          label: 'Bagno / doccia' },
              { id: 'funcMobilitaGen',    label: 'Mobilità generale' },
              { id: 'funcGabinetto',      label: 'Uso del gabinetto' },
              { id: 'funcCucinare',       label: 'Cucinare' },
              { id: 'funcMobilitaLetto',  label: 'Mobilità a letto' },
              { id: 'funcCasa',           label: 'Mantenimento casa' },
              { id: 'funcVestirsi',       label: 'Vestirsi' },
              { id: 'funcSpesa',          label: 'Fare la spesa' },
            ].map(item => (
              <Input key={item.id} name={item.id} label={item.label} type="number" min="0" max="4" />
            ))}
          </div>
        </div>

        <div className={DIVIDER} />

        {/* ── Esame fisico — mobilità ── */}
        <p className={SUB}>Esame fisico — mobilità</p>

        <div className="grid grid-cols-1 @md:grid-cols-2 gap-3">
          {/* Colonna sinistra */}
          <div className="space-y-3">
            <div className={BOX}>
              <Select
                name="assumedPosition"
                label="Posizione assunta"
                options={[
                  { label: 'Libera',                   value: 'Libera' },
                  { label: 'A letto con decubito',     value: 'A letto' },
                ]}
              />
              {assumedPosition === 'A letto' && (
                <Select
                  name="decubitusType"
                  label="Tipo di decubito"
                  options={[
                    { label: 'Indifferente', value: 'Indifferente' },
                    { label: 'Preferito',    value: 'Preferito' },
                    { label: 'Obbligato',    value: 'Obbligato' },
                  ]}
                />
              )}
            </div>

            <div className={BOX}>
              <Select
                name="muscleTone"
                label="Tono e trofismo muscolare"
                options={[
                  { label: 'Nella norma', value: 'Normale' },
                  { label: 'Alterazioni', value: 'Alterazioni' },
                ]}
              />
              {muscleTone === 'Alterazioni' && (
                <Input name="muscleToneAlterations" label="Sede e tipo" />
              )}
            </div>

            <div className={BOX}>
              <Select
                name="muscleStrength"
                label="Forza muscolare"
                options={[
                  { label: 'Nella norma', value: 'Normale' },
                  { label: 'Alterazioni', value: 'Alterazioni' },
                ]}
              />
              {muscleStrength === 'Alterazioni' && (
                <Input name="muscleStrengthAlterations" label="Sede, tipo e caratteristiche" />
              )}
            </div>
          </div>

          {/* Colonna destra */}
          <div className="space-y-3">
            <div className={BOX}>
              <Select
                name="jointExcursion"
                label="Escursione articolare"
                options={[
                  { label: 'Nella norma', value: 'Normale' },
                  { label: 'Alterazioni', value: 'Alterazioni' },
                ]}
              />
              {jointExcursion === 'Alterazioni' && (
                <Input name="jointExcursionAlterations" label="Sede e tipo" />
              )}
            </div>

            <div className={BOX}>
              <Select
                name="balance"
                label="Equilibrio"
                options={[
                  { label: 'Stabile',   value: 'Stabile' },
                  { label: 'Instabile', value: 'Instabile' },
                ]}
              />
            </div>

            <div className={BOX}>
              <Select
                name="walking"
                label="Deambulazione"
                options={[
                  { label: 'Nella norma', value: 'Nella norma' },
                  { label: 'Alterazioni', value: 'Alterazioni' },
                ]}
              />
              {walking === 'Alterazioni' && (
                <Input name="walkingAlterations" label="Specificare tipo di alterazione" />
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 @md:grid-cols-2 gap-3">
          <div className={BOX}>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm font-medium text-slate-700 min-w-[160px]">Protesi e / o ausili</span>
              <label className={RL}><input type="radio" value="false" {...register('prosthesis')} className={RADIO} /> No</label>
              <label className={RL}><input type="radio" value="true"  {...register('prosthesis')} className={RADIO} /> Sì</label>
            </div>
            {prosthesis === 'true' && (
              <Input name="prosthesisDetails" label="Specificare presidio e lateralità" />
            )}
          </div>

          <div className={BOX}>
            <Input name="barthelScore" label="Valutazione ADL — punteggio scala Barthel" type="number" />
          </div>
        </div>

        <Textarea name="generalAppearance" label="Aspetto generale (cura, igiene, livello di energia)" rows={2} />

        <div className={DIVIDER} />

        {/* ── Funzione respiratoria ── */}
        <p className={SUB}>Funzione respiratoria</p>

        <div className="grid grid-cols-1 @md:grid-cols-2 gap-3">
          {/* Colonna sinistra */}
          <div className="space-y-3">

            <div className={BOX}>
              <span className="text-sm font-medium text-slate-700 block">Tipo di respiro</span>
              <div className="flex gap-4">
                <label className={RL}><input type="radio" value="Autonomo"   {...register('respiratoryFunction')} className={RADIO} /> Autonomo</label>
                <label className={RL}><input type="radio" value="Supportato" {...register('respiratoryFunction')} className={RADIO} /> Supportato</label>
              </div>
              {respiratoryFunction === 'Supportato' && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <Input name="respiratoryDevice"  label="Presidio utilizzato" />
                  <Input name="respiratorySupport" label="Tipo di supporto" />
                </div>
              )}
            </div>

            <div className={BOX}>
              <div className="grid grid-cols-2 gap-3">
                <Input name="respiratoryRate" label="Frequenza respiratoria (atti/min)" />
                <Input name="spo2"            label="SpO₂ (%)" />
              </div>
              <Select
                name="breathingDepth"
                label="Profondità del respiro"
                options={[
                  { label: 'Nella norma',  value: 'Normale' },
                  { label: 'Superficiale', value: 'Superficiale' },
                  { label: 'Profondo',     value: 'Profondo' },
                ]}
              />
            </div>

            <div className={BOX}>
              <span className="text-sm font-medium text-slate-700 block">Qualità del respiro</span>
              <div className="space-y-2">
                <label className={RL}><input type="radio" value="Eupnea" {...register('breathingQuality')} className={RADIO} /> Eupnea</label>
                <div className="space-y-1">
                  <label className={RL}><input type="radio" value="Dispnea" {...register('breathingQuality')} className={RADIO} /> Dispnea</label>
                  {breathingQuality === 'Dispnea' && (
                    <div className="flex gap-4 pl-6">
                      {['sforzo', 'riposo', 'ortopnea'].map(v => (
                        <label key={v} className={RL}><input type="radio" value={v} {...register('dyspneaType')} className={RADIO} /> {v}</label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={BOX}>
              <span className="text-sm font-medium text-slate-700 block">Alterazioni del respiro</span>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {['Tachipnea', 'Bradipnea', 'Polipnea', 'Pause di apnea'].map(v => (
                  <label key={v} className={CL}>
                    <input type="checkbox" value={v} {...register('breathingAlterations')} className={CB} /> {v}
                  </label>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Input name="breathingPathological"    label="Respiro patologico (tipo)" />
                <Input name="breathingOtherAlterations" label="Altro" />
              </div>
            </div>
          </div>

          {/* Colonna destra */}
          <div className="space-y-3">

            <div className={BOX}>
              <Select
                name="respiratoryNoises"
                label="Rumori respiratori"
                options={[
                  { label: 'Assenti',  value: 'Assenti' },
                  { label: 'Presenti', value: 'Presenti' },
                ]}
              />
              {respiratoryNoises === 'Presenti' && (
                <Input name="respiratoryNoisesDetails" label="Caratteristiche" />
              )}
            </div>

            <div className={BOX}>
              <Select
                name="coughReflex"
                label="Riflesso della tosse"
                options={[
                  { label: 'Assente',  value: 'Assente' },
                  { label: 'Presente', value: 'Presente' },
                ]}
              />
            </div>

            <div className={BOX}>
              <Select
                name="cough"
                label="Tosse"
                options={[
                  { label: 'Assente',  value: 'Assente' },
                  { label: 'Presente', value: 'Presente' },
                ]}
              />
              {cough === 'Presente' && (
                <Input name="coughDetails" label="Caratteristiche" />
              )}
            </div>

            <div className={BOX}>
              <Select
                name="sputum"
                label="Espettorato"
                options={[
                  { label: 'Assente',  value: 'Assente' },
                  { label: 'Presente', value: 'Presente' },
                ]}
              />
              {sputum === 'Presente' && (
                <Input name="sputumDetails" label="Caratteristiche" />
              )}
              <Select
                name="sputumAbility"
                label="Capacità di espettorare"
                options={[
                  { label: 'Assente',  value: 'Assente' },
                  { label: 'Presente', value: 'Presente' },
                ]}
              />
            </div>

          </div>
        </div>

        <div className={DIVIDER} />

        {/* ── Funzione cardiaca e vascolare ── */}
        <p className={SUB}>Funzione cardiaca e vascolare</p>

        <div className="grid grid-cols-1 @md:grid-cols-2 gap-3">
          {/* Polso */}
          <div className={BOX}>
            <div className="grid grid-cols-2 gap-3">
              <Input name="pulseRate"     label="Frequenza polso (bpm)" type="number" />
              <Input name="pulseLocation" label="Sede di rilevazione" />
            </div>
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                {['Normale', 'Tachicardia', 'Bradicardia'].map(v => (
                  <label key={v} className={RL}><input type="radio" value={v} {...register('pulseType')} className={RADIO} /> {v}</label>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-600 w-16">Ritmo</span>
                {['Ritmico', 'Aritmico'].map(v => (
                  <label key={v} className={RL}><input type="radio" value={v} {...register('pulseRhythm')} className={RADIO} /> {v}</label>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-slate-600 w-16">Ampiezza</span>
                {['Pieno', 'Debole', 'Filiforme'].map(v => (
                  <label key={v} className={RL}><input type="radio" value={v} {...register('pulseAmplitude')} className={RADIO} /> {v}</label>
                ))}
              </div>
            </div>
          </div>

          {/* Pressione arteriosa */}
          <div className={BOX}>
            <div className="grid grid-cols-2 gap-3">
              <Input name="bloodPressureValue"    label="Pressione arteriosa (mmHg)" />
              <Input name="bloodPressureLocation" label="Sede di rilevazione" />
            </div>
            <div className="space-y-1">
              <span className="text-sm font-medium text-slate-700 block">Postura durante la rilevazione</span>
              <div className="flex gap-4">
                {['Ortostatismo', 'Clinostatismo'].map(v => (
                  <label key={v} className={CL}>
                    <input type="checkbox" value={v} {...register('bloodPressurePosture')} className={CB} /> {v}
                  </label>
                ))}
              </div>
            </div>
            <Input name="capillaryRefill" label="Refill capillare" />
          </div>
        </div>

        <div className={DIVIDER} />

        {/* ── Note + status bar ── */}
        <Textarea name="model4Notes" label="Note" rows={3} />

        <div className="flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Valutazione modello 4</span>
          <div className="flex gap-6">
            {['FUNZIONALE', 'DISFUNZIONALE'].map(v => (
              <label key={v} className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                <input type="radio" value={v} {...register('model4Status')} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" />
                {v}
              </label>
            ))}
          </div>
        </div>

      </div>
    </LockableSection>
  );
}
