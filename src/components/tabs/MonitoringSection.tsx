import { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Plus, NotebookPen } from 'lucide-react';
import { ConfirmDeleteButton } from '../ui/ConfirmDeleteButton';
import { InfoTooltip } from '../ui/InfoTooltip';
import { LockToggle } from '../ui/LockToggle';
import { useRowLocks } from '../../hooks/useRowLocks';

const COLUMNS = [
  { key: 'date',            label: 'Data',      type: 'date',   width: 'w-32' },
  { key: 'time',            label: 'Ora',       type: 'time',   width: 'w-24' },
  { key: 'bloodPressure',   label: 'PA',        type: 'text',   width: 'w-28', placeholder: 'mmHg',
    info: 'Pressione Arteriosa: forza esercitata dal sangue sulle pareti delle arterie. Valori normali: 90–120 mmHg sistolica / 60–80 mmHg diastolica.' },
  { key: 'heartRate',       label: 'FC',        type: 'text',   width: 'w-16', placeholder: 'bpm',
    info: 'Frequenza Cardiaca: numero di battiti cardiaci al minuto. Valori normali a riposo: 60–100 bpm.' },
  { key: 'temperature',     label: 'TC',        type: 'text',   width: 'w-16', placeholder: '°C',
    info: 'Temperatura Corporea: temperatura interna del corpo. Valori normali: 36.0–37.2 °C.' },
  { key: 'respiratoryRate', label: 'FR',        type: 'text',   width: 'w-20', placeholder: 'atti/min',
    info: 'Frequenza Respiratoria: numero di atti respiratori al minuto. Valori normali: 12–20 atti/min.' },
  { key: 'spo2',            label: 'SpO2',      type: 'text',   width: 'w-16', placeholder: '%',
    info: 'Saturazione periferica di ossigeno: percentuale di emoglobina ossiemoglobinata nel sangue periferico. Valori normali: 95–100%.' },
  { key: 'o2Therapy',       label: 'O₂',        type: 'text',   width: 'w-20', placeholder: 'L/min',
    info: 'Ossigenoterapia: flusso di ossigeno supplementare somministrato tramite cannule nasali o maschera, espresso in litri al minuto.' },
  { key: 'pain',            label: 'NRS',       type: 'number', width: 'w-14', placeholder: '0-10', min: '0', max: '10',
    info: 'Numeric Rating Scale: scala numerica per la valutazione del dolore. 0 = nessun dolore, 10 = dolore massimo immaginabile.' },
  { key: 'glycemia',        label: 'Glicemia',  type: 'text',   width: 'w-20', placeholder: 'mg/dL',
    info: 'Glicemia: concentrazione di glucosio nel sangue. Valori normali a digiuno: 70–100 mg/dL.' },
] as const;

export default function MonitoringSection() {
  const { register, control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'vitalSigns' });
  // tracks rows toggled away from their default state
  const [toggledNotes, setToggledNotes] = useState<Set<number>>(new Set());
  const { toggleLock, isLocked: isLockedRow } = useRowLocks('rowlocks_vitalSigns');

  const toggleNotes = (index: number) => {
    setToggledNotes(prev => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  const addRow = () => {
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const time = now.toTimeString().slice(0, 5);
    append({ date, time, bloodPressure: '', heartRate: '', temperature: '',
      respiratoryRate: '', spo2: '', o2Therapy: '', pain: '', glycemia: '', notes: '' });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200">
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
                    <span className="inline-flex items-center">
                      {col.label}
                      {'info' in col && <InfoTooltip content={col.info} />}
                    </span>
                  </th>
                ))}
                {/* Note toggle + delete */}
                <th className="px-2 py-2 print:hidden w-16" />
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => {
                const hasNote = !!watch(`vitalSigns.${index}.notes`);
                const isExpanded = hasNote ? !toggledNotes.has(index) : toggledNotes.has(index);
                const isLocked = isLockedRow(index);
                return (
                  <>
                    <tr key={field.id} className={`${isExpanded ? 'bg-emerald-50 border-b-0' : 'border-b border-slate-100 last:border-0 hover:bg-slate-50'}`}>
                      {COLUMNS.map((col, colIndex) => (
                        <td key={col.key} className={`px-1 py-1 ${isExpanded && colIndex === 0 ? 'border-l-4 border-emerald-500' : ''}`}>
                          <input
                            {...register(`vitalSigns.${index}.${col.key}`, {
                              onChange: ('min' in col || 'max' in col) ? (e) => {
                                const val = parseInt(e.target.value, 10);
                                if (!isNaN(val)) {
                                  const min = 'min' in col ? parseInt(col.min as string, 10) : -Infinity;
                                  const max = 'max' in col ? parseInt(col.max as string, 10) : Infinity;
                                  if (val < min) e.target.value = String(min);
                                  if (val > max) e.target.value = String(max);
                                }
                              } : undefined,
                            })}
                            type={col.type}
                            placeholder={isLocked ? '—' : ('placeholder' in col ? col.placeholder : undefined)}
                            min={'min' in col ? col.min : undefined}
                            max={'max' in col ? col.max : undefined}
                            disabled={isLocked}
                            className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default disabled:text-slate-800 disabled:[-webkit-text-fill-color:theme(colors.slate.800)]"
                          />
                        </td>
                      ))}
                      <td className="px-1 py-1 print:hidden">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => toggleNotes(index)}
                            title={isExpanded ? 'Nascondi note' : 'Aggiungi nota'}
                            className={`relative p-1 rounded transition-colors ${
                              hasNote ? 'text-emerald-600 hover:text-emerald-700' : 'text-slate-300 hover:text-slate-500'
                            }`}
                          >
                            <NotebookPen size={15} />
                            {hasNote && !isExpanded && (
                              <span className="absolute top-0.5 right-0 w-2 h-2 bg-rose-500 rounded-full" />
                            )}
                          </button>
                          <LockToggle locked={isLocked} onToggle={() => toggleLock(index)} />
                          {!isLocked && <ConfirmDeleteButton onConfirm={() => remove(index)} size={15} />}
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr key={`${field.id}-notes`} className="bg-emerald-50 border-b border-slate-200">
                        <td colSpan={COLUMNS.length + 1} className="px-3 pb-2 border-l-4 border-emerald-500">
                          <div>
                            <textarea
                              {...register(`vitalSigns.${index}.notes`)}
                              placeholder={isLocked ? 'Nessuna nota presente per questa rilevazione.' : 'Note aggiuntive per questa rilevazione...'}
                              rows={2}
                              disabled={isLocked}
                              className="w-full px-3 py-2 border border-emerald-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white resize-none disabled:bg-transparent disabled:border-transparent disabled:cursor-default"
                            />
                          </div>
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
