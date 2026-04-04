import { useFormContext } from 'react-hook-form';
import ModelWrapper from '../ModelWrapper';
import { Input } from '../../../shared/components/ui/Input';

export default function Model1() {
  const { register } = useFormContext();

  return (
    <ModelWrapper title="Percezione e Gestione della Salute" modelNumber={1}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Input 
            label="Stato di salute percepito"
            placeholder="Descrizione del paziente..."
            {...register('generalHealth')}
          />
          <Input 
            label="Azioni di promozione"
            placeholder="Esercizio, dieta..."
            {...register('healthPromotion')}
          />
        </div>
        
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 space-y-4">
          <p className="text-xs font-bold text-slate-400 uppercase">Fattori di Rischio</p>
          <div className="space-y-2">
             {/* Componenti Checkbox riutilizzabili andrebbero qui */}
             <p className="text-sm text-slate-500 italic">Esempio: Alcool, Fumo, Allergie...</p>
          </div>
        </div>
      </div>
    </ModelWrapper>
  );
}

// Nota: il 'register' verrebbe estratto da useFormContext()
// per brevità non ho incluso tutti i campi dello schema Zod qui.
