import { useFormContext, useWatch } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { LockableSection } from '../../ui/LockableSection';

const SUB     = 'text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3';
const DIVIDER = 'border-t border-slate-200 my-5';
const BOX     = 'rounded-lg border border-slate-200 p-3 space-y-3';
const RADIO   = 'w-4 h-4 text-emerald-600 focus:ring-emerald-500';
const CB      = 'w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500';
const RL      = 'flex items-center gap-1.5 cursor-pointer text-sm text-slate-700';

export default function Model6() {
  const { register } = useFormContext();

  const orientation    = useWatch({ name: 'orientation' });
  const collaboration  = useWatch({ name: 'collaboration' });
  const speech         = useWatch({ name: 'speech' });
  const attitude       = useWatch({ name: 'attitude' });
  const memory         = useWatch({ name: 'memory' });
  const concentration  = useWatch({ name: 'concentration' });
  const vision         = useWatch({ name: 'vision' });
  const hearing        = useWatch({ name: 'hearing' });
  const pain           = useWatch({ name: 'pain' });

  return (
    <LockableSection title="6. Cognitivo e percettivo">
      <div className="space-y-5">

        {/* ── Stato di coscienza ── */}
        <p className={SUB}>Stato di coscienza</p>
        <div className={BOX}>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {['Vigile', 'Confuso', 'Soporoso', 'Stuporoso', 'Coma'].map(v => (
              <label key={v} className={RL}>
                <input type="radio" value={v} {...register('consciousness')} className={RADIO} /> {v}
              </label>
            ))}
          </div>
          <div className="border-t border-slate-100" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input name="avpuScore" label="Scala AVPU" placeholder="es. A, V, P, U" />
            <Input name="gcsScore"  label="GCS (se applicabile)" placeholder="es. 15" type="number" />
            <Input name="rassScore" label="RASS (se applicabile)" placeholder="es. 0" />
          </div>
          <div className="border-t border-slate-100" />
          <div>
            <p className="text-sm font-medium text-slate-700 mb-2">Altre valutazioni</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {['Agitato', 'Sedato'].map(v => (
                <label key={v} className={RL}>
                  <input type="checkbox" value={v} {...register('otherNeurologicalEvaluations')} className={CB} /> {v}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className={DIVIDER} />

        {/* ── Orientamento e collaborazione ── */}
        <p className={SUB}>Orientamento e collaborazione</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Orientato nel tempo / spazio / sul sé</p>
            <div className="flex gap-5">
              <label className={RL}><input type="radio" value="true"  {...register('orientation')} className={RADIO} /> Sì</label>
              <label className={RL}><input type="radio" value="false" {...register('orientation')} className={RADIO} /> No</label>
            </div>
            {orientation === 'false' && (
              <>
                <div className="border-t border-slate-100" />
                <div>
                  <p className="text-xs text-slate-500 mb-2">Disorientato rispetto a:</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {['Tempo', 'Spazio', 'Sul sé'].map(v => (
                      <label key={v} className={RL}>
                        <input type="checkbox" value={v} {...register('disorientationTypes')} className={CB} /> {v}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex gap-5">
                  <label className={RL}><input type="radio" value="Temporaneo"  {...register('disorientationDuration')} className={RADIO} /> Temporaneo</label>
                  <label className={RL}><input type="radio" value="Permanente"  {...register('disorientationDuration')} className={RADIO} /> Permanente</label>
                </div>
              </>
            )}
          </div>

          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Collaborazione</p>
            <div className="space-y-2">
              {['Collaborante con tutti', 'Collaborante solo con familiari', 'Parzialmente collaborante', 'Non collaborante'].map(v => (
                <label key={v} className={RL}>
                  <input type="radio" value={v} {...register('collaboration')} className={RADIO} /> {v}
                </label>
              ))}
              <label className={RL}>
                <input type="radio" value="Altro" {...register('collaboration')} className={RADIO} /> Altro
              </label>
            </div>
            {collaboration && collaboration !== 'Non collaborante' && (
              <>
                <div className="border-t border-slate-100" />
                <Input name="collaborationDetails" label="Specificare" />
              </>
            )}
          </div>
        </div>

        <div className={DIVIDER} />

        {/* ── Linguaggio ── */}
        <p className={SUB}>Linguaggio</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Eloquio</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {['Normale', 'Disartria', 'Afasia'].map(v => (
                <label key={v} className={RL}>
                  <input type="radio" value={v} {...register('speech')} className={RADIO} /> {v}
                </label>
              ))}
            </div>
            {speech === 'Afasia' && (
              <>
                <div className="border-t border-slate-100" />
                <Input name="aphasiaType" label="Tipo di afasia" />
              </>
            )}
          </div>

          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Comprensione</p>
            <div className="space-y-2">
              {['Buona', 'Parzialmente compromessa', 'Totalmente compromessa'].map(v => (
                <label key={v} className={RL}>
                  <input type="radio" value={v} {...register('comprehension')} className={RADIO} /> {v}
                </label>
              ))}
            </div>
          </div>

          <div className={`${BOX} md:col-span-2`}>
            <p className="text-sm font-medium text-slate-700">Atteggiamento al colloquio</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {['Disponibile', 'Interessato', 'Taciturno', 'Indifferente', 'Aggressivo', 'Altro'].map(v => (
                <label key={v} className={RL}>
                  <input type="checkbox" value={v} {...register('attitude')} className={CB} /> {v}
                </label>
              ))}
            </div>
            {(attitude as string[] | undefined)?.includes('Altro') && (
              <>
                <div className="border-t border-slate-100" />
                <Input name="attitudeOther" label="Specificare" />
              </>
            )}
          </div>
        </div>

        <div className={DIVIDER} />

        {/* ── Abilità cognitive ── */}
        <p className={SUB}>Abilità cognitive</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Memoria</p>
            <div className="flex gap-5">
              <label className={RL}><input type="radio" value="Normale"  {...register('memory')} className={RADIO} /> Normale</label>
              <label className={RL}><input type="radio" value="Alterata" {...register('memory')} className={RADIO} /> Alterata</label>
            </div>
            {memory === 'Alterata' && (
              <>
                <div className="border-t border-slate-100" />
                <Input name="memoryAlterationDetails" label="Specificare" />
              </>
            )}
          </div>

          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Concentrazione</p>
            <div className="flex gap-5">
              <label className={RL}><input type="radio" value="Normale"  {...register('concentration')} className={RADIO} /> Normale</label>
              <label className={RL}><input type="radio" value="Alterata" {...register('concentration')} className={RADIO} /> Alterata</label>
            </div>
            {concentration === 'Alterata' && (
              <>
                <div className="border-t border-slate-100" />
                <Input name="concentrationAlterationDetails" label="Specificare" />
              </>
            )}
          </div>
        </div>

        <div className={DIVIDER} />

        {/* ── Sensi ── */}
        <p className={SUB}>Sensi</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Vista</p>
            <div className="flex gap-5">
              <label className={RL}><input type="radio" value="Normale"     {...register('vision')} className={RADIO} /> Normale</label>
              <label className={RL}><input type="radio" value="Alterazioni" {...register('vision')} className={RADIO} /> Alterazioni</label>
            </div>
            {vision === 'Alterazioni' && (
              <>
                <div className="border-t border-slate-100" />
                <Input name="visionAlterationDetails" label="Specificare" />
              </>
            )}
            <div className="border-t border-slate-100" />
            <div className="flex gap-5">
              <label className={RL}><input type="checkbox" {...register('visionGlasses')}      className={CB} /> Occhiali</label>
              <label className={RL}><input type="checkbox" {...register('visionContactLenses')} className={CB} /> Lenti a contatto</label>
            </div>
          </div>

          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Udito</p>
            <div className="flex gap-5">
              <label className={RL}><input type="radio" value="Normale"     {...register('hearing')} className={RADIO} /> Normale</label>
              <label className={RL}><input type="radio" value="Alterazioni" {...register('hearing')} className={RADIO} /> Alterazioni</label>
            </div>
            {hearing === 'Alterazioni' && (
              <>
                <div className="border-t border-slate-100" />
                <Input name="hearingAlterationDetails" label="Specificare" />
              </>
            )}
            <div className="border-t border-slate-100" />
            <label className={RL}><input type="checkbox" {...register('hearingAid')} className={CB} /> Protesi acustica</label>
          </div>
        </div>

        <div className={DIVIDER} />

        {/* ── Dolore ── */}
        <p className={SUB}>Dolore</p>
        <div className={BOX}>
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium text-slate-700 min-w-[200px]">Il paziente riferisce dolore?</span>
            <label className={RL}><input type="radio" value="false" {...register('pain')} className={RADIO} /> No</label>
            <label className={RL}><input type="radio" value="true"  {...register('pain')} className={RADIO} /> Sì</label>
          </div>
          {pain === 'true' && (
            <>
              <div className="border-t border-slate-100" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input name="painLocation" label="Sede" />
                <Input name="painTime"     label="Comparsa e durata" />
                <Input name="painQuality"  label="Qualità / carattere" placeholder="es. urente, costrittivo" />
                <Input name="painFactors"  label="Fattori aggravanti / allevianti" />
                <Input name="painNrs"      label="Intensità NRS (0–10)" type="number" placeholder="0–10" />
                <Textarea name="painTreatment" label="Trattamento in corso (farmacologico / non farmacologico)" rows={2} />
              </div>
            </>
          )}
        </div>

        <div className={DIVIDER} />

        {/* ── Note ── */}
        <Textarea name="model6Notes" label="Note" rows={3} />

        {/* ── Status bar ── */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Valutazione modello 6</span>
          <div className="flex gap-6">
            {['FUNZIONALE', 'DISFUNZIONALE'].map(v => (
              <label key={v} className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                <input type="radio" value={v} {...register('model6Status')} className={RADIO} />
                {v}
              </label>
            ))}
          </div>
        </div>

      </div>
    </LockableSection>
  );
}
