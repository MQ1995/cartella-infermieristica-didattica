import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/Input';

export default function GeneralInfoTab() {
  useFormContext();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      <section>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Studente</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input name="studentName" label="Nome e Cognome" placeholder="Nome Cognome" />
          <Input name="studentId" label="Matricola" placeholder="es. 123456" />
          <Input name="academicYear" label="Anno Accademico" placeholder="es. 2024/2025" />
          <Input name="courseYear" label="Anno di Corso" placeholder="es. 2° Anno" />
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Tirocinio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input name="internshipPeriod" label="Periodo di Tirocinio" />
          <Input name="internshipLocation" label="Sede di Tirocinio" />
          <Input name="ward" label="Degenza e U.O." />
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Riferimenti</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input name="clinicalGuide" label="Guida di Tirocinio" />
          <Input name="coordinator" label="Coordinatore" />
          <Input name="tutor" label="Tutor Didattico di Riferimento" />
        </div>
      </section>

    </div>
  );
}
