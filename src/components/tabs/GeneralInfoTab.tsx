import { Input } from '../ui/Input';
import { LockableSection } from '../ui/LockableSection';

const SUB     = 'text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3';
const DIVIDER = 'border-t border-slate-200 my-5';

export default function GeneralInfoTab() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      <LockableSection title="Dati studente e tirocinio">

        <p className={SUB}>Studente</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input name="studentName"   label="Nome e cognome"    placeholder="Nome Cognome" />
          <Input name="studentId"     label="Matricola"         placeholder="es. 123456" />
          <Input name="academicYear"  label="Anno accademico"   placeholder="es. 2024/2025" />
          <Input name="courseYear"    label="Anno di corso"     placeholder="es. 2° Anno" />
        </div>

        <div className={DIVIDER} />

        <p className={SUB}>Tirocinio</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input name="internshipPeriod"   label="Periodo di tirocinio" />
          <Input name="internshipLocation" label="Sede di tirocinio" />
          <Input name="ward"               label="Degenza e U.O." />
        </div>

        <div className={DIVIDER} />

        <p className={SUB}>Riferimenti</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input name="clinicalGuide" label="Guida di tirocinio" />
          <Input name="coordinator"   label="Coordinatore" />
          <Input name="tutor"         label="Tutor didattico di riferimento" />
        </div>

      </LockableSection>

    </div>
  );
}
