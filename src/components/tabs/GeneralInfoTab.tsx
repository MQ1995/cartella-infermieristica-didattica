import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/Input';

export default function GeneralInfoTab() {
  useFormContext();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="text-center pb-6 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800">Piano di assistenza infermieristica</h2>
        <p className="text-slate-500">a uso didattico</p>
      </div>

      <section>
        <h3 className="text-lg font-semibold text-emerald-700 mb-4 flex items-center gap-2">
          <span className="bg-emerald-100 p-1.5 rounded-md">1</span>
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
    </div>
  );
}
