import { useState } from 'react';
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { LockableSection } from '../ui/LockableSection';
import { LockToggle } from '../ui/LockToggle';
import { useRowLocks } from '../../hooks/useRowLocks';
import { ConfirmDeleteButton } from '../ui/ConfirmDeleteButton';
import { Plus, NotebookPen } from 'lucide-react';

const SUB     = 'text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 mb-4';
const DIVIDER = 'border-t border-slate-200 my-5';
const BOX     = 'rounded-lg border border-slate-200 p-3 space-y-3';
const INPUT_CLS = 'w-full px-2 py-1.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default disabled:text-slate-800';

// ── Anamnesi table ────────────────────────────────────────────────────────────

function AnamnesisTable() {
  const { register, watch, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'pastMedicalHistory' });
  const { toggleLock, isLocked } = useRowLocks('rowlocks_pastMedicalHistory');
  const [toggledNotes, setToggledNotes] = useState<Set<number>>(new Set());

  const toggleNotes = (i: number) => setToggledNotes(prev => {
    const next = new Set(prev); next.has(i) ? next.delete(i) : next.add(i); return next;
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-4">
        <span className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
          Anamnesi patologica remota e ricoveri pregressi
        </span>
        <button
          type="button"
          onClick={() => append({ date: '', pathology: '', notes: '' })}
          className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
        >
          <Plus size={16} /> Aggiungi riga
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-sm text-slate-500 italic p-5 bg-white border border-slate-200 rounded-lg text-center print:hidden">
          Nessuna anamnesi inserita. Clicca "Aggiungi riga" per iniziare.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <th className="px-2 py-2 text-left font-semibold w-36">Anno / Data</th>
                <th className="px-2 py-2 text-left font-semibold">Patologia / ricovero pregresso</th>
                <th className="px-2 py-2 print:hidden w-20" />
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => {
                const locked = isLocked(index);
                const hasNote = !!watch(`pastMedicalHistory.${index}.notes`);
                const isExpanded = hasNote ? !toggledNotes.has(index) : toggledNotes.has(index);
                return (
                  <>
                    <tr
                      key={field.id}
                      className={`border-b border-slate-100 last:border-0 align-middle ${isExpanded ? 'bg-emerald-50 border-b-0' : (!locked ? 'hover:bg-slate-50' : '')}`}
                    >
                      <td className={`px-1 py-1 ${isExpanded ? 'border-l-4 border-emerald-500' : ''}`}>
                        <input
                          {...register(`pastMedicalHistory.${index}.date`)}
                          placeholder={locked ? '—' : 'es. 2018'}
                          disabled={locked}
                          className={INPUT_CLS}
                        />
                      </td>
                      <td className="px-1 py-1">
                        <input
                          {...register(`pastMedicalHistory.${index}.pathology`)}
                          placeholder={locked ? '—' : 'es. Appendicectomia, ipertensione arteriosa'}
                          disabled={locked}
                          className={INPUT_CLS}
                        />
                      </td>
                      <td className="px-1 py-1 print:hidden">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => toggleNotes(index)}
                            title={isExpanded ? 'Nascondi note' : 'Aggiungi nota'}
                            className={`relative p-1 rounded transition-colors ${hasNote ? 'text-emerald-600 hover:text-emerald-700' : 'text-slate-300 hover:text-slate-500'}`}
                          >
                            <NotebookPen size={15} />
                            {hasNote && !isExpanded && (
                              <span className="absolute top-0.5 right-0 w-2 h-2 bg-rose-500 rounded-full" />
                            )}
                          </button>
                          <LockToggle locked={locked} onToggle={() => toggleLock(index)} />
                          {!locked && <ConfirmDeleteButton onConfirm={() => remove(index)} size={15} />}
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr key={`${field.id}-notes`} className="bg-emerald-50 border-b border-slate-200">
                        <td colSpan={3} className="px-3 pb-2 border-l-4 border-emerald-500">
                          <textarea
                            {...register(`pastMedicalHistory.${index}.notes`)}
                            placeholder={locked ? 'Nessuna nota presente.' : 'Note aggiuntive (terapie croniche, esiti, dettagli clinici)...'}
                            rows={2}
                            disabled={locked}
                            className="w-full px-3 py-2 border border-emerald-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white resize-none disabled:bg-transparent disabled:border-transparent disabled:cursor-default"
                          />
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

// ── Main export ───────────────────────────────────────────────────────────────

export default function InitialAssessmentSection() {
  const admissionType = useWatch({ name: 'admissionType' });
  const origin        = useWatch({ name: 'origin' });
  const dataSource    = useWatch({ name: 'dataSource' });

  return (
    <LockableSection title="Dati iniziali">

      {/* ── Presa in carico ── */}
      <p className={SUB}>Presa in carico</p>
      <div className="grid grid-cols-1 @lg:grid-cols-2 @xl:grid-cols-3 gap-4">
        <Input name="careStartDate"       label="Inizio presa in carico"         type="date" />
        <Input name="careEndDate"         label="Fine presa in carico"           type="date" />
        <Input name="assessmentStartDate" label="Data e ora inizio accertamento" type="datetime-local" />
      </div>

      <div className={DIVIDER} />

      {/* ── Dati anagrafici ── */}
      <p className={SUB}>Dati anagrafici</p>
      <div className="grid grid-cols-2 @md:grid-cols-3 gap-4">
        <Select
          name="patientGender"
          label="Genere"
          options={[
            { label: 'Maschile',  value: 'M' },
            { label: 'Femminile', value: 'F' },
            { label: 'Altro',     value: 'Altro' },
          ]}
        />
        <Input name="patientAge"      label="Età"             type="number" />
        <Input name="nationality"     label="Nazionalità" />
        <Input name="patientLanguage" label="Lingua parlata" />
        <Select
          name="maritalStatus"
          label="Stato civile"
          options={[
            { label: 'Nubile / Celibe',           value: 'Celibe' },
            { label: 'Coniugato/a',               value: 'Coniugato' },
            { label: 'Separato/a – Divorziato/a', value: 'Separato' },
            { label: 'Vedovo/a',                  value: 'Vedovo' },
          ]}
        />
        <Input name="referencePerson" label="Persona di riferimento (grado parentela)" />
      </div>

      <div className={DIVIDER} />

      {/* ── Dati di ricovero ── */}
      <p className={SUB}>Dati di ricovero</p>
      <div className="grid grid-cols-1 @lg:grid-cols-2 @xl:grid-cols-3 gap-4">
        <Input name="admissionDate" label="Data e ora di ricovero" type="datetime-local" />

        <div className={BOX}>
          <Select
            name="admissionType"
            label="Tipo di ricovero"
            options={[
              { label: 'Programmato',           value: 'Programmato' },
              { label: 'Urgente',               value: 'Urgente' },
              { label: 'TSO',                   value: 'TSO' },
              { label: 'Trasferimento interno', value: 'Trasferimento interno' },
            ]}
          />
          {admissionType === 'Trasferimento interno' && (
            <>
              <div className="border-t border-slate-100" />
              <Input name="admissionTransferFrom" label="Trasferito da" placeholder="es. Pronto Soccorso, TI" />
            </>
          )}
        </div>

        <div className={BOX}>
          <Select
            name="origin"
            label="Provenienza"
            options={[
              { label: 'Domicilio',          value: 'Domicilio' },
              { label: 'Pronto Soccorso',    value: 'Pronto Soccorso' },
              { label: 'RSA / Casa di cura', value: 'RSA' },
              { label: 'Altro ente',         value: 'Altro ente' },
            ]}
          />
          {origin === 'Altro ente' && (
            <>
              <div className="border-t border-slate-100" />
              <Input name="originOther" label="Specificare ente" placeholder="es. struttura riabilitativa" />
            </>
          )}
        </div>

        <Select
          name="arrivalMode"
          label="Modalità di arrivo"
          options={[
            { label: 'A piedi',           value: 'Piedi' },
            { label: 'Sedia a rotelle',   value: 'Carrozzina' },
            { label: 'Barella / lettino', value: 'Barella' },
          ]}
        />
      </div>

      <div className={DIVIDER} />

      {/* ── Diagnosi e motivo ── */}
      <p className={SUB}>Diagnosi e motivo del ricovero</p>
      <div className="space-y-4">
        <Input name="medicalDiagnosis" label="Diagnosi medica di ingresso" />
        <Textarea
          name="admissionReason"
          label="Motivo del ricovero (circostanze che hanno determinato il ricovero)"
          rows={3}
        />
      </div>

      <div className={DIVIDER} />

      {/* ── Anamnesi ── */}
      <AnamnesisTable />

      <div className={DIVIDER} />

      {/* ── Fonte dati ── */}
      <p className={SUB}>Fonte dei dati</p>
      <div className={BOX}>
        <Select
          name="dataSource"
          label="I dati sono stati forniti da:"
          options={[
            { label: 'Persona ricoverata',       value: 'Paziente' },
            { label: 'Parenti / accompagnatori', value: 'Parenti' },
            { label: 'Documentazione clinica',   value: 'Documentazione' },
            { label: 'Altro (specificare)',       value: 'Altro' },
          ]}
        />
        {dataSource === 'Altro' && (
          <>
            <div className="border-t border-slate-100" />
            <Input name="dataSourceOther" label="Specificare fonte" />
          </>
        )}
      </div>

    </LockableSection>
  );
}
