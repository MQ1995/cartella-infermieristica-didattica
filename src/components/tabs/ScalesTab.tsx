import { useState, useEffect } from "react";
import { useFormContext, useWatch, useFieldArray } from 'react-hook-form';
import { Plus, ChevronDown, ChevronUp, Lock, LockOpen } from 'lucide-react';
import { ConfirmDeleteButton } from '../ui/ConfirmDeleteButton';

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
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200">
            Scala Braden (Rischio Lesioni da Pressione)
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
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200">
            Scala Conley (Rischio Cadute)
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
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200">
            Scala MUST (Rischio Malnutrizione)
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

    </div>
  );
}
