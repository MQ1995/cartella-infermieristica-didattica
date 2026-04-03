import { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Plus, NotebookPen } from 'lucide-react';
import { ConfirmDeleteButton } from '../ui/ConfirmDeleteButton';
import { LockToggle } from '../ui/LockToggle';
import { useRowLocks } from '../../hooks/useRowLocks';

const TIME_SLOTS = [
  { key: 'ora8',  label: '8:00'  },
  { key: 'ora12', label: '12:00' },
  { key: 'ora14', label: '14:00' },
  { key: 'ora16', label: '16:00' },
  { key: 'ora20', label: '20:00' },
  { key: 'ora24', label: '24:00' },
] as const;

const INPUT_CLS = 'w-full px-2 py-1.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default disabled:text-slate-800';

export default function MedicationsTab() {
  const { register, watch, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'medications' });
  const { toggleLock, isLocked } = useRowLocks();
  const [toggledNotes, setToggledNotes] = useState<Set<number>>(new Set());

  const toggleNotes = (i: number) => setToggledNotes(prev => {
    const next = new Set(prev); next.has(i) ? next.delete(i) : next.add(i); return next;
  });

  const addRow = () => append({
    drug: '', dosage: '', route: '',
    ora8: false, ora12: false, ora14: false, ora16: false, ora20: false, ora24: false,
    oraCustom: '', notes: '',
  });

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200">
          Prescrizione farmacologica
        </h3>
        <button
          type="button"
          onClick={addRow}
          className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
        >
          <Plus size={16} /> Aggiungi farmaco
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-sm text-slate-500 italic p-6 bg-slate-50 border border-slate-200 rounded-lg text-center print:hidden">
          Nessun farmaco inserito. Clicca "Aggiungi farmaco" per iniziare.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <th className="px-2 py-2 text-left font-semibold w-44">Farmaco</th>
                <th className="px-2 py-2 text-left font-semibold w-28">Dosaggio</th>
                <th className="px-2 py-2 text-left font-semibold w-28">Via</th>
                {TIME_SLOTS.map(t => (
                  <th key={t.key} className="px-2 py-2 text-center font-semibold w-12">{t.label}</th>
                ))}
                <th className="px-2 py-2 text-left font-semibold w-24">Personalizzato</th>
                <th className="px-2 py-2 print:hidden w-16" />
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => {
                const locked = isLocked(index);
                const hasNote = !!watch(`medications.${index}.notes`);
                const isExpanded = hasNote ? !toggledNotes.has(index) : toggledNotes.has(index);
                return (
                  <>
                    <tr key={field.id} className={`border-b border-slate-100 last:border-0 align-middle ${isExpanded ? 'bg-emerald-50 border-b-0' : (!locked ? 'hover:bg-slate-50' : '')}`}>
                      <td className={`px-1 py-1 ${isExpanded ? 'border-l-4 border-emerald-500' : ''}`}>
                        <input {...register(`medications.${index}.drug`)} placeholder={locked ? '—' : 'Nome farmaco'} disabled={locked} className={INPUT_CLS} />
                      </td>
                      <td className="px-1 py-1">
                        <input {...register(`medications.${index}.dosage`)} placeholder={locked ? '—' : 'es. 500 mg'} disabled={locked} className={INPUT_CLS} />
                      </td>
                      <td className="px-1 py-1">
                        <input {...register(`medications.${index}.route`)} placeholder={locked ? '—' : 'es. OS, EV'} disabled={locked} className={INPUT_CLS} />
                      </td>
                      {TIME_SLOTS.map(t => (
                        <td key={t.key} className="px-2 py-1 text-center">
                          <input
                            {...register(`medications.${index}.${t.key}`)}
                            type="checkbox"
                            disabled={locked}
                            className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 rounded border-slate-300 disabled:cursor-default"
                          />
                        </td>
                      ))}
                      <td className="px-1 py-1">
                        <input {...register(`medications.${index}.oraCustom`)} placeholder={locked ? '—' : 'es. 6:00'} disabled={locked} className={INPUT_CLS} />
                      </td>
                      <td className="px-1 py-1 print:hidden">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => toggleNotes(index)}
                            title={isExpanded ? 'Nascondi note' : 'Aggiungi nota'}
                            className={`relative p-1 rounded transition-colors ${hasNote ? 'text-emerald-600 hover:text-emerald-700' : 'text-slate-300 hover:text-slate-500'}`}
                          >
                            <NotebookPen size={15} />
                            {hasNote && !isExpanded && (
                              <span className="absolute top-0.5 right-0 w-2 h-2 bg-rose-500 rounded-full" />
                            )}
                          </button>
                          <LockToggle locked={locked} onToggle={() => toggleLock(index)} />
                          {!locked && <ConfirmDeleteButton onConfirm={() => remove(index)} size={15} />}
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr key={`${field.id}-notes`} className="bg-emerald-50 border-b border-slate-200">
                        <td colSpan={TIME_SLOTS.length + 5} className="px-3 pb-2 border-l-4 border-emerald-500">
                          <textarea
                            {...register(`medications.${index}.notes`)}
                            placeholder={locked ? 'Nessuna nota presente per questo farmaco.' : 'Note aggiuntive per questo farmaco...'}
                            rows={2}
                            disabled={locked}
                            className="w-full px-3 py-2 border border-emerald-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white resize-none disabled:bg-transparent disabled:border-transparent disabled:cursor-default"
                          />
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
