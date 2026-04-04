import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { ScaleCard } from './ScaleCard';
import { TA, DATE_INPUT } from './constants';

const NRS_LEVELS = [
  { value: '0',  label: 'Nessun dolore',     color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
  { value: '1',  label: 'Minimo',            color: 'bg-emerald-50 text-emerald-600 border-emerald-200'  },
  { value: '2',  label: 'Molto lieve',       color: 'bg-yellow-50 text-yellow-700 border-yellow-200'     },
  { value: '3',  label: 'Lieve',             color: 'bg-yellow-100 text-yellow-700 border-yellow-300'    },
  { value: '4',  label: 'Fastidioso',        color: 'bg-amber-100 text-amber-700 border-amber-300'       },
  { value: '5',  label: 'Moderato',          color: 'bg-amber-200 text-amber-800 border-amber-400'       },
  { value: '6',  label: 'Piuttosto intenso', color: 'bg-orange-100 text-orange-700 border-orange-300'    },
  { value: '7',  label: 'Intenso',           color: 'bg-orange-200 text-orange-800 border-orange-400'    },
  { value: '8',  label: 'Molto intenso',     color: 'bg-rose-100 text-rose-700 border-rose-300'          },
  { value: '9',  label: 'Fortissimo',        color: 'bg-rose-200 text-rose-700 border-rose-400'          },
  { value: '10', label: 'Insopportabile',    color: 'bg-rose-300 text-rose-800 border-rose-500'          },
] as const;

const NRS_BG = [
  'bg-emerald-400', 'bg-lime-400',   'bg-yellow-400', 'bg-amber-400',
  'bg-amber-500',   'bg-orange-400', 'bg-orange-500', 'bg-rose-400',
  'bg-rose-500',    'bg-rose-600',
];

const NRS_ACCENT = [
  '#34d399','#a3e635','#facc15','#fbbf24',
  '#f59e0b','#fb923c','#f97316','#fb7185',
  '#f43f5e','#e11d48','#be123c',
];

export function nrsColor(value: string) { return NRS_LEVELS.find(l => l.value === value)?.color ?? 'bg-slate-100 text-slate-500 border-slate-200'; }
export function nrsLabel(value: string) { return NRS_LEVELS.find(l => l.value === value)?.label ?? ''; }

export function PainCard({ index, onRemove, locked, onToggleLock }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const { register } = useFormContext();
  const prefix = `painEvaluations.${index}`;

  const date  = useWatch({ name: `${prefix}.date` });
  const time  = useWatch({ name: `${prefix}.time` }) as string | undefined;
  const score = useWatch({ name: `${prefix}.score` }) as string;
  const notes = useWatch({ name: `${prefix}.notes` }) as string;
  const n     = parseInt(score);

  const dateLabel = date
    ? `${new Date(date + 'T00:00:00').toLocaleDateString('it-IT')}${time ? ` ${time}` : ''}`
    : `Valutazione ${index + 1}`;

  return (
    <ScaleCard locked={locked} onToggleLock={onToggleLock} onRemove={onRemove} notes={notes}
      header={<>
        <div className={`flex-shrink-0 w-7 h-7 rounded-full font-bold text-sm flex items-center justify-center select-none border ${nrsColor(score)}`}>
          {score !== '' ? score : index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 truncate">{dateLabel}</p>
        </div>
        {score !== '' && (
          <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full border font-semibold ${nrsColor(score)}`}>
            {nrsLabel(score)} ({score}/10)
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
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Intensità del dolore (NRS 0–10)</p>
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 mb-4 transition-all ${nrsColor(score)}`}>
          <span className="text-3xl font-black tabular-nums w-8 text-center leading-none">
            {score !== '' ? score : '–'}
          </span>
          <div className="h-8 w-px bg-current opacity-20" />
          <span className="font-semibold text-sm">
            {score !== '' ? nrsLabel(score) : 'Muovi lo slider per selezionare'}
          </span>
        </div>
        <div className="relative h-8 flex items-center">
          <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex gap-0.5 h-4 rounded-full overflow-hidden pointer-events-none">
            {NRS_BG.map((bg, i) => (
              <div key={i} className={`flex-1 transition-all duration-150 ${score !== '' && n > i ? bg : 'bg-slate-200'}`} />
            ))}
          </div>
          <input
            type="range" min="0" max="10" step="1"
            {...register(`${prefix}.score`)}
            style={{ '--thumb-border': score !== '' ? NRS_ACCENT[n] : '#94a3b8' } as React.CSSProperties}
            className="relative w-full h-8 appearance-none bg-transparent cursor-pointer disabled:cursor-not-allowed
              [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-runnable-track]:h-8
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-[3px]
              [&::-webkit-slider-thumb]:border-[color:var(--thumb-border)]
              [&::-webkit-slider-thumb]:mt-1
              [&::-moz-range-track]:bg-transparent
              [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-md
              [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-[color:var(--thumb-border)]"
          />
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-0.5 px-0.5">
          <span>0 — Nessun dolore</span>
          <span>10 — Insopportabile</span>
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Sede del dolore</label>
        <input type="text" {...register(`${prefix}.location`)}
          placeholder={locked ? '—' : 'es. addome, torace, capo, arto inferiore dx...'}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default"
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Note</label>
        <textarea {...register(`${prefix}.notes`)} rows={2}
          placeholder={locked ? '' : 'Carattere, irradiazione, fattori aggravanti/allevianti, terapia somministrata...'}
          className={TA}
        />
      </div>
    </ScaleCard>
  );
}
