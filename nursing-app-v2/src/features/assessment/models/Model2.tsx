import { useFormContext, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import ModelWrapper from '../ModelWrapper';
import { Input } from '../../../shared/components/ui/Input';
import { Select } from '../../../shared/components/ui/Select';

export default function Model2() {
  const { register, setValue, formState: { errors } } = useFormContext();
  
  // Guardiamo i campi peso e altezza in tempo reale
  const weight = useWatch({ name: 'model2.weight' });
  const height = useWatch({ name: 'model2.height' });

  useEffect(() => {
    if (weight > 0 && height > 0) {
      const hMeter = height / 100;
      const bmi = weight / (hMeter * hMeter);
      setValue('model2.bmi', parseFloat(bmi.toFixed(2)));
    }
  }, [weight, height, setValue]);

  const bmi = useWatch({ name: 'model2.bmi' });

  const getBmiCategory = (val: number) => {
    if (!val) return null;
    if (val < 18.5) return { label: 'Sottopeso', color: 'text-amber-600' };
    if (val < 25) return { label: 'Normopeso', color: 'text-emerald-600' };
    if (val < 30) return { label: 'Sovrappeso', color: 'text-amber-600' };
    return { label: 'Obesità', color: 'text-rose-600' };
  };

  const cat = getBmiCategory(bmi);

  return (
    <ModelWrapper title="Nutrizione e Metabolismo" modelNumber={2}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Antropometria */}
        <div className="space-y-4">
          <p className="text-sm font-bold text-emerald-800 uppercase tracking-tighter border-b border-emerald-100 pb-2">Antropometria</p>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Peso (kg)" type="number" step="0.1" {...register('model2.weight')} error={errors.model2?.weight?.message} />
            <Input label="Altezza (cm)" type="number" {...register('model2.height')} error={errors.model2?.height?.message} />
          </div>
          
          <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-emerald-600 uppercase">BMI (automatico)</p>
              <p className="text-2xl font-black text-emerald-900 leading-none">{bmi || '--'}</p>
            </div>
            {cat && (
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Categoria</p>
                <p className={cn("text-sm font-bold", cat.color)}>{cat.label}</p>
              </div>
            )}
          </div>
        </div>

        {/* Abitudini */}
        <div className="space-y-4 col-span-2">
          <p className="text-sm font-bold text-emerald-800 uppercase tracking-tighter border-b border-emerald-100 pb-2">Abitudini Alimentari</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select 
              label="Appetito" 
              options={[
                { label: 'Normale', value: 'NORMALE' },
                { label: 'Aumentato', value: 'AUMENTATO' },
                { label: 'Diminuito', value: 'DIMINUITO' }
              ]} 
              {...register('model2.appetite')} 
            />
            <Input label="Allergie Alimentari" placeholder="Es. Lattosio, Glutine..." {...register('model2.foodAllergies')} />
          </div>
          
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
             <p className="text-sm font-medium text-slate-600">Esame Obiettivo Cute</p>
             <p className="text-xs text-slate-400 mt-1 italic">Qui andranno i controlli per turgore, temperatura cutanea ed edemi...</p>
          </div>
        </div>

      </div>
    </ModelWrapper>
  );
}

// Inseriamo l'import di cn per sicurezza
import { cn } from '../../../shared/utils/cn';
