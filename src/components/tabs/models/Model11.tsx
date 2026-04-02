import { useFormContext, useWatch } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { LockableSection } from '../../ui/LockableSection';

const SUB     = 'text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 mb-4';
const DIVIDER = 'border-t border-slate-200 my-5';
const BOX     = 'rounded-lg border border-slate-200 p-3 space-y-3';
const RADIO   = 'w-4 h-4 text-emerald-600 focus:ring-emerald-500';
const RL      = 'flex items-center gap-1.5 cursor-pointer text-sm text-slate-700';

export default function Model11() {
  const { register } = useFormContext();

  const religiousConflicts    = useWatch({ name: 'religiousConflicts' });
  const religiousRestrictions = useWatch({ name: 'religiousRestrictions' });
  const religiousAssistance   = useWatch({ name: 'religiousAssistance' });

  return (
    <LockableSection title="11. Valori e convinzioni (compilare se pertinente)">
      <div className="space-y-5">

        {/* ── Valori e progetto di vita ── */}
        <p className={SUB}>Valori e progetto di vita</p>
        <Textarea
          name="lifeGoalsSatisfaction"
          label="Grado di soddisfazione rispetto ai progetti di vita ritenuti più importanti e al loro raggiungimento"
          rows={3}
        />
        <Textarea
          name="meaningOfIllness"
          label="Significato attribuito alla malattia e al ricovero"
          rows={2}
        />

        <div className={DIVIDER} />

        {/* ── Religione e cultura ── */}
        <p className={SUB}>Religione e cultura</p>
        <div className="space-y-3">

          <div className={BOX}>
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-slate-700 min-w-[280px]">
                Valori / credo religiosi in conflitto con le scelte terapeutiche o assistenziali?
              </span>
              <label className={RL}><input type="radio" value="false" {...register('religiousConflicts')} className={RADIO} /> No</label>
              <label className={RL}><input type="radio" value="true"  {...register('religiousConflicts')} className={RADIO} /> Sì</label>
            </div>
            {religiousConflicts === 'true' && (
              <>
                <div className="border-t border-slate-100" />
                <Textarea name="religiousConflictsReason" label="Descrivere il conflitto" rows={2} />
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

            <div className={BOX}>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700 min-w-[180px]">Restrizioni legate a religione / cultura</span>
                <label className={RL}><input type="radio" value="false" {...register('religiousRestrictions')} className={RADIO} /> No</label>
                <label className={RL}><input type="radio" value="true"  {...register('religiousRestrictions')} className={RADIO} /> Sì</label>
              </div>
              {religiousRestrictions === 'true' && (
                <>
                  <div className="border-t border-slate-100" />
                  <Input name="religiousRestrictionsDetails" label="Specificare (es. alimentari, rituali...)" />
                </>
              )}
            </div>

            <div className={BOX}>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700 min-w-[180px]">Richiesta di assistenza religiosa</span>
                <label className={RL}><input type="radio" value="false" {...register('religiousAssistance')} className={RADIO} /> No</label>
                <label className={RL}><input type="radio" value="true"  {...register('religiousAssistance')} className={RADIO} /> Sì</label>
              </div>
              {religiousAssistance === 'true' && (
                <>
                  <div className="border-t border-slate-100" />
                  <Input name="religiousAssistanceDetails" label="Specificare" />
                </>
              )}
            </div>
          </div>
        </div>

        <div className={DIVIDER} />

        {/* ── Note ── */}
        <Textarea name="model11Notes" label="Note" rows={3} />

        {/* ── Status bar ── */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Valutazione modello 11</span>
          <div className="flex gap-6">
            {['FUNZIONALE', 'DISFUNZIONALE'].map(v => (
              <label key={v} className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                <input type="radio" value={v} {...register('model11Status')} className={RADIO} />
                {v}
              </label>
            ))}
          </div>
        </div>

      </div>
    </LockableSection>
  );
}
