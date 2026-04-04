import { useFormContext, useFieldArray } from 'react-hook-form';
import { Plus, Trash2, Clock, Activity } from 'lucide-react';
import { cn } from '../../shared/utils/cn';

export default function VitalSignsSection() {
  const { control, register, formState: { errors } } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'vitalSigns' });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Activity className="text-emerald-400" size={20} />
          <h2 className="text-white font-bold tracking-tight">Monitoraggio Parametri Vitali</h2>
        </div>
        <button
          type="button"
          onClick={() => append({ timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
        >
          <Plus size={14} /> Nuova Rilevazione
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <th className="px-6 py-3 w-32">Ora</th>
              <th className="px-6 py-3">PA (mmHg)</th>
              <th className="px-6 py-3 text-emerald-600">FC (bpm)</th>
              <th className="px-6 py-3 text-amber-600">TC (°C)</th>
              <th className="px-6 py-3 text-blue-600">SpO2 (%)</th>
              <th className="px-6 py-3">Note</th>
              <th className="px-6 py-3 w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {fields.map((field, index) => (
              <tr key={field.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="text-slate-300" />
                    <input 
                      {...register(`vitalSigns.${index}.timestamp`)} 
                      className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium text-slate-600"
                    />
                  </div>
                </td>
                <td className="px-4 py-2">
                  <input 
                    {...register(`vitalSigns.${index}.bloodPressure`)} 
                    placeholder="120/80"
                    className="w-full px-3 py-1.5 rounded-lg border-transparent focus:border-slate-300 focus:bg-white bg-slate-100/50 text-sm"
                  />
                </td>
                <td className="px-4 py-2">
                  <input 
                    type="number"
                    {...register(`vitalSigns.${index}.heartRate`, { valueAsNumber: true })} 
                    className={cn(
                      "w-full px-3 py-1.5 rounded-lg border-transparent focus:bg-white bg-emerald-50/30 text-sm font-bold text-emerald-700",
                      (errors as any).vitalSigns?.[index]?.heartRate && "border-rose-300 bg-rose-50 text-rose-700"
                    )}
                  />
                </td>
                <td className="px-4 py-2">
                  <input 
                    type="number"
                    step="0.1"
                    {...register(`vitalSigns.${index}.temp`, { valueAsNumber: true })} 
                    className="w-full px-3 py-1.5 rounded-lg border-transparent focus:bg-white bg-amber-50/30 text-sm font-bold text-amber-700"
                  />
                </td>
                <td className="px-4 py-2">
                  <input 
                    type="number"
                    {...register(`vitalSigns.${index}.spo2`, { valueAsNumber: true })} 
                    className="w-full px-3 py-1.5 rounded-lg border-transparent focus:bg-white bg-blue-50/30 text-sm font-bold text-blue-700"
                  />
                </td>
                <td className="px-4 py-2">
                  <input 
                    {...register(`vitalSigns.${index}.notes`)} 
                    className="w-full px-3 py-1.5 rounded-lg border-transparent focus:border-slate-300 focus:bg-white bg-slate-100/50 text-sm text-slate-500 italic"
                  />
                </td>
                <td className="px-4 py-2 text-right">
                  <button 
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-slate-300 hover:text-rose-600 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {fields.length === 0 && (
          <div className="py-12 text-center space-y-2">
             <div className="inline-flex bg-slate-100 p-4 rounded-full">
                <Activity size={32} className="text-slate-300" />
             </div>
             <p className="text-slate-400 text-sm font-medium">Nessuna rilevazione presente. Clicca su "Nuova Rilevazione".</p>
          </div>
        )}
      </div>
    </div>
  );
}
