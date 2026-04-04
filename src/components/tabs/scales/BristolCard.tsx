import { useFormContext, useWatch } from 'react-hook-form';
import { ScaleCard } from './ScaleCard';
import { TA, DATE_INPUT } from './constants';

export const BRISTOL_TYPES = [
  { type: '1', label: 'Tipo 1', desc: 'Palline separate e dure (difficoltà di espulsione)' },
  { type: '2', label: 'Tipo 2', desc: 'A forma di salsiccia, grumosa' },
  { type: '3', label: 'Tipo 3', desc: 'A forma di salsiccia con crepe sulla superficie' },
  { type: '4', label: 'Tipo 4', desc: 'A forma di salsiccia, liscia e morbida' },
  { type: '5', label: 'Tipo 5', desc: 'Fiocchi morbidi con bordi netti, facili da evacuare' },
  { type: '6', label: 'Tipo 6', desc: 'Pezzi soffici con bordi irregolari, feci pastose' },
  { type: '7', label: 'Tipo 7', desc: 'Acquosa, nessun pezzo solido, completamente liquida' },
];

export function BristolCard({ index, onRemove, locked, onToggleLock }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const { register, setValue: setVal } = useFormContext();
  const prefix = `bristolEvaluations.${index}`;

  const date    = useWatch({ name: `${prefix}.date` });
  const time    = useWatch({ name: `${prefix}.time` }) as string | undefined;
  const typeVal = useWatch({ name: `${prefix}.type` }) as string;
  const notes   = useWatch({ name: `${prefix}.notes` }) as string;

  const dateLabel = date
    ? `${new Date(date + 'T00:00:00').toLocaleDateString('it-IT')}${time ? ` ${time}` : ''}`
    : `Valutazione ${index + 1}`;

  const selected = BRISTOL_TYPES.find(t => t.type === typeVal);

  return (
    <ScaleCard locked={locked} onToggleLock={onToggleLock} onRemove={onRemove} notes={notes}
      header={<>
        <div className="flex-shrink-0 w-7 h-7 rounded-full font-bold text-sm flex items-center justify-center select-none border bg-slate-100 text-slate-600 border-slate-200">
          {typeVal ? typeVal : index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 truncate">{dateLabel}</p>
          {selected && <p className="text-xs text-slate-400 truncate">{selected.desc}</p>}
        </div>
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
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Tipo di feci (Scala di Bristol)</p>
        <input type="hidden" {...register(`${prefix}.type`)} />
        <div className="grid grid-cols-2 @sm:grid-cols-4 @lg:grid-cols-7 gap-2">
          {BRISTOL_TYPES.map(({ type, label, desc }) => (
            <button key={type} type="button"
              onClick={() => setVal(`${prefix}.type`, type, { shouldDirty: true })}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all text-center ${
                typeVal === type ? 'border-emerald-500 bg-emerald-50 shadow-sm' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <img src={`/bristol/${type}.svg`} alt={label} className="w-full h-14 object-contain" />
              <span className={`text-xs font-bold ${typeVal === type ? 'text-emerald-700' : 'text-slate-600'}`}>{label}</span>
              <span className="text-[10px] text-slate-400 leading-tight hidden lg:block">{desc}</span>
            </button>
          ))}
        </div>
        {selected && (
          <p className="mt-2 text-sm text-slate-600 bg-slate-50 rounded-lg px-3 py-2 border border-slate-200">
            <span className="font-semibold">{selected.label}:</span> {selected.desc}
          </p>
        )}
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Note</label>
        <textarea {...register(`${prefix}.notes`)} rows={2}
          placeholder={locked ? '' : 'Osservazioni aggiuntive...'}
          className={TA}
        />
      </div>
    </ScaleCard>
  );
}
