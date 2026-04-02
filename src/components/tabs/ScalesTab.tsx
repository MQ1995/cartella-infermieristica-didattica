import { useState, useEffect } from "react";
import { useFormContext, useWatch, useFieldArray } from 'react-hook-form';
import { Plus, ChevronDown, ChevronUp, Lock, LockOpen } from 'lucide-react';
import { Select } from '../ui/Select';
import { LockableSection } from '../ui/LockableSection';
import { ConfirmDeleteButton } from '../ui/ConfirmDeleteButton';

const RADIO = 'w-4 h-4 text-emerald-600 focus:ring-emerald-500';
const RL    = 'flex items-center gap-1.5 cursor-pointer text-sm text-slate-700';
const SUB   = 'text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 mb-3';
const BOX   = 'rounded-lg border border-slate-200 p-3 space-y-2.5';
const TA    = 'w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white resize-y disabled:bg-transparent disabled:border-transparent disabled:cursor-default';

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
  const { watch, setValue, register, control } = useFormContext();

  // ── Braden ──────────────────────────────────
  const sensory   = watch('bradenSensory')   || '0';
  const moisture  = watch('bradenMoisture')  || '0';
  const activity  = watch('bradenActivity')  || '0';
  const mobility  = watch('bradenMobility')  || '0';
  const nutrition = watch('bradenNutrition') || '0';
  const friction  = watch('bradenFriction')  || '0';

  useEffect(() => {
    const total =
      parseInt(sensory) + parseInt(moisture) + parseInt(activity) +
      parseInt(mobility) + parseInt(nutrition) + parseInt(friction);
    if (total > 0) {
      setValue('bradenScore', total);
      let riskLevel = 'Nessun Rischio';
      if (total <= 9)       riskLevel = 'Rischio Altissimo';
      else if (total <= 12) riskLevel = 'Rischio Alto';
      else if (total <= 14) riskLevel = 'Rischio Moderato';
      else if (total <= 15) riskLevel = 'Rischio Basso';
      setValue('pressureUlcerRisk', riskLevel);
    }
  }, [sensory, moisture, activity, mobility, nutrition, friction, setValue]);

  const bradenScore       = watch('bradenScore');
  const pressureUlcerRisk = watch('pressureUlcerRisk');

  // ── Conley ──────────────────────────────────
  const conleyValues = useWatch({ name: CONLEY_ITEMS.map(i => i.name) }) as (string | undefined)[];
  const conleyAllAnswered = conleyValues.every(v => v === 'true' || v === 'false');
  const conleyScore = conleyAllAnswered
    ? CONLEY_ITEMS.reduce((sum, item, idx) => sum + (conleyValues[idx] === 'true' ? item.pts : 0), 0)
    : null;
  const fallRisk = conleyScore !== null ? conleyScore >= 2 : null;

  useEffect(() => {
    if (conleyScore !== null) {
      setValue('conleyScore', conleyScore);
      setValue('fallRisk', fallRisk);
    }
  }, [conleyScore, fallRisk, setValue]);

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
      <LockableSection
        title="Scala Braden (Rischio Lesioni da Pressione)"
        headerRight={
          <div className="text-right">
            <div className="text-sm text-slate-500">Punteggio Totale</div>
            <div className={`text-2xl font-bold ${bradenScore <= 12 ? 'text-rose-600' : 'text-emerald-600'}`}>
              {bradenScore > 0 ? bradenScore : '—'}
            </div>
            <div className="text-xs font-medium uppercase tracking-wider">{pressureUlcerRisk}</div>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <Select name="bradenSensory"  label="1. Percezione Sensoriale" options={[
            { label: '4 - Non limitata',           value: '4' },
            { label: '3 - Leggermente limitata',   value: '3' },
            { label: '2 - Molto limitata',         value: '2' },
            { label: '1 - Completamente limitata', value: '1' },
          ]} />
          <Select name="bradenMoisture" label="2. Umidità (Esposizione della pelle)" options={[
            { label: '4 - Raramente bagnato',       value: '4' },
            { label: '3 - Occasionalmente bagnato', value: '3' },
            { label: '2 - Spesso bagnato',          value: '2' },
            { label: '1 - Completamente bagnato',   value: '1' },
          ]} />
          <Select name="bradenActivity" label="3. Attività Fisica" options={[
            { label: '4 - Cammina frequentemente',   value: '4' },
            { label: '3 - Cammina occasionalmente',  value: '3' },
            { label: '2 - In poltrona',              value: '2' },
            { label: '1 - Completamente allettato',  value: '1' },
          ]} />
          <Select name="bradenMobility" label="4. Mobilità (Cambi di posizione)" options={[
            { label: '4 - Limitazioni assenti',      value: '4' },
            { label: '3 - Parzialmente limitato',    value: '3' },
            { label: '2 - Molto limitata',           value: '2' },
            { label: '1 - Completamente immobile',   value: '1' },
          ]} />
          <Select name="bradenNutrition" label="5. Nutrizione" options={[
            { label: '4 - Eccellente',                  value: '4' },
            { label: '3 - Adeguata',                    value: '3' },
            { label: '2 - Probabilmente inadeguata',    value: '2' },
            { label: '1 - Molto povera',                value: '1' },
          ]} />
          <Select name="bradenFriction" label="6. Frizione e Scivolamento" options={[
            { label: '3 - Senza problemi apparenti', value: '3' },
            { label: '2 - Problema potenziale',      value: '2' },
            { label: '1 - Problema in atto',         value: '1' },
          ]} />
        </div>
      </LockableSection>

      {/* ── Conley ── */}
      <LockableSection
        title="Scala Conley (Rischio Cadute)"
        headerRight={
          <div className="text-right">
            <div className="text-sm text-slate-500">Punteggio Totale</div>
            <div className={`text-2xl font-bold ${conleyScore === null ? 'text-slate-300' : fallRisk ? 'text-rose-600' : 'text-emerald-600'}`}>
              {conleyScore ?? '—'}
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-slate-500">
              {conleyScore === null ? 'Compilare tutti i campi' : fallRisk ? 'A rischio (≥ 2)' : 'Non a rischio'}
            </div>
          </div>
        }
      >
        <div className="space-y-5">
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
                      <label className={RL}><input type="radio" value="true"  {...register(item.name)} className={RADIO} /> Sì</label>
                      <label className={RL}><input type="radio" value="false" {...register(item.name)} className={RADIO} /> No</label>
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </LockableSection>

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
