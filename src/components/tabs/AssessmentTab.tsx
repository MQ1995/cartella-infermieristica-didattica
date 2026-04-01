import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { Checkbox } from '../ui/Checkbox';

// We'll create a dedicated BodyMap component
import BodyMap from '../ui/BodyMap';

export default function AssessmentTab() {
  const { watch } = useFormContext();
  
  const alcoholConsumption = watch('alcoholConsumption');
  const smoking = watch('smoking');
  const allergies = watch('allergies');
  
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="text-center pb-6 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800">Accertamento Infermieristico</h2>
        <p className="text-slate-500">Modelli di Gordon</p>
      </div>

      {/* 1. Percezione e Gestione della Salute */}
      <section className="bg-slate-50 p-6 rounded-xl border border-slate-100">
        <h3 className="text-lg font-semibold text-indigo-700 mb-4 border-b border-indigo-100 pb-2">
          1. Modello di Percezione e Gestione della Salute
        </h3>
        
        <div className="space-y-4">
          <Textarea 
            name="generalHealth" 
            label="Descrizione dello stato di salute generale" 
            placeholder="Come descrive il suo stato di salute attuale?"
            rows={2}
          />
          <Textarea 
            name="healthPromotion" 
            label="Azioni messe in atto per promuovere la salute" 
            placeholder="(Cibo e bevande, esercizio fisico, gestione stress...)"
            rows={2}
          />
          <Textarea 
            name="preventiveActions" 
            label="Prevenzione primaria/secondaria/terziaria" 
            placeholder="(Screening, visite, autoispezione...)"
            rows={2}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-200">
            <div>
              <Checkbox name="alcoholConsumption" label="Consumo di Alcool" />
              {alcoholConsumption && (
                <Input name="alcoholDetails" label="Tipo e Quantità" className="mt-2" />
              )}
            </div>
            <div>
              <Checkbox name="smoking" label="Fumo" />
              {smoking && (
                <Input name="smokingDetails" label="Tipo e Quantità" className="mt-2" />
              )}
            </div>
            <div>
              <Checkbox name="allergies" label="Allergie note" />
              {allergies && (
                <Input name="allergyDetails" label="Specificare (farmaci, alimenti)" className="mt-2" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Nutrizione e Metabolismo */}
      <section className="bg-slate-50 p-6 rounded-xl border border-slate-100">
        <h3 className="text-lg font-semibold text-indigo-700 mb-4 border-b border-indigo-100 pb-2">
          2. Modello di Nutrizione e Metabolismo
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Textarea name="eatingHabits" label="Abitudini alimentari" rows={2} />
          <Textarea name="dietaryRestrictions" label="Restrizioni dietetiche / Intolleranze" rows={2} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-6">
          <Input name="currentWeight" label="Peso (kg)" type="number" step="0.1" />
          <Input name="height" label="Altezza (cm)" type="number" />
          <Input name="temperature" label="T. Corporea (°C)" type="number" step="0.1" />
          <Input name="bmi" label="BMI calcolato" readOnly className="bg-slate-100" />
          <Select 
            name="weightClass" 
            label="Classe di peso" 
            options={[
              { label: 'Sottopeso', value: 'Sottopeso' },
              { label: 'Normopeso', value: 'Normopeso' },
              { label: 'Sovrappeso', value: 'Sovrappeso' },
              { label: 'Obesità', value: 'Obesita' }
            ]} 
          />
          <Input name="capillaryGlycemia" label="Glicemia (mg/dl)" type="number" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Select 
            name="dentition" 
            label="Dentatura" 
            options={[
              { label: 'Normale', value: 'Normale' },
              { label: 'Edentula', value: 'Edentula' },
              { label: 'Alterata', value: 'Alterata' },
              { label: 'Protesi dentale', value: 'Protesi' }
            ]} 
          />
          <Select 
            name="swallowing" 
            label="Deglutizione" 
            options={[
              { label: 'Normale', value: 'Normale' },
              { label: 'Disfagia Liquidi', value: 'DisfagiaLiquidi' },
              { label: 'Disfagia Solidi', value: 'DisfagiaSolidi' }
            ]} 
          />
          <Select 
            name="appetite" 
            label="Appetito" 
            options={[
              { label: 'Normale', value: 'Normale' },
              { label: 'Aumentato', value: 'Aumentato' },
              { label: 'Diminuito', value: 'Diminuito' }
            ]} 
          />
        </div>

        {/* Mappa Corporea */}
        <div className="mt-8">
          <h4 className="font-semibold text-slate-700 mb-2">Stato dei Tessuti - Mappa Lesioni</h4>
          <p className="text-sm text-slate-500 mb-4">
            Clicca sulla sagoma per aggiungere una lesione da pressione, ferita chirurgica o stoma.
          </p>
          <BodyMap />
        </div>
      </section>

      {/* 3. Eliminazione */}
      <section className="bg-slate-50 p-6 rounded-xl border border-slate-100">
        <h3 className="text-lg font-semibold text-indigo-700 mb-4 border-b border-indigo-100 pb-2">
          3. Modello di Eliminazione
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Urinaria */}
          <div className="space-y-4">
            <h4 className="font-medium text-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Eliminazione Urinaria
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <Select 
                name="urinationType" 
                label="Minzione" 
                options={[
                  { label: 'Spontanea', value: 'Spontanea' },
                  { label: 'Incontinenza', value: 'Incontinenza' },
                  { label: 'Ritenzione', value: 'Ritenzione' }
                ]} 
              />
              <Input name="diuresis24h" label="Diuresi 24h (ml)" type="number" />
            </div>
            <Input name="urinaryCatheter" label="Catetere Vescicale (Tipo/Calibro/Data)" />
            <Textarea name="urineCharacteristics" label="Caratteristiche Urine (Colore, Odore, etc.)" rows={2} />
          </div>

          {/* Intestinale */}
          <div className="space-y-4 border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-8">
            <h4 className="font-medium text-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-800"></span>
              Eliminazione Intestinale
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <Input name="bowelFrequency" label="Frequenza / Ultima evacuazione" />
              <Input name="laxatives" label="Uso lassativi (tipo)" />
            </div>
            <Textarea name="stoolCharacteristics" label="Caratteristiche Feci (Scala Bristol)" rows={2} />
            <Select 
              name="abdomen" 
              label="Addome" 
              options={[
                { label: 'Trattabile / Peristalsi Normale', value: 'Trattabile' },
                { label: 'Globoso / Peristalsi Ipoattiva', value: 'Globoso_Ipoattiva' },
                { label: 'Teso / Peristalsi Assente', value: 'Teso_Assente' }
              ]} 
            />
          </div>
        </div>
      </section>

    </div>
  );
}