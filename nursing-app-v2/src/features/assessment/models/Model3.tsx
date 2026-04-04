import { useFormContext } from 'react-hook-form';
import ModelWrapper from '../ModelWrapper';
import { Input } from '../../../shared/components/ui/Input';
import { Select } from '../../../shared/components/ui/Select';
import { Checkbox } from '../../../shared/components/ui/Checkbox';
import { Textarea } from '../../../shared/components/ui/Textarea';
import { Droplets, Waves, Activity } from 'lucide-react';

export default function Model3() {
  const { register } = useFormContext();

  return (
    <ModelWrapper title="Eliminazione" modelNumber={3}>
      <div className="space-y-12">
        
        {/* --- SEZIONE URINARIA --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-blue-600 border-b border-blue-100 pb-2">
            <Droplets size={18} />
            <h3 className="text-sm font-black uppercase tracking-widest">Eliminazione Urinaria</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Select 
              label="Tipo Minzione" 
              options={[
                { label: 'Spontanea', value: 'SPONTANEA' },
                { label: 'Controllata', value: 'CONTROLLATA' },
                { label: 'Catetere', value: 'CATETERE' }
              ]} 
              {...register('model3.urinationType')}
            />
            <Input label="Frequenza (volte/die)" {...register('model3.urinationFrequency')} />
            <Input label="Diuresi 24h (ml)" type="number" {...register('model3.diuresis24h')} />
          </div>

          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-3">
            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Alterazioni Urinarie</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Checkbox label="Incontinenza" {...register('model3.urinaryAlterations')} value="INCONTINENZA" />
              <Checkbox label="Ritenzione" {...register('model3.urinaryAlterations')} value="RITENZIONE" />
              <Checkbox label="Disuria" {...register('model3.urinaryAlterations')} value="DISURIA" />
              <Checkbox label="Pollachiuria" {...register('model3.urinaryAlterations')} value="POLLACHIURIA" />
            </div>
          </div>
        </section>

        {/* --- SEZIONE INTESTINALE --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-amber-700 border-b border-amber-100 pb-2">
            <Waves size={18} />
            <h3 className="text-sm font-black uppercase tracking-widest">Eliminazione Intestinale</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input label="Frequenza abituale" placeholder="Es. 1 volta/die" {...register('model3.bowelFrequency')} />
            <Input label="Data ultima evacuazione" type="date" {...register('model3.lastBowelMovement')} />
            <Select 
              label="Scala Bristol (Consistenza)" 
              options={[
                { label: 'Tipo 1: Grumi duri separati', value: 'T1' },
                { label: 'Tipo 2: A forma di salsiccia, grumosa', value: 'T2' },
                { label: 'Tipo 3: Salsiccia con crepe', value: 'T3' },
                { label: 'Tipo 4: Salsiccia liscia e morbida', value: 'T4' },
                { label: 'Tipo 5: Pezzi morbidi con bordi netti', value: 'T5' },
                { label: 'Tipo 6: Pezzi soffici con bordi frastagliati', value: 'T6' },
                { label: 'Tipo 7: Acquosa, nessun pezzo solido', value: 'T7' }
              ]} 
              {...register('model3.bristolScale')}
            />
          </div>

          <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 space-y-3">
            <p className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Alterazioni Intestinali</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Checkbox label="Stipsi" {...register('model3.bowelAlterations')} value="STIPSI" />
              <Checkbox label="Diarrea" {...register('model3.bowelAlterations')} value="DIARREA" />
              <Checkbox label="Incontinenza" {...register('model3.bowelAlterations')} value="INCONTINENZA" />
              <Checkbox label="Emorroidi" {...register('model3.bowelAlterations')} value="EMORROIDI" />
            </div>
          </div>
        </section>

        {/* --- ESAME OBIETTIVO ADDOME --- */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-slate-600 border-b border-slate-100 pb-2">
            <Activity size={18} />
            <h3 className="text-sm font-black uppercase tracking-widest">Esame Obiettivo Addome</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select 
              label="Palpazione Addome" 
              options={[
                { label: 'Trattabile, non dolente', value: 'TRATTABILE' },
                { label: 'Globoso', value: 'GLOBOSO' },
                { label: 'Teso-elastico', value: 'TESO' },
                { label: 'Dolente alla palpazione', value: 'DOLENTE' }
              ]} 
              {...register('model3.abdomenExam')}
            />
            <Select 
              label="Peristalsi" 
              options={[
                { label: 'Presente, fisiologica', value: 'FISIOLOGICA' },
                { label: 'Iperattiva', value: 'IPERATTIVA' },
                { label: 'Ipoattiva', value: 'IPOATTIVA' },
                { label: 'Assente', value: 'ASSENTE' }
              ]} 
              {...register('model3.peristalsis')}
            />
          </div>
        </section>

      </div>
    </ModelWrapper>
  );
}
