import { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Plus, NotebookPen } from 'lucide-react';
import { ConfirmDeleteButton } from '../ui/ConfirmDeleteButton';
import { LockToggle } from '../ui/LockToggle';
import { useRowLocks } from '../../hooks/useRowLocks';

const INPUT_CLS = 'w-full px-2 py-1.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default disabled:text-slate-800';

export default function DiagnosticExamsSection() {
  const { register, watch, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'diagnosticExams' });
  const { toggleLock, isLocked } = useRowLocks('rowlocks_diagnosticExams');
  const [toggledNotes, setToggledNotes] = useState<Set<number>>(new Set());

  const toggleNotes = (i: number) => setToggledNotes(prev => {
    const next = new Set(prev); next.has(i) ? next.delete(i) : next.add(i); return next;
  });

  const addRow = () => {
    const now = new Date();
    append({
      date: now.toISOString().slice(0, 10),
      time: now.toTimeString().slice(0, 5),
      examType: '',
      result: '',
      notes: '',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200">
          Esami diagnostici
        </h3>
        <button
          type="button"
          onClick={addRow}
          className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
        >
          <Plus size={16} /> Aggiungi esame
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-sm text-slate-500 italic p-6 bg-slate-50 border border-slate-200 rounded-lg text-center print:hidden">
          Nessun esame inserito. Clicca "Aggiungi esame" per iniziare.
        </div>
      ) : (
        <div className="rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-3 py-2 text-left font-semibold text-slate-600 w-32">Data</th>
                <th className="px-3 py-2 text-left font-semibold text-slate-600 w-24">Ora</th>
                <th className="px-3 py-2 text-left font-semibold text-slate-600 w-44">Tipo esame</th>
                <th className="px-3 py-2 text-left font-semibold text-slate-600">Risultato / Referto</th>
                <th className="px-2 py-2 print:hidden w-20" />
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => {
                const locked = isLocked(index);
                const hasNote = !!watch(`diagnosticExams.${index}.notes`);
                const isExpanded = hasNote ? !toggledNotes.has(index) : toggledNotes.has(index);
                return (
                  <>
                    <tr
                      key={field.id}
                      className={`border-b border-slate-100 last:border-0 align-top ${isExpanded ? 'bg-emerald-50 border-b-0' : (!locked ? 'hover:bg-slate-50' : '')}`}
                    >
                      <td className={`px-1 py-1 ${isExpanded ? 'border-l-4 border-emerald-500' : ''}`}>
                        <Input name={`diagnosticExams.${index}.date`} label="" type="date" disabled={locked}
                          className={INPUT_CLS}
                        />
                      </td>
                      <td className="px-1 py-1">
                        <Input name={`diagnosticExams.${index}.time`} label="" type="time" disabled={locked}
                          className={INPUT_CLS}
                        />
                      </td>
                      <td className="px-1 py-1">
                        <input
                          {...register(`diagnosticExams.${index}.examType`)}
                          type="text"
                          placeholder={locked ? '—' : 'es. Emocromo, ECG...'}
                          disabled={locked}
                          className={INPUT_CLS}
                        />
                      </td>
                      <td className="px-1 py-1">
                        <textarea
                          {...register(`diagnosticExams.${index}.result`)}
                          rows={2}
                          placeholder={locked ? '—' : 'Inserire risultato o referto...'}
                          disabled={locked}
                          className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white resize-none disabled:bg-transparent disabled:border-transparent disabled:cursor-default disabled:text-slate-800"
                        />
                      </td>
                      <td className="px-2 py-1 print:hidden">
                        <div className="flex items-center gap-1 pt-1">
                          <button
                            type="button"
                            onClick={() => toggleNotes(index)}
                            title={isExpanded ? 'Nascondi note' : 'Aggiungi nota'}
                            className={`relative p-1 rounded transition-colors ${hasNote ? 'text-emerald-600 hover:text-emerald-700' : 'text-slate-300 hover:text-slate-500'}`}
                          >
                            <NotebookPen size={15} />
                          </button>
                          <LockToggle locked={locked} onToggle={() => toggleLock(index)} />
                          {!locked && <ConfirmDeleteButton onConfirm={() => remove(index)} size={15} />}
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr key={`${field.id}-notes`} className="bg-emerald-50 border-b border-slate-200">
                        <td colSpan={5} className="px-3 pb-2 border-l-4 border-emerald-500">
                          <textarea
                            {...register(`diagnosticExams.${index}.notes`)}
                            placeholder={locked ? 'Nessuna nota presente.' : 'Note aggiuntive (valori di riferimento, commenti clinici, follow-up...)'}
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
