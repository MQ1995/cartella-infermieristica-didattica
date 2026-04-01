import { LockableSection } from '../../ui/LockableSection';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';

export default function Model9() {
  const { watch, register } = useFormContext();

  const patientGender = watch('patientGender');
  const menopause = watch('menopause');
  const contraceptives = watch('contraceptives');
  const breastExam = watch('breastExam');
  const screeningTests = watch('screeningTests');
  const testiclesExam = watch('testiclesExam');

  return (
    <LockableSection title="9. Modello di Sessualità e Riproduzione">
      
      <div className="space-y-6">
        <h4 className="font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4 uppercase text-sm tracking-wider">Per assistiti di sesso Femminile</h4>
        
        <div className={`space-y-6 ${patientGender === 'M' ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input name="lastMenstruation" label="Data ultima mestruazione" type="date" />
            <Input name="menarche" label="Menarca" />
          </div>
          
          <Textarea name="menstrualProblems" label="Problemi legati al ciclo mestruale" rows={2} />

          <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700 w-32">Menopausa:</span>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('menopause')} /> No
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('menopause')} /> Sì
              </label>
            </div>
            {menopause === 'true' && <Input name="menopauseProblems" label="Problemi legati alla menopausa" />}
          </div>

          <Textarea name="pregnancies" label="Gravidanze (stato di gravidanza, n° di gravidanze)" rows={2} />

          <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700 w-32">Uso di contraccettivi:</span>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('contraceptives')} /> No
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('contraceptives')} /> Sì
              </label>
            </div>
            {contraceptives === 'true' && <Input name="contraceptivesProblems" label="Problemi legati all'uso" />}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700 w-48">Effettua l'autopalpazione del seno:</span>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('breastExam')} /> Sì
                </label>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('breastExam')} /> No
                </label>
              </div>
              {breastExam === 'false' && <Input name="breastExamReason" label="Perché" />}
            </div>

            <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700 w-48">Si sottopone regolarmente a test di screening raccomandati:</span>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('screeningTests')} /> Sì
                </label>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('screeningTests')} /> No
                </label>
              </div>
              {screeningTests === 'false' && <Input name="screeningTestsReason" label="Perché" />}
            </div>
          </div>
        </div>

        <h4 className="font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4 mt-8 uppercase text-sm tracking-wider">Per assistiti di sesso maschile</h4>
        
        <div className={`space-y-6 ${patientGender === 'F' ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input name="numberOfChildren" label="N° di figli" type="number" />
            <div className="bg-white p-4 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700 w-48">Effettua l'autopalpazione ai testicoli:</span>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('testiclesExam')} /> Sì
                </label>
                <label className="flex items-center gap-1 cursor-pointer text-sm">
                  <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('testiclesExam')} /> No
                </label>
              </div>
              {testiclesExam === 'false' && <Input name="testiclesExamReason" label="Perché" />}
            </div>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-slate-200">
          <Textarea 
            name="model9Notes" 
            label="Eventuali note aggiuntive sul Modello di Sessualità e Riproduzione" 
            rows={3}
          />
          
          <div className="mt-6 p-4 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
            <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">Valutazione Modello 9</span>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                <input 
                  type="radio" 
                  value="FUNZIONALE" 
                  className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                  {...register('model9Status')}
                />
                FUNZIONALE
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                <input 
                  type="radio" 
                  value="DISFUNZIONALE" 
                  className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                  {...register('model9Status')}
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
