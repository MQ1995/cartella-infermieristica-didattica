import { useFormContext, useWatch } from 'react-hook-form';
import { ScaleCard } from './ScaleCard';
import { TA, DATE_INPUT } from './constants';

const BORG_LEVELS = [
  { value: '0',   label: 'Nullo',                color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { value: '0.5', label: 'Estremamente lieve',   color: 'bg-emerald-50 text-emerald-600 border-emerald-200'  },
  { value: '1',   label: 'Molto lieve',          color: 'bg-teal-50 text-teal-600 border-teal-200'           },
  { value: '2',   label: 'Lieve',                color: 'bg-yellow-50 text-yellow-700 border-yellow-200'     },
  { value: '3',   label: 'Discreto',             color: 'bg-amber-50 text-amber-600 border-amber-200'        },
  { value: '4',   label: 'Piuttosto intenso',    color: 'bg-amber-100 text-amber-700 border-amber-300'       },
  { value: '5',   label: 'Intenso',              color: 'bg-orange-100 text-orange-700 border-orange-300'    },
  { value: '6',   label: 'Intenso',              color: 'bg-orange-100 text-orange-700 border-orange-300'    },
  { value: '7',   label: 'Molto intenso',        color: 'bg-rose-100 text-rose-600 border-rose-300'          },
  { value: '8',   label: 'Molto intenso',        color: 'bg-rose-100 text-rose-600 border-rose-300'          },
  { value: '9',   label: 'Quasi insopportabile', color: 'bg-rose-200 text-rose-700 border-rose-400'          },
  { value: '10',  label: 'Insopportabile',       color: 'bg-rose-300 text-rose-800 border-rose-500'          },
] as const;

function borgColor(value: string): string {
  return BORG_LEVELS.find(l => l.value === value)?.color ?? 'bg-slate-100 text-slate-500 border-slate-200';
}

function borgLabel(value: string): string {
  return BORG_LEVELS.find(l => l.value === value)?.label ?? '';
}

function borgBorderColor(value: string): string {
  const n = parseFloat(value);
  if (n === 0)  return 'border-emerald-500';
  if (n <= 2)   return 'border-teal-400';
  if (n <= 4)   return 'border-amber-400';
  if (n <= 6)   return 'border-orange-400';
  return 'border-rose-500';
}

function borgTextColor(value: string): string {
  const n = parseFloat(value);
  if (n === 0)  return 'text-emerald-700';
  if (n <= 2)   return 'text-teal-700';
  if (n <= 4)   return 'text-amber-700';
  if (n <= 6)   return 'text-orange-700';
  return 'text-rose-700';
}

export function BorgCard({ index, onRemove, locked, onToggleLock }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const { register } = useFormContext();
  const prefix = `borgEvaluations.${index}`;

  const date  = useWatch({ name: `${prefix}.date` });
  const time  = useWatch({ name: `${prefix}.time` }) as string | undefined;
  const score = useWatch({ name: `${prefix}.score` }) as string | undefined;
  const notes = useWatch({ name: `${prefix}.notes` }) as string;
  const hasScore = score !== undefined && score !== '';

  const dateLabel = date
    ? `${new Date(date + 'T00:00:00').toLocaleDateString('it-IT')}${time ? ` ${time}` : ''}`
    : `Valutazione ${index + 1}`;

  return (
    <ScaleCard locked={locked} onToggleLock={onToggleLock} onRemove={onRemove} notes={notes}
      header={<>
        <div className={`flex-shrink-0 w-7 h-7 rounded-full font-bold text-sm flex items-center justify-center select-none border ${
          hasScore ? borgColor(score!) : 'bg-slate-100 text-slate-400 border-slate-200'
        }`}>
          {hasScore ? score : index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 truncate">{dateLabel}</p>
        </div>
        {hasScore && (
          <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full border font-semibold ${borgColor(score!)}`}>
            {borgLabel(score!)} ({score})
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
      <div>
        <p className="text-xs font-semibold text-slate-600 mb-2">Intensità percepita della dispnea / sforzo</p>
        <div className="grid grid-cols-2 gap-1.5">
          {BORG_LEVELS.map(level => {
            const isSelected = score === level.value;
            return (
              <label key={level.value} className="cursor-pointer">
                <input type="radio" value={level.value} {...register(`${prefix}.score`)} className="sr-only" />
                <span className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${
                  isSelected ? `${level.color} font-semibold shadow-sm` : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}>
                  <span className="font-mono font-bold w-6 flex-shrink-0 text-right">{level.value}</span>
                  <span className="text-xs leading-tight">{level.label}</span>
                </span>
              </label>
            );
          })}
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Note</label>
        <textarea {...register(`${prefix}.notes`)} rows={2}
          placeholder={locked ? '' : 'Osservazioni (es. a riposo, durante deambulazione, dopo fisioterapia...)'}
          className={TA}
        />
      </div>
      <div className={`flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 rounded-r-lg ${hasScore ? borgBorderColor(score!) : 'border-slate-300'}`}>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Scala di Borg</span>
        <span className={`text-sm font-bold ${hasScore ? borgTextColor(score!) : 'text-slate-400'}`}>
          {hasScore ? `${borgLabel(score!)} — Punteggio ${score}/10` : 'Selezionare un livello'}
        </span>
      </div>
    </ScaleCard>
  );
}
