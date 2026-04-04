import { useFormContext, useWatch } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Textarea } from '../../ui/Textarea';
import { LockableSection } from '../../ui/LockableSection';

const SUB     = 'text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 mb-4';
const DIVIDER = 'border-t border-slate-200 my-5';
const RADIO   = 'w-4 h-4 text-emerald-600 focus:ring-emerald-500';
const RL      = 'flex items-center gap-1.5 cursor-pointer text-sm text-slate-700'; // radio label
const CL      = 'flex items-center gap-2 cursor-pointer text-sm text-slate-700';   // checkbox label
const CB      = 'w-4 h-4 text-emerald-600 focus:ring-emerald-500 rounded border-slate-300';

// Inline sì/no with conditional detail — repeated pattern
function YesNoRow({ label, name, register }: { label: string; name: string; register: ReturnType<typeof useFormContext>['register'] }) {
  return (
    <div className="flex items-center gap-4 flex-wrap">
      <span className="text-sm font-medium text-slate-700 min-w-[180px]">{label}</span>
      <label className={RL}><input type="radio" value="false" {...register(name)} className={RADIO} /> No</label>
      <label className={RL}><input type="radio" value="true"  {...register(name)} className={RADIO} /> Sì</label>
    </div>
  );
}

export default function Model3() {
  const { register } = useFormContext();

  const urinationType           = useWatch({ name: 'urinationType' });
  const urinaryRetention        = useWatch({ name: 'urinaryRetention' });
  const urineCharacteristics    = useWatch({ name: 'urineCharacteristics' });
  const incontinenceAids        = useWatch({ name: 'incontinenceAids' });
  const urinaryCatheter         = useWatch({ name: 'urinaryCatheter' });
  const urinaryCatheterMgmt     = useWatch({ name: 'urinaryCatheterManagement' });
  const urinaryStoma            = useWatch({ name: 'urinaryStoma' });
  const urinaryStomaMgmt        = useWatch({ name: 'urinaryStomaManagement' });

  const bowelAlterations        = useWatch({ name: 'bowelAlterations' });
  const bowelAlterationsTypesRaw   = useWatch({ name: 'bowelAlterationsTypes' });
  const bowelAlterationsTypes      = Array.isArray(bowelAlterationsTypesRaw) ? bowelAlterationsTypesRaw : [];
  const otherUrinaryAlterationsRaw = useWatch({ name: 'otherUrinaryAlterations' });
  const otherUrinaryAlterations    = Array.isArray(otherUrinaryAlterationsRaw) ? otherUrinaryAlterationsRaw : [];
  const stoolCharacteristics    = useWatch({ name: 'stoolCharacteristics' });
  const peristalsis             = useWatch({ name: 'peristalsis' });
  const bowelIncontinenceAids   = useWatch({ name: 'bowelIncontinenceAids' });
  const laxatives               = useWatch({ name: 'laxatives' });
  const bowelStoma              = useWatch({ name: 'bowelStoma' });
  const bowelStomaMgmt          = useWatch({ name: 'bowelStomaManagement' });
  const drains                  = useWatch({ name: 'drains' });

  return (
    <LockableSection title="3. Eliminazione">
      <div className="space-y-5">

        {/* ══ ELIMINAZIONE URINARIA ══ */}
        <p className={SUB}>Eliminazione urinaria</p>

        <div className="grid grid-cols-1 @md:grid-cols-2 gap-3">
          <div className="rounded-lg border border-slate-200 p-3 space-y-3">
            <Select
              name="urinationType"
              label="Minzione"
              options={[
                { label: 'Spontanea / controllata', value: 'Spontanea' },
                { label: 'Con alterazioni riferite', value: 'Alterazioni' },
              ]}
            />
            {urinationType === 'Spontanea' && (
              <Input name="urinationFrequency" label="Numero minzioni/die" type="number" />
            )}
          </div>

          <div className="rounded-lg border border-slate-200 p-3 space-y-3">
            <Input name="diuresis24h" label="Diuresi 24 h (ml)" type="number" />
            <div className="space-y-1">
              <span className="text-sm font-medium text-slate-700 block">Alterazione diuresi</span>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1">
                {['Nessuna', 'Oliguria', 'Anuria', 'Poliuria'].map(v => (
                  <label key={v} className={RL}><input type="radio" value={v} {...register('diuresisAlteration')} className={RADIO} /> {v}</label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Alterazioni urinarie */}
        {urinationType === 'Alterazioni' && (
          <div className="rounded-lg border border-slate-200 p-4 space-y-4">
            <div className="grid grid-cols-1 @md:grid-cols-3 gap-6">
              {/* Incontinenza */}
              <div className="space-y-1.5">
                <span className="text-sm font-semibold text-slate-600 block">Incontinenza urinaria</span>
                {['Diurna', 'Enuresi', 'Occasionale', 'Da stress', 'Da urgenza', 'Riflessa', 'Funzionale', 'Totale'].map(v => (
                  <label key={v} className={CL}>
                    <input type="checkbox" value={v} {...register('urinaryIncontinenceTypes')} className={CB} /> {v}
                  </label>
                ))}
              </div>

              {/* Ritenzione */}
              <div className="space-y-1.5">
                <span className="text-sm font-semibold text-slate-600 block">Ritenzione urinaria</span>
                <label className={RL}><input type="radio" value="Cronica" {...register('urinaryRetention')} className={RADIO} /> Cronica</label>
                <label className={RL}><input type="radio" value="Acuta"   {...register('urinaryRetention')} className={RADIO} /> Acuta</label>
                {urinaryRetention === 'Acuta' && (
                  <Input name="urinaryRetentionResidue" label="Residuo post-minzionale" />
                )}
              </div>

              {/* Altre alterazioni */}
              <div className="space-y-1.5">
                <span className="text-sm font-semibold text-slate-600 block">Altre alterazioni</span>
                {['Disuria', 'Stranguria', 'Nicturia', 'Tenesmo'].map(v => (
                  <label key={v} className={CL}>
                    <input type="checkbox" value={v} {...register('otherUrinaryAlterations')} className={CB} /> {v}
                  </label>
                ))}
                <label className={CL}>
                  <input type="checkbox" value="Pollachiuria" {...register('otherUrinaryAlterations')} className={CB} /> Pollachiuria
                </label>
                {Array.isArray(otherUrinaryAlterations) && otherUrinaryAlterations.includes('Pollachiuria') && (
                  <Input name="pollakiuriaFrequency" label="N. minzioni/die" />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Caratteristiche urine */}
        <div className="rounded-lg border border-slate-200 p-3 space-y-3">
          <Select
            name="urineCharacteristics"
            label="Caratteristiche delle urine"
            options={[
              { label: 'Nella norma',  value: 'Normali' },
              { label: 'Alterazioni',  value: 'Alterazioni' },
            ]}
          />
          {urineCharacteristics === 'Alterazioni' && (
            <Textarea name="urineAlterationsDescription" label="Descrivere le alterazioni" rows={2} />
          )}
        </div>

        {/* Presidi urinari */}
        <div className="space-y-3">
          {/* Presidi incontinenza */}
          <div className="rounded-lg border border-slate-200 p-3 space-y-2">
            <YesNoRow label="Presidi per incontinenza" name="incontinenceAids" register={register} />
            {incontinenceAids === 'true' && <Input name="incontinenceAidsDetails" label="Specificare presidio" />}
          </div>

          {/* Catetere vescicale */}
          <div className="rounded-lg border border-slate-200 p-3 space-y-2">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-sm font-medium text-slate-700 min-w-[180px]">Catetere vescicale</span>
              {['No', 'A permanenza', 'A intermittenza'].map(v => (
                <label key={v} className={RL}><input type="radio" value={v} {...register('urinaryCatheter')} className={RADIO} /> {v}</label>
              ))}
            </div>
            {urinaryCatheter && urinaryCatheter !== 'No' && (
              <div className="grid grid-cols-1 @md:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                <Input name="urinaryCatheterDate"    label="Data posizionamento" type="date" />
                <Input name="urinaryCatheterDetails" label="Tipo, calibro, materiale" />
                <div className="space-y-2">
                  <Select name="urinaryCatheterManagement" label="Autogestione"
                    options={[{ label: 'Sì', value: 'Si' }, { label: 'No', value: 'No' }]} />
                  {urinaryCatheterMgmt === 'No' && <Input name="urinaryCatheterManagedBy" label="Gestita da" />}
                </div>
              </div>
            )}
          </div>

          {/* Stomia urinaria */}
          <div className="rounded-lg border border-slate-200 p-3 space-y-2">
            <YesNoRow label="Stomia urinaria" name="urinaryStoma" register={register} />
            {urinaryStoma === 'true' && (
              <div className="grid grid-cols-1 @md:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                <Input name="urinaryStomaDetails" label="Tipo e sede" />
                <Select name="urinaryStomaManagement" label="Autogestione"
                  options={[{ label: 'Sì', value: 'Si' }, { label: 'No', value: 'No' }]} />
                {urinaryStomaMgmt === 'No' && <Input name="urinaryStomaManagedBy" label="Gestita da" />}
              </div>
            )}
          </div>
        </div>

        <div className={DIVIDER} />

        {/* ══ ELIMINAZIONE INTESTINALE ══ */}
        <p className={SUB}>Eliminazione intestinale</p>

        <div className="rounded-lg border border-slate-200 p-3">
          <div className="grid grid-cols-1 @md:grid-cols-2 gap-3">
            <Input name="bowelFrequency"    label="Frequenza abituale" placeholder="es. 1 volta/die" />
            <Input name="lastBowelMovement" label="Data ultima evacuazione" type="date" />
          </div>
        </div>

        {/* Alterazioni intestinali */}
        <div className="rounded-lg border border-slate-200 p-3 space-y-2">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-700 min-w-[180px]">Alterazioni dell'alvo</span>
            <label className={RL}><input type="radio" value="false" {...register('bowelAlterations')} className={RADIO} /> No</label>
            <label className={RL}><input type="radio" value="true"  {...register('bowelAlterations')} className={RADIO} /> Sì</label>
          </div>
          {bowelAlterations === 'true' && (
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 border-t border-slate-100">
              {['Stipsi', 'Diarrea'].map(v => (
                <label key={v} className={CL}>
                  <input type="checkbox" value={v} {...register('bowelAlterationsTypes')} className={CB} /> {v}
                </label>
              ))}
              <div className="space-y-1">
                <label className={CL}>
                  <input type="checkbox" value="Incontinenza" {...register('bowelAlterationsTypes')} className={CB} /> Incontinenza
                </label>
                {Array.isArray(bowelAlterationsTypes) && bowelAlterationsTypes.includes('Incontinenza') && (
                  <div className="flex gap-4 pl-6">
                    <label className={RL}><input type="radio" value="Occasionale" {...register('bowelIncontinenceType')} className={RADIO} /> Occasionale</label>
                    <label className={RL}><input type="radio" value="Cronica"     {...register('bowelIncontinenceType')} className={RADIO} /> Cronica</label>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Caratteristiche feci */}
        <div className="rounded-lg border border-slate-200 p-3 space-y-3">
          <div className="grid grid-cols-1 @md:grid-cols-2 gap-3">
            <div className="space-y-3">
              <Select
                name="stoolCharacteristics"
                label="Caratteristiche delle feci"
                options={[
                  { label: 'Nella norma', value: 'Normali' },
                  { label: 'Alterazioni', value: 'Alterazioni' },
                ]}
              />
              {stoolCharacteristics === 'Alterazioni' && (
                <Input name="stoolAlterationsDetails" label="Descrivere le alterazioni" />
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input name="bristolScale" label="Scala Bristol (tipo)" />
              <Input name="romaIIIScale" label="Scala Roma III" />
            </div>
          </div>
        </div>

        {/* Esame addome */}
        <div className="rounded-lg border border-slate-200 p-3 space-y-3">
          <span className="text-sm font-semibold text-slate-600 block">Esame fisico addome</span>
          <div className="grid grid-cols-1 @md:grid-cols-2 gap-4">
            <Select
              name="abdomenExam"
              label="Addome"
              options={[
                { label: 'Trattabile', value: 'Trattabile' },
                { label: 'Globoso',    value: 'Globoso' },
              ]}
            />
            <div className="space-y-2">
              <span className="text-sm font-medium text-slate-700 block">Peristalsi</span>
              <div className="flex gap-4">
                <label className={RL}><input type="radio" value="Assente"  {...register('peristalsis')} className={RADIO} /> Assente</label>
                <label className={RL}><input type="radio" value="Presente" {...register('peristalsis')} className={RADIO} /> Presente</label>
              </div>
              {peristalsis === 'Presente' && (
                <div className="flex gap-4 pl-4">
                  {['Ipoattiva', 'Fisiologica', 'Iperattiva'].map(v => (
                    <label key={v} className={RL}><input type="radio" value={v} {...register('peristalsisType')} className={RADIO} /> {v}</label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Presidi intestinali */}
        <div className="space-y-3">
          {/* Presidi incontinenza intestinale */}
          <div className="rounded-lg border border-slate-200 p-3 space-y-2">
            <YesNoRow label="Presidi per incontinenza" name="bowelIncontinenceAids" register={register} />
            {bowelIncontinenceAids === 'true' && <Input name="bowelIncontinenceAidsDetails" label="Specificare presidio" />}
          </div>

          {/* Lassativi */}
          <div className="rounded-lg border border-slate-200 p-3 space-y-2">
            <YesNoRow label="Utilizzo di lassativi" name="laxatives" register={register} />
            {laxatives === 'true' && <Input name="laxativesDetails" label="Tipo e frequenza di assunzione" />}
          </div>

          {/* Stomia intestinale */}
          <div className="rounded-lg border border-slate-200 p-3 space-y-2">
            <YesNoRow label="Stomia intestinale" name="bowelStoma" register={register} />
            {bowelStoma === 'true' && (
              <div className="grid grid-cols-1 @md:grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                <Input name="bowelStomaDetails" label="Tipo e sede" />
                <Select name="bowelStomaManagement" label="Autogestione"
                  options={[{ label: 'Sì', value: 'Si' }, { label: 'No', value: 'No' }]} />
                {bowelStomaMgmt === 'No' && <Input name="bowelStomaManagedBy" label="Gestita da" />}
              </div>
            )}
          </div>

          {/* Drenaggi */}
          <div className="rounded-lg border border-slate-200 p-3 space-y-2">
            <YesNoRow label="Drenaggi" name="drains" register={register} />
            {drains === 'true' && <Input name="drainsDetails" label="Sede, tipo e sistema di raccolta" />}
          </div>
        </div>

        <Textarea name="eliminationOtherObservations" label="Altre osservazioni" rows={2} />

        <div className={DIVIDER} />

        {/* ── Note + status bar ── */}
        <Textarea name="model3Notes" label="Note" rows={3} />

        <div className="flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Valutazione modello 3</span>
          <div className="flex gap-6">
            {['FUNZIONALE', 'DISFUNZIONALE'].map(v => (
              <label key={v} className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                <input type="radio" value={v} {...register('model3Status')} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" />
                {v}
              </label>
            ))}
          </div>
        </div>

      </div>
    </LockableSection>
  );
}
