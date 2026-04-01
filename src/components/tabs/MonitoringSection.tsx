import { useFormContext, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';

const COLUMNS = [
  { key: 'date',            label: 'Data',        type: 'date',   width: 'w-32' },
  { key: 'time',            label: 'Ora',         type: 'time',   width: 'w-24' },
  { key: 'bloodPressure',   label: 'PA',          type: 'text',   width: 'w-24', placeholder: 'es. 120/80' },
  { key: 'heartRate',       label: 'FC',          type: 'text',   width: 'w-16', placeholder: 'bpm' },
  { key: 'temperature',     label: 'TC',          type: 'text',   width: 'w-16', placeholder: '°C' },
  { key: 'respiratoryRate', label: 'FR',          type: 'text',   width: 'w-16', placeholder: 'a/m' },
  { key: 'spo2',            label: 'SpO2',        type: 'text',   width: 'w-16', placeholder: '%' },
  { key: 'o2Therapy',       label: 'O₂ Lt/min',   type: 'text',   width: 'w-20', placeholder: '-' },
  { key: 'pain',            label: 'NRS',         type: 'number', width: 'w-14', placeholder: '0-10' },
  { key: 'glycemia',        label: 'Glicemia',    type: 'text',   width: 'w-20', placeholder: 'mg/dL' },
  { key: 'notes',           label: 'Altro',       type: 'text',   width: 'w-36', placeholder: 'note' },
] as const;

export default function MonitoringSection() {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'vitalSigns' });

  const addRow = () => append({
    date: '', time: '', bloodPressure: '', heartRate: '', temperature: '',
    respiratoryRate: '', spo2: '', o2Therapy: '', pain: '', glycemia: '', notes: ''
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
          Monitoraggio parametri vitali
        </h3>
        <button
          type="button"
          onClick={addRow}
          className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
        >
          <Plus size={16} /> Aggiungi rilevazione
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-sm text-slate-500 italic p-6 bg-slate-50 border border-slate-200 rounded-lg text-center print:hidden">
          Nessuna rilevazione inserita. Clicca "Aggiungi rilevazione" per iniziare.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {COLUMNS.map(col => (
                  <th key={col.key} className={`px-2 py-2 text-left font-semibold text-slate-600 ${col.width}`}>
                    {col.label}
                  </th>
                ))}
                <th className="px-2 py-2 print:hidden w-10" />
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                  {COLUMNS.map(col => (
                    <td key={col.key} className="px-1 py-1">
                      <input
                        {...register(`vitalSigns.${index}.${col.key}`)}
                        type={col.type}
                        placeholder={'placeholder' in col ? col.placeholder : undefined}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white"
                      />
                    </td>
                  ))}
                  <td className="px-1 py-1 print:hidden">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-rose-400 hover:text-rose-600 p-1 flex justify-center"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
