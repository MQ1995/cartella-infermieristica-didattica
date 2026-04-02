import { useFormContext, useWatch } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { LockableSection } from '../../ui/LockableSection';

const SUB     = 'text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 mb-4';
const DIVIDER = 'border-t border-slate-200 my-5';
const BOX     = 'rounded-lg border border-slate-200 p-3 space-y-3';
const RADIO   = 'w-4 h-4 text-emerald-600 focus:ring-emerald-500';
const RL      = 'flex items-center gap-1.5 cursor-pointer text-sm text-slate-700';

export default function Model9() {
  const { register } = useFormContext();

  const patientGender  = useWatch({ name: 'patientGender' });
  const menopause      = useWatch({ name: 'menopause' });
  const contraceptives = useWatch({ name: 'contraceptives' });
  const breastExam     = useWatch({ name: 'breastExam' });
  const screeningTests = useWatch({ name: 'screeningTests' });
  const testiclesExam  = useWatch({ name: 'testiclesExam' });

  const isFemale = patientGender !== 'M';
  const isMale   = patientGender !== 'F';

  return (
    <LockableSection title="9. Sessualità e riproduzione">
      <div className="space-y-5">

        {/* ── Sezione femminile ── */}
        <p className={SUB}>Sesso femminile</p>
        <div className={`space-y-3 transition-opacity ${!isFemale ? 'opacity-40 pointer-events-none' : ''}`}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input name="menarche"          label="Menarca (età)"          placeholder="es. 12" />
            <Input name="lastMenstruation"  label="Data ultima mestruazione" type="date" />
          </div>

          <Textarea name="menstrualProblems" label="Problemi legati al ciclo mestruale" rows={2} />

          <div className={BOX}>
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-slate-700 min-w-[160px]">Menopausa</span>
              <label className={RL}><input type="radio" value="false" {...register('menopause')} className={RADIO} /> No</label>
              <label className={RL}><input type="radio" value="true"  {...register('menopause')} className={RADIO} /> Sì</label>
            </div>
            {menopause === 'true' && (
              <>
                <div className="border-t border-slate-100" />
                <Input name="menopauseProblems" label="Problemi / sintomi correlati" />
              </>
            )}
          </div>

          <Textarea name="pregnancies" label="Gravidanze (numero, esiti, stato attuale)" rows={2} />

          <div className={BOX}>
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-slate-700 min-w-[160px]">Uso di contraccettivi</span>
              <label className={RL}><input type="radio" value="false" {...register('contraceptives')} className={RADIO} /> No</label>
              <label className={RL}><input type="radio" value="true"  {...register('contraceptives')} className={RADIO} /> Sì</label>
            </div>
            {contraceptives === 'true' && (
              <>
                <div className="border-t border-slate-100" />
                <Input name="contraceptivesType" label="Tipo e problemi correlati" />
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className={BOX}>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700 min-w-[160px]">Autopalpazione del seno</span>
                <label className={RL}><input type="radio" value="true"  {...register('breastExam')} className={RADIO} /> Sì</label>
                <label className={RL}><input type="radio" value="false" {...register('breastExam')} className={RADIO} /> No</label>
              </div>
              {breastExam === 'false' && (
                <>
                  <div className="border-t border-slate-100" />
                  <Input name="breastExamReason" label="Motivazione" />
                </>
              )}
            </div>

            <div className={BOX}>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700 min-w-[160px]">Screening raccomandati (Pap test, mammografia...)</span>
                <label className={RL}><input type="radio" value="true"  {...register('screeningTests')} className={RADIO} /> Sì</label>
                <label className={RL}><input type="radio" value="false" {...register('screeningTests')} className={RADIO} /> No</label>
              </div>
              {screeningTests === 'false' && (
                <>
                  <div className="border-t border-slate-100" />
                  <Input name="screeningTestsReason" label="Motivazione" />
                </>
              )}
            </div>
          </div>
        </div>

        <div className={DIVIDER} />

        {/* ── Sezione maschile ── */}
        <p className={SUB}>Sesso maschile</p>
        <div className={`space-y-3 transition-opacity ${!isMale ? 'opacity-40 pointer-events-none' : ''}`}>

          <Input name="numberOfChildren" label="Numero di figli" type="number" placeholder="es. 2" />

          <div className={BOX}>
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-slate-700 min-w-[200px]">Autopalpazione ai testicoli</span>
              <label className={RL}><input type="radio" value="true"  {...register('testiclesExam')} className={RADIO} /> Sì</label>
              <label className={RL}><input type="radio" value="false" {...register('testiclesExam')} className={RADIO} /> No</label>
            </div>
            {testiclesExam === 'false' && (
              <>
                <div className="border-t border-slate-100" />
                <Input name="testiclesExamReason" label="Motivazione" />
              </>
            )}
          </div>
        </div>

        <div className={DIVIDER} />

        {/* ── Note ── */}
        <Textarea name="model9Notes" label="Note" rows={3} />

        {/* ── Status bar ── */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Valutazione modello 9</span>
          <div className="flex gap-6">
            {['FUNZIONALE', 'DISFUNZIONALE'].map(v => (
              <label key={v} className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                <input type="radio" value={v} {...register('model9Status')} className={RADIO} />
                {v}
              </label>
            ))}
          </div>
        </div>

      </div>
    </LockableSection>
  );
}
