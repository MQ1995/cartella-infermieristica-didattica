import { useEffect } from "react";
import { useFormContext, useWatch } from 'react-hook-form';
import { Select } from '../ui/Select';
import { LockableSection } from '../ui/LockableSection';

const RADIO = 'w-4 h-4 text-emerald-600 focus:ring-emerald-500';
const RL    = 'flex items-center gap-1.5 cursor-pointer text-sm text-slate-700';
const SUB   = 'text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 mb-4';

const CONLEY_ITEMS = [
  { name: 'conley1', label: 'È caduto nel corso degli ultimi tre mesi?',                           pts: 2, section: 'Precedenti cadute' },
  { name: 'conley2', label: 'Ha avuto vertigini o capogiri?',                                       pts: 1, section: null },
  { name: 'conley3', label: 'Ha avuto perdite di urine/feci recandosi in bagno?',                   pts: 1, section: null },
  { name: 'conley4', label: 'Presenta compromissione della marcia o andatura instabile?',           pts: 1, section: 'Stato cognitivo e comportamentale' },
  { name: 'conley5', label: 'È agitato o irrequieto?',                                              pts: 2, section: null },
  { name: 'conley6', label: 'Presenta mancanza del senso del pericolo o deterioramento del giudizio?', pts: 3, section: null },
] as const;

export default function ScalesTab() {
  const { watch, setValue, register } = useFormContext();

  // Braden Scale Logic
  const sensory = watch('bradenSensory') || '0';
  const moisture = watch('bradenMoisture') || '0';
  const activity = watch('bradenActivity') || '0';
  const mobility = watch('bradenMobility') || '0';
  const nutrition = watch('bradenNutrition') || '0';
  const friction = watch('bradenFriction') || '0';

  useEffect(() => {
    const total = 
      parseInt(sensory) + 
      parseInt(moisture) + 
      parseInt(activity) + 
      parseInt(mobility) + 
      parseInt(nutrition) + 
      parseInt(friction);
    
    if (total > 0) {
      setValue('bradenScore', total);
      
      let riskLevel = 'Nessun Rischio';
      if (total <= 9) riskLevel = 'Rischio Altissimo';
      else if (total <= 12) riskLevel = 'Rischio Alto';
      else if (total <= 14) riskLevel = 'Rischio Moderato';
      else if (total <= 15) riskLevel = 'Rischio Basso';
      
      setValue('pressureUlcerRisk', riskLevel);
    }
  }, [sensory, moisture, activity, mobility, nutrition, friction, setValue]);

  const bradenScore = watch('bradenScore');
  const pressureUlcerRisk = watch('pressureUlcerRisk');

  // Conley Scale Logic
  const conleyValues = useWatch({ name: CONLEY_ITEMS.map(i => i.name) }) as (string | undefined)[];
  const allAnswered = conleyValues.every(v => v === 'true' || v === 'false');
  const conleyScore = allAnswered
    ? CONLEY_ITEMS.reduce((sum, item, idx) => sum + (conleyValues[idx] === 'true' ? item.pts : 0), 0)
    : null;
  const fallRisk = conleyScore !== null ? conleyScore >= 2 : null;

  useEffect(() => {
    if (conleyScore !== null) {
      setValue('conleyScore', conleyScore);
      setValue('fallRisk', fallRisk);
    }
  }, [conleyScore, fallRisk, setValue]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      <LockableSection
        title="Scala Braden (Rischio Lesioni da Pressione)"
        headerRight={
          <div className="text-right">
            <div className="text-sm text-slate-500">Punteggio Totale</div>
            <div className={`text-2xl font-bold ${bradenScore <= 12 ? 'text-rose-600' : 'text-emerald-600'}`}>
              {bradenScore > 0 ? bradenScore : '-'}
            </div>
            <div className="text-xs font-medium uppercase tracking-wider">{pressureUlcerRisk}</div>
          </div>
        }
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <Select 
            name="bradenSensory" 
            label="1. Percezione Sensoriale" 
            options={[
              { label: '4 - Non limitata', value: '4' },
              { label: '3 - Leggermente limitata', value: '3' },
              { label: '2 - Molto limitata', value: '2' },
              { label: '1 - Completamente limitata', value: '1' }
            ]} 
          />
          <Select 
            name="bradenMoisture" 
            label="2. Umidità (Esposizione della pelle)" 
            options={[
              { label: '4 - Raramente bagnato', value: '4' },
              { label: '3 - Occasionalmente bagnato', value: '3' },
              { label: '2 - Spesso bagnato', value: '2' },
              { label: '1 - Completamente bagnato', value: '1' }
            ]} 
          />
          <Select 
            name="bradenActivity" 
            label="3. Attività Fisica" 
            options={[
              { label: '4 - Cammina frequentemente', value: '4' },
              { label: '3 - Cammina occasionalmente', value: '3' },
              { label: '2 - In poltrona', value: '2' },
              { label: '1 - Completamente allettato', value: '1' }
            ]} 
          />
          <Select 
            name="bradenMobility" 
            label="4. Mobilità (Cambi di posizione)" 
            options={[
              { label: '4 - Limitazioni assenti', value: '4' },
              { label: '3 - Parzialmente limitato', value: '3' },
              { label: '2 - Molto limitata', value: '2' },
              { label: '1 - Completamente immobile', value: '1' }
            ]} 
          />
          <Select 
            name="bradenNutrition" 
            label="5. Nutrizione" 
            options={[
              { label: '4 - Eccellente', value: '4' },
              { label: '3 - Adeguata', value: '3' },
              { label: '2 - Probabilmente inadeguata', value: '2' },
              { label: '1 - Molto povera', value: '1' }
            ]} 
          />
          <Select 
            name="bradenFriction" 
            label="6. Frizione e Scivolamento" 
            options={[
              { label: '3 - Senza problemi apparenti', value: '3' },
              { label: '2 - Problema potenziale', value: '2' },
              { label: '1 - Problema in atto', value: '1' }
            ]} 
          />
        </div>
      </LockableSection>

      <LockableSection
        title="Scala Conley (Rischio Cadute)"
        headerRight={
          <div className="text-right">
            <div className="text-sm text-slate-500">Punteggio Totale</div>
            <div className={`text-2xl font-bold ${conleyScore === null ? 'text-slate-300' : fallRisk ? 'text-rose-600' : 'text-emerald-600'}`}>
              {conleyScore ?? '—'}
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-slate-500">
              {conleyScore === null ? 'Compilare tutti i campi' : fallRisk ? 'A rischio (≥ 2)' : 'Non a rischio'}
            </div>
          </div>
        }
      >
        <div className="space-y-5">
          {(() => {
            let lastSection: string | null = null;
            return CONLEY_ITEMS.map((item) => {
              const showHeader = item.section !== null && item.section !== lastSection;
              if (item.section !== null) lastSection = item.section;
              return (
                <div key={item.name}>
                  {showHeader && <p className={SUB}>{item.section}</p>}
                  <div className="flex items-center justify-between gap-4 py-2 border-b border-slate-100 last:border-0">
                    <span className="text-sm text-slate-700 flex-1">
                      {item.label}
                      <span className="ml-1.5 text-xs font-semibold text-slate-400">+{item.pts} pt</span>
                    </span>
                    <div className="flex gap-5 flex-shrink-0">
                      <label className={RL}>
                        <input type="radio" value="true"  {...register(item.name)} className={RADIO} /> Sì
                      </label>
                      <label className={RL}>
                        <input type="radio" value="false" {...register(item.name)} className={RADIO} /> No
                      </label>
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      </LockableSection>
    </div>
  );
}