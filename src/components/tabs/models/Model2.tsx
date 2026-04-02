import { useFormContext, useWatch } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { Textarea } from '../../ui/Textarea';
import { Checkbox } from '../../ui/Checkbox';
import { LockableSection } from '../../ui/LockableSection';

const SUB = 'text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3';
const DIVIDER = 'border-t border-slate-200 my-5';

const RADIO = 'w-4 h-4 text-emerald-600 focus:ring-emerald-500';
const RADIO_LABEL = 'flex items-center gap-1.5 cursor-pointer text-sm text-slate-700';

export default function Model2() {
  const { register } = useFormContext();

  const weightChange           = useWatch({ name: 'weightChange' });
  const weightClass            = useWatch({ name: 'weightClass' });
  const dentition              = useWatch({ name: 'dentition' });
  const swallowing             = useWatch({ name: 'swallowing' });
  const enteralNutrition       = useWatch({ name: 'enteralNutrition' });
  const malnutritionRisk       = useWatch({ name: 'malnutritionRisk' });
  const skinTemperature        = useWatch({ name: 'skinTemperature' });
  const skinColor              = useWatch({ name: 'skinColor' });
  const itching                = useWatch({ name: 'itching' });
  const erythema               = useWatch({ name: 'erythema' });
  const edema                  = useWatch({ name: 'edema' });
  const vascularAccess         = useWatch({ name: 'vascularAccess' });
  const skinIntegrity          = useWatch({ name: 'skinIntegrity' });
  const pressureUlcerRiskFactors = useWatch({ name: 'pressureUlcerRiskFactors' });

  return (
    <LockableSection title="2. Nutrizione e metabolismo">
      <div className="space-y-5">

        {/* ── 1. Dati soggettivi ── */}
        <p className={SUB}>Dati soggettivi</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Textarea
            name="eatingHabits"
            label="Abitudini alimentari (pasti, spuntini, idratazione)"
            rows={3}
          />
          <div className="space-y-3">
            <Input name="dietaryRestrictions" label="Restrizioni dietetiche" />
            <Input name="foodAllergies"       label="Allergie / intolleranze alimentari" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Select
              name="weightChange"
              label="Variazione di peso negli ultimi 3–6 mesi"
              options={[
                { label: 'No',              value: 'No' },
                { label: 'Sì — perdita',   value: 'Perdita' },
                { label: 'Sì — aumento',   value: 'Aumento' },
              ]}
            />
            {weightChange && weightChange !== 'No' && (
              <Input name="weightChangeAmount" label="Entità (kg)" type="number" step="0.1" />
            )}
          </div>

          <div className="space-y-3">
            <Select
              name="appetite"
              label="Appetito"
              options={[
                { label: 'Nella norma', value: 'Normale' },
                { label: 'Aumentato',   value: 'Aumentato' },
                { label: 'Diminuito',   value: 'Diminuito' },
              ]}
            />
            <div className="space-y-1.5">
              <span className="text-sm font-medium text-slate-700 block">Alterazioni dell'appetito</span>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {['Alterazione del gusto', 'Nausea', 'Vomito', 'Dispepsia'].map(v => (
                  <label key={v} className={RADIO_LABEL}>
                    <input type="checkbox" value={v} {...register('appetiteAlterations')}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 rounded border-slate-300" />
                    {v}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={DIVIDER} />

        {/* ── 2. Esame fisico — antropometria ── */}
        <p className={SUB}>Esame fisico — antropometria</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Input name="currentWeight" label="Peso attuale (kg)" />
          <Input name="height"        label="Altezza (cm)" />
          <Input name="temperature"   label="Temp. corporea (°C)" />
          <Input name="temperatureLocation" label="Sede misurazione" />
        </div>
        <Input
          name="weightNotDetectedReason"
          label="Se il peso è riferito e non misurato, specificare il motivo"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-1">
          <Input name="idealWeight"      label="Peso ideale — Lorenz (kg)" />
          <Input name="bmi"              label="IMC (kg/m²)" />
          <div className="space-y-3">
            <Select
              name="weightClass"
              label="Classe di peso"
              options={[
                { label: 'Sottopeso',  value: 'Sottopeso' },
                { label: 'Normopeso',  value: 'Normopeso' },
                { label: 'Sovrappeso', value: 'Sovrappeso' },
                { label: 'Obesità',    value: 'Obesità' },
              ]}
            />
            {weightClass === 'Obesità' && (
              <Input name="obesityGrade" label="Grado obesità" />
            )}
          </div>
          <div className="space-y-3">
            <Input name="basalMetabolism" label="Metabolismo basale — Harris-Benedict (kcal)" />
            <Input name="caloricNeed"     label="Fabbisogno calorico — Long (kcal)" />
          </div>
        </div>

        <div className={DIVIDER} />

        {/* ── 3. Dentatura, deglutizione e nutrizione ── */}
        <p className={SUB}>Dentatura, deglutizione e nutrizione artificiale</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Select
              name="dentition"
              label="Dentatura"
              options={[
                { label: 'Nella norma', value: 'Normale' },
                { label: 'Edentula',    value: 'Edentula' },
                { label: 'Alterata',    value: 'Alterata' },
                { label: 'Protesi dentale', value: 'Protesi dentale' },
              ]}
            />
            {dentition === 'Protesi dentale' && (
              <Input name="dentitionProsthesisType" label="Tipo di protesi" />
            )}
          </div>
          <div className="space-y-3">
            <Select
              name="swallowing"
              label="Deglutizione"
              options={[
                { label: 'Nella norma', value: 'Normale' },
                { label: 'Disfagia',    value: 'Disfagia' },
              ]}
            />
            {swallowing === 'Disfagia' && (
              <Select
                name="swallowingAlteration"
                label="Disfagia per"
                options={[
                  { label: 'Liquidi',   value: 'Liquidi' },
                  { label: 'Solidi',    value: 'Solidi' },
                  { label: 'Entrambi',  value: 'Entrambi' },
                ]}
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
          <div className="space-y-3">
            <Select
              name="enteralNutrition"
              label="Nutrizione enterale"
              options={[
                { label: 'No',  value: 'No' },
                { label: 'SNG', value: 'SNG' },
                { label: 'PEG', value: 'PEG' },
              ]}
            />
            {enteralNutrition && enteralNutrition !== 'No' && (
              <div className="grid grid-cols-3 gap-2">
                <Input name="enteralNutritionType" label="Tipo / Kcal" />
                <Input name="enteralNutritionSize" label="Calibro (Fr)" />
                <Input name="enteralNutritionDate" label="Data posizionamento" type="date" />
              </div>
            )}
          </div>
          <div className="space-y-3">
            <Select
              name="parenteralNutrition"
              label="Nutrizione parenterale"
              options={[
                { label: 'No',      value: 'No' },
                { label: 'Parziale', value: 'Parziale' },
                { label: 'Totale',  value: 'Totale' },
              ]}
            />
            <Input name="capillaryGlycemia" label="Glicemia capillare (mg/dl)" />
          </div>
        </div>

        <div className={DIVIDER} />

        {/* ── 4. Stato dei tessuti e cute ── */}
        <p className={SUB}>Stato dei tessuti e cute</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-3">
            <Select
              name="skinTemperature"
              label="Temperatura cutanea"
              options={[
                { label: 'Nella norma', value: 'Normale' },
                { label: 'Fredda',      value: 'Freddo' },
                { label: 'Calda',       value: 'Caldo' },
              ]}
            />
            {skinTemperature === 'Freddo' && <Input name="skinColdLocation" label="Sede" />}
            {skinTemperature === 'Caldo'  && <Input name="skinWarmLocation" label="Sede" />}
          </div>
          <div className="space-y-3">
            <Select
              name="skinColor"
              label="Colorito cutaneo"
              options={[
                { label: 'Roseo',     value: 'Roseo' },
                { label: 'Pallido',   value: 'Pallido' },
                { label: 'Cianotico', value: 'Cianotico' },
                { label: 'Itterico',  value: 'Itterico' },
                { label: 'Altro',     value: 'Altro' },
              ]}
            />
            {skinColor === 'Altro' && <Input name="skinColorOther" label="Specificare" />}
          </div>
          <div className="space-y-3">
            <Select
              name="skinTurgor"
              label="Turgore cutaneo"
              options={[
                { label: 'Nella norma', value: 'Normale' },
                { label: 'Ridotto',     value: 'Ridotto' },
              ]}
            />
            <Select
              name="skinMoisture"
              label="Umidità cutanea"
              options={[
                { label: 'Asciutta',                value: 'Asciutta' },
                { label: 'Secca / desquamata',      value: 'Secca' },
                { label: 'Eccessiva sudorazione',   value: 'Sudorazione' },
              ]}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
          <div className="space-y-2">
            <Checkbox name="itching" label="Prurito" />
            {itching && <Input name="itchingLocation" label="Sede" />}
          </div>
          <div className="space-y-2">
            <Checkbox name="erythema" label="Eritema" />
            {erythema && <Input name="erythemaLocation" label="Sede" />}
          </div>
          <div className="space-y-2">
            <Checkbox name="edema" label="Edema" />
            {edema && (
              <div className="grid grid-cols-2 gap-2">
                <Input name="edemaLocation" label="Sede" />
                <Input name="edemaGrade"    label="Grado" />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <Input name="tc"                       label="TC — sede e misurazione" />
          <Input name="skinAppendagesAlterations" label="Alterazioni annessi cutanei (unghie, capelli)" />
        </div>

        {/* Accessi vascolari */}
        <div className="rounded-lg border border-slate-200 p-4 space-y-3 mt-1">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-700">Accessi vascolari</span>
            <label className={RADIO_LABEL}><input type="radio" value="false" {...register('vascularAccess')} className={RADIO} /> No</label>
            <label className={RADIO_LABEL}><input type="radio" value="true"  {...register('vascularAccess')} className={RADIO} /> Sì</label>
          </div>
          {vascularAccess === 'true' && (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex gap-4">
                <label className={RADIO_LABEL}><input type="radio" value="venoso"    {...register('vascularAccessType')} className={RADIO} /> Venoso</label>
                <label className={RADIO_LABEL}><input type="radio" value="arterioso" {...register('vascularAccessType')} className={RADIO} /> Arterioso</label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input name="vascularAccessDetailsType" label="Tipo" placeholder="es. CVP, CVC, PICC" />
                <Input name="vascularAccessLocation"    label="Sede" placeholder="es. avambraccio sx" />
                <Input name="vascularAccessDate"        label="Data inserzione" type="date" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="vascularAccessDressing"     label="Tipo di medicazione" />
                <Input name="vascularAccessDressingDate" label="Data ultima medicazione" type="date" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="exitSiteScale" label='Scala "exit site" utilizzata' />
                <Input name="exitSiteScore" label="Punteggio" />
              </div>
            </div>
          )}
        </div>

        {/* Integrità cutanea */}
        <div className="rounded-lg border border-slate-200 p-4 space-y-3">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-700">Integrità cutanea</span>
            <label className={RADIO_LABEL}><input type="radio" value="true"  {...register('skinIntegrity')} className={RADIO} /> Integra</label>
            <label className={RADIO_LABEL}><input type="radio" value="false" {...register('skinIntegrity')} className={RADIO} /> Non integra</label>
          </div>
          {skinIntegrity === 'false' && (
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <Textarea name="surgicalWounds" label="Ferite chirurgiche (sede, dimensioni, caratteristiche, data intervento, medicazione)" rows={2} />
              <Textarea name="skinLesions"    label="Lesioni cutanee (vascolari, da pressione, stomi — sede, dimensioni, stadio, medicazione)" rows={2} />
              <Textarea name="otherSkinLesions" label="Altro (es. abrasioni, lacerazioni)" rows={2} />
            </div>
          )}
        </div>

        <div className={DIVIDER} />

        {/* ── 5. Valutazione rischi ── */}
        <p className={SUB}>Valutazione rischi</p>

        {/* Malnutrizione */}
        <div className="rounded-lg border border-slate-200 p-4 space-y-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rischio malnutrizione</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <Input name="malnutritionTool" label="Strumento utilizzato" placeholder="es. MUST, NRS-2002" />
            <div className="space-y-1">
              <span className="text-sm font-medium text-slate-700 block">Paziente a rischio</span>
              <div className="flex items-center gap-4 pt-1">
                <label className={RADIO_LABEL}><input type="radio" value="true"  {...register('malnutritionRisk')} className={RADIO} /> Sì</label>
                <label className={RADIO_LABEL}><input type="radio" value="false" {...register('malnutritionRisk')} className={RADIO} /> No</label>
              </div>
            </div>
            {malnutritionRisk === 'true' && (
              <Input name="malnutritionRiskScore" label="Punteggio" />
            )}
          </div>
        </div>

        {/* Lesioni da pressione */}
        <div className="rounded-lg border border-slate-200 p-4 space-y-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rischio lesioni da pressione — Scala Braden</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="bradenScore"       label="Punteggio Braden (calcolato in Scale Valutazione)" readOnly />
            <Input name="pressureUlcerRisk" label="Livello di rischio"                                readOnly />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700">Fattori di rischio presenti</span>
              <label className={RADIO_LABEL}><input type="radio" value="false" {...register('pressureUlcerRiskFactors')} className={RADIO} /> No</label>
              <label className={RADIO_LABEL}><input type="radio" value="true"  {...register('pressureUlcerRiskFactors')} className={RADIO} /> Sì</label>
            </div>
            {pressureUlcerRiskFactors === 'true' && (
              <Textarea name="pressureUlcerRiskFactorsDetails" label="Descrivere fattori intrinseci ed estrinseci" rows={2} />
            )}
          </div>
        </div>

        {/* Cavo orale */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="throatScaleScore" label="Valutazione cavo orale — punteggio scala Throat" />
        </div>

        <div className={DIVIDER} />

        {/* ── Note + status bar ── */}
        <Textarea name="model2Notes" label="Note" rows={3} />

        <div className="flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Valutazione modello 2</span>
          <div className="flex gap-6">
            {['FUNZIONALE', 'DISFUNZIONALE'].map(v => (
              <label key={v} className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                <input type="radio" value={v} {...register('model2Status')} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" />
                {v}
              </label>
            ))}
          </div>
        </div>

      </div>
    </LockableSection>
  );
}
