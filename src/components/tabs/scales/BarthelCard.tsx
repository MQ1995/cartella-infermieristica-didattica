import { useFormContext, useWatch } from 'react-hook-form';
import { ScaleCard } from './ScaleCard';
import { RADIO, RL, BOX, TA, DATE_INPUT } from './constants';

export const BARTHEL_ITEMS = [
  {
    key: 'feeding',
    label: '1. Alimentazione',
    options: [
      { value: '0',  label: 'Non autosufficiente' },
      { value: '5',  label: 'Necessita aiuto (es. tagliare il cibo)' },
      { value: '10', label: 'Autosufficiente' },
    ],
  },
  {
    key: 'bathing',
    label: '2. Bagno / Doccia',
    options: [
      { value: '0', label: 'Dipendente' },
      { value: '5', label: 'Autosufficiente (entra/esce senza supervisione)' },
    ],
  },
  {
    key: 'grooming',
    label: '3. Cura della persona',
    options: [
      { value: '0', label: 'Necessita assistenza' },
      { value: '5', label: 'Autosufficiente (con materiale a portata)' },
    ],
  },
  {
    key: 'dressing',
    label: '4. Vestirsi',
    options: [
      { value: '0',  label: 'Dipendente' },
      { value: '5',  label: 'Necessita aiuto ma esegue almeno metà da solo' },
      { value: '10', label: 'Autosufficiente (inclusi bottoni e lacci)' },
    ],
  },
  {
    key: 'bowel',
    label: '5. Controllo intestinale',
    options: [
      { value: '0',  label: 'Incontinente o necessita clistere' },
      { value: '5',  label: 'Incontinente occasionale (max 1×/settimana)' },
      { value: '10', label: 'Continente' },
    ],
  },
  {
    key: 'bladder',
    label: '6. Controllo vescicale',
    options: [
      { value: '0',  label: 'Incontinente o catetere non gestibile autonomamente' },
      { value: '5',  label: 'Incontinente occasionale (max 1×/die)' },
      { value: '10', label: 'Continente (per almeno 7 giorni)' },
    ],
  },
  {
    key: 'toilet',
    label: '7. Uso del gabinetto',
    options: [
      { value: '0',  label: 'Dipendente' },
      { value: '5',  label: 'Necessita aiuto ma esegue alcune operazioni' },
      { value: '10', label: 'Autosufficiente (si siede, si alza, si veste)' },
    ],
  },
  {
    key: 'transfer',
    label: '8. Trasferimento letto–sedia',
    options: [
      { value: '0',  label: 'Non eseguibile, non mantiene equilibrio da seduto' },
      { value: '5',  label: 'Necessita aiuto importante (1–2 persone)' },
      { value: '10', label: 'Necessita aiuto minimo o supervisione' },
      { value: '15', label: 'Autosufficiente' },
    ],
  },
  {
    key: 'mobility',
    label: '9. Deambulazione',
    options: [
      { value: '0',  label: 'Immobile o < 50 m in carrozzina' },
      { value: '5',  label: 'In carrozzina autonomo > 50 m' },
      { value: '10', label: 'Cammina con aiuto (persona o ausilio) > 50 m' },
      { value: '15', label: 'Autosufficiente (con o senza ausilio) > 50 m' },
    ],
  },
  {
    key: 'stairs',
    label: '10. Scale',
    options: [
      { value: '0',  label: 'Non in grado' },
      { value: '5',  label: 'Necessita aiuto fisico o supervisione' },
      { value: '10', label: 'Autosufficiente (può usare corrimano o ausilio)' },
    ],
  },
] as const;

type BarthelKey = typeof BARTHEL_ITEMS[number]['key'];

export function barthelRiskLevel(score: number): { label: string; border: string; text: string; badge: string } {
  if (score <= 20) return { label: 'Dipendenza totale',   border: 'border-rose-500',    text: 'text-rose-700',    badge: 'bg-rose-100 text-rose-700 border-rose-200'           };
  if (score <= 60) return { label: 'Dipendenza grave',    border: 'border-rose-400',    text: 'text-rose-600',    badge: 'bg-rose-50 text-rose-600 border-rose-200'            };
  if (score <= 90) return { label: 'Dipendenza moderata', border: 'border-amber-400',   text: 'text-amber-700',   badge: 'bg-amber-100 text-amber-700 border-amber-200'        };
  if (score <= 99) return { label: 'Dipendenza lieve',    border: 'border-amber-300',   text: 'text-amber-600',   badge: 'bg-amber-50 text-amber-600 border-amber-200'         };
  return                   { label: 'Indipendente',       border: 'border-emerald-500', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200'  };
}

function barthelNumBadge(score: number): string {
  if (score <= 20) return 'bg-rose-100 text-rose-700';
  if (score <= 60) return 'bg-rose-50 text-rose-600';
  if (score <= 90) return 'bg-amber-100 text-amber-700';
  if (score <= 99) return 'bg-amber-50 text-amber-600';
  return 'bg-emerald-100 text-emerald-700';
}

export function BarthelCard({ index, onRemove, locked, onToggleLock }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const { register } = useFormContext();
  const prefix = `barthelEvaluations.${index}`;

  const date   = useWatch({ name: `${prefix}.date` });
  const values = useWatch({ name: BARTHEL_ITEMS.map(i => `${prefix}.${i.key}`) }) as (string | undefined)[];
  const notes  = useWatch({ name: `${prefix}.notes` }) as string;

  const allAnswered = values.every(v => v !== undefined && v !== '');
  const score = allAnswered ? values.reduce((sum, v) => sum + parseInt(v!), 0) : null;
  const risk  = score !== null ? barthelRiskLevel(score) : null;

  const dateLabel = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('it-IT')
    : `Valutazione ${index + 1}`;

  return (
    <ScaleCard locked={locked} onToggleLock={onToggleLock} onRemove={onRemove} notes={notes}
      header={<>
        <div className={`flex-shrink-0 w-7 h-7 rounded-full font-bold text-sm flex items-center justify-center select-none ${score !== null ? barthelNumBadge(score) : 'bg-slate-100 text-slate-400'}`}>
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 truncate">{dateLabel}</p>
        </div>
        {risk && score !== null && (
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
      <div className="grid grid-cols-1 @md:grid-cols-2 gap-4">
        {BARTHEL_ITEMS.map((item) => (
          <div key={item.key}>
            <p className="text-xs font-semibold text-slate-600 mb-2">{item.label}</p>
            <div className={BOX}>
              {(item.options as readonly { value: string; label: string }[]).map(opt => (
                <label key={opt.value} className="flex items-center justify-between cursor-pointer">
                  <span className={RL}>
                    <input type="radio" value={opt.value} {...register(`${prefix}.${item.key}` as `barthelEvaluations.${number}.${BarthelKey}`)} className={RADIO} />
                    {opt.label}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 ml-2 flex-shrink-0">{opt.value} pt</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Note</label>
        <textarea {...register(`${prefix}.notes`)} rows={2} placeholder={locked ? '' : 'Osservazioni aggiuntive...'} className={TA} />
      </div>
      <div className={`flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 rounded-r-lg ${risk ? risk.border : 'border-slate-300'}`}>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Indice di Barthel</span>
        <span className={`text-sm font-bold ${risk ? risk.text : 'text-slate-400'}`}>
          {score === null ? 'Compilare tutti i campi' : `${risk!.label} — Punteggio ${score}/100`}
        </span>
      </div>
    </ScaleCard>
  );
}
