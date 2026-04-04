import { useFormContext } from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { LockableSection } from '../../ui/LockableSection';

const SUB     = 'text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 mb-4';
const DIVIDER = 'border-t border-slate-200 my-5';
const BOX     = 'rounded-lg border border-slate-200 p-3 space-y-3';
const RADIO   = 'w-4 h-4 text-emerald-600 focus:ring-emerald-500';
const RL      = 'flex items-center gap-1.5 cursor-pointer text-sm text-slate-700';

export default function Model5() {
  const { register } = useFormContext();

  const sleepRested        = useWatch({ name: 'sleepRested' });
  const sleepFallAsleep    = useWatch({ name: 'sleepFallAsleep' });
  const sleepMaintain      = useWatch({ name: 'sleepMaintain' });
  const sleepMeds          = useWatch({ name: 'sleepMeds' });
  const sleepAids          = useWatch({ name: 'sleepAids' });

  return (
    <LockableSection title="5. Riposo e sonno">
      <div className="space-y-5">

        {/* ── Dati soggettivi ── */}
        <p className={SUB}>Dati soggettivi</p>
        <div className="space-y-3">

          <div className={BOX}>
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-slate-700 min-w-[220px]">Si sente riposato al risveglio?</span>
              <label className={RL}><input type="radio" value="true"  {...register('sleepRested')} className={RADIO} /> Sì</label>
              <label className={RL}><input type="radio" value="false" {...register('sleepRested')} className={RADIO} /> No</label>
            </div>
            {sleepRested === 'false' && (
              <>
                <div className="border-t border-slate-100" />
                <Textarea name="sleepRestedNotes" label="Descrizione" rows={2} />
              </>
            )}
          </div>

          <div className={BOX}>
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-slate-700 min-w-[220px]">Difficoltà ad addormentarsi?</span>
              <label className={RL}><input type="radio" value="false" {...register('sleepFallAsleep')} className={RADIO} /> No</label>
              <label className={RL}><input type="radio" value="true"  {...register('sleepFallAsleep')} className={RADIO} /> Sì</label>
            </div>
            {sleepFallAsleep === 'true' && (
              <>
                <div className="border-t border-slate-100" />
                <Textarea name="sleepFallAsleepNotes" label="Descrizione" rows={2} />
              </>
            )}
          </div>

          <div className={BOX}>
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-slate-700 min-w-[220px]">Difficoltà a mantenere il sonno?</span>
              <label className={RL}><input type="radio" value="false" {...register('sleepMaintain')} className={RADIO} /> No</label>
              <label className={RL}><input type="radio" value="true"  {...register('sleepMaintain')} className={RADIO} /> Sì</label>
            </div>
            {sleepMaintain === 'true' && (
              <>
                <div className="border-t border-slate-100" />
                <Textarea name="sleepMaintainNotes" label="Descrizione" rows={2} />
              </>
            )}
          </div>

          <div className="grid grid-cols-1 @md:grid-cols-2 gap-3">
            <Input name="sleepHours"    label="Ore di sonno per notte (abituale)" type="number" placeholder="es. 7" />
            <Input name="sleepBedtime"  label="Orario abituale di addormentamento" placeholder="es. 23:00" />
          </div>

          <Textarea name="sleepHabits" label="Abitudini legate al sonno (rituali, ambiente, lettura...)" rows={2} />
        </div>

        <div className={DIVIDER} />

        {/* ── Farmaci e presidi ── */}
        <p className={SUB}>Farmaci e presidi per il sonno</p>
        <div className="space-y-3">

          <div className={BOX}>
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-slate-700 min-w-[220px]">Farmaci per favorire il sonno?</span>
              <label className={RL}><input type="radio" value="false" {...register('sleepMeds')} className={RADIO} /> No</label>
              <label className={RL}><input type="radio" value="true"  {...register('sleepMeds')} className={RADIO} /> Sì</label>
            </div>
            {sleepMeds === 'true' && (
              <>
                <div className="border-t border-slate-100" />
                <Input name="sleepMedsDetails" label="Farmaco, tipologia e dosaggio" />
              </>
            )}
          </div>

          <div className={BOX}>
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-slate-700 min-w-[220px]">Altri presidi / rimedi?</span>
              <label className={RL}><input type="radio" value="false" {...register('sleepAids')} className={RADIO} /> No</label>
              <label className={RL}><input type="radio" value="true"  {...register('sleepAids')} className={RADIO} /> Sì</label>
            </div>
            {sleepAids === 'true' && (
              <>
                <div className="border-t border-slate-100" />
                <Input name="sleepAidsDetails" label="Specificare (es. tisane, mascherina, tappi)" />
              </>
            )}
          </div>
        </div>

        <div className={DIVIDER} />

        {/* ── Osservazione infermieristica ── */}
        <p className={SUB}>Osservazione infermieristica</p>
        <Textarea name="sleepObservation" label="Osservazioni sul modello del sonno durante il ricovero" rows={3} />

        <div className={DIVIDER} />

        {/* ── Note ── */}
        <Textarea name="model5Notes" label="Note" rows={3} />

        {/* ── Status bar ── */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Valutazione modello 5</span>
          <div className="flex gap-6">
            {['FUNZIONALE', 'DISFUNZIONALE'].map(v => (
              <label key={v} className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                <input type="radio" value={v} {...register('model5Status')} className={RADIO} />
                {v}
              </label>
            ))}
          </div>
        </div>

      </div>
    </LockableSection>
  );
}
