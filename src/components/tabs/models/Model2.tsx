import { LockableSection } from '../../ui/LockableSection';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Textarea } from '../../ui/Textarea';
import { Checkbox } from '../../ui/Checkbox';

export default function Model2() {
  const { watch, register } = useFormContext();
  
  const weightChange = watch('weightChange');
  const weightClass = watch('weightClass');
  const dentition = watch('dentition');
  const swallowing = watch('swallowing');
  const enteralNutrition = watch('enteralNutrition');
  const malnutritionRisk = watch('malnutritionRisk');
  const skinTemperature = watch('skinTemperature');
  const skinColor = watch('skinColor');
  const itching = watch('itching');
  const erythema = watch('erythema');
  const edema = watch('edema');
  const vascularAccess = watch('vascularAccess');
  const skinIntegrity = watch('skinIntegrity');
  const pressureUlcerRiskFactors = watch('pressureUlcerRiskFactors');

  return (
    <LockableSection title="2. Modello di Nutrizione e Metabolismo">
      
      <div className="space-y-6">
        <h4 className="font-semibold text-slate-700 border-b border-slate-200 pb-2">Dati Soggettivi</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Textarea name="eatingHabits" label="Abitudini alimentari (cosa mangia abitualmente pasti e spuntini tipo e quantità, idratazione)" rows={3} />
          <div className="space-y-4">
            <Input name="dietaryRestrictions" label="Restrizioni dietetiche" />
            <Input name="foodAllergies" label="Allergie/intolleranze alimentari" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start border-t border-slate-200 pt-6">
          <div className="space-y-3">
            <Select 
              name="weightChange" 
              label="Variazione di peso negli ultimi 3-6 mesi?" 
              options={[
                { label: 'No', value: 'No' },
                { label: 'Sì, perdita di KG', value: 'Perdita' },
                { label: 'Sì, aumento di KG', value: 'Aumento' }
              ]} 
            />
            {weightChange && weightChange !== 'No' && (
              <Input name="weightChangeAmount" label="Specificare KG" type="number" step="0.1" />
            )}
          </div>

          <div className="space-y-3">
            <Select 
              name="appetite" 
              label="Appetito" 
              options={[
                { label: 'Normale', value: 'Normale' },
                { label: 'Aumentato', value: 'Aumentato' },
                { label: 'Diminuito', value: 'Diminuito' }
              ]} 
            />
            <div className="space-y-2 mt-2">
              <label className="text-sm font-medium text-slate-700 block">Alterazioni:</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input type="checkbox" value="Alterazione del gusto" className="text-emerald-600 focus:ring-emerald-500 rounded" {...register('appetiteAlterations')} />
                  Alterazione del gusto
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input type="checkbox" value="Nausea" className="text-emerald-600 focus:ring-emerald-500 rounded" {...register('appetiteAlterations')} />
                  Nausea
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input type="checkbox" value="Vomito" className="text-emerald-600 focus:ring-emerald-500 rounded" {...register('appetiteAlterations')} />
                  Vomito
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                  <input type="checkbox" value="Dispepsia" className="text-emerald-600 focus:ring-emerald-500 rounded" {...register('appetiteAlterations')} />
                  Dispepsia
                </label>
              </div>
            </div>
          </div>
        </div>

        <h4 className="font-semibold text-slate-700 border-b border-slate-200 pb-2 mt-8">Esame Fisico</h4>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input name="currentWeight" label="Peso attuale" />
            <Input name="height" label="Altezza" />
            <div className="grid grid-cols-2 gap-2">
              <Input name="temperature" label="Temp. corporea" />
              <Input name="temperatureLocation" label="(sede)" />
            </div>
          </div>
          <Input name="weightNotDetectedReason" label="*Se il peso non è rilevato ma riferito, specificare motivo" className="text-xs" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Input name="idealWeight" label="Peso ideale (calcolato con la Formula di Lorenz)" />
            <Input name="bmi" label="Indice di massa corporea (BMI) Kg/m2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-wrap gap-4 items-end">
              <Select 
                name="weightClass" 
                label="Classe di Peso" 
                className="flex-1"
                options={[
                  { label: 'Normopeso', value: 'Normopeso' },
                  { label: 'Sovrappeso', value: 'Sovrappeso' },
                  { label: 'Sottopeso', value: 'Sottopeso' },
                  { label: 'Obesità', value: 'Obesità' }
                ]} 
              />
              {weightClass === 'Obesità' && (
                <Input name="obesityGrade" label="Grado obesità" className="w-24" />
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input name="basalMetabolism" label="Metabolismo basale (Harris-Benedict)" />
              <Input name="caloricNeed" label="Fabbisogno Calorico (Formula di Long)" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex flex-col gap-2">
              <Select 
                name="dentition" 
                label="Dentatura" 
                options={[
                  { label: 'Normale', value: 'Normale' },
                  { label: 'Edentula', value: 'Edentula' },
                  { label: 'Alterata', value: 'Alterata' },
                  { label: 'Protesi dentale', value: 'Protesi dentale' }
                ]} 
              />
              {dentition === 'Protesi dentale' && (
                <Input name="dentitionProsthesisType" label="Tipo di protesi" />
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Select 
                name="swallowing" 
                label="Deglutizione" 
                options={[
                  { label: 'Normale', value: 'Normale' },
                  { label: 'Disfagia', value: 'Disfagia' }
                ]} 
              />
              {swallowing === 'Disfagia' && (
                <Select 
                  name="swallowingAlteration" 
                  label="Disfagia per:" 
                  options={[
                    { label: 'Liquidi', value: 'Liquidi' },
                    { label: 'Solidi', value: 'Solidi' },
                    { label: 'Entrambi', value: 'Entrambi' }
                  ]} 
                />
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Select 
                  name="enteralNutrition" 
                  label="Nutrizione enterale" 
                  options={[
                    { label: 'No', value: 'No' },
                    { label: 'SNG', value: 'SNG' },
                    { label: 'PEG', value: 'PEG' }
                  ]} 
                />
                {enteralNutrition && enteralNutrition !== 'No' && (
                  <div className="grid grid-cols-3 gap-2">
                    <Input name="enteralNutritionType" label="Tipo/Kcal" />
                    <Input name="enteralNutritionSize" label="Dimensione" />
                    <Input name="enteralNutritionDate" label="Posizionato il" type="date" />
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Select 
                  name="parenteralNutrition" 
                  label="Nutrizione parenterale" 
                  options={[
                    { label: 'No', value: 'No' },
                    { label: 'Parziale', value: 'Parziale' },
                    { label: 'Totale', value: 'Totale' }
                  ]} 
                />
                <div className="mt-2">
                  <Input name="capillaryGlycemia" label="Glicemia capillare (mg/dl)" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h5 className="font-medium text-amber-800 mb-3">Rischio malnutrizione</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <Input name="malnutritionTool" label="Strumento utilizzato" placeholder="es. MUST" />
              <div className="flex items-center gap-4 h-[42px]">
                <span className="text-sm font-medium text-slate-700">Paziente a rischio malnutrizione?</span>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('malnutritionRisk')} /> Sì
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('malnutritionRisk')} /> No
                </label>
              </div>
              {malnutritionRisk === 'true' && (
                <Input name="malnutritionRiskScore" label="Punteggio specifico" />
              )}
            </div>
          </div>
        </div>

        <h4 className="font-semibold text-slate-700 border-b border-slate-200 pb-2 mt-8">Stato dei Tessuti</h4>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Select 
                name="skinTemperature" 
                label="Stato termico cutaneo" 
                options={[
                  { label: 'Normale', value: 'Normale' },
                  { label: 'Freddo', value: 'Freddo' },
                  { label: 'Caldo', value: 'Caldo' }
                ]} 
              />
              {skinTemperature === 'Freddo' && <Input name="skinColdLocation" label="Sede" />}
              {skinTemperature === 'Caldo' && <Input name="skinWarmLocation" label="Sede" />}
            </div>

            <div className="space-y-2">
              <Select 
                name="skinColor" 
                label="Colorito cutaneo" 
                options={[
                  { label: 'Roseo', value: 'Roseo' },
                  { label: 'Pallido', value: 'Pallido' },
                  { label: 'Cianotico', value: 'Cianotico' },
                  { label: 'Itterico', value: 'Itterico' },
                  { label: 'Altro', value: 'Altro' }
                ]} 
              />
              {skinColor === 'Altro' && <Input name="skinColorOther" label="Specificare altro" />}
            </div>
            
            <div className="space-y-4">
              <Select 
                name="skinTurgor" 
                label="Turgore cutaneo" 
                options={[
                  { label: 'Normale', value: 'Normale' },
                  { label: 'Ridotto', value: 'Ridotto' }
                ]} 
              />
              <Select 
                name="skinMoisture" 
                label="Umidità" 
                options={[
                  { label: 'Asciutta al tatto', value: 'Asciutta' },
                  { label: 'Secca/Desquamata', value: 'Secca' },
                  { label: 'Eccessiva sudorazione', value: 'Sudorazione' }
                ]} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-200">
            <div>
              <Checkbox name="itching" label="Prurito" />
              {itching && <Input name="itchingLocation" label="Sede" className="mt-2" />}
            </div>
            <div>
              <Checkbox name="erythema" label="Eritemi" />
              {erythema && <Input name="erythemaLocation" label="Sede" className="mt-2" />}
            </div>
            <div>
              <Checkbox name="edema" label="Edema" />
              {edema && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Input name="edemaLocation" label="Sede" />
                  <Input name="edemaGrade" label="Grado" />
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <Input name="tc" label="TC (Specificare misurazione/sede)" className="max-w-xs" />
          </div>

          <div className="mt-6 p-4 bg-white border border-slate-200 rounded-lg space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-medium text-slate-800">Presenza di accessi vascolari:</span>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('vascularAccess')} /> No
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('vascularAccess')} /> Sì
              </label>
            </div>

            {vascularAccess === 'true' && (
              <div className="space-y-4 pt-2 border-t border-slate-200">
                <div className="flex gap-4 mb-2">
                   <label className="flex items-center gap-1 cursor-pointer text-sm">
                    <input type="radio" value="venoso" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('vascularAccessType')} /> Venoso
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer text-sm">
                    <input type="radio" value="arterioso" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('vascularAccessType')} /> Arterioso
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input name="vascularAccessDetailsType" label="Tipo" />
                  <Input name="vascularAccessLocation" label="Sede" />
                  <Input name="vascularAccessDate" label="Data inserzione" type="date" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input name="vascularAccessDressing" label="Tipologia di medicazione" />
                  <Input name="vascularAccessDressingDate" label="Data ultima medicazione (se necessario)" type="date" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end bg-white p-3 rounded border border-slate-200">
                  <Input name="exitSiteScale" label="Condizione “exit site”: Scala utilizzata" />
                  <Input name="exitSiteScore" label="Punteggio" />
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-4 mb-4">
              <span className="font-medium text-slate-800">Integrità Cutanea:</span>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('skinIntegrity')} /> Sì
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('skinIntegrity')} /> No
              </label>
            </div>

            {skinIntegrity === 'false' && (
              <div className="space-y-4 pl-4 border-l-2 border-slate-200">
                <Textarea name="surgicalWounds" label="Ferite chirurgiche (sede, dimensioni, caratteristiche, data intervento chirurgico, medicazione)" rows={2} />
                <Textarea name="skinLesions" label="Lesioni cutanee (vascolari, da pressione, stoma ecc.) (specificare sede, dimensioni, stadio, caratteristiche, medicazione)" rows={3} />
                <Textarea name="otherSkinLesions" label="Altro (es. abrasioni)" rows={2} />
              </div>
            )}
          </div>

          <div className="mt-4">
            <Input name="skinAppendagesAlterations" label="Alterazioni annessi cutanei (unghie e capelli) (No/Sì specificare sede e caratteristiche)" />
          </div>

          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h5 className="font-medium text-amber-800 mb-3">Valutazione del rischio di Lesioni da Pressione</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input name="bradenScore" label="Punteggio Scala Braden" type="number" readOnly className="bg-white" />
              <Input name="pressureUlcerRisk" label="Rischio" readOnly className="bg-white" />
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-sm font-medium text-slate-700">Fattori di rischio lesioni da pressione:</span>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="false" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('pressureUlcerRiskFactors')} /> No
              </label>
              <label className="flex items-center gap-1 cursor-pointer text-sm">
                <input type="radio" value="true" className="text-emerald-600 focus:ring-emerald-500 w-4 h-4" {...register('pressureUlcerRiskFactors')} /> Sì
              </label>
            </div>
            {pressureUlcerRiskFactors === 'true' && (
              <Textarea name="pressureUlcerRiskFactorsDetails" label="Si, quali? (Intrinseci ed estrinseci, specificare i fattori specifici per la persona assistita)" rows={2} />
            )}
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
             <Input name="throatScaleScore" label="Valutazione cavo orale: Punteggio scala Throat" />
          </div>

          <div className="pt-6 mt-6 border-t border-slate-200">
            <Textarea 
              name="model2Notes" 
              label="Eventuali note aggiuntive sul Modello Di Nutrizione e Metabolismo" 
              rows={3}
            />
            
            <div className="mt-6 p-4 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">Valutazione Modello 2</span>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                  <input 
                    type="radio" 
                    value="FUNZIONALE" 
                    className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                    {...register('model2Status')}
                  />
                  FUNZIONALE
                </label>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-emerald-700 transition-colors">
                  <input 
                    type="radio" 
                    value="DISFUNZIONALE" 
                    className="text-emerald-600 focus:ring-emerald-500 w-5 h-5 border-slate-300" 
                    {...register('model2Status')}
                  />
                  DISFUNZIONALE
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LockableSection>
  );
}
