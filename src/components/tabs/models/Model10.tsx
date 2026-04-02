import { useFormContext, useWatch } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { LockableSection } from '../../ui/LockableSection';

const SUB     = 'text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 mb-4';
const DIVIDER = 'border-t border-slate-200 my-5';
const BOX     = 'rounded-lg border border-slate-200 p-3 space-y-3';
const RADIO   = 'w-4 h-4 text-emerald-600 focus:ring-emerald-500';
const CB      = 'w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500';
const RL      = 'flex items-center gap-1.5 cursor-pointer text-sm text-slate-700';

export default function Model10() {
  const { register } = useFormContext();

  const lifeChanges        = useWatch({ name: 'lifeChanges' });
  const copingStrategies10Raw = useWatch({ name: 'copingStrategies10' });
  const copingStrategies10 = Array.isArray(copingStrategies10Raw) ? copingStrategies10Raw : [];

  return (
    <LockableSection title="10. Coping e tolleranza allo stress">
      <div className="space-y-5">

        {/* ── Agenti stressanti ── */}
        <p className={SUB}>Agenti stressanti</p>
        <div className="space-y-3">

          <div className={BOX}>
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-slate-700 min-w-[280px]">Cambiamenti importanti nella vita nell'ultimo anno?</span>
              <label className={RL}><input type="radio" value="false" {...register('lifeChanges')} className={RADIO} /> No</label>
              <label className={RL}><input type="radio" value="true"  {...register('lifeChanges')} className={RADIO} /> Sì</label>
            </div>
            {lifeChanges === 'true' && (
              <>
                <div className="border-t border-slate-100" />
                <Textarea name="lifeChangesDetails" label="Descrivere" rows={2} />
              </>
            )}
          </div>

          <Textarea
            name="healthConcerns"
            label="Preoccupazioni inerenti la propria salute o il ricovero"
            rows={2}
          />

          <Textarea
            name="stressors"
            label="Altre situazioni vissute come stressanti (familiari, economiche, lavorative, relazionali...)"
            rows={3}
          />
        </div>

        <div className={DIVIDER} />

        {/* ── Strategie di coping ── */}
        <p className={SUB}>Strategie di coping</p>
        <div className="space-y-3">

          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Strategie abituali per affrontare lo stress</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {['Dialogo / confronto', 'Attività fisica', 'Hobby / attività creative', 'Preghiera / spiritualità', 'Isolamento', 'Altro'].map(v => (
                <label key={v} className={RL}>
                  <input type="checkbox" value={v} {...register('copingStrategies10')} className={CB} /> {v}
                </label>
              ))}
            </div>
            {copingStrategies10.includes('Altro') && (
              <>
                <div className="border-t border-slate-100" />
                <Input name="copingStrategies10Other" label="Specificare" />
              </>
            )}
          </div>

          <Textarea
            name="copingBehaviors"
            label="Azioni concrete messe in atto di fronte agli agenti stressanti"
            rows={2}
          />

          <Input
            name="copingReferencePersons"
            label="Persone di riferimento in grado di aiutare"
            placeholder="es. coniuge, figlio, amico di fiducia"
          />
        </div>

        <div className={DIVIDER} />

        {/* ── Note ── */}
        <Textarea name="model10Notes" label="Note" rows={3} />

        {/* ── Status bar ── */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Valutazione modello 10</span>
          <div className="flex gap-6">
            {['FUNZIONALE', 'DISFUNZIONALE'].map(v => (
              <label key={v} className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                <input type="radio" value={v} {...register('model10Status')} className={RADIO} />
                {v}
              </label>
            ))}
          </div>
        </div>

      </div>
    </LockableSection>
  );
}
