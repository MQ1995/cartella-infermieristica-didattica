import { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Plus, Lock, LockOpen } from 'lucide-react';
import { ConfirmDeleteButton } from '../ui/ConfirmDeleteButton';

export default function DiagnosticExamsSection() {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'diagnosticExams' });
  const [lockedRows, setLockedRows] = useState<Set<number>>(new Set());

  const toggleLock = (i: number) => setLockedRows(prev => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });

  const addRow = () => {
    const now = new Date();
    append({
      date: now.toISOString().slice(0, 10),
      time: now.toTimeString().slice(0, 5),
      examType: '',
      result: '',
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
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
                const locked = lockedRows.has(index);
                return (
                  <tr
                    key={field.id}
                    className={`border-b border-slate-100 last:border-0 align-top ${locked ? '' : 'hover:bg-slate-50'}`}
                  >
                    <td className="px-1 py-1">
                      <input
                        {...register(`diagnosticExams.${index}.date`)}
                        type="date"
                        disabled={locked}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default disabled:text-slate-800 disabled:[-webkit-text-fill-color:theme(colors.slate.800)]"
                      />
                    </td>
                    <td className="px-1 py-1">
                      <input
                        {...register(`diagnosticExams.${index}.time`)}
                        type="time"
                        disabled={locked}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default disabled:text-slate-800 disabled:[-webkit-text-fill-color:theme(colors.slate.800)]"
                      />
                    </td>
                    <td className="px-1 py-1">
                      <input
                        {...register(`diagnosticExams.${index}.examType`)}
                        type="text"
                        placeholder={locked ? '—' : 'es. Emocromo, ECG...'}
                        disabled={locked}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default disabled:text-slate-800"
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
                          onClick={() => toggleLock(index)}
                          title={locked ? 'Sblocca riga' : 'Blocca riga'}
                          className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${locked ? 'bg-amber-400' : 'bg-slate-200'}`}
                        >
                          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow flex items-center justify-center transition-all duration-200 ${locked ? 'left-4 text-amber-500' : 'left-0.5 text-slate-400'}`}>
                            {locked ? <Lock size={9} /> : <LockOpen size={9} />}
                          </span>
                        </button>
                        {!locked && <ConfirmDeleteButton onConfirm={() => remove(index)} size={15} />}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
