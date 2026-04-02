import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Plus } from 'lucide-react';
import { ConfirmDeleteButton } from '../ui/ConfirmDeleteButton';
import { LockableSection } from '../ui/LockableSection';

const SUB = 'text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3';
const DIVIDER = 'border-t border-slate-200 my-5';

// ── Presa in carico ───────────────────────────────────────────────────────────

function PrisaInCaricoSection() {
  return (
    <LockableSection title="Presa in carico">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input name="careStartDate" label="Inizio presa in carico" type="date" />
        <Input name="careEndDate" label="Fine presa in carico" type="date" />
        <Input name="assessmentStartDate" label="Data e ora inizio accertamento" type="datetime-local" />
      </div>
    </LockableSection>
  );
}

// ── Paziente e ricovero ───────────────────────────────────────────────────────

function PatientAndAdmissionSection() {
  const admissionType = useWatch({ name: 'admissionType' });
  const origin        = useWatch({ name: 'origin' });

  return (
    <LockableSection title="Persona assistita e ricovero">

      {/* Dati anagrafici */}
      <p className={SUB}>Dati anagrafici</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Select
          name="patientGender"
          label="Genere"
          options={[
            { label: 'Maschile',  value: 'M' },
            { label: 'Femminile', value: 'F' },
            { label: 'Altro',     value: 'Altro' },
          ]}
        />
        <Input name="patientAge"    label="Età"            type="number" />
        <Input name="nationality"   label="Nazionalità"    />
        <Input name="patientLanguage" label="Lingua parlata" />
        <Select
          name="maritalStatus"
          label="Stato civile"
          options={[
            { label: 'Nubile / Celibe',        value: 'Celibe' },
            { label: 'Coniugato/a',             value: 'Coniugato' },
            { label: 'Separato/a – Divorziato/a', value: 'Separato' },
            { label: 'Vedovo/a',                value: 'Vedovo' },
          ]}
        />
        <Input name="referencePerson" label="Persona di riferimento (grado parentela)" />
      </div>

      <div className={DIVIDER} />

      {/* Ricovero */}
      <p className={SUB}>Dati di ricovero</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Input name="admissionDate" label="Data e ora di ricovero" type="datetime-local" />
        <Select
          name="admissionType"
          label="Tipo di ricovero"
          options={[
            { label: 'Programmato',         value: 'Programmato' },
            { label: 'Urgente',             value: 'Urgente' },
            { label: 'TSO',                 value: 'TSO' },
            { label: 'Trasferimento interno', value: 'Trasferimento interno' },
          ]}
        />
        {admissionType === 'Trasferimento interno' && (
          <Input name="admissionTransferFrom" label="Trasferito da" placeholder="es. Pronto Soccorso, TI" />
        )}
        <Select
          name="origin"
          label="Provenienza"
          options={[
            { label: 'Domicilio',      value: 'Domicilio' },
            { label: 'Pronto Soccorso', value: 'Pronto Soccorso' },
            { label: 'RSA / Casa di cura', value: 'RSA' },
            { label: 'Altro ente',     value: 'Altro ente' },
          ]}
        />
        {origin === 'Altro ente' && (
          <Input name="originOther" label="Specificare ente" placeholder="es. struttura riabilitativa" />
        )}
        <Select
          name="arrivalMode"
          label="Modalità di arrivo"
          options={[
            { label: 'A piedi',             value: 'Piedi' },
            { label: 'Sedia a rotelle',     value: 'Carrozzina' },
            { label: 'Barella / lettino',   value: 'Barella' },
          ]}
        />
      </div>

      <div className={DIVIDER} />

      {/* Diagnosi e motivo */}
      <p className={SUB}>Diagnosi e motivo del ricovero</p>
      <div className="space-y-4">
        <Input name="medicalDiagnosis" label="Diagnosi medica di ingresso" />
        <Textarea
          name="admissionReason"
          label="Motivo del ricovero (circostanze che hanno determinato il ricovero)"
          rows={3}
        />
      </div>

    </LockableSection>
  );
}

// ── Anamnesi ──────────────────────────────────────────────────────────────────

function AnamnesisSection() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'pastMedicalHistory' });
  const dataSource = useWatch({ name: 'dataSource' });

  return (
    <LockableSection
      title="Anamnesi patologica remota e ricoveri pregressi"
      headerAction={
        <button
          type="button"
          onClick={() => append({ date: '', pathology: '' })}
          className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors"
        >
          <Plus size={16} /> Aggiungi riga
        </button>
      }
    >
      {fields.length === 0 ? (
        <div className="text-sm text-slate-500 italic p-5 bg-white border border-slate-200 rounded-lg text-center print:hidden">
          Nessuna anamnesi inserita. Clicca "Aggiungi riga" per iniziare.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <th className="px-3 py-2 text-left font-semibold w-36">Anno / Data</th>
                <th className="px-3 py-2 text-left font-semibold">Patologia / ricovero pregresso</th>
                <th className="px-3 py-2 print:hidden w-10" />
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 align-middle">
                  <td className="px-2 py-1.5">
                    <Input name={`pastMedicalHistory.${index}.date`} label="" placeholder="es. 2018" />
                  </td>
                  <td className="px-2 py-1.5">
                    <Input name={`pastMedicalHistory.${index}.pathology`} label="" placeholder="es. Appendicectomia, ipertensione arteriosa" />
                  </td>
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

      {/* Fonte dati */}
      <p className={SUB}>Fonte dei dati</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <Select
          name="dataSource"
          label="I dati sono stati forniti da:"
          options={[
            { label: 'Persona ricoverata',        value: 'Paziente' },
            { label: 'Parenti / accompagnatori',  value: 'Parenti' },
            { label: 'Documentazione clinica',    value: 'Documentazione' },
            { label: 'Altro (specificare)',        value: 'Altro' },
          ]}
        />
        {dataSource === 'Altro' && (
          <Input name="dataSourceOther" label="Specificare fonte" />
        )}
      </div>

    </LockableSection>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function InitialAssessmentSection() {
  return (
    <div className="space-y-6">
      <PrisaInCaricoSection />
      <PatientAndAdmissionSection />
      <AnamnesisSection />
    </div>
  );
}
