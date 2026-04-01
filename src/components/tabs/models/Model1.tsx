import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Checkbox } from '../../ui/Checkbox';
import { Plus } from 'lucide-react';
import { ConfirmDeleteButton } from '../../ui/ConfirmDeleteButton';
import { LockableSection } from '../../ui/LockableSection';

export default function Model1() {
  const { control, watch, register } = useFormContext();
  
  const alcoholConsumption = watch('alcoholConsumption');
  const smoking = watch('smoking');
  const allergies = watch('allergies');
  const fallRisk = watch('fallRisk');

  const { fields: homeTherapyFields, append: appendTherapy, remove: removeTherapy } = useFieldArray({
    control,
    name: 'homeTherapy'
  });

  return (
    <LockableSection title="1. Modello di Percezione e Gestione della Salute">
      
      <div className="space-y-4">
        <Textarea 
          name="generalHealth" 
          label="Descrizione dello stato di salute generale" 
          placeholder="Come descrive il suo stato di salute attuale?"
          rows={2}
        />
        <Textarea 
          name="healthPromotion" 
          label="Azioni messe in atto per promuovere la salute" 
          placeholder="(Cibo e bevande, esercizio fisico, gestione stress...)"
          rows={2}
        />
        <Textarea 
          name="preventiveActions" 
          label="Azioni messe in atto per la prevenzione primaria/secondaria/terziaria" 
          placeholder="(Screening, visite, autoispezione...)"
          rows={2}
        />
        
        <div className="pt-4 border-t border-slate-200">
          <h4 className="font-semibold text-slate-700 mb-3">Fattori di rischio legati alla salute:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Checkbox name="alcoholConsumption" label="Consumo di Alcool" />
              {alcoholConsumption && (
                <Input name="alcoholDetails" label="Specificare (tipo e quantità)" className="mt-2" />
              )}
            </div>
            <div>
              <Checkbox name="smoking" label="Fumo" />
              {smoking && (
                <Input name="smokingDetails" label="Specificare (tipo e quantità)" className="mt-2" />
              )}
            </div>
            <div>
              <Checkbox name="allergies" label="Allergie note riferite" />
              {allergies && (
                <Input name="allergyDetails" label="Specificare (farmaci, alimenti ecc.)" className="mt-2" />
              )}
            </div>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-slate-200">
          <h4 className="font-semibold text-slate-700 mb-4">Esame Fisico</h4>
          <Textarea 
            name="physicalAppearance" 
            label="Aspetto generale di salute" 
            rows={2}
          />
        </div>

        <div className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-slate-700">Terapia assunta a domicilio</h4>
            <button
              type="button"
              onClick={() => appendTherapy({ drug: '', reason: '', dose: '', schedule: '', route: '' })}
              className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
            >
              <Plus size={16} /> Aggiungi Farmaco
            </button>
          </div>
          
          {homeTherapyFields.length === 0 ? (
            <div className="text-sm text-slate-500 italic p-4 bg-white border border-slate-200 rounded-lg text-center print:hidden">
              Nessuna terapia inserita.
            </div>
          ) : (
            <div className="space-y-2">
              <div className="grid grid-cols-[1fr_1fr_100px_100px_100px_40px] gap-2 mb-2 font-medium text-slate-700 text-sm px-2 hidden md:grid">
                <div>Farmaco</div>
                <div>Motivo dell'assunzione</div>
                <div>Dose/die</div>
                <div>Orari</div>
                <div>Via di assunzione</div>
                <div className="print:hidden"></div>
              </div>
              {homeTherapyFields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_100px_100px_100px_40px] gap-2 items-center bg-white border border-slate-200 p-2 rounded-md">
                  <Input name={`homeTherapy.${index}.drug`} label="" placeholder="Farmaco" />
                  <Input name={`homeTherapy.${index}.reason`} label="" placeholder="Motivo" />
                  <Input name={`homeTherapy.${index}.dose`} label="" placeholder="Dose/die" />
                  <Input name={`homeTherapy.${index}.schedule`} label="" placeholder="Orari" />
                  <Input name={`homeTherapy.${index}.route`} label="" placeholder="Via" />
                  <div className="w-full md:w-auto mt-2 md:mt-0 flex justify-center">
                    <ConfirmDeleteButton onConfirm={() => removeTherapy(index)} size={18} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-6 mt-6 border-t border-slate-200">
          <div className="mb-4">
            <h4 className="font-semibold text-slate-700 mb-3">Valutazione rischio caduta</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <Input
                name="fallRiskScaleUsed"
                label="Scala utilizzata"
                placeholder="es. Conley, Morse..."
              />
              <div>
                <span className="block text-sm font-medium text-slate-700 mb-1">Paziente a rischio caduta?</span>
                <div className="flex items-center gap-4 h-[38px]">
                  <label className="flex items-center gap-1.5 cursor-pointer text-sm text-slate-700">
                    <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('fallRisk')} />
                    Sì
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-sm text-slate-700">
                    <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('fallRisk')} />
                    No
                  </label>
                </div>
              </div>
              {(fallRisk === true || fallRisk === 'true') && (
                <Input
                  name="conleyScore"
                  label="Punteggio scala"
                  type="number"
                />
              )}
            </div>
          </div>
          <Textarea
            name="model1Notes"
            label="Eventuali note aggiuntive sul Modello Di Percezione E Gestione Della Salute" 
            rows={3}
          />
          
          <div className="mt-6 p-4 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">Valutazione Modello 1</span>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                <input 
                  type="radio" 
                  value="FUNZIONALE" 
                  className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                  {...register('model1Status')}
                />
                FUNZIONALE
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                <input 
                  type="radio" 
                  value="DISFUNZIONALE" 
                  className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                  {...register('model1Status')}
                />
                DISFUNZIONALE
              </label>
            </div>
          </div>
        </div>
      </div>
    </LockableSection>
  );
}
