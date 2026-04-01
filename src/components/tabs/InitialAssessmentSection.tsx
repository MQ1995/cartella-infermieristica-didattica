import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Plus, Trash2 } from 'lucide-react';

export default function InitialAssessmentSection() {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'pastMedicalHistory'
  });

  const admissionType = watch('admissionType');
  const dataSource = watch('dataSource');

  return (
    <div className="space-y-8">
      <section className="bg-slate-50 p-6 rounded-xl border border-emerald-100">
        <h3 className="text-lg font-semibold text-emerald-700 mb-4 border-b border-emerald-100 pb-2">
          Accertamento infermieristico iniziale
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Giornate di presa in carico</label>
            <div className="flex gap-2 items-center">
              <div className="flex-1">
                <Input name="careStartDate" label="Da" type="date" />
              </div>
              <div className="flex-1">
                <Input name="careEndDate" label="A" type="date" />
              </div>
            </div>
          </div>
          <Input name="assessmentStartDate" label="Data e ora inizio accertamento" type="datetime-local" />
        </div>
      </section>

      <section className="bg-slate-50 p-6 rounded-xl border border-emerald-100">
        <h3 className="text-lg font-semibold text-emerald-700 mb-4 border-b border-emerald-100 pb-2">
          Dati persona assistita e ricovero
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            name="patientGender"
            label="Genere"
            options={[
              { label: 'Maschile', value: 'M' },
              { label: 'Femminile', value: 'F' },
              { label: 'Altro', value: 'Altro' }
            ]}
          />
          <Input name="patientAge" label="Età" type="number" />
          <Input name="nationality" label="Nazionalità" />
          <Input name="patientLanguage" label="Lingua parlata" />
          <Select
            name="maritalStatus"
            label="Stato civile"
            options={[
              { label: 'Nubile/Celibe', value: 'Celibe' },
              { label: 'Coniugato/a', value: 'Coniugato' },
              { label: 'Separato/Divorziato', value: 'Separato' },
              { label: 'Vedovo/a', value: 'Vedovo' }
            ]}
          />
          <Input name="referencePerson" label="Persona di riferimento (grado parentela)" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <Input name="admissionDate" label="Data e ora di ricovero" type="datetime-local" />
          <Select
            name="admissionType"
            label="Tipo di ricovero"
            options={[
              { label: 'programmato', value: 'Programmato' },
              { label: 'urgente', value: 'Urgente' },
              { label: 'TSO', value: 'TSO' },
              { label: 'trasferimento interno', value: 'Trasferimento interno' }
            ]}
          />
          {admissionType === 'Trasferimento interno' && (
            <Input name="admissionTransferFrom" label="da (specificare)" placeholder="es. Pronto Soccorso" />
          )}
          <Input name="origin" label="Provenienza (casa / altro ente)" placeholder="es. casa" />
          <Select
            name="arrivalMode"
            label="Modalità di arrivo"
            options={[
              { label: 'a piedi', value: 'Piedi' },
              { label: 'sedia a rotelle', value: 'Carrozzina' },
              { label: 'barella', value: 'Barella' }
            ]}
          />
        </div>

        <div className="space-y-4 mt-4">
          <Input name="medicalDiagnosis" label="Diagnosi medica di ingresso" className="w-full" />
          <Textarea name="admissionReason" label="Motivo del ricovero (descrizione delle circostanze che hanno causato il ricovero)" rows={3} />
        </div>
      </section>

      <section className="bg-slate-50 p-6 rounded-xl border border-emerald-100">
        <div className="flex justify-between items-center mb-4 border-b border-emerald-100 pb-2">
          <h3 className="text-lg font-semibold text-emerald-700">
            Anamnesi patologica remota e ricoveri pregressi
          </h3>
          <button
            type="button"
            onClick={() => append({ date: '', pathology: '' })}
            className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
          >
            <Plus size={16} /> Aggiungi riga
          </button>
        </div>

        {fields.length === 0 ? (
          <div className="text-sm text-slate-500 italic p-4 bg-white border border-slate-200 rounded-lg text-center print:hidden">
            Nessuna anamnesi pregressa inserita. Clicca "Aggiungi Riga" per iniziare.
          </div>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-[150px_1fr_40px] gap-2 mb-2 font-medium text-slate-700 text-sm px-2">
              <div>Data / Anno</div>
              <div>Patologia / Ricoveri Pregressi</div>
              <div className="print:hidden"></div>
            </div>
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-[150px_1fr_40px] gap-2 items-center bg-white border border-slate-200 p-2 rounded-md">
                <Input name={`pastMedicalHistory.${index}.date`} label="" placeholder="Anno/Data" />
                <Input name={`pastMedicalHistory.${index}.pathology`} label="" placeholder="Descrizione" />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-rose-500 hover:text-rose-700 p-2 print:hidden flex justify-center"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-4 items-end">
          <Select
            name="dataSource"
            label="I dati sono stati forniti:"
            className="w-full md:max-w-md"
            options={[
              { label: 'dalla persona ricoverata', value: 'Paziente' },
              { label: 'parenti/accompagnatori', value: 'Parenti' },
              { label: 'altro (specificare)', value: 'Altro' }
            ]}
          />
          {dataSource === 'Altro' && (
            <Input name="dataSourceOther" label="Specificare fonte" className="flex-1 min-w-[200px]" />
          )}
        </div>
      </section>
    </div>
  );
}
