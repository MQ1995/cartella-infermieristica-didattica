import { useFormContext, useWatch } from 'react-hook-form';
import { ScaleCard } from './ScaleCard';
import { RADIO, RL, BOX, TA, DATE_INPUT } from './constants';

export const BRADEN_ITEMS = [
  {
    key: 'sensory',
    label: '1. Percezione sensoriale',
    subtitle: 'Capacità di rispondere al disagio correlato alla pressione',
    options: [
      { value: '1', label: 'Completamente limitata' },
      { value: '2', label: 'Molto limitata' },
      { value: '3', label: 'Leggermente limitata' },
      { value: '4', label: 'Non limitata' },
    ],
  },
  {
    key: 'moisture',
    label: '2. Umidità cutanea',
    subtitle: 'Grado di esposizione della cute all\'umidità',
    options: [
      { value: '1', label: 'Completamente bagnata' },
      { value: '2', label: 'Spesso bagnata' },
      { value: '3', label: 'Occasionalmente bagnata' },
      { value: '4', label: 'Raramente bagnata' },
    ],
  },
  {
    key: 'activity',
    label: '3. Attività fisica',
    subtitle: 'Livello di attività fisica',
    options: [
      { value: '1', label: 'Completamente allettato' },
      { value: '2', label: 'In poltrona' },
      { value: '3', label: 'Cammina occasionalmente' },
      { value: '4', label: 'Cammina frequentemente' },
    ],
  },
  {
    key: 'mobility',
    label: '4. Mobilità',
    subtitle: 'Capacità di cambiare e controllare la posizione del corpo',
    options: [
      { value: '1', label: 'Completamente immobile' },
      { value: '2', label: 'Molto limitata' },
      { value: '3', label: 'Parzialmente limitata' },
      { value: '4', label: 'Nessuna limitazione' },
    ],
  },
  {
    key: 'nutrition',
    label: '5. Nutrizione',
    subtitle: 'Modello abituale di assunzione del cibo',
    options: [
      { value: '1', label: 'Molto povera' },
      { value: '2', label: 'Probabilmente inadeguata' },
      { value: '3', label: 'Adeguata' },
      { value: '4', label: 'Eccellente' },
    ],
  },
  {
    key: 'friction',
    label: '6. Frizione e scivolamento',
    subtitle: 'Problemi di attrito e scivolamento durante i movimenti',
    options: [
      { value: '1', label: 'Problema in atto' },
      { value: '2', label: 'Problema potenziale' },
      { value: '3', label: 'Nessun problema apparente' },
    ],
  },
] as const;

type BradenKey = typeof BRADEN_ITEMS[number]['key'];

export function bradenRiskLevel(score: number): { label: string; border: string; text: string } {
  if (score <= 9)  return { label: 'Rischio Altissimo', border: 'border-rose-500',    text: 'text-rose-700'    };
  if (score <= 12) return { label: 'Rischio Alto',      border: 'border-rose-400',    text: 'text-rose-600'    };
  if (score <= 14) return { label: 'Rischio Moderato',  border: 'border-amber-400',   text: 'text-amber-700'   };
  if (score <= 18) return { label: 'Rischio Basso',     border: 'border-amber-300',   text: 'text-amber-600'   };
  return                   { label: 'Nessun Rischio',   border: 'border-emerald-500', text: 'text-emerald-700' };
}

function bradenNumBadge(score: number): string {
  if (score <= 12) return 'bg-rose-100 text-rose-700';
  if (score <= 14) return 'bg-amber-100 text-amber-700';
  if (score <= 18) return 'bg-amber-50 text-amber-600';
  return 'bg-emerald-100 text-emerald-700';
}

export function BradenCard({ index, onRemove, locked, onToggleLock }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const { register } = useFormContext();
  const prefix = `bradenEvaluations.${index}`;

  const date   = useWatch({ name: `${prefix}.date` });
  const values = useWatch({ name: BRADEN_ITEMS.map(i => `${prefix}.${i.key}`) }) as (string | undefined)[];
  const notes  = useWatch({ name: `${prefix}.notes` }) as string;

  const allAnswered = values.every(v => v !== undefined && v !== '');
  const score = allAnswered ? values.reduce((sum, v) => sum + parseInt(v!), 0) : null;
  const risk  = score !== null ? bradenRiskLevel(score) : null;

  const dateLabel = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('it-IT')
    : `Valutazione ${index + 1}`;

  return (
    <ScaleCard locked={locked} onToggleLock={onToggleLock} onRemove={onRemove} notes={notes}
      header={<>
        <div className={`flex-shrink-0 w-7 h-7 rounded-full font-bold text-sm flex items-center justify-center select-none ${score !== null ? bradenNumBadge(score) : 'bg-slate-100 text-slate-400'}`}>
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 truncate">{dateLabel}</p>
        </div>
        {risk && score !== null && (
          <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full border font-semibold ${score <= 12 ? 'bg-rose-100 text-rose-700 border-rose-200' : score <= 14 ? 'bg-amber-100 text-amber-700 border-amber-200' : score <= 18 ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200'}`}>
            {risk.label} ({score})
          </span>
        )}
      </>}
    >
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Data valutazione</label>
        <input type="date" {...register(`${prefix}.date`)} data-empty={!date ? '' : undefined} className={DATE_INPUT} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BRADEN_ITEMS.map((item) => (
          <div key={item.key}>
            <p className="text-xs font-semibold text-slate-600 mb-1">{item.label}</p>
            <p className="text-xs text-slate-400 mb-2">{item.subtitle}</p>
            <div className={BOX}>
              {[...(item.options as readonly { value: string; label: string }[])].reverse().map(opt => (
                <label key={opt.value} className="flex items-center justify-between cursor-pointer">
                  <span className={RL}>
                    <input type="radio" value={opt.value} {...register(`${prefix}.${item.key}` as `bradenEvaluations.${number}.${BradenKey}`)} className={RADIO} />
                    {opt.label}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">{opt.value} pt</span>
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
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rischio lesioni da pressione</span>
        <span className={`text-sm font-bold ${risk ? risk.text : 'text-slate-400'}`}>
          {score === null ? 'Compilare tutti i campi' : `${risk!.label} — Punteggio ${score}`}
        </span>
      </div>
    </ScaleCard>
  );
}
