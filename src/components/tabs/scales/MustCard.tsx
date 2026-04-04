import { useFormContext, useWatch } from 'react-hook-form';
import { ScaleCard } from './ScaleCard';
import { RADIO, RL, SUB, BOX, TA, DATE_INPUT } from './constants';

const MUST_RISK = [
  { label: 'Rischio Basso', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', num: 'bg-emerald-100 text-emerald-700' },
  { label: 'Rischio Medio', badge: 'bg-amber-100 text-amber-700 border-amber-200',       num: 'bg-amber-100 text-amber-700'    },
  { label: 'Rischio Alto',  badge: 'bg-rose-100 text-rose-700 border-rose-200',           num: 'bg-rose-100 text-rose-700'     },
] as const;

export function mustRisk(score: number) {
  return MUST_RISK[Math.min(score, 2)];
}

export function MustCard({ index, onRemove, locked, onToggleLock }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const { register } = useFormContext();
  const prefix = `mustEvaluations.${index}`;

  const date  = useWatch({ name: `${prefix}.date` });
  const step1 = useWatch({ name: `${prefix}.step1Bmi` })          as string | undefined;
  const step2 = useWatch({ name: `${prefix}.step2WeightLoss` })   as string | undefined;
  const step3 = useWatch({ name: `${prefix}.step3AcuteDisease` }) as string | undefined;
  const notes = useWatch({ name: `${prefix}.notes` }) as string;

  const allAnswered = [step1, step2, step3].every(v => v !== undefined && v !== '');
  const score = allAnswered
    ? parseInt(step1!) + parseInt(step2!) + (step3 === 'true' ? 2 : 0)
    : null;
  const risk = score !== null ? mustRisk(score) : null;

  const dateLabel = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('it-IT')
    : `Valutazione ${index + 1}`;

  return (
    <ScaleCard locked={locked} onToggleLock={onToggleLock} onRemove={onRemove} notes={notes}
      header={<>
        <div className={`flex-shrink-0 w-7 h-7 rounded-full font-bold text-sm flex items-center justify-center select-none ${risk ? risk.num : 'bg-slate-100 text-slate-400'}`}>
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 truncate">{dateLabel}</p>
        </div>
        {risk && (
          <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full border font-semibold ${risk.badge}`}>
            {risk.label} ({score})
          </span>
        )}
      </>}
    >
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Data valutazione</label>
        <input type="date" {...register(`${prefix}.date`)} data-empty={!date ? '' : undefined} className={DATE_INPUT} />
      </div>
      <div>
        <p className={SUB}>Step 1 — BMI (kg/m²)</p>
        <div className={BOX}>
          {[
            { value: '0', label: '> 20 (> 30 obeso)',  pts: '+0 pt' },
            { value: '1', label: '18,5 – 20',          pts: '+1 pt' },
            { value: '2', label: '< 18,5',             pts: '+2 pt' },
          ].map(opt => (
            <label key={opt.value} className="flex items-center justify-between cursor-pointer">
              <span className={RL}>
                <input type="radio" value={opt.value} {...register(`${prefix}.step1Bmi`)} className={RADIO} />
                {opt.label}
              </span>
              <span className="text-xs font-semibold text-slate-400">{opt.pts}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className={SUB}>Step 2 — Decremento ponderale non volontario (ultimi 3–6 mesi)</p>
        <div className={BOX}>
          {[
            { value: '0', label: '< 5%',    pts: '+0 pt' },
            { value: '1', label: '5 – 10%', pts: '+1 pt' },
            { value: '2', label: '> 10%',   pts: '+2 pt' },
          ].map(opt => (
            <label key={opt.value} className="flex items-center justify-between cursor-pointer">
              <span className={RL}>
                <input type="radio" value={opt.value} {...register(`${prefix}.step2WeightLoss`)} className={RADIO} />
                {opt.label}
              </span>
              <span className="text-xs font-semibold text-slate-400">{opt.pts}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className={SUB}>Step 3 — Effetti di malattia acuta</p>
        <div className={BOX}>
          <p className="text-sm text-slate-600">
            Il paziente è affetto da malattia acuta e non vi è stato, o è probabile che non vi sia, alcun apporto nutrizionale per &gt; 5 giorni?
          </p>
          <div className="flex gap-6 pt-1">
            <label className={RL}>
              <input type="radio" value="true" {...register(`${prefix}.step3AcuteDisease`)} className={RADIO} />
              Sì <span className="text-xs font-semibold text-slate-400 ml-1">+2 pt</span>
            </label>
            <label className={RL}>
              <input type="radio" value="false" {...register(`${prefix}.step3AcuteDisease`)} className={RADIO} />
              No
            </label>
          </div>
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Note</label>
        <textarea {...register(`${prefix}.notes`)} rows={2}
          placeholder={locked ? '' : 'Osservazioni aggiuntive...'}
          className={TA}
        />
      </div>
      <div className={`flex items-center justify-between gap-4 px-4 py-3 shadow-md border-l-4 rounded-r-lg ${
        score === null ? 'bg-slate-50 border-slate-300' : score === 0 ? 'bg-white border-emerald-500' : score === 1 ? 'bg-white border-amber-400' : 'bg-white border-rose-500'
      }`}>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rischio malnutrizione</span>
        <span className={`text-sm font-bold ${score === null ? 'text-slate-400' : risk!.badge.split(' ')[1]}`}>
          {score === null ? 'Compilare tutti gli step' : `${risk!.label} — Punteggio ${score}`}
        </span>
      </div>
    </ScaleCard>
  );
}
