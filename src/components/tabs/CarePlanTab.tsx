import { useFormContext, useFieldArray } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { ConfirmDeleteButton } from '../ui/ConfirmDeleteButton';
import { Textarea } from '../ui/Textarea';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { LockableSection } from '../ui/LockableSection';

export default function CarePlanTab() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'carePlans'
  });

  const addProblem = () => append({ problem: '', objective: '', plannedInterventions: '', implementedInterventions: '', evaluation: '' });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <LockableSection
        title="Pianificazione Assistenziale"
        headerAction={
          <button
            type="button"
            onClick={addProblem}
            className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-sm hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <Plus size={16} /> Aggiungi Problema
          </button>
        }
      >

      {fields.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-slate-200 print:hidden">
          <div className="text-slate-400 mb-4 flex justify-center">
            <Plus size={48} />
          </div>
          <h4 className="text-lg font-medium text-slate-700 mb-2">Nessun problema inserito</h4>
          <p className="text-sm text-slate-500 mb-6">
            Clicca il pulsante in alto per aggiungere una nuova diagnosi infermieristica o problema collaborativo.
          </p>
          <button
            type="button"
            onClick={addProblem}
            className="bg-white text-emerald-600 border border-emerald-200 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors shadow-sm"
          >
            Inizia Pianificazione
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {fields.map((field, index) => (
            <div key={field.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative group print:border-b-2 print:border-black print:pb-8">
              <div className="absolute top-4 right-4 print:hidden opacity-0 group-hover:opacity-100 focus-within:opacity-100">
                <ConfirmDeleteButton onConfirm={() => remove(index)} size={20} />
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-100 text-emerald-700 font-bold w-8 h-8 rounded-full flex items-center justify-center">
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
      </LockableSection>

      <LockableSection title="Fine presa in carico">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              name="dischargeReason"
              label="Motivo di chiusura"
              options={[
                { label: 'Dimissione', value: 'Dimissione' },
                { label: 'Trasferimento', value: 'Trasferimento' },
                { label: 'Decesso', value: 'Decesso' },
                { label: 'Terzo giorno di tirocinio', value: 'Terzo giorno di tirocinio' },
              ]}
            />
            <Input name="dischargeDate" label="Data fine presa in carico" type="date" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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