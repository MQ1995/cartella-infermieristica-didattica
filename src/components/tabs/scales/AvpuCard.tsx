import { useFormContext, useWatch } from 'react-hook-form';
import { ScaleCard } from './ScaleCard';
import { TA, DATE_INPUT } from './constants';

const AVPU_LEVELS = [
  {
    value: 'A',
    title: 'A — Alert',
    desc: 'Sveglio, vigile, orientato nel tempo e nello spazio',
    color: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    border: 'border-emerald-500',
    text: 'text-emerald-700',
  },
  {
    value: 'V',
    title: 'V — Voice',
    desc: 'Risponde agli stimoli vocali',
    color: 'bg-amber-100 text-amber-700 border-amber-300',
    border: 'border-amber-400',
    text: 'text-amber-700',
  },
  {
    value: 'P',
    title: 'P — Pain',
    desc: 'Risponde solo agli stimoli dolorosi',
    color: 'bg-orange-100 text-orange-700 border-orange-300',
    border: 'border-orange-500',
    text: 'text-orange-700',
  },
  {
    value: 'U',
    title: 'U — Unresponsive',
    desc: 'Non risponde ad alcuno stimolo',
    color: 'bg-rose-100 text-rose-700 border-rose-300',
    border: 'border-rose-500',
    text: 'text-rose-700',
  },
] as const;

function avpuLevel(value: string) {
  return AVPU_LEVELS.find(l => l.value === value);
}

export function AvpuCard({ index, onRemove, locked, onToggleLock }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const { register } = useFormContext();
  const prefix = `avpuEvaluations.${index}`;

  const date  = useWatch({ name: `${prefix}.date` });
  const time  = useWatch({ name: `${prefix}.time` }) as string | undefined;
  const score = useWatch({ name: `${prefix}.score` }) as string | undefined;
  const notes = useWatch({ name: `${prefix}.notes` }) as string;

  const level = score ? avpuLevel(score) : null;

  const dateLabel = date
    ? `${new Date(date + 'T00:00:00').toLocaleDateString('it-IT')}${time ? ` ${time}` : ''}`
    : `Valutazione ${index + 1}`;

  return (
    <ScaleCard locked={locked} onToggleLock={onToggleLock} onRemove={onRemove} notes={notes}
      header={<>
        <div className={`flex-shrink-0 w-7 h-7 rounded-full font-bold text-sm flex items-center justify-center select-none border ${
          level ? level.color : 'bg-slate-100 text-slate-400 border-slate-200'
        }`}>
          {level ? score : index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 truncate">{dateLabel}</p>
        </div>
        {level && (
          <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full border font-semibold ${level.color}`}>
            {level.title}
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
        <p className="text-xs font-semibold text-slate-600 mb-2">Livello di coscienza</p>
        <div className="grid grid-cols-1 @sm:grid-cols-2 gap-2">
          {AVPU_LEVELS.map(lvl => {
            const isSelected = score === lvl.value;
            return (
              <label key={lvl.value} className="cursor-pointer">
                <input type="radio" value={lvl.value} {...register(`${prefix}.score`)} className="sr-only" />
                <span className={`flex items-start gap-3 px-4 py-3 rounded-lg border text-sm transition-all ${
                  isSelected
                    ? `${lvl.color} font-semibold shadow-sm`
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}>
                  <span className="font-mono font-bold text-base leading-none mt-0.5 w-4 flex-shrink-0">{lvl.value}</span>
                  <span className="flex flex-col gap-0.5">
                    <span className="font-semibold">{lvl.title.split(' — ')[1]}</span>
                    <span className="text-xs font-normal opacity-75">{lvl.desc}</span>
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Note</label>
        <textarea {...register(`${prefix}.notes`)} rows={2} placeholder={locked ? '' : 'Osservazioni aggiuntive...'} className={TA} />
      </div>
      <div className={`flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 rounded-r-lg ${level ? level.border : 'border-slate-300'}`}>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Scala AVPU</span>
        <span className={`text-sm font-bold ${level ? level.text : 'text-slate-400'}`}>
          {level ? level.title : 'Selezionare un livello'}
        </span>
      </div>
    </ScaleCard>
  );
}
