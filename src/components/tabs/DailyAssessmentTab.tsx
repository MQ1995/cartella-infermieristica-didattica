import { useState } from 'react';
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { Plus, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import { ConfirmDeleteButton } from '../ui/ConfirmDeleteButton';
import { LockToggle } from '../ui/LockToggle';
import { useRowLocks } from '../../hooks/useRowLocks';

function DayEntry({ index, onRemove, locked, onToggleLock }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const { register } = useFormContext();

  const prefix = `dailyAssessments.${index}`;
  const date        = useWatch({ name: `${prefix}.date` });
  const notes       = useWatch({ name: `${prefix}.notes` });
  const newProblems = useWatch({ name: `${prefix}.newProblems` });

  const formatDate = (d: string) => d ? d.split('-').reverse().join('-') : 'Data non impostata';
  const preview = notes ? notes.slice(0, 80) + (notes.length > 80 ? '…' : '') : null;

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 bg-white cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 text-sm">{formatDate(date)}</span>
            {newProblems && (
              <span className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                <AlertTriangle size={10} /> Nuovi problemi
              </span>
            )}
          </div>
          {!expanded && preview && (
            <p className="text-xs text-slate-400 mt-0.5 truncate">{preview}</p>
          )}
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0 print:hidden" onClick={e => e.stopPropagation()}>
          <LockToggle locked={locked} onToggle={onToggleLock} title={locked ? 'Sblocca giornata' : 'Blocca giornata'} />
          {!locked && <ConfirmDeleteButton onConfirm={onRemove} size={15} />}
          <button type="button" className="text-slate-400 hover:text-slate-600 p-1" onClick={() => setExpanded(e => !e)}>
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-slate-200 bg-slate-50 p-4 space-y-4">
          <fieldset disabled={locked} className={locked ? 'cursor-not-allowed select-none' : ''}>
            <div className="flex flex-col space-y-1 mb-4">
              <label className="text-sm font-medium text-slate-700">Data</label>
              <input
                {...register(`${prefix}.date`)}
                type="date"
                data-empty={!date ? '' : undefined}
                className="w-40 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 disabled:bg-transparent disabled:border-transparent disabled:[-webkit-text-fill-color:theme(colors.slate.800)] disabled:cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-slate-700">Note di accertamento giornaliero</label>
              <textarea
                {...register(`${prefix}.notes`)}
                rows={4}
                placeholder={locked ? '—' : 'Osservazioni cliniche, andamento della giornata, interventi effettuati...'}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-y disabled:bg-transparent disabled:border-transparent disabled:cursor-default"
              />
            </div>

            <div className="flex flex-col space-y-1 mt-4">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                <AlertTriangle size={13} className="text-amber-500" />
                Nuovi problemi / rischi emersi (formato PES)
              </label>
              <textarea
                {...register(`${prefix}.newProblems`)}
                rows={3}
                placeholder={locked ? '—' : 'es. Rischio caduta correlato a instabilità dell\'andatura'}
                className="w-full px-3 py-2 bg-white border border-amber-200 rounded-md text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 resize-y disabled:bg-transparent disabled:border-transparent disabled:cursor-default"
              />
            </div>
          </fieldset>
        </div>
      )}
    </div>
  );
}

export default function DailyAssessmentTab() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'dailyAssessments' });
  const { toggleLock, isLocked } = useRowLocks('rowlocks_dailyAssessment');

  const addDay = () => {
    append({ date: new Date().toISOString().slice(0, 10), notes: '', newProblems: '' });
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200">
          Accertamento quotidiano
        </h3>
        <button
          type="button"
          onClick={addDay}
          className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
        >
          <Plus size={16} /> Aggiungi giornata
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-sm text-slate-500 italic p-6 bg-slate-50 border border-slate-200 rounded-lg text-center print:hidden">
          Nessuna giornata inserita. Clicca "Aggiungi giornata" per iniziare.
        </div>
      ) : (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <DayEntry
              key={field.id}
              index={index}
              onRemove={() => remove(index)}
              locked={isLocked(index)}
              onToggleLock={() => toggleLock(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
