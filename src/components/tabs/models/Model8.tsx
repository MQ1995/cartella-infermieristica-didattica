import { useFormContext, useWatch } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Select } from '../../ui/Select';
import { LockableSection } from '../../ui/LockableSection';

const SUB     = 'text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 mb-4';
const DIVIDER = 'border-t border-slate-200 my-5';
const BOX     = 'rounded-lg border border-slate-200 p-3 space-y-3';
const RADIO   = 'w-4 h-4 text-emerald-600 focus:ring-emerald-500';
const CB      = 'w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500';
const RL      = 'flex items-center gap-1.5 cursor-pointer text-sm text-slate-700';

export default function Model8() {
  const { register } = useFormContext();

  const occupationalRole = useWatch({ name: 'occupationalRole' });
  const livingSituation  = useWatch({ name: 'livingSituation' });
  const supportSystem    = useWatch({ name: 'supportSystem' }) as string[] | undefined ?? [];

  return (
    <LockableSection title="8. Ruoli e relazioni">
      <div className="space-y-5">

        {/* ── Dati anagrafici e sociali ── */}
        <p className={SUB}>Dati sociali</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Select
            name="educationLevel"
            label="Livello di scolarità"
            options={[
              { label: 'Nessun titolo',              value: 'Nessuno' },
              { label: 'Licenza elementare',         value: 'Elementare' },
              { label: 'Licenza media',               value: 'Media' },
              { label: 'Diploma superiore',           value: 'Diploma' },
              { label: 'Laurea / post-laurea',        value: 'Laurea' },
            ]}
          />
          <Input name="nationality2" label="Nazionalità / provenienza culturale" placeholder="es. Italiana" />
        </div>

        <div className={DIVIDER} />

        {/* ── Ruolo professionale ── */}
        <p className={SUB}>Ruolo professionale</p>
        <div className={BOX}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
            {['Occupato/a', 'Pensionato/a', 'Casalingo/a', 'Disoccupato/a', 'Studente'].map(v => (
              <label key={v} className={RL}>
                <input type="radio" value={v} {...register('occupationalRole')} className={RADIO} /> {v}
              </label>
            ))}
          </div>
          {occupationalRole && occupationalRole !== 'Casalingo/a' && (
            <>
              <div className="border-t border-slate-100" />
              <Input
                name="occupationalDetails"
                label={
                  occupationalRole === 'Occupato/a'    ? 'Tipo di attività' :
                  occupationalRole === 'Pensionato/a'  ? 'Occupazione precedente' :
                  occupationalRole === 'Disoccupato/a' ? 'Occupazione precedente / desiderata' :
                  'Iscritto/a a'
                }
              />
            </>
          )}
        </div>

        <div className={DIVIDER} />

        {/* ── Situazione abitativa ── */}
        <p className={SUB}>Situazione abitativa e familiare</p>
        <div className="space-y-3">

          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Vive:</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {['Da solo/a', 'In famiglia', 'In struttura'].map(v => (
                <label key={v} className={RL}>
                  <input type="radio" value={v} {...register('livingSituation')} className={RADIO} /> {v}
                </label>
              ))}
              <label className={RL}>
                <input type="radio" value="Altro" {...register('livingSituation')} className={RADIO} /> Altro
              </label>
            </div>
            {livingSituation === 'Altro' && (
              <>
                <div className="border-t border-slate-100" />
                <Input name="livingSituationOther" label="Specificare" />
              </>
            )}
          </div>

          <Textarea name="familyStructure"         label="Struttura familiare e ruolo (coniuge, figli, conviventi...)" rows={2} />
          <Textarea name="significantRelationships" label="Relazioni significative extra-familiari (amici, gruppi sociali...)" rows={2} />
        </div>

        <div className={DIVIDER} />

        {/* ── Sistema di supporto ── */}
        <p className={SUB}>Sistema di supporto</p>
        <div className={BOX}>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {['Coniuge / partner', 'Figli', 'Parenti', 'Amici', 'Nessuno'].map(v => (
              <label key={v} className={RL}>
                <input type="checkbox" value={v} {...register('supportSystem')} className={CB} /> {v}
              </label>
            ))}
            <label className={RL}>
              <input type="checkbox" value="Altra persona" {...register('supportSystem')} className={CB} /> Altra persona
            </label>
          </div>
          {supportSystem.includes('Altra persona') && (
            <>
              <div className="border-t border-slate-100" />
              <Input name="supportSystemOther" label="Specificare" />
            </>
          )}
        </div>

        <div className={DIVIDER} />

        {/* ── Impatto della malattia sui ruoli ── */}
        <p className={SUB}>Impatto della malattia</p>
        <Textarea
          name="illnessRoleImpact"
          label="Come la malattia ha influenzato i ruoli familiari, lavorativi e sociali?"
          rows={3}
        />

        <div className={DIVIDER} />

        {/* ── Note ── */}
        <Textarea name="model8Notes" label="Note" rows={3} />

        {/* ── Status bar ── */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Valutazione modello 8</span>
          <div className="flex gap-6">
            {['FUNZIONALE', 'DISFUNZIONALE'].map(v => (
              <label key={v} className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                <input type="radio" value={v} {...register('model8Status')} className={RADIO} />
                {v}
              </label>
            ))}
          </div>
        </div>

      </div>
    </LockableSection>
  );
}
