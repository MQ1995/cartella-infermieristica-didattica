import { Input, INPUT_BASE_CLS } from '../ui/Input';
import { Select } from '../ui/Select';
import { LockableSection } from '../ui/LockableSection';

const SUB     = 'text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 mb-4';
const DIVIDER = 'border-t border-slate-200 my-5';

// Generate academic years dynamically: 3 past + current + 2 future
function buildAcademicYears(): { label: string; value: string }[] {
  const current = new Date().getFullYear();
  const years = [];
  for (let y = current - 2; y <= current + 2; y++) {
    const label = `${y}/${y + 1}`;
    years.push({ label, value: label });
  }
  return years;
}

const ACADEMIC_YEARS = buildAcademicYears();

const COURSE_YEARS = [
  { label: 'Primo Anno',   value: 'Primo Anno' },
  { label: 'Secondo Anno', value: 'Secondo Anno' },
  { label: 'Terzo Anno',   value: 'Terzo Anno' },
];

export default function GeneralInfoTab() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      <LockableSection title="Dati studente e tirocinio">

        <p className={SUB}>Studente</p>
        <div className="grid grid-cols-1 @md:grid-cols-3 gap-4">
          <Input name="studentFirstName" label="Nome *"      placeholder="es. Mario" />
          <Input name="studentLastName"  label="Cognome *"   placeholder="es. Rossi" />
          <Input name="studentId"        label="Matricola *" placeholder="es. 123456" />
        </div>
        <div className="grid grid-cols-1 @md:grid-cols-2 gap-4 mt-4">
          <Select name="academicYear" label="Anno accademico *" options={ACADEMIC_YEARS} />
          <Select name="courseYear"   label="Anno di corso *"   options={COURSE_YEARS} />
        </div>

        <div className={DIVIDER} />

        <p className={SUB}>Tirocinio</p>
        <div className="grid grid-cols-1 @md:grid-cols-3 gap-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-slate-700">Periodo di tirocinio</span>
            <div className="flex items-center gap-2">
              <div className="flex-1 min-w-0">
                <Input name="internshipPeriodFrom" label="" type="date" className={INPUT_BASE_CLS} />
              </div>
              <span className="text-sm text-slate-400 flex-shrink-0">→</span>
              <div className="flex-1 min-w-0">
                <Input name="internshipPeriodTo" label="" type="date" className={INPUT_BASE_CLS} />
              </div>
            </div>
          </div>
          <Input name="internshipLocation" label="Sede di tirocinio" />
          <Input name="ward"               label="Degenza e U.O." />
        </div>

        <div className={DIVIDER} />

        <p className={SUB}>Riferimenti</p>
        <div className="grid grid-cols-1 @md:grid-cols-3 gap-4">
          <Input name="clinicalGuide" label="Guida di tirocinio" />
          <Input name="coordinator"   label="Coordinatore" />
          <Input name="tutor"         label="Tutor didattico di riferimento" />
        </div>

      </LockableSection>

    </div>
  );
}
