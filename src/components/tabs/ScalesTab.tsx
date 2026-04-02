import { useState, useEffect } from "react";
import { useFormContext, useWatch, useFieldArray } from 'react-hook-form';
import { Plus, ChevronDown, ChevronUp, Lock, LockOpen } from 'lucide-react';
import { ConfirmDeleteButton } from '../ui/ConfirmDeleteButton';
import { InfoTooltip } from '../ui/InfoTooltip';

const RADIO = 'w-4 h-4 text-emerald-600 focus:ring-emerald-500';
const RL    = 'flex items-center gap-1.5 cursor-pointer text-sm text-slate-700';
const SUB   = 'text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 mb-3';
const BOX   = 'rounded-lg border border-slate-200 p-3 space-y-2.5';
const TA    = 'w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white resize-y disabled:bg-transparent disabled:border-transparent disabled:cursor-default';

// ─────────────────────────────────────────────
// Braden items
// ─────────────────────────────────────────────

const BRADEN_ITEMS = [
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

function bradenRiskLevel(score: number): { label: string; border: string; text: string } {
  if (score <= 9)  return { label: 'Rischio Altissimo', border: 'border-rose-500',   text: 'text-rose-700'    };
  if (score <= 12) return { label: 'Rischio Alto',      border: 'border-rose-400',   text: 'text-rose-600'    };
  if (score <= 14) return { label: 'Rischio Moderato',  border: 'border-amber-400',  text: 'text-amber-700'   };
  if (score <= 18) return { label: 'Rischio Basso',     border: 'border-amber-300',  text: 'text-amber-600'   };
  return                   { label: 'Nessun Rischio',   border: 'border-emerald-500', text: 'text-emerald-700' };
}

function bradenNumBadge(score: number): string {
  if (score <= 12) return 'bg-rose-100 text-rose-700';
  if (score <= 14) return 'bg-amber-100 text-amber-700';
  if (score <= 18) return 'bg-amber-50 text-amber-600';
  return 'bg-emerald-100 text-emerald-700';
}

// ─────────────────────────────────────────────
// BradenCard
// ─────────────────────────────────────────────

function BradenCard({ index, onRemove, locked, onToggleLock }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const { register } = useFormContext();
  const prefix = `bradenEvaluations.${index}`;

  const date   = useWatch({ name: `${prefix}.date` });
  const values = useWatch({ name: BRADEN_ITEMS.map(i => `${prefix}.${i.key}`) }) as (string | undefined)[];

  const allAnswered = values.every(v => v !== undefined && v !== '');
  const score = allAnswered ? values.reduce((sum, v) => sum + parseInt(v!), 0) : null;
  const risk  = score !== null ? bradenRiskLevel(score) : null;

  const dateLabel = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('it-IT')
    : `Valutazione ${index + 1}`;

  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${
      locked ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200 bg-white'
    }`}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50/80 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        <div className={`flex-shrink-0 w-7 h-7 rounded-full font-bold text-sm flex items-center justify-center select-none ${
          score !== null ? bradenNumBadge(score) : 'bg-slate-100 text-slate-400'
        }`}>
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 truncate">{dateLabel}</p>
        </div>
        {risk && score !== null && (
          <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full border font-semibold ${
            score <= 12 ? 'bg-rose-100 text-rose-700 border-rose-200' :
            score <= 14 ? 'bg-amber-100 text-amber-700 border-amber-200' :
            score <= 18 ? 'bg-amber-50 text-amber-600 border-amber-200' :
                          'bg-emerald-100 text-emerald-700 border-emerald-200'
          }`}>
            {risk.label} ({score})
          </span>
        )}
        <div className="flex items-center gap-1.5 flex-shrink-0 print:hidden" onClick={e => e.stopPropagation()}>
          <button
            type="button"
            onClick={onToggleLock}
            title={locked ? 'Sblocca' : 'Blocca'}
            className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${locked ? 'bg-amber-400' : 'bg-slate-200'}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow flex items-center justify-center transition-all duration-200 ${locked ? 'left-4 text-amber-500' : 'left-0.5 text-slate-400'}`}>
              {locked ? <Lock size={9} /> : <LockOpen size={9} />}
            </span>
          </button>
          {!locked && <ConfirmDeleteButton onConfirm={onRemove} size={15} />}
          <button type="button" className="text-slate-400 hover:text-slate-600 p-1" onClick={() => setExpanded(e => !e)}>
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {/* Body */}
      {expanded && (
        <fieldset disabled={locked} className={`border-t border-slate-200 ${locked ? 'opacity-60 pointer-events-none' : ''}`}>
          <div className="p-5 space-y-4">

            {/* Data */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Data valutazione</label>
              <input
                type="date"
                {...register(`${prefix}.date`)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default"
              />
            </div>

            {/* Items grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BRADEN_ITEMS.map((item) => (
                <div key={item.key}>
                  <p className="text-xs font-semibold text-slate-600 mb-1">{item.label}</p>
                  <p className="text-xs text-slate-400 mb-2">{item.subtitle}</p>
                  <div className={BOX}>
                    {[...(item.options as readonly { value: string; label: string }[])].reverse().map(opt => (
                      <label key={opt.value} className="flex items-center justify-between cursor-pointer">
                        <span className={RL}>
                          <input
                            type="radio"
                            value={opt.value}
                            {...register(`${prefix}.${item.key}` as `bradenEvaluations.${number}.${BradenKey}`)}
                            className={RADIO}
                          />
                          {opt.label}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">{opt.value} pt</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Score bar */}
            <div className={`flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 rounded-r-lg ${
              risk ? risk.border : 'border-slate-300'
            }`}>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rischio lesioni da pressione</span>
              <span className={`text-sm font-bold ${risk ? risk.text : 'text-slate-400'}`}>
                {score === null
                  ? 'Compilare tutti i campi'
                  : `${risk!.label} — Punteggio ${score}`
                }
              </span>
            </div>

          </div>
        </fieldset>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Conley items
// ─────────────────────────────────────────────

const CONLEY_ITEMS = [
  { name: 'conley1', label: 'È caduto nel corso degli ultimi tre mesi?',                               pts: 2, section: 'Precedenti cadute' },
  { name: 'conley2', label: 'Ha avuto vertigini o capogiri?',                                           pts: 1, section: null },
  { name: 'conley3', label: 'Ha avuto perdite di urine/feci recandosi in bagno?',                       pts: 1, section: null },
  { name: 'conley4', label: 'Presenta compromissione della marcia o andatura instabile?',               pts: 1, section: 'Stato cognitivo e comportamentale' },
  { name: 'conley5', label: 'È agitato o irrequieto?',                                                  pts: 2, section: null },
  { name: 'conley6', label: 'Presenta mancanza del senso del pericolo o deterioramento del giudizio?', pts: 3, section: null },
] as const;

// ─────────────────────────────────────────────
// MUST helpers
// ─────────────────────────────────────────────

const MUST_RISK = [
  { label: 'Rischio Basso', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', num: 'bg-emerald-100 text-emerald-700' },
  { label: 'Rischio Medio', badge: 'bg-amber-100 text-amber-700 border-amber-200',       num: 'bg-amber-100 text-amber-700'   },
  { label: 'Rischio Alto',  badge: 'bg-rose-100 text-rose-700 border-rose-200',           num: 'bg-rose-100 text-rose-700'     },
] as const;

function mustRisk(score: number) {
  return MUST_RISK[Math.min(score, 2)];
}

// ─────────────────────────────────────────────
// ConleyCard
// ─────────────────────────────────────────────

function ConleyCard({ index, onRemove, locked, onToggleLock }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const { register } = useFormContext();
  const prefix = `conleyEvaluations.${index}`;

  const date   = useWatch({ name: `${prefix}.date` });
  const values = useWatch({ name: CONLEY_ITEMS.map(i => `${prefix}.${i.name}`) }) as (string | undefined)[];

  const allAnswered = values.every(v => v === 'true' || v === 'false');
  const score = allAnswered
    ? CONLEY_ITEMS.reduce((sum, item, idx) => sum + (values[idx] === 'true' ? item.pts : 0), 0)
    : null;
  const atRisk = score !== null ? score >= 2 : null;

  const dateLabel = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('it-IT')
    : `Valutazione ${index + 1}`;

  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${
      locked ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200 bg-white'
    }`}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50/80 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        <div className={`flex-shrink-0 w-7 h-7 rounded-full font-bold text-sm flex items-center justify-center select-none ${
          score === null ? 'bg-slate-100 text-slate-400'
          : atRisk ? 'bg-rose-100 text-rose-700'
          : 'bg-emerald-100 text-emerald-700'
        }`}>
          {index + 1}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 truncate">{dateLabel}</p>
        </div>
        {score !== null && (
          <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full border font-semibold ${
            atRisk ? 'bg-rose-100 text-rose-700 border-rose-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200'
          }`}>
            {atRisk ? `A rischio (${score})` : `Non a rischio (${score})`}
          </span>
        )}
        <div className="flex items-center gap-1.5 flex-shrink-0 print:hidden" onClick={e => e.stopPropagation()}>
          <button
            type="button"
            onClick={onToggleLock}
            title={locked ? 'Sblocca' : 'Blocca'}
            className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${locked ? 'bg-amber-400' : 'bg-slate-200'}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow flex items-center justify-center transition-all duration-200 ${locked ? 'left-4 text-amber-500' : 'left-0.5 text-slate-400'}`}>
              {locked ? <Lock size={9} /> : <LockOpen size={9} />}
            </span>
          </button>
          {!locked && <ConfirmDeleteButton onConfirm={onRemove} size={15} />}
          <button type="button" className="text-slate-400 hover:text-slate-600 p-1" onClick={() => setExpanded(e => !e)}>
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {/* Body */}
      {expanded && (
        <fieldset disabled={locked} className={`border-t border-slate-200 ${locked ? 'opacity-60 pointer-events-none' : ''}`}>
          <div className="p-5 space-y-5">

            {/* Data */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Data valutazione</label>
              <input
                type="date"
                {...register(`${prefix}.date`)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default"
              />
            </div>

            {/* Items */}
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

            {/* Score bar */}
            <div className={`flex items-center justify-between gap-4 px-4 py-3 shadow-md border-l-4 rounded-r-lg ${
              score === null ? 'bg-slate-50 border-slate-300'
              : atRisk ? 'bg-white border-rose-500'
              : 'bg-white border-emerald-500'
            }`}>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rischio cadute</span>
              <span className={`text-sm font-bold ${
                score === null ? 'text-slate-400'
                : atRisk ? 'text-rose-700'
                : 'text-emerald-700'
              }`}>
                {score === null
                  ? 'Compilare tutti i campi'
                  : atRisk
                    ? `A rischio — Punteggio ${score}`
                    : `Non a rischio — Punteggio ${score}`
                }
              </span>
            </div>

          </div>
        </fieldset>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Barthel items
// ─────────────────────────────────────────────

const BARTHEL_ITEMS = [
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
    subtitle: 'Viso, capelli, denti, rasatura',
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

function barthelRiskLevel(score: number): { label: string; border: string; text: string; badge: string } {
  if (score <= 20) return { label: 'Dipendenza totale',   border: 'border-rose-500',    text: 'text-rose-700',   badge: 'bg-rose-100 text-rose-700 border-rose-200'        };
  if (score <= 60) return { label: 'Dipendenza grave',    border: 'border-rose-400',    text: 'text-rose-600',   badge: 'bg-rose-50 text-rose-600 border-rose-200'         };
  if (score <= 90) return { label: 'Dipendenza moderata', border: 'border-amber-400',   text: 'text-amber-700',  badge: 'bg-amber-100 text-amber-700 border-amber-200'     };
  if (score <= 99) return { label: 'Dipendenza lieve',    border: 'border-amber-300',   text: 'text-amber-600',  badge: 'bg-amber-50 text-amber-600 border-amber-200'      };
  return                   { label: 'Indipendente',       border: 'border-emerald-500', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
}

function barthelNumBadge(score: number): string {
  if (score <= 20) return 'bg-rose-100 text-rose-700';
  if (score <= 60) return 'bg-rose-50 text-rose-600';
  if (score <= 90) return 'bg-amber-100 text-amber-700';
  if (score <= 99) return 'bg-amber-50 text-amber-600';
  return 'bg-emerald-100 text-emerald-700';
}

// ─────────────────────────────────────────────
// BarthelCard
// ─────────────────────────────────────────────

function BarthelCard({ index, onRemove, locked, onToggleLock }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const { register } = useFormContext();
  const prefix = `barthelEvaluations.${index}`;

  const date   = useWatch({ name: `${prefix}.date` });
  const values = useWatch({ name: BARTHEL_ITEMS.map(i => `${prefix}.${i.key}`) }) as (string | undefined)[];

  const allAnswered = values.every(v => v !== undefined && v !== '');
  const score = allAnswered ? values.reduce((sum, v) => sum + parseInt(v!), 0) : null;
  const risk  = score !== null ? barthelRiskLevel(score) : null;

  const dateLabel = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('it-IT')
    : `Valutazione ${index + 1}`;

  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${
      locked ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200 bg-white'
    }`}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50/80 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        <div className={`flex-shrink-0 w-7 h-7 rounded-full font-bold text-sm flex items-center justify-center select-none ${
          score !== null ? barthelNumBadge(score) : 'bg-slate-100 text-slate-400'
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
        <div className="flex items-center gap-1.5 flex-shrink-0 print:hidden" onClick={e => e.stopPropagation()}>
          <button
            type="button"
            onClick={onToggleLock}
            title={locked ? 'Sblocca' : 'Blocca'}
            className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${locked ? 'bg-amber-400' : 'bg-slate-200'}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow flex items-center justify-center transition-all duration-200 ${locked ? 'left-4 text-amber-500' : 'left-0.5 text-slate-400'}`}>
              {locked ? <Lock size={9} /> : <LockOpen size={9} />}
            </span>
          </button>
          {!locked && <ConfirmDeleteButton onConfirm={onRemove} size={15} />}
          <button type="button" className="text-slate-400 hover:text-slate-600 p-1" onClick={() => setExpanded(e => !e)}>
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {/* Body */}
      {expanded && (
        <fieldset disabled={locked} className={`border-t border-slate-200 ${locked ? 'opacity-60 pointer-events-none' : ''}`}>
          <div className="p-5 space-y-4">

            {/* Data */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Data valutazione</label>
              <input
                type="date"
                {...register(`${prefix}.date`)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default"
              />
            </div>

            {/* Items grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BARTHEL_ITEMS.map((item) => (
                <div key={item.key}>
                  <p className="text-xs font-semibold text-slate-600 mb-2">{item.label}</p>
                  <div className={BOX}>
                    {(item.options as readonly { value: string; label: string }[]).map(opt => (
                      <label key={opt.value} className="flex items-center justify-between cursor-pointer">
                        <span className={RL}>
                          <input
                            type="radio"
                            value={opt.value}
                            {...register(`${prefix}.${item.key}` as `barthelEvaluations.${number}.${BarthelKey}`)}
                            className={RADIO}
                          />
                          {opt.label}
                        </span>
                        <span className="text-xs font-semibold text-slate-400 ml-2 flex-shrink-0">{opt.value} pt</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Score bar */}
            <div className={`flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 rounded-r-lg ${
              risk ? risk.border : 'border-slate-300'
            }`}>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Indice di Barthel</span>
              <span className={`text-sm font-bold ${risk ? risk.text : 'text-slate-400'}`}>
                {score === null
                  ? 'Compilare tutti i campi'
                  : `${risk!.label} — Punteggio ${score}/100`
                }
              </span>
            </div>

          </div>
        </fieldset>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Borg items
// ─────────────────────────────────────────────

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
  if (n === 0)    return 'border-emerald-500';
  if (n <= 2)     return 'border-teal-400';
  if (n <= 4)     return 'border-amber-400';
  if (n <= 6)     return 'border-orange-400';
  return 'border-rose-500';
}

function borgTextColor(value: string): string {
  const n = parseFloat(value);
  if (n === 0)    return 'text-emerald-700';
  if (n <= 2)     return 'text-teal-700';
  if (n <= 4)     return 'text-amber-700';
  if (n <= 6)     return 'text-orange-700';
  return 'text-rose-700';
}

// ─────────────────────────────────────────────
// AVPU
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// Glasgow Coma Scale
// ─────────────────────────────────────────────

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

function gcsRisk(score: number): { label: string; border: string; text: string; badge: string; num: string } {
  if (score <= 8)  return { label: 'Coma grave',          border: 'border-rose-500',    text: 'text-rose-700',    badge: 'bg-rose-100 text-rose-700 border-rose-200',          num: 'bg-rose-100 text-rose-700'    };
  if (score <= 12) return { label: 'Coma moderato',        border: 'border-amber-500',   text: 'text-amber-700',   badge: 'bg-amber-100 text-amber-700 border-amber-200',        num: 'bg-amber-100 text-amber-700'  };
  if (score <= 14) return { label: 'Alterazione lieve',    border: 'border-amber-300',   text: 'text-amber-600',   badge: 'bg-amber-50 text-amber-600 border-amber-200',         num: 'bg-amber-50 text-amber-600'   };
  return                   { label: 'Coscienza normale',   border: 'border-emerald-500', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',  num: 'bg-emerald-100 text-emerald-700' };
}

function GcsCard({ index, onRemove, locked, onToggleLock }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const { register } = useFormContext();
  const prefix = `gcsEvaluations.${index}`;

  const date    = useWatch({ name: `${prefix}.date` });
  const time    = useWatch({ name: `${prefix}.time` }) as string | undefined;
  const eyes    = useWatch({ name: `${prefix}.eyes` })   as string | undefined;
  const verbal  = useWatch({ name: `${prefix}.verbal` }) as string | undefined;
  const motor   = useWatch({ name: `${prefix}.motor` })  as string | undefined;

  const allAnswered = [eyes, verbal, motor].every(v => v !== undefined && v !== '');
  const score = allAnswered ? parseInt(eyes!) + parseInt(verbal!) + parseInt(motor!) : null;
  const risk  = score !== null ? gcsRisk(score) : null;

  const dateLabel = date
    ? `${new Date(date + 'T00:00:00').toLocaleDateString('it-IT')}${time ? ` ${time}` : ''}`
    : `Valutazione ${index + 1}`;

  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${
      locked ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200 bg-white'
    }`}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50/80 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        <div className={`flex-shrink-0 w-7 h-7 rounded-full font-bold text-sm flex items-center justify-center select-none ${
          risk ? risk.num : 'bg-slate-100 text-slate-400'
        }`}>
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
        <div className="flex items-center gap-1.5 flex-shrink-0 print:hidden" onClick={e => e.stopPropagation()}>
          <button
            type="button"
            onClick={onToggleLock}
            title={locked ? 'Sblocca' : 'Blocca'}
            className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${locked ? 'bg-amber-400' : 'bg-slate-200'}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow flex items-center justify-center transition-all duration-200 ${locked ? 'left-4 text-amber-500' : 'left-0.5 text-slate-400'}`}>
              {locked ? <Lock size={9} /> : <LockOpen size={9} />}
            </span>
          </button>
          {!locked && <ConfirmDeleteButton onConfirm={onRemove} size={15} />}
          <button type="button" className="text-slate-400 hover:text-slate-600 p-1" onClick={() => setExpanded(e => !e)}>
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {/* Body */}
      {expanded && (
        <fieldset disabled={locked} className={`border-t border-slate-200 ${locked ? 'opacity-60 pointer-events-none' : ''}`}>
          <div className="p-5 space-y-4">

            {/* Data e ora */}
            <div className="flex gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Data</label>
                <input type="date" {...register(`${prefix}.date`)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Ora</label>
                <input type="time" {...register(`${prefix}.time`)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default"
                />
              </div>
            </div>

            {/* 3 subscales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* E — Eye */}
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

              {/* V — Verbal */}
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

              {/* M — Motor */}
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

            {/* Note */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Note</label>
              <textarea
                {...register(`${prefix}.notes`)}
                rows={2}
                placeholder={locked ? '—' : 'Osservazioni aggiuntive...'}
                className={TA}
              />
            </div>

            {/* Score bar */}
            <div className={`flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 rounded-r-lg ${
              risk ? risk.border : 'border-slate-300'
            }`}>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Glasgow Coma Scale</span>
              <span className={`text-sm font-bold ${risk ? risk.text : 'text-slate-400'}`}>
                {score === null
                  ? 'Compilare tutti i campi'
                  : `${risk!.label} — GCS ${score}/15`
                }
              </span>
            </div>

          </div>
        </fieldset>
      )}
    </div>
  );
}

function AvpuCard({ index, onRemove, locked, onToggleLock }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const { register } = useFormContext();
  const prefix = `avpuEvaluations.${index}`;

  const date  = useWatch({ name: `${prefix}.date` });
  const time  = useWatch({ name: `${prefix}.time` }) as string | undefined;
  const score = useWatch({ name: `${prefix}.score` }) as string | undefined;

  const level = score ? avpuLevel(score) : null;

  const dateLabel = date
    ? `${new Date(date + 'T00:00:00').toLocaleDateString('it-IT')}${time ? ` ${time}` : ''}`
    : `Valutazione ${index + 1}`;

  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${
      locked ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200 bg-white'
    }`}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50/80 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
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
        <div className="flex items-center gap-1.5 flex-shrink-0 print:hidden" onClick={e => e.stopPropagation()}>
          <button
            type="button"
            onClick={onToggleLock}
            title={locked ? 'Sblocca' : 'Blocca'}
            className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${locked ? 'bg-amber-400' : 'bg-slate-200'}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow flex items-center justify-center transition-all duration-200 ${locked ? 'left-4 text-amber-500' : 'left-0.5 text-slate-400'}`}>
              {locked ? <Lock size={9} /> : <LockOpen size={9} />}
            </span>
          </button>
          {!locked && <ConfirmDeleteButton onConfirm={onRemove} size={15} />}
          <button type="button" className="text-slate-400 hover:text-slate-600 p-1" onClick={() => setExpanded(e => !e)}>
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {/* Body */}
      {expanded && (
        <fieldset disabled={locked} className={`border-t border-slate-200 ${locked ? 'opacity-60 pointer-events-none' : ''}`}>
          <div className="p-5 space-y-4">

            {/* Data e ora */}
            <div className="flex gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Data</label>
                <input type="date" {...register(`${prefix}.date`)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Ora</label>
                <input type="time" {...register(`${prefix}.time`)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default"
                />
              </div>
            </div>

            {/* AVPU options */}
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-2">Livello di coscienza</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                        <span className="font-mono font-bold text-base leading-none mt-0.5 w-4 flex-shrink-0">
                          {lvl.value}
                        </span>
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

            {/* Note */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Note</label>
              <textarea
                {...register(`${prefix}.notes`)}
                rows={2}
                placeholder={locked ? '—' : 'Osservazioni aggiuntive...'}
                className={TA}
              />
            </div>

            {/* Score bar */}
            <div className={`flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 rounded-r-lg ${
              level ? level.border : 'border-slate-300'
            }`}>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Scala AVPU</span>
              <span className={`text-sm font-bold ${level ? level.text : 'text-slate-400'}`}>
                {level ? level.title : 'Selezionare un livello'}
              </span>
            </div>

          </div>
        </fieldset>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// BorgCard
// ─────────────────────────────────────────────

function BorgCard({ index, onRemove, locked, onToggleLock }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const { register } = useFormContext();
  const prefix = `borgEvaluations.${index}`;

  const date  = useWatch({ name: `${prefix}.date` });
  const time  = useWatch({ name: `${prefix}.time` }) as string | undefined;
  const score = useWatch({ name: `${prefix}.score` }) as string | undefined;
  const hasScore = score !== undefined && score !== '';

  const dateLabel = date
    ? `${new Date(date + 'T00:00:00').toLocaleDateString('it-IT')}${time ? ` ${time}` : ''}`
    : `Valutazione ${index + 1}`;

  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${
      locked ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200 bg-white'
    }`}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50/80 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
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
        <div className="flex items-center gap-1.5 flex-shrink-0 print:hidden" onClick={e => e.stopPropagation()}>
          <button
            type="button"
            onClick={onToggleLock}
            title={locked ? 'Sblocca' : 'Blocca'}
            className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${locked ? 'bg-amber-400' : 'bg-slate-200'}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow flex items-center justify-center transition-all duration-200 ${locked ? 'left-4 text-amber-500' : 'left-0.5 text-slate-400'}`}>
              {locked ? <Lock size={9} /> : <LockOpen size={9} />}
            </span>
          </button>
          {!locked && <ConfirmDeleteButton onConfirm={onRemove} size={15} />}
          <button type="button" className="text-slate-400 hover:text-slate-600 p-1" onClick={() => setExpanded(e => !e)}>
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {/* Body */}
      {expanded && (
        <fieldset disabled={locked} className={`border-t border-slate-200 ${locked ? 'opacity-60 pointer-events-none' : ''}`}>
          <div className="p-5 space-y-4">

            {/* Data e ora */}
            <div className="flex gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Data</label>
                <input
                  type="date"
                  {...register(`${prefix}.date`)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Ora</label>
                <input
                  type="time"
                  {...register(`${prefix}.time`)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default"
                />
              </div>
            </div>

            {/* Borg grid */}
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-2">Intensità percepita della dispnea / sforzo</p>
              <div className="grid grid-cols-2 gap-1.5">
                {BORG_LEVELS.map(level => {
                  const isSelected = score === level.value;
                  return (
                    <label key={level.value} className="cursor-pointer">
                      <input
                        type="radio"
                        value={level.value}
                        {...register(`${prefix}.score`)}
                        className="sr-only"
                      />
                      <span className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${
                        isSelected
                          ? `${level.color} font-semibold shadow-sm`
                          : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}>
                        <span className="font-mono font-bold w-6 flex-shrink-0 text-right">{level.value}</span>
                        <span className="text-xs leading-tight">{level.label}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Note</label>
              <textarea
                {...register(`${prefix}.notes`)}
                rows={2}
                placeholder={locked ? '—' : 'Osservazioni (es. a riposo, durante deambulazione, dopo fisioterapia...)'}
                className={TA}
              />
            </div>

            {/* Score bar */}
            <div className={`flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 rounded-r-lg ${
              hasScore ? borgBorderColor(score!) : 'border-slate-300'
            }`}>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Scala di Borg</span>
              <span className={`text-sm font-bold ${hasScore ? borgTextColor(score!) : 'text-slate-400'}`}>
                {hasScore
                  ? `${borgLabel(score!)} — Punteggio ${score}/10`
                  : 'Selezionare un livello'
                }
              </span>
            </div>

          </div>
        </fieldset>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// THROAT items
// ─────────────────────────────────────────────

const THROAT_ITEMS = [
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

function throatRiskLevel(score: number): { label: string; border: string; text: string; badge: string } {
  if (score === 0)  return { label: 'Cavo orale sano',      border: 'border-emerald-500', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
  if (score <= 9)   return { label: 'Lieve alterazione',    border: 'border-amber-300',   text: 'text-amber-600',  badge: 'bg-amber-50 text-amber-600 border-amber-200'        };
  if (score <= 18)  return { label: 'Disfunzione moderata', border: 'border-amber-500',   text: 'text-amber-700',  badge: 'bg-amber-100 text-amber-700 border-amber-200'       };
  return                    { label: 'Disfunzione grave',   border: 'border-rose-500',    text: 'text-rose-700',   badge: 'bg-rose-100 text-rose-700 border-rose-200'          };
}

function throatNumBadge(score: number): string {
  if (score === 0)  return 'bg-emerald-100 text-emerald-700';
  if (score <= 9)   return 'bg-amber-50 text-amber-600';
  if (score <= 18)  return 'bg-amber-100 text-amber-700';
  return 'bg-rose-100 text-rose-700';
}

// ─────────────────────────────────────────────
// ThroatCard
// ─────────────────────────────────────────────

function ThroatCard({ index, onRemove, locked, onToggleLock }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const { register } = useFormContext();
  const prefix = `throatEvaluations.${index}`;

  const date   = useWatch({ name: `${prefix}.date` });
  const time   = useWatch({ name: `${prefix}.time` }) as string | undefined;
  const values = useWatch({ name: THROAT_ITEMS.map(i => `${prefix}.${i.key}`) }) as (string | undefined)[];

  const allAnswered = values.every(v => v !== undefined && v !== '');
  const score = allAnswered ? values.reduce((sum, v) => sum + parseInt(v!), 0) : null;
  const risk  = score !== null ? throatRiskLevel(score) : null;

  const dateLabel = date
    ? `${new Date(date + 'T00:00:00').toLocaleDateString('it-IT')}${time ? ` ${time}` : ''}`
    : `Valutazione ${index + 1}`;

  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${
      locked ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200 bg-white'
    }`}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50/80 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
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
        <div className="flex items-center gap-1.5 flex-shrink-0 print:hidden" onClick={e => e.stopPropagation()}>
          <button
            type="button"
            onClick={onToggleLock}
            title={locked ? 'Sblocca' : 'Blocca'}
            className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${locked ? 'bg-amber-400' : 'bg-slate-200'}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow flex items-center justify-center transition-all duration-200 ${locked ? 'left-4 text-amber-500' : 'left-0.5 text-slate-400'}`}>
              {locked ? <Lock size={9} /> : <LockOpen size={9} />}
            </span>
          </button>
          {!locked && <ConfirmDeleteButton onConfirm={onRemove} size={15} />}
          <button type="button" className="text-slate-400 hover:text-slate-600 p-1" onClick={() => setExpanded(e => !e)}>
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {/* Body */}
      {expanded && (
        <fieldset disabled={locked} className={`border-t border-slate-200 ${locked ? 'opacity-60 pointer-events-none' : ''}`}>
          <div className="p-5 space-y-4">

            {/* Data e ora */}
            <div className="flex gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Data</label>
                <input
                  type="date"
                  {...register(`${prefix}.date`)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Ora</label>
                <input
                  type="time"
                  {...register(`${prefix}.time`)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default"
                />
              </div>
            </div>

            {/* Items grid */}
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
                            <input
                              type="radio"
                              value={opt.value}
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

            {/* Score bar */}
            <div className={`flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 rounded-r-lg ${
              risk ? risk.border : 'border-slate-300'
            }`}>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Stato cavo orale</span>
              <span className={`text-sm font-bold text-right ${risk ? risk.text : 'text-slate-400'}`}>
                {score === null
                  ? 'Compilare tutti i campi'
                  : `${risk!.label} — Punteggio ${score}`
                }
              </span>
            </div>

          </div>
        </fieldset>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// MustCard
// ─────────────────────────────────────────────

function MustCard({ index, onRemove, locked, onToggleLock }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const { register } = useFormContext();
  const prefix = `mustEvaluations.${index}`;

  const date  = useWatch({ name: `${prefix}.date` });
  const step1 = useWatch({ name: `${prefix}.step1Bmi` })          as string | undefined;
  const step2 = useWatch({ name: `${prefix}.step2WeightLoss` })   as string | undefined;
  const step3 = useWatch({ name: `${prefix}.step3AcuteDisease` }) as string | undefined;

  const allAnswered = [step1, step2, step3].every(v => v !== undefined && v !== '');
  const score = allAnswered
    ? parseInt(step1!) + parseInt(step2!) + (step3 === 'true' ? 2 : 0)
    : null;
  const risk = score !== null ? mustRisk(score) : null;

  const dateLabel = date
    ? new Date(date + 'T00:00:00').toLocaleDateString('it-IT')
    : `Valutazione ${index + 1}`;

  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${
      locked ? 'border-amber-200 bg-amber-50/30' : 'border-slate-200 bg-white'
    }`}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50/80 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        {/* Number badge */}
        <div className={`flex-shrink-0 w-7 h-7 rounded-full font-bold text-sm flex items-center justify-center select-none ${
          risk ? risk.num : 'bg-slate-100 text-slate-400'
        }`}>
          {index + 1}
        </div>

        {/* Date */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 truncate">{dateLabel}</p>
        </div>

        {/* Score + risk badge */}
        {risk && (
          <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full border font-semibold ${risk.badge}`}>
            {risk.label} ({score})
          </span>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0 print:hidden" onClick={e => e.stopPropagation()}>
          <button
            type="button"
            onClick={onToggleLock}
            title={locked ? 'Sblocca' : 'Blocca'}
            className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${locked ? 'bg-amber-400' : 'bg-slate-200'}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow flex items-center justify-center transition-all duration-200 ${locked ? 'left-4 text-amber-500' : 'left-0.5 text-slate-400'}`}>
              {locked ? <Lock size={9} /> : <LockOpen size={9} />}
            </span>
          </button>
          {!locked && <ConfirmDeleteButton onConfirm={onRemove} size={15} />}
          <button type="button" className="text-slate-400 hover:text-slate-600 p-1" onClick={() => setExpanded(e => !e)}>
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {/* Body */}
      {expanded && (
        <fieldset disabled={locked} className={`border-t border-slate-200 ${locked ? 'opacity-60 pointer-events-none' : ''}`}>
          <div className="p-5 space-y-5">

            {/* Data */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Data valutazione</label>
              <input
                type="date"
                {...register(`${prefix}.date`)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default"
              />
            </div>

            {/* Step 1 — BMI */}
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

            {/* Step 2 — Decremento ponderale */}
            <div>
              <p className={SUB}>Step 2 — Decremento ponderale non volontario (ultimi 3–6 mesi)</p>
              <div className={BOX}>
                {[
                  { value: '0', label: '< 5%',   pts: '+0 pt' },
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

            {/* Step 3 — Malattia acuta */}
            <div>
              <p className={SUB}>Step 3 — Effetti di malattia acuta</p>
              <div className={BOX}>
                <p className="text-sm text-slate-600">
                  Il paziente è affetto da malattia acuta e non vi è stato, o è probabile che non vi sia, alcun apporto nutrizionale per &gt; 5 giorni?
                </p>
                <div className="flex gap-6 pt-1">
                  <label className={RL}>
                    <input type="radio" value="true"  {...register(`${prefix}.step3AcuteDisease`)} className={RADIO} />
                    Sì <span className="text-xs font-semibold text-slate-400 ml-1">+2 pt</span>
                  </label>
                  <label className={RL}>
                    <input type="radio" value="false" {...register(`${prefix}.step3AcuteDisease`)} className={RADIO} />
                    No
                  </label>
                </div>
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Note</label>
              <textarea
                {...register(`${prefix}.notes`)}
                rows={2}
                placeholder={locked ? '—' : 'Osservazioni aggiuntive...'}
                className={TA}
              />
            </div>

            {/* Score bar */}
            <div className={`flex items-center justify-between gap-4 px-4 py-3 shadow-md border-l-4 rounded-r-lg ${
              score === null
                ? 'bg-slate-50 border-slate-300'
                : score === 0
                  ? 'bg-white border-emerald-500'
                  : score === 1
                    ? 'bg-white border-amber-400'
                    : 'bg-white border-rose-500'
            }`}>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rischio malnutrizione</span>
              <span className={`text-sm font-bold ${
                score === null ? 'text-slate-400' : risk!.badge.split(' ')[1]
              }`}>
                {score === null ? 'Compilare tutti gli step' : `${risk!.label} — Punteggio ${score}`}
              </span>
            </div>

          </div>
        </fieldset>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Main tab
// ─────────────────────────────────────────────

export default function ScalesTab() {
  const { setValue, control } = useFormContext();

  // ── Braden ──────────────────────────────────
  const { fields: bradenFields, append: appendBraden, remove: removeBraden } = useFieldArray({ control, name: 'bradenEvaluations' });
  const [lockedBraden, setLockedBraden] = useState<Set<number>>(new Set());
  const toggleLockBraden = (i: number) => setLockedBraden(prev => {
    const next = new Set(prev); next.has(i) ? next.delete(i) : next.add(i); return next;
  });
  const addBradenEval = () => appendBraden({
    date: new Date().toISOString().slice(0, 10),
    sensory: '', moisture: '', activity: '', mobility: '', nutrition: '', friction: '',
  });

  // Auto-update bradenScore / pressureUlcerRisk (used in Model2) from last completed evaluation
  const bradenEvals = useWatch({ name: 'bradenEvaluations' }) as Array<Record<string, string>> | undefined;
  useEffect(() => {
    if (!bradenEvals) return;
    const keys = BRADEN_ITEMS.map(i => i.key);
    for (let i = bradenEvals.length - 1; i >= 0; i--) {
      const ev = bradenEvals[i];
      if (keys.every(k => ev[k] !== undefined && ev[k] !== '')) {
        const total = keys.reduce((sum, k) => sum + parseInt(ev[k]), 0);
        setValue('bradenScore', total);
        setValue('pressureUlcerRisk', bradenRiskLevel(total).label);
        return;
      }
    }
  }, [bradenEvals, setValue]);

  // ── Barthel ─────────────────────────────────
  const { fields: barthelFields, append: appendBarthel, remove: removeBarthel } = useFieldArray({ control, name: 'barthelEvaluations' });
  const [lockedBarthel, setLockedBarthel] = useState<Set<number>>(new Set());
  const toggleLockBarthel = (i: number) => setLockedBarthel(prev => {
    const next = new Set(prev); next.has(i) ? next.delete(i) : next.add(i); return next;
  });
  const addBarthelEval = () => appendBarthel({
    date: new Date().toISOString().slice(0, 10),
    feeding: '', bathing: '', grooming: '', dressing: '', bowel: '',
    bladder: '', toilet: '', transfer: '', mobility: '', stairs: '',
  });

  // Auto-update barthelScore (used in Model4) from last completed evaluation
  const barthelEvals = useWatch({ name: 'barthelEvaluations' }) as Array<Record<string, string>> | undefined;
  useEffect(() => {
    if (!barthelEvals) return;
    const keys = BARTHEL_ITEMS.map(i => i.key);
    for (let i = barthelEvals.length - 1; i >= 0; i--) {
      const ev = barthelEvals[i];
      if (keys.every(k => ev[k] !== undefined && ev[k] !== '')) {
        const total = keys.reduce((sum, k) => sum + parseInt(ev[k]), 0);
        setValue('barthelScore', String(total));
        return;
      }
    }
  }, [barthelEvals, setValue]);

  // ── GCS ─────────────────────────────────────
  const { fields: gcsFields, append: appendGcs, remove: removeGcs } = useFieldArray({ control, name: 'gcsEvaluations' });
  const [lockedGcs, setLockedGcs] = useState<Set<number>>(new Set());
  const toggleLockGcs = (i: number) => setLockedGcs(prev => {
    const next = new Set(prev); next.has(i) ? next.delete(i) : next.add(i); return next;
  });
  const addGcsEval = () => appendGcs({
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toTimeString().slice(0, 5),
    eyes: '', verbal: '', motor: '', notes: '',
  });

  // Auto-update gcsScore (used in Model6) from last completed evaluation
  const gcsEvals = useWatch({ name: 'gcsEvaluations' }) as Array<Record<string, string>> | undefined;
  useEffect(() => {
    if (!gcsEvals) return;
    for (let i = gcsEvals.length - 1; i >= 0; i--) {
      const ev = gcsEvals[i];
      if (ev.eyes && ev.verbal && ev.motor) {
        setValue('gcsScore', String(parseInt(ev.eyes) + parseInt(ev.verbal) + parseInt(ev.motor)));
        return;
      }
    }
  }, [gcsEvals, setValue]);

  // ── AVPU ────────────────────────────────────
  const { fields: avpuFields, append: appendAvpu, remove: removeAvpu } = useFieldArray({ control, name: 'avpuEvaluations' });
  const [lockedAvpu, setLockedAvpu] = useState<Set<number>>(new Set());
  const toggleLockAvpu = (i: number) => setLockedAvpu(prev => {
    const next = new Set(prev); next.has(i) ? next.delete(i) : next.add(i); return next;
  });
  const addAvpuEval = () => appendAvpu({
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toTimeString().slice(0, 5),
    score: '', notes: '',
  });

  // Auto-update avpuScore (used in Model6) from last completed evaluation
  const avpuEvals = useWatch({ name: 'avpuEvaluations' }) as Array<Record<string, string>> | undefined;
  useEffect(() => {
    if (!avpuEvals) return;
    for (let i = avpuEvals.length - 1; i >= 0; i--) {
      if (avpuEvals[i].score) {
        setValue('avpuScore', avpuEvals[i].score);
        return;
      }
    }
  }, [avpuEvals, setValue]);

  // ── Borg ────────────────────────────────────
  const { fields: borgFields, append: appendBorg, remove: removeBorg } = useFieldArray({ control, name: 'borgEvaluations' });
  const [lockedBorg, setLockedBorg] = useState<Set<number>>(new Set());
  const toggleLockBorg = (i: number) => setLockedBorg(prev => {
    const next = new Set(prev); next.has(i) ? next.delete(i) : next.add(i); return next;
  });
  const addBorgEval = () => appendBorg({
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toTimeString().slice(0, 5),
    score: '', notes: '',
  });

  // ── THROAT ──────────────────────────────────
  const { fields: throatFields, append: appendThroat, remove: removeThroat } = useFieldArray({ control, name: 'throatEvaluations' });
  const [lockedThroat, setLockedThroat] = useState<Set<number>>(new Set());
  const toggleLockThroat = (i: number) => setLockedThroat(prev => {
    const next = new Set(prev); next.has(i) ? next.delete(i) : next.add(i); return next;
  });
  const addThroatEval = () => appendThroat({
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toTimeString().slice(0, 5),
    lips: '', teeth: '', gums: '', mucosa: '', tongue: '',
    saliva: '', pharynx: '', voice: '', swallowing: '',
  });

  // Auto-update throatScaleScore (used in Model2) from last completed evaluation
  const throatEvals = useWatch({ name: 'throatEvaluations' }) as Array<Record<string, string>> | undefined;
  useEffect(() => {
    if (!throatEvals) return;
    const keys = THROAT_ITEMS.map(i => i.key);
    for (let i = throatEvals.length - 1; i >= 0; i--) {
      const ev = throatEvals[i];
      if (keys.every(k => ev[k] !== undefined && ev[k] !== '')) {
        const total = keys.reduce((sum, k) => sum + parseInt(ev[k]), 0);
        setValue('throatScaleScore', String(total));
        return;
      }
    }
  }, [throatEvals, setValue]);

  // ── Conley ──────────────────────────────────
  const { fields: conleyFields, append: appendConley, remove: removeConley } = useFieldArray({ control, name: 'conleyEvaluations' });
  const [lockedConley, setLockedConley] = useState<Set<number>>(new Set());
  const toggleLockConley = (i: number) => setLockedConley(prev => {
    const next = new Set(prev); next.has(i) ? next.delete(i) : next.add(i); return next;
  });
  const addConleyEval = () => appendConley({
    date: new Date().toISOString().slice(0, 10),
    conley1: '', conley2: '', conley3: '', conley4: '', conley5: '', conley6: '',
  });

  // ── MUST ────────────────────────────────────
  const { fields, append, remove } = useFieldArray({ control, name: 'mustEvaluations' });
  const [lockedRows, setLockedRows] = useState<Set<number>>(new Set());

  const toggleLock = (i: number) => setLockedRows(prev => {
    const next = new Set(prev); next.has(i) ? next.delete(i) : next.add(i); return next;
  });

  const addEvaluation = () => append({
    date: new Date().toISOString().slice(0, 10),
    step1Bmi: '', step2WeightLoss: '', step3AcuteDisease: '', notes: '',
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      {/* ── Braden ── */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 flex items-center gap-1">
            Scala Braden (Rischio Lesioni da Pressione)
            <InfoTooltip content={
              <table className="w-full text-xs border-collapse">
                <tbody>
                  {[
                    ['≤ 9',    'Rischio Altissimo'],
                    ['10–12',  'Rischio Alto'],
                    ['13–14',  'Rischio Moderato'],
                    ['15–18',  'Rischio Basso'],
                    ['≥ 19',   'Nessun Rischio'],
                  ].map(([range, label]) => (
                    <tr key={range}>
                      <td className="pr-3 font-mono font-bold">{range}</td>
                      <td>{label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            } />
          </h3>
          <button
            type="button"
            onClick={addBradenEval}
            className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
          >
            <Plus size={16} /> Aggiungi valutazione
          </button>
        </div>
        {bradenFields.length === 0 ? (
          <div className="text-sm text-slate-500 italic p-6 bg-slate-50 border border-slate-200 rounded-lg text-center print:hidden">
            Nessuna valutazione inserita. Clicca "Aggiungi valutazione" per iniziare.
          </div>
        ) : (
          <div className="space-y-4">
            {bradenFields.map((field, index) => (
              <BradenCard
                key={field.id}
                index={index}
                onRemove={() => removeBraden(index)}
                locked={lockedBraden.has(index)}
                onToggleLock={() => toggleLockBraden(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Conley ── */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 flex items-center gap-1">
            Scala Conley (Rischio Cadute)
            <InfoTooltip content={
              <table className="w-full text-xs border-collapse">
                <tbody>
                  {[
                    ['0–1', 'Non a rischio'],
                    ['≥ 2', 'A rischio di caduta'],
                  ].map(([range, label]) => (
                    <tr key={range}>
                      <td className="pr-3 font-mono font-bold">{range}</td>
                      <td>{label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            } />
          </h3>
          <button
            type="button"
            onClick={addConleyEval}
            className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
          >
            <Plus size={16} /> Aggiungi valutazione
          </button>
        </div>
        {conleyFields.length === 0 ? (
          <div className="text-sm text-slate-500 italic p-6 bg-slate-50 border border-slate-200 rounded-lg text-center print:hidden">
            Nessuna valutazione inserita. Clicca "Aggiungi valutazione" per iniziare.
          </div>
        ) : (
          <div className="space-y-4">
            {conleyFields.map((field, index) => (
              <ConleyCard
                key={field.id}
                index={index}
                onRemove={() => removeConley(index)}
                locked={lockedConley.has(index)}
                onToggleLock={() => toggleLockConley(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── MUST ── */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 flex items-center gap-1">
            Scala MUST (Rischio Malnutrizione)
            <InfoTooltip content={
              <table className="w-full text-xs border-collapse">
                <tbody>
                  {[
                    ['0',   'Rischio Basso'],
                    ['1',   'Rischio Medio'],
                    ['≥ 2', 'Rischio Alto'],
                  ].map(([range, label]) => (
                    <tr key={range}>
                      <td className="pr-3 font-mono font-bold">{range}</td>
                      <td>{label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            } />
          </h3>
          <button
            type="button"
            onClick={addEvaluation}
            className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
          >
            <Plus size={16} /> Aggiungi valutazione
          </button>
        </div>

        {fields.length === 0 ? (
          <div className="text-sm text-slate-500 italic p-6 bg-slate-50 border border-slate-200 rounded-lg text-center print:hidden">
            Nessuna valutazione inserita. Clicca "Aggiungi valutazione" per iniziare.
          </div>
        ) : (
          <div className="space-y-4">
            {fields.map((field, index) => (
              <MustCard
                key={field.id}
                index={index}
                onRemove={() => remove(index)}
                locked={lockedRows.has(index)}
                onToggleLock={() => toggleLock(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── GCS ── */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 flex items-center gap-1">
            Glasgow Coma Scale (GCS)
            <InfoTooltip content={
              <table className="w-full text-xs border-collapse">
                <tbody>
                  {[
                    ['3–8',   'Coma grave'],
                    ['9–12',  'Coma moderato'],
                    ['13–14', 'Alterazione lieve'],
                    ['15',    'Coscienza normale'],
                  ].map(([range, label]) => (
                    <tr key={range}>
                      <td className="pr-3 font-mono font-bold">{range}</td>
                      <td>{label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            } />
          </h3>
          <button
            type="button"
            onClick={addGcsEval}
            className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
          >
            <Plus size={16} /> Aggiungi valutazione
          </button>
        </div>
        {gcsFields.length === 0 ? (
          <div className="text-sm text-slate-500 italic p-6 bg-slate-50 border border-slate-200 rounded-lg text-center print:hidden">
            Nessuna valutazione inserita. Clicca "Aggiungi valutazione" per iniziare.
          </div>
        ) : (
          <div className="space-y-4">
            {gcsFields.map((field, index) => (
              <GcsCard
                key={field.id}
                index={index}
                onRemove={() => removeGcs(index)}
                locked={lockedGcs.has(index)}
                onToggleLock={() => toggleLockGcs(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── AVPU ── */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 flex items-center gap-1">
            Scala AVPU (Livello di Coscienza)
            <InfoTooltip content={
              <table className="w-full text-xs border-collapse">
                <tbody>
                  {[
                    ['A', 'Alert — Vigile e orientato'],
                    ['V', 'Voice — Risponde alla voce'],
                    ['P', 'Pain — Risponde al dolore'],
                    ['U', 'Unresponsive — Non risponde'],
                  ].map(([val, label]) => (
                    <tr key={val}>
                      <td className="pr-3 font-mono font-bold">{val}</td>
                      <td>{label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            } />
          </h3>
          <button
            type="button"
            onClick={addAvpuEval}
            className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
          >
            <Plus size={16} /> Aggiungi valutazione
          </button>
        </div>
        {avpuFields.length === 0 ? (
          <div className="text-sm text-slate-500 italic p-6 bg-slate-50 border border-slate-200 rounded-lg text-center print:hidden">
            Nessuna valutazione inserita. Clicca "Aggiungi valutazione" per iniziare.
          </div>
        ) : (
          <div className="space-y-4">
            {avpuFields.map((field, index) => (
              <AvpuCard
                key={field.id}
                index={index}
                onRemove={() => removeAvpu(index)}
                locked={lockedAvpu.has(index)}
                onToggleLock={() => toggleLockAvpu(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Borg ── */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 flex items-center gap-1">
            Scala di Borg (Dispnea / Sforzo percepito)
            <InfoTooltip content={
              <table className="w-full text-xs border-collapse">
                <tbody>
                  {[
                    ['0',     'Nessuna'],
                    ['0.5–1', 'Molto lieve'],
                    ['2–3',   'Lieve – Moderata'],
                    ['4–6',   'Intensa'],
                    ['7–10',  'Molto intensa – Massimale'],
                  ].map(([range, label]) => (
                    <tr key={range}>
                      <td className="pr-3 font-mono font-bold">{range}</td>
                      <td>{label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            } />
          </h3>
          <button
            type="button"
            onClick={addBorgEval}
            className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
          >
            <Plus size={16} /> Aggiungi valutazione
          </button>
        </div>
        {borgFields.length === 0 ? (
          <div className="text-sm text-slate-500 italic p-6 bg-slate-50 border border-slate-200 rounded-lg text-center print:hidden">
            Nessuna valutazione inserita. Clicca "Aggiungi valutazione" per iniziare.
          </div>
        ) : (
          <div className="space-y-4">
            {borgFields.map((field, index) => (
              <BorgCard
                key={field.id}
                index={index}
                onRemove={() => removeBorg(index)}
                locked={lockedBorg.has(index)}
                onToggleLock={() => toggleLockBorg(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Barthel ── */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 flex items-center gap-1">
            Indice di Barthel (ADL)
            <InfoTooltip content={
              <table className="w-full text-xs border-collapse">
                <tbody>
                  {[
                    ['0–20',   'Dipendenza totale'],
                    ['21–60',  'Dipendenza grave'],
                    ['61–90',  'Dipendenza moderata'],
                    ['91–99',  'Dipendenza lieve'],
                    ['100',    'Indipendente'],
                  ].map(([range, label]) => (
                    <tr key={range}>
                      <td className="pr-3 font-mono font-bold">{range}</td>
                      <td>{label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            } />
          </h3>
          <button
            type="button"
            onClick={addBarthelEval}
            className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
          >
            <Plus size={16} /> Aggiungi valutazione
          </button>
        </div>
        {barthelFields.length === 0 ? (
          <div className="text-sm text-slate-500 italic p-6 bg-slate-50 border border-slate-200 rounded-lg text-center print:hidden">
            Nessuna valutazione inserita. Clicca "Aggiungi valutazione" per iniziare.
          </div>
        ) : (
          <div className="space-y-4">
            {barthelFields.map((field, index) => (
              <BarthelCard
                key={field.id}
                index={index}
                onRemove={() => removeBarthel(index)}
                locked={lockedBarthel.has(index)}
                onToggleLock={() => toggleLockBarthel(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── THROAT ── */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 flex items-center gap-1">
            Scala THROAT (Salute del Cavo Orale)
            <InfoTooltip content={
              <table className="w-full text-xs border-collapse">
                <tbody>
                  {[
                    ['0',     'Cavo orale sano'],
                    ['1–9',   'Lieve alterazione'],
                    ['10–18', 'Disfunzione moderata'],
                    ['19–27', 'Disfunzione grave'],
                  ].map(([range, label]) => (
                    <tr key={range}>
                      <td className="pr-3 font-mono font-bold">{range}</td>
                      <td>{label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            } />
          </h3>
          <button
            type="button"
            onClick={addThroatEval}
            className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
          >
            <Plus size={16} /> Aggiungi valutazione
          </button>
        </div>
        {throatFields.length === 0 ? (
          <div className="text-sm text-slate-500 italic p-6 bg-slate-50 border border-slate-200 rounded-lg text-center print:hidden">
            Nessuna valutazione inserita. Clicca "Aggiungi valutazione" per iniziare.
          </div>
        ) : (
          <div className="space-y-4">
            {throatFields.map((field, index) => (
              <ThroatCard
                key={field.id}
                index={index}
                onRemove={() => removeThroat(index)}
                locked={lockedThroat.has(index)}
                onToggleLock={() => toggleLockThroat(index)}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
