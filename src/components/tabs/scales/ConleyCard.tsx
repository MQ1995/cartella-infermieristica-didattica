import { useFormContext, useWatch } from 'react-hook-form';
import { ScaleCard } from './ScaleCard';
import { RADIO, RL, SUB, TA, DATE_INPUT } from './constants';

export const CONLEY_ITEMS = [
  { name: 'conley1', label: 'È caduto nel corso degli ultimi tre mesi?',                               pts: 2, section: 'Precedenti cadute' },
  { name: 'conley2', label: 'Ha avuto vertigini o capogiri?',                                           pts: 1, section: null },
  { name: 'conley3', label: 'Ha avuto perdite di urine/feci recandosi in bagno?',                       pts: 1, section: null },
  { name: 'conley4', label: 'Presenta compromissione della marcia o andatura instabile?',               pts: 1, section: 'Stato cognitivo e comportamentale' },
  { name: 'conley5', label: 'È agitato o irrequieto?',                                                  pts: 2, section: null },
  { name: 'conley6', label: 'Presenta mancanza del senso del pericolo o deterioramento del giudizio?', pts: 3, section: null },
] as const;

export function ConleyCard({ index, onRemove, locked, onToggleLock }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const { register } = useFormContext();
  const prefix = `conleyEvaluations.${index}`;

  const date   = useWatch({ name: `${prefix}.date` });
  const values = useWatch({ name: CONLEY_ITEMS.map(i => `${prefix}.${i.name}`) }) as (string | undefined)[];
  const notes  = useWatch({ name: `${prefix}.notes` }) as string;

  const allAnswered = values.every(v => v === 'true' || v === 'false');
  const score = allAnswered
    ? CONLEY_ITEMS.reduce((sum, item, idx) => sum + (values[idx] === 'true' ? item.pts : 0), 0)
    : null;
  const atRisk = score !== null ? score >= 2 : null;

  const dateLabel = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('it-IT')
    : `Valutazione ${index + 1}`;

  return (
    <ScaleCard locked={locked} onToggleLock={onToggleLock} onRemove={onRemove} notes={notes}
      header={<>
        <div className={`flex-shrink-0 w-7 h-7 rounded-full font-bold text-sm flex items-center justify-center select-none ${score === null ? 'bg-slate-100 text-slate-400' : atRisk ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 truncate">{dateLabel}</p>
        </div>
        {score !== null && (
          <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full border font-semibold ${atRisk ? 'bg-rose-100 text-rose-700 border-rose-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200'}`}>
            {atRisk ? `A rischio (${score})` : `Non a rischio (${score})`}
          </span>
        )}
      </>}
    >
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Data valutazione</label>
        <input type="date" {...register(`${prefix}.date`)} data-empty={!date ? '' : undefined} className={DATE_INPUT} />
      </div>
      {(() => {
        let lastSection: string | null = null;
        return CONLEY_ITEMS.map((item) => {
          const showHeader = item.section !== null && item.section !== lastSection;
          if (item.section !== null) lastSection = item.section;
          return (
            <div key={item.name}>
              {showHeader && <p className={SUB}>{item.section}</p>}
              <div className="flex items-center justify-between gap-4 py-2 border-b border-slate-100 last:border-0">
                <span className="text-sm text-slate-700 flex-1">
                  {item.label}
                  <span className="ml-1.5 text-xs font-semibold text-slate-400">+{item.pts} pt</span>
                </span>
                <div className="flex gap-5 flex-shrink-0">
                  <label className={RL}><input type="radio" value="true"  {...register(`${prefix}.${item.name}`)} className={RADIO} /> Sì</label>
                  <label className={RL}><input type="radio" value="false" {...register(`${prefix}.${item.name}`)} className={RADIO} /> No</label>
                </div>
              </div>
            </div>
          );
        });
      })()}
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Note</label>
        <textarea {...register(`${prefix}.notes`)} rows={2} placeholder={locked ? '' : 'Osservazioni aggiuntive...'} className={TA} />
      </div>
      <div className={`flex items-center justify-between gap-4 px-4 py-3 shadow-md border-l-4 rounded-r-lg ${score === null ? 'bg-slate-50 border-slate-300' : atRisk ? 'bg-white border-rose-500' : 'bg-white border-emerald-500'}`}>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rischio cadute</span>
        <span className={`text-sm font-bold ${score === null ? 'text-slate-400' : atRisk ? 'text-rose-700' : 'text-emerald-700'}`}>
          {score === null ? 'Compilare tutti i campi' : atRisk ? `A rischio — Punteggio ${score}` : `Non a rischio — Punteggio ${score}`}
        </span>
      </div>
    </ScaleCard>
  );
}
