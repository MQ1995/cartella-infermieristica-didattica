import { useState, useRef } from 'react';
import { LockToggle } from '../ui/LockToggle';
import { useRowLocks } from '../../hooks/useRowLocks';
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { Plus, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import { ConfirmDeleteButton } from '../ui/ConfirmDeleteButton';
import { Textarea } from '../ui/Textarea';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { LockableSection } from '../ui/LockableSection';

const STATUS_OPTIONS = [
  { value: '',                      label: '—' },
  { value: 'In corso',              label: 'In corso' },
  { value: 'Risolto',               label: 'Risolto' },
  { value: 'Parzialmente risolto',  label: 'Parzialmente risolto' },
  { value: 'Peggiorato',            label: 'Peggiorato' },
];

const STATUS_BADGE: Record<string, string> = {
  'In corso':             'bg-blue-100 text-blue-700 border-blue-200',
  'Risolto':              'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Parzialmente risolto': 'bg-amber-100 text-amber-700 border-amber-200',
  'Peggiorato':           'bg-rose-100 text-rose-700 border-rose-200',
};

const PRIORITY_OPTIONS = ['', 'Alta', 'Media', 'Bassa'] as const;
type Priority = typeof PRIORITY_OPTIONS[number];

const PRIORITY_BADGE: Record<string, string> = {
  'Alta':  'bg-rose-100 text-rose-700 border-rose-200',
  'Media': 'bg-amber-100 text-amber-700 border-amber-200',
  'Bassa': 'bg-sky-100 text-sky-700 border-sky-200',
};

const PRIORITY_NUMBER: Record<string, string> = {
  'Alta':  'bg-rose-100 text-rose-700',
  'Media': 'bg-amber-100 text-amber-700',
  'Bassa': 'bg-sky-100 text-sky-600',
  '':      'bg-emerald-100 text-emerald-700',
};

const LABEL = 'text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block';
const TA = 'w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white resize-y disabled:bg-transparent disabled:border-transparent disabled:cursor-not-allowed disabled:text-slate-800 disabled:[-webkit-text-fill-color:theme(colors.slate.800)]';

function ETextarea({ name, rows, placeholder }: { name: string; rows?: number; placeholder?: string }) {
  const { register } = useFormContext();
  const value = useWatch({ name });
  const isEmpty = value === '' || value === null || value === undefined;
  return (
    <div className="relative">
      <textarea
        {...register(name)}
        rows={rows}
        placeholder={placeholder}
        data-empty={isEmpty ? '' : undefined}
        className={TA}
      />
      {isEmpty && (
        <span className="field-empty-dash absolute top-2 left-3 text-sm text-slate-300 pointer-events-none opacity-0 print:hidden">—</span>
      )}
    </div>
  );
}

function PlanCard({ index, onRemove, locked, onToggleLock, onDragStart, onDragOver, onDrop, isDraggingOver, isDragging }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  isDraggingOver: boolean;
  isDragging: boolean;
}) {
  const [expanded, setExpanded] = useState(true);
  const { register } = useFormContext();
  const prefix   = `carePlans.${index}`;
  const problem  = useWatch({ name: `${prefix}.problem` });
  const status   = useWatch({ name: `${prefix}.status` });
  const priority = useWatch({ name: `${prefix}.priority` }) as Priority;

  const preview = problem
    ? problem.slice(0, 90) + (problem.length > 90 ? '…' : '')
    : 'Nuovo problema / rischio';

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`border rounded-xl overflow-hidden transition-all ${
        isDragging     ? 'opacity-40 scale-[0.98] border-slate-300 shadow-lg rotate-1' :
        isDraggingOver ? 'border-emerald-400 ring-2 ring-emerald-200' :
        locked         ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 bg-white'
      }`}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50/80 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        {/* Drag handle */}
        <div
          className="flex-shrink-0 text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing print:hidden"
          onClick={e => e.stopPropagation()}
        >
          <GripVertical size={16} />
        </div>

        {/* Number badge */}
        <div className={`flex-shrink-0 w-7 h-7 rounded-full font-bold text-sm flex items-center justify-center select-none ${PRIORITY_NUMBER[priority ?? '']}`}>
          {index + 1}
        </div>

        {/* Priority badge */}
        {priority && (
          <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full border font-semibold ${PRIORITY_BADGE[priority]}`}>
            {priority}
          </span>
        )}

        {/* Problem preview */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-700 truncate">{preview}</p>
          {!expanded && status && (
            <span className={`inline-block mt-0.5 text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_BADGE[status] ?? ''}`}>
              {status}
            </span>
          )}
        </div>

        {/* Status badge (when expanded) */}
        {expanded && status && (
          <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_BADGE[status] ?? ''}`}>
            {status}
          </span>
        )}

        {/* Actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0 print:hidden" onClick={e => e.stopPropagation()}>
          <LockToggle locked={locked} onToggle={onToggleLock} />
          {!locked && <ConfirmDeleteButton onConfirm={onRemove} size={15} />}
          <button type="button" className="text-slate-400 hover:text-slate-600 p-1" onClick={() => setExpanded(e => !e)}>
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {/* Body */}
      {expanded && (
        <fieldset disabled={locked} className={`border-t border-slate-200 ${locked ? 'cursor-not-allowed select-none' : ''}`}>
          <div className="p-5 space-y-5">

            {/* Priorità */}
            <div className="flex items-center gap-3">
              <label className={`${LABEL} mb-0`}>Priorità</label>
              <div className="flex gap-2">
                {(['Alta', 'Media', 'Bassa'] as const).map(p => (
                  <label key={p} className="cursor-pointer">
                    <input type="radio" value={p} {...register(`${prefix}.priority`)} className="sr-only" />
                    <span className={`inline-block px-3 py-1 rounded-full border text-xs font-semibold transition-all ${
                      priority === p
                        ? PRIORITY_BADGE[p]
                        : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                    }`}>
                      {p}
                    </span>
                  </label>
                ))}
                {priority && (
                  <button
                    type="button"
                    onClick={() => {
                      // clear priority by registering empty value
                    }}
                    className="text-xs text-slate-400 hover:text-slate-600 px-1"
                    title="Rimuovi priorità"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* 1 — Diagnosi / problema PES */}
            <div>
              <label className={LABEL}>Problema / diagnosi infermieristica (PES)</label>
              <ETextarea
                name={`${prefix}.problem`}
                rows={3}
                placeholder="Es. Dolore acuto correlato a intervento chirurgico come evidenziato da..."
              />
            </div>

            {/* 2 — Obiettivi */}
            <div>
              <label className={LABEL}>Obiettivi (SMART)</label>
              <ETextarea
                name={`${prefix}.objective`}
                rows={2}
                placeholder="Es. Il paziente riferirà un dolore ≤ 3/10 NRS entro 24 h dalla somministrazione analgesica."
              />
            </div>

            {/* 3 — Interventi pianificati / attuati */}
            <div className="grid grid-cols-1 @md:grid-cols-2 gap-5">
              <div>
                <label className={LABEL}>Interventi pianificati</label>
                <ETextarea
                  name={`${prefix}.plannedInterventions`}
                  rows={5}
                  placeholder={"• Monitoraggio del dolore ogni 4 h (NRS)\n• Somministrazione analgesici prescritti\n• Posizionamento antalgico\n• Educazione al paziente"}
                />
              </div>
              <div>
                <label className={LABEL}>Interventi attuati</label>
                <ETextarea
                  name={`${prefix}.implementedInterventions`}
                  rows={5}
                  placeholder={"gg/mm/aa 08:00 — Monitoraggio NRS: 6/10\ngg/mm/aa 08:15 — Somministrato paracetamolo 1 g EV\ngg/mm/aa 10:00 — NRS rivalutato: 3/10"}
                />
              </div>
            </div>

            {/* 4 — Valutazione + stato */}
            <div className="grid grid-cols-1 @md:grid-cols-3 gap-5 items-start">
              <div className="@md:col-span-2">
                <label className={LABEL}>Valutazione e rivalutazione</label>
                <ETextarea
                  name={`${prefix}.evaluation`}
                  rows={3}
                  placeholder="gg/mm/aa 12:00 — Obiettivo raggiunto. Dolore stabile a 2/10 NRS. Piano mantenuto."
                />
              </div>
              <div>
                <label className={LABEL}>Stato del problema</label>
                <select
                  {...register(`${prefix}.status`)}
                  data-empty={!status ? '' : undefined}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-not-allowed disabled:text-slate-800 disabled:[-webkit-text-fill-color:theme(colors.slate.800)]"
                >
                  {STATUS_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </fieldset>
      )}
    </div>
  );
}

export default function CarePlanTab() {
  const { control } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({ control, name: 'carePlans' });
  const { toggleLock, isLocked, remapLocks } = useRowLocks('rowlocks_carePlan');
  const dragIndex = useRef<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const addProblem = () => append({
    problem: '', objective: '', plannedInterventions: '',
    implementedInterventions: '', evaluation: '', status: '', priority: '',
  });

  const handleDragStart = (index: number) => {
    dragIndex.current = index;
    setDraggingIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (toIndex: number) => {
    const fromIndex = dragIndex.current;
    if (fromIndex !== null && fromIndex !== toIndex) {
      move(fromIndex, toIndex);
      remapLocks(fromIndex, toIndex, fields.length);
    }
    dragIndex.current = null;
    setDraggingIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      {/* ── Pianificazione assistenziale ── */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200">
            Pianificazione assistenziale
          </h3>
          <button
            type="button"
            onClick={addProblem}
            className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
          >
            <Plus size={16} /> Aggiungi problema
          </button>
        </div>

        {fields.length === 0 ? (
          <div className="text-sm text-slate-500 italic p-6 bg-slate-50 border border-slate-200 rounded-lg text-center print:hidden">
            Nessun problema inserito. Clicca "Aggiungi problema" per iniziare.
          </div>
        ) : (
          <div
            className="space-y-4"
            onDragEnd={() => { dragIndex.current = null; setDraggingIndex(null); setDragOverIndex(null); }}
          >
            {fields.map((field, index) => (
              <PlanCard
                key={field.id}
                index={index}
                onRemove={() => remove(index)}
                locked={isLocked(index)}
                onToggleLock={() => toggleLock(index)}
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
                isDraggingOver={dragOverIndex === index && dragIndex.current !== index}
                isDragging={draggingIndex === index}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Fine presa in carico ── */}
      <LockableSection title="Fine presa in carico">
        <div className="space-y-6">
          <div className="grid grid-cols-1 @md:grid-cols-2 gap-6">
            <Select
              name="dischargeReason"
              label="Motivo di chiusura"
              options={[
                { label: 'Dimissione', value: 'Dimissione' },
                { label: 'Trasferimento', value: 'Trasferimento' },
                { label: 'Decesso', value: 'Decesso' },
                { label: 'Terzo giorno di presa in carico', value: 'Terzo giorno di presa in carico' },
              ]}
            />
            <Input name="dischargeDate" label="Data fine presa in carico" type="date" />
          </div>

          <div className="grid grid-cols-1 @md:grid-cols-2 gap-6">
            <Textarea
              name="dischargeUnresolvedProblems"
              label="Problemi non risolti / rischi residui"
              rows={4}
            />
            <Textarea
              name="dischargeObjectives"
              label="Obiettivi formulati"
              rows={4}
            />
          </div>

          <Textarea
            name="dischargePlannedActions"
            label="Azioni pianificate"
            rows={3}
          />

          <Textarea
            name="dischargeNotes"
            label="Note aggiuntive"
            rows={2}
          />
        </div>
      </LockableSection>
    </div>
  );
}
