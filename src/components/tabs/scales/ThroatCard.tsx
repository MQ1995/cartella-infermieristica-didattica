import { useFormContext, useWatch } from 'react-hook-form';
import { ScaleCard } from './ScaleCard';
import { RADIO, RL, BOX, TA, DATE_INPUT } from './constants';

export const THROAT_ITEMS = [
  {
    key: 'lips',
    label: '1. Labbra',
    options: [
      { value: '0', label: 'Normali, umide, rosee' },
      { value: '1', label: 'Secche o screpolate' },
      { value: '2', label: 'Ulcerate, eritema, essudato moderato' },
      { value: '3', label: 'Ulcerate, sanguinanti, essudato abbondante' },
    ],
  },
  {
    key: 'teeth',
    label: '2. Denti / Protesi',
    options: [
      { value: '0', label: 'Puliti, nessuna placca' },
      { value: '1', label: 'Placca o detriti localizzati' },
      { value: '2', label: 'Placca diffusa, tartaro, protesi mal adattata' },
      { value: '3', label: 'Placca abbondante, denti rotti/mancanti' },
    ],
  },
  {
    key: 'gums',
    label: '3. Gengive',
    options: [
      { value: '0', label: 'Normali, rosa, sode' },
      { value: '1', label: 'Edematose o arrossate' },
      { value: '2', label: 'Sanguinamento alla palpazione' },
      { value: '3', label: 'Sanguinamento spontaneo, ulcerazioni' },
    ],
  },
  {
    key: 'mucosa',
    label: '4. Mucose orali',
    options: [
      { value: '0', label: 'Normali, umide, rosee' },
      { value: '1', label: 'Arrossate o secche' },
      { value: '2', label: 'Ulcerazioni lievi o eritema diffuso' },
      { value: '3', label: 'Ulcerazioni estese, essudato, sanguinamento' },
    ],
  },
  {
    key: 'tongue',
    label: '5. Lingua',
    options: [
      { value: '0', label: 'Normale, umida, rosea' },
      { value: '1', label: 'Patinosa o arrossata' },
      { value: '2', label: 'Rivestita, edematosa, fissure' },
      { value: '3', label: 'Ulcerata, gravemente fissurata, sanguinante' },
    ],
  },
  {
    key: 'saliva',
    label: '6. Saliva',
    options: [
      { value: '0', label: 'Acquosa, presenza normale' },
      { value: '1', label: 'Scarsa, filante o schiumosa' },
      { value: '2', label: 'Molto scarsa, viscosa' },
      { value: '3', label: 'Assente, xerostomia grave' },
    ],
  },
  {
    key: 'pharynx',
    label: '7. Faringe',
    options: [
      { value: '0', label: 'Normale, umida, rosa' },
      { value: '1', label: 'Arrossata, lieve eritema' },
      { value: '2', label: 'Edematosa, essudato moderato' },
      { value: '3', label: 'Essudato abbondante, ulcerata, membrane' },
    ],
  },
  {
    key: 'voice',
    label: '8. Voce',
    options: [
      { value: '0', label: 'Normale, chiara' },
      { value: '1', label: 'Leggermente alterata o rauca' },
      { value: '2', label: 'Rauca, difficoltosa' },
      { value: '3', label: 'Afona o quasi assente' },
    ],
  },
  {
    key: 'swallowing',
    label: '9. Deglutizione',
    options: [
      { value: '0', label: 'Normale, senza difficoltà' },
      { value: '1', label: 'Lieve disfagia, occasionale' },
      { value: '2', label: 'Disfagia moderata, necessita adattamenti' },
      { value: '3', label: 'Disfagia grave, deglutizione impossibile' },
    ],
  },
] as const;

type ThroatKey = typeof THROAT_ITEMS[number]['key'];

export function throatRiskLevel(score: number): { label: string; border: string; text: string; badge: string } {
  if (score === 0)  return { label: 'Cavo orale sano',      border: 'border-emerald-500', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
  if (score <= 9)   return { label: 'Lieve alterazione',    border: 'border-amber-300',   text: 'text-amber-600',   badge: 'bg-amber-50 text-amber-600 border-amber-200'        };
  if (score <= 18)  return { label: 'Disfunzione moderata', border: 'border-amber-500',   text: 'text-amber-700',   badge: 'bg-amber-100 text-amber-700 border-amber-200'       };
  return                    { label: 'Disfunzione grave',   border: 'border-rose-500',    text: 'text-rose-700',    badge: 'bg-rose-100 text-rose-700 border-rose-200'          };
}

function throatNumBadge(score: number): string {
  if (score === 0)  return 'bg-emerald-100 text-emerald-700';
  if (score <= 9)   return 'bg-amber-50 text-amber-600';
  if (score <= 18)  return 'bg-amber-100 text-amber-700';
  return 'bg-rose-100 text-rose-700';
}

export function ThroatCard({ index, onRemove, locked, onToggleLock }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const { register } = useFormContext();
  const prefix = `throatEvaluations.${index}`;

  const date   = useWatch({ name: `${prefix}.date` });
  const time   = useWatch({ name: `${prefix}.time` }) as string | undefined;
  const values = useWatch({ name: THROAT_ITEMS.map(i => `${prefix}.${i.key}`) }) as (string | undefined)[];
  const notes  = useWatch({ name: `${prefix}.notes` }) as string;

  const allAnswered = values.every(v => v !== undefined && v !== '');
  const score = allAnswered ? values.reduce((sum, v) => sum + parseInt(v!), 0) : null;
  const risk  = score !== null ? throatRiskLevel(score) : null;

  const dateLabel = date
    ? `${new Date(date + 'T00:00:00').toLocaleDateString('it-IT')}${time ? ` ${time}` : ''}`
    : `Valutazione ${index + 1}`;

  return (
    <ScaleCard locked={locked} onToggleLock={onToggleLock} onRemove={onRemove} notes={notes}
      header={<>
        <div className={`flex-shrink-0 w-7 h-7 rounded-full font-bold text-sm flex items-center justify-center select-none ${
          score !== null ? throatNumBadge(score) : 'bg-slate-100 text-slate-400'
        }`}>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {THROAT_ITEMS.map((item, itemIdx) => {
          const itemVal = values[itemIdx];
          const isSevere = itemVal === '3';
          return (
            <div key={item.key}>
              <p className={`text-xs font-semibold mb-2 flex items-center gap-1.5 ${isSevere ? 'text-rose-600' : 'text-slate-600'}`}>
                {item.label}
              </p>
              <div className={BOX}>
                {(item.options as readonly { value: string; label: string }[]).map(opt => (
                  <label key={opt.value} className="flex items-center justify-between cursor-pointer">
                    <span className={RL}>
                      <input type="radio" value={opt.value}
                        {...register(`${prefix}.${item.key}` as `throatEvaluations.${number}.${ThroatKey}`)}
                        className={RADIO}
                      />
                      {opt.label}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 ml-2 flex-shrink-0">{opt.value} pt</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Note</label>
        <textarea {...register(`${prefix}.notes`)} rows={2}
          placeholder={locked ? '' : 'Osservazioni aggiuntive...'}
          className={TA}
        />
      </div>
      <div className={`flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 rounded-r-lg ${risk ? risk.border : 'border-slate-300'}`}>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Stato cavo orale</span>
        <span className={`text-sm font-bold text-right ${risk ? risk.text : 'text-slate-400'}`}>
          {score === null ? 'Compilare tutti i campi' : `${risk!.label} — Punteggio ${score}`}
        </span>
      </div>
    </ScaleCard>
  );
}
