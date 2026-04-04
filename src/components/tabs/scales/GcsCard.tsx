import { useFormContext, useWatch } from 'react-hook-form';
import { ScaleCard } from './ScaleCard';
import { RADIO, RL, BOX, TA, DATE_INPUT } from './constants';

const GCS_EYES = [
  { value: '4', label: 'Spontanea' },
  { value: '3', label: 'Alla voce' },
  { value: '2', label: 'Al dolore' },
  { value: '1', label: 'Assente' },
] as const;

const GCS_VERBAL = [
  { value: '5', label: 'Orientata' },
  { value: '4', label: 'Confusa' },
  { value: '3', label: 'Parole inappropriate' },
  { value: '2', label: 'Suoni incomprensibili' },
  { value: '1', label: 'Assente' },
] as const;

const GCS_MOTOR = [
  { value: '6', label: 'Esegue ordini' },
  { value: '5', label: 'Localizza il dolore' },
  { value: '4', label: 'Retrazione al dolore' },
  { value: '3', label: 'Flessione patologica (decorticazione)' },
  { value: '2', label: 'Estensione patologica (decerebrazione)' },
  { value: '1', label: 'Assente' },
] as const;

export function gcsRisk(score: number): { label: string; border: string; text: string; badge: string; num: string } {
  if (score <= 8)  return { label: 'TBI Grave (Coma)',   border: 'border-rose-500',    text: 'text-rose-700',    badge: 'bg-rose-100 text-rose-700 border-rose-200',          num: 'bg-rose-100 text-rose-700'       };
  if (score <= 12) return { label: 'TBI Moderato',        border: 'border-amber-500',   text: 'text-amber-700',   badge: 'bg-amber-100 text-amber-700 border-amber-200',        num: 'bg-amber-100 text-amber-700'     };
  if (score <= 14) return { label: 'TBI Lieve',           border: 'border-amber-300',   text: 'text-amber-600',   badge: 'bg-amber-50 text-amber-600 border-amber-200',         num: 'bg-amber-50 text-amber-600'      };
  return                   { label: 'Coscienza integra',  border: 'border-emerald-500', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',  num: 'bg-emerald-100 text-emerald-700' };
}

export function GcsCard({ index, onRemove, locked, onToggleLock }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const { register } = useFormContext();
  const prefix = `gcsEvaluations.${index}`;

  const date   = useWatch({ name: `${prefix}.date` });
  const time   = useWatch({ name: `${prefix}.time` }) as string | undefined;
  const eyes   = useWatch({ name: `${prefix}.eyes` })   as string | undefined;
  const verbal = useWatch({ name: `${prefix}.verbal` }) as string | undefined;
  const motor  = useWatch({ name: `${prefix}.motor` })  as string | undefined;
  const notes  = useWatch({ name: `${prefix}.notes` }) as string;

  const allAnswered = [eyes, verbal, motor].every(v => v !== undefined && v !== '');
  const score = allAnswered ? parseInt(eyes!) + parseInt(verbal!) + parseInt(motor!) : null;
  const risk  = score !== null ? gcsRisk(score) : null;

  const dateLabel = date
    ? `${new Date(date + 'T00:00:00').toLocaleDateString('it-IT')}${time ? ` ${time}` : ''}`
    : `Valutazione ${index + 1}`;

  return (
    <ScaleCard locked={locked} onToggleLock={onToggleLock} onRemove={onRemove} notes={notes}
      header={<>
        <div className={`flex-shrink-0 w-7 h-7 rounded-full font-bold text-sm flex items-center justify-center select-none ${risk ? risk.num : 'bg-slate-100 text-slate-400'}`}>
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 truncate">{dateLabel}</p>
          {allAnswered && (
            <p className="text-xs text-slate-400">E{eyes} V{verbal} M{motor}</p>
          )}
        </div>
        {risk && score !== null && (
          <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full border font-semibold ${risk.badge}`}>
            {risk.label} ({score})
          </span>
        )}
      </>}
    >
      <div className="flex gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Data</label>
          <input type="date" {...register(`${prefix}.date`)} data-empty={!date ? '' : undefined} className={DATE_INPUT} />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Ora</label>
          <input type="time" {...register(`${prefix}.time`)} data-empty={!time ? '' : undefined} className={DATE_INPUT} />
        </div>
      </div>
      <div className="grid grid-cols-1 @md:grid-cols-3 gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-600 mb-2">
            E — Apertura occhi
            {eyes && <span className="ml-1.5 font-mono text-emerald-600">({eyes})</span>}
          </p>
          <div className={BOX}>
            {GCS_EYES.map(opt => (
              <label key={opt.value} className="flex items-center justify-between cursor-pointer">
                <span className={RL}>
                  <input type="radio" value={opt.value} {...register(`${prefix}.eyes`)} className={RADIO} />
                  {opt.label}
                </span>
                <span className="text-xs font-semibold text-slate-400 ml-2 flex-shrink-0">{opt.value}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-600 mb-2">
            V — Risposta verbale
            {verbal && <span className="ml-1.5 font-mono text-emerald-600">({verbal})</span>}
          </p>
          <div className={BOX}>
            {GCS_VERBAL.map(opt => (
              <label key={opt.value} className="flex items-center justify-between cursor-pointer">
                <span className={RL}>
                  <input type="radio" value={opt.value} {...register(`${prefix}.verbal`)} className={RADIO} />
                  {opt.label}
                </span>
                <span className="text-xs font-semibold text-slate-400 ml-2 flex-shrink-0">{opt.value}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-600 mb-2">
            M — Risposta motoria
            {motor && <span className="ml-1.5 font-mono text-emerald-600">({motor})</span>}
          </p>
          <div className={BOX}>
            {GCS_MOTOR.map(opt => (
              <label key={opt.value} className="flex items-center justify-between cursor-pointer">
                <span className={RL}>
                  <input type="radio" value={opt.value} {...register(`${prefix}.motor`)} className={RADIO} />
                  {opt.label}
                </span>
                <span className="text-xs font-semibold text-slate-400 ml-2 flex-shrink-0">{opt.value}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Note</label>
        <textarea {...register(`${prefix}.notes`)} rows={2} placeholder={locked ? '' : 'Osservazioni aggiuntive...'} className={TA} />
      </div>
      <div className={`flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 rounded-r-lg ${risk ? risk.border : 'border-slate-300'}`}>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Glasgow Coma Scale</span>
        <span className={`text-sm font-bold ${risk ? risk.text : 'text-slate-400'}`}>
          {score === null ? 'Compilare tutti i campi' : `${risk!.label} — GCS ${score}/15`}
        </span>
      </div>
    </ScaleCard>
  );
}
