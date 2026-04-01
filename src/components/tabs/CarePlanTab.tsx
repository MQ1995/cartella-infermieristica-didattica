import { useFormContext, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { Textarea } from '../ui/Textarea';

export default function CarePlanTab() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'carePlans'
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="text-center pb-6 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800">Piano di Assistenza</h2>
        <p className="text-slate-500">Problemi, Obiettivi, Interventi (PES)</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-indigo-700">Pianificazione Assistenziale</h3>
        <button
          type="button"
          onClick={() => append({ problem: '', objective: '', plannedInterventions: '', implementedInterventions: '', evaluation: '' })}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm print:hidden"
        >
          <Plus size={18} />
          Aggiungi Problema
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 print:hidden">
          <div className="text-slate-400 mb-4 flex justify-center">
            <Plus size={48} />
          </div>
          <h4 className="text-lg font-medium text-slate-700 mb-2">Nessun problema inserito</h4>
          <p className="text-sm text-slate-500 mb-6">
            Clicca il pulsante in alto per aggiungere una nuova diagnosi infermieristica o problema collaborativo.
          </p>
          <button
            type="button"
            onClick={() => append({ problem: '', objective: '', plannedInterventions: '', implementedInterventions: '', evaluation: '' })}
            className="bg-white text-indigo-600 border border-indigo-200 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors shadow-sm"
          >
            Inizia Pianificazione
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {fields.map((field, index) => (
            <div key={field.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative group print:border-b-2 print:border-black print:pb-8">
              <div className="absolute top-4 right-4 print:hidden">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-rose-400 hover:text-rose-600 hover:bg-rose-50 p-2 rounded-md transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Elimina Problema"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-100 text-indigo-700 font-bold w-8 h-8 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <h4 className="font-semibold text-slate-800">Problema / Rischio Assistenziale (PES)</h4>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Problem & Objective */}
                  <div className="space-y-4 bg-amber-50/50 p-4 rounded-lg border border-amber-100/50">
                    <Textarea 
                      name={`carePlans.${index}.problem`} 
                      label="Problema (es. Dolore acuto correlato a intervento chirurgico che si manifesta con...)" 
                      rows={2} 
                    />
                    <Textarea 
                      name={`carePlans.${index}.objective`} 
                      label="Obiettivi (SMART)" 
                      rows={2} 
                    />
                  </div>

                  {/* Interventions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-blue-50/50 p-4 rounded-lg border border-blue-100/50">
                    <Textarea 
                      name={`carePlans.${index}.plannedInterventions`} 
                      label="Interventi Pianificati" 
                      rows={4} 
                    />
                    <Textarea 
                      name={`carePlans.${index}.implementedInterventions`} 
                      label="Interventi Attuati (Data / Ora / Azione)" 
                      rows={4} 
                    />
                  </div>

                  {/* Evaluation */}
                  <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100/50">
                    <Textarea 
                      name={`carePlans.${index}.evaluation`} 
                      label="Valutazione e Rivalutazione (Data / Ora / Esito)" 
                      rows={2} 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}