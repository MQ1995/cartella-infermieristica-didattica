import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Checkbox } from '../../ui/Checkbox';
import { Plus } from 'lucide-react';
import { ConfirmDeleteButton } from '../../ui/ConfirmDeleteButton';
import { LockableSection } from '../../ui/LockableSection';

const SUB = 'text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3';
const DIVIDER = 'border-t border-slate-200 my-5';
const INPUT_CLS = 'w-full px-2 py-1.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default';

export default function Model1() {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'homeTherapy' });

  const alcoholConsumption = useWatch({ name: 'alcoholConsumption' });
  const smoking            = useWatch({ name: 'smoking' });
  const allergies          = useWatch({ name: 'allergies' });
  const fallRisk           = useWatch({ name: 'fallRisk' });

  const isFallRisk = fallRisk === true || fallRisk === 'true';

  return (
    <LockableSection title="1. Percezione e gestione della salute">
      <div className="space-y-5">

        {/* ── Percezione della salute ── */}
        <p className={SUB}>Percezione della salute</p>
        <div className="space-y-4">
          <Textarea
            name="generalHealth"
            label="Stato di salute generale percepito"
            placeholder="Come il paziente descrive il proprio stato di salute attuale"
            rows={2}
          />
          <Textarea
            name="healthPromotion"
            label="Azioni di promozione della salute"
            placeholder="Alimentazione, attività fisica, gestione dello stress..."
            rows={2}
          />
          <Textarea
            name="preventiveActions"
            label="Azioni di prevenzione primaria / secondaria / terziaria"
            placeholder="Screening, vaccinazioni, autoispezione, visite periodiche..."
            rows={2}
          />
          <Textarea
            name="physicalAppearance"
            label="Aspetto fisico generale (esame obiettivo)"
            placeholder="Presentazione generale, igiene, postura, collaborazione..."
            rows={2}
          />
        </div>

        <div className={DIVIDER} />

        {/* ── Fattori di rischio ── */}
        <p className={SUB}>Fattori di rischio</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-lg border border-slate-200 p-3 space-y-2">
            <Checkbox name="alcoholConsumption" label="Consumo di alcool" />
            {alcoholConsumption && (
              <Input name="alcoholDetails" label="Specificare (tipo e quantità)" />
            )}
          </div>
          <div className="rounded-lg border border-slate-200 p-3 space-y-2">
            <Checkbox name="smoking" label="Fumo" />
            {smoking && (
              <Input name="smokingDetails" label="Specificare (tipo e quantità)" />
            )}
          </div>
          <div className="rounded-lg border border-slate-200 p-3 space-y-2">
            <Checkbox name="allergies" label="Allergie note" />
            {allergies && (
              <Input name="allergyDetails" label="Specificare (farmaci, alimenti, altro)" />
            )}
          </div>
        </div>

        <div className={DIVIDER} />

        {/* ── Terapia domiciliare ── */}
        <div className="flex items-center justify-between">
          <p className={`${SUB} mb-0`}>Terapia domiciliare</p>
          <button
            type="button"
            onClick={() => append({ drug: '', reason: '', dose: '', schedule: '', route: '' })}
            className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
          >
            <Plus size={16} /> Aggiungi farmaco
          </button>
        </div>

        {fields.length === 0 ? (
          <div className="text-sm text-slate-500 italic p-5 bg-white border border-slate-200 rounded-lg text-center print:hidden">
            Nessuna terapia domiciliare inserita.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <th className="px-2 py-2 text-left font-semibold">Farmaco</th>
                  <th className="px-2 py-2 text-left font-semibold">Motivo</th>
                  <th className="px-2 py-2 text-left font-semibold w-28">Dose/die</th>
                  <th className="px-2 py-2 text-left font-semibold w-24">Orari</th>
                  <th className="px-2 py-2 text-left font-semibold w-24">Via</th>
                  <th className="px-2 py-2 print:hidden w-10" />
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <tr key={field.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 align-middle">
                    <td className="px-2 py-1.5"><input {...register(`homeTherapy.${index}.drug`)}     placeholder="es. Ramipril"     className={INPUT_CLS} /></td>
                    <td className="px-2 py-1.5"><input {...register(`homeTherapy.${index}.reason`)}   placeholder="es. Ipertensione" className={INPUT_CLS} /></td>
                    <td className="px-2 py-1.5"><input {...register(`homeTherapy.${index}.dose`)}     placeholder="es. 5 mg"         className={INPUT_CLS} /></td>
                    <td className="px-2 py-1.5"><input {...register(`homeTherapy.${index}.schedule`)} placeholder="es. 8:00"         className={INPUT_CLS} /></td>
                    <td className="px-2 py-1.5"><input {...register(`homeTherapy.${index}.route`)}    placeholder="es. OS"           className={INPUT_CLS} /></td>
                    <td className="px-2 py-1.5 print:hidden">
                      <ConfirmDeleteButton onConfirm={() => remove(index)} size={16} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className={DIVIDER} />

        {/* ── Rischio caduta ── */}
        <p className={SUB}>Valutazione rischio caduta</p>
        <div className="rounded-lg border border-slate-200 p-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <div className="space-y-1">
              <span className="text-sm font-medium text-slate-700">Paziente a rischio caduta</span>
              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer text-sm text-slate-700">
                  <input type="radio" value="true"  {...register('fallRisk')} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" /> Sì
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-sm text-slate-700">
                  <input type="radio" value="false" {...register('fallRisk')} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" /> No
                </label>
              </div>
            </div>
            <Input name="fallRiskScaleUsed" label="Scala utilizzata" placeholder="es. Conley, Morse, Hendrich II" />
            {isFallRisk && (
              <Input name="conleyScore" label="Punteggio" type="number" placeholder="es. 3" />
            )}
          </div>
        </div>

        <div className={DIVIDER} />

        {/* ── Note ── */}
        <Textarea name="model1Notes" label="Note" rows={3} />

        {/* ── Status bar ── */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Valutazione modello 1</span>
          <div className="flex gap-6">
            {['FUNZIONALE', 'DISFUNZIONALE'].map(v => (
              <label key={v} className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                <input type="radio" value={v} {...register('model1Status')} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" />
                {v}
              </label>
            ))}
          </div>
        </div>

      </div>
    </LockableSection>
  );
}
