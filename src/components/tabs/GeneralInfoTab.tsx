import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Plus, Trash2 } from 'lucide-react';

export default function GeneralInfoTab() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'pastMedicalHistory'
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="text-center pb-6 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800">Piano di assistenza infermieristica</h2>
        <p className="text-slate-500">a uso didattico</p>
      </div>

      <section>
        <h3 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center gap-2">
          <span className="bg-indigo-100 p-1.5 rounded-md">1</span>
          Dati Tirocinio e Studente
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input name="academicYear" label="Anno Accademico" placeholder="es. 2022/2023" />
          <Input name="courseYear" label="Anno di corso" placeholder="es. 2° Anno" />
          <Input name="studentName" label="Studente" placeholder="Nome Cognome" />
          <Input name="studentId" label="Matricola" placeholder="es. 123456" />
          <Input name="internshipPeriod" label="Periodo di Tirocinio" />
          <Input name="internshipLocation" label="Sede di Tirocinio" />
          <Input name="ward" label="Degenza e U.O." />
          <Input name="clinicalGuide" label="Guida di Tirocinio" />
          <Input name="coordinator" label="Coordinatore" />
          <Input name="tutor" label="Tutor didattico di riferimento" />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-indigo-700 mb-4 flex items-center gap-2">
          <span className="bg-indigo-100 p-1.5 rounded-md">2</span>
          Accertamento Iniziale: Dati Persona Assistita
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
          <Input name="language" label="Lingua parlata" />
          <Select 
            name="maritalStatus" 
            label="Stato Civile" 
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
              { label: 'Programmato', value: 'Programmato' },
              { label: 'Urgente', value: 'Urgente' },
              { label: 'TSO', value: 'TSO' },
              { label: 'Trasferimento', value: 'Trasferimento' }
            ]} 
          />
          <Input name="origin" label="Provenienza" placeholder="Casa, Altro ente..." />
          <Select 
            name="arrivalMode" 
            label="Modalità di arrivo" 
            options={[
              { label: 'A piedi', value: 'Piedi' },
              { label: 'Sedia a rotelle', value: 'Carrozzina' },
              { label: 'Barella', value: 'Barella' }
            ]} 
          />
        </div>

        <div className="space-y-4 mt-4">
          <Input name="medicalDiagnosis" label="Diagnosi medica di ingresso" className="w-full" />
          <Textarea name="admissionReason" label="Motivo del ricovero (descrizione circostanze)" rows={3} />
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-indigo-700 flex items-center gap-2">
            <span className="bg-indigo-100 p-1.5 rounded-md">3</span>
            Anamnesi patologica remota e ricoveri pregressi
          </h3>
          <button
            type="button"
            onClick={() => append({ date: '', pathology: '' })}
            className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-indigo-100 transition-colors print:hidden"
          >
            <Plus size={16} /> Aggiungi Riga
          </button>
        </div>

        {fields.length === 0 ? (
          <div className="text-sm text-slate-500 italic p-4 bg-slate-50 border border-slate-100 rounded-lg text-center print:hidden">
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
              <div key={field.id} className="grid grid-cols-[150px_1fr_40px] gap-2 items-center bg-slate-50 p-2 rounded-md">
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

        <div className="mt-6 pt-4 border-t border-slate-100">
          <Select 
            name="dataSource" 
            label="I dati sono stati forniti da:" 
            className="max-w-md"
            options={[
              { label: 'Persona ricoverata', value: 'Paziente' },
              { label: 'Parenti / Accompagnatori', value: 'Parenti' },
              { label: 'Documentazione clinica precedente', value: 'Documentazione' },
              { label: 'Altro', value: 'Altro' }
            ]} 
          />
        </div>
      </section>
    </div>
  );
}