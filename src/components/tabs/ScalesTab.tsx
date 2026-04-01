import { useEffect } from "react";
import { useFormContext } from 'react-hook-form';
import { Select } from '../ui/Select';

export default function ScalesTab() {
  const { watch, setValue } = useFormContext();

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
  const c1 = watch('conley1') === 'true' ? 2 : 0;
  const c2 = watch('conley2') === 'true' ? 1 : 0;
  const c3 = watch('conley3') === 'true' ? 1 : 0;
  const c4 = watch('conley4') === 'true' ? 1 : 0;
  const c5 = watch('conley5') === 'true' ? 2 : 0;
  const c6 = watch('conley6') === 'true' ? 3 : 0;

  useEffect(() => {
    const total = c1 + c2 + c3 + c4 + c5 + c6;
    setValue('conleyScore', total);
    setValue('fallRisk', total >= 2);
  }, [c1, c2, c3, c4, c5, c6, setValue]);

  const conleyScore = watch('conleyScore');
  const fallRisk = watch('fallRisk');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="text-center pb-6 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800">Scale di Valutazione</h2>
        <p className="text-slate-500">Rischio LDP (Braden) e Rischio Cadute (Conley)</p>
      </div>

      {/* Scala Braden */}
      <section className="bg-slate-50 p-6 rounded-xl border border-slate-100">
        <div className="flex justify-between items-center mb-6 border-b border-emerald-100 pb-2">
          <h3 className="text-lg font-semibold text-emerald-700">Scala Braden (Rischio Lesioni da Pressione)</h3>
          <div className="text-right">
            <div className="text-sm text-slate-500">Punteggio Totale</div>
            <div className={`text-2xl font-bold ${bradenScore <= 12 ? 'text-rose-600' : 'text-emerald-600'}`}>
              {bradenScore > 0 ? bradenScore : '-'}
            </div>
            <div className="text-xs font-medium uppercase tracking-wider">{pressureUlcerRisk}</div>
          </div>
        </div>

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
      </section>

      {/* Scala Conley */}
      <section className="bg-slate-50 p-6 rounded-xl border border-slate-100">
        <div className="flex justify-between items-center mb-6 border-b border-emerald-100 pb-2">
          <h3 className="text-lg font-semibold text-emerald-700">Scala Conley (Rischio Cadute)</h3>
          <div className="text-right">
            <div className="text-sm text-slate-500">Punteggio Totale</div>
            <div className={`text-2xl font-bold ${fallRisk ? 'text-rose-600' : 'text-emerald-600'}`}>
              {conleyScore}
            </div>
            <div className="text-xs font-medium uppercase tracking-wider">
              {fallRisk ? 'A Rischio (>= 2)' : 'Non a Rischio'}
            </div>
          </div>
        </div>

        <div className="space-y-4 bg-white p-4 rounded-lg border border-slate-200">
          <h4 className="font-medium text-slate-800 border-b border-slate-100 pb-2 mb-3">Precedenti Cadute</h4>
          
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-slate-700">È caduto nel corso degli ultimi tre mesi? (2 pt)</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-1 text-sm"><input type="radio" value="true" {...watch('conley1') === 'true' ? {checked: true} : {}} onChange={(e) => setValue('conley1', e.target.value)} /> Sì</label>
              <label className="flex items-center gap-1 text-sm"><input type="radio" value="false" {...watch('conley1') === 'false' ? {checked: true} : {}} onChange={(e) => setValue('conley1', e.target.value)} /> No</label>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <span className="text-sm text-slate-700">Ha mai avuto vertigini o capogiri? (1 pt)</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-1 text-sm"><input type="radio" value="true" {...watch('conley2') === 'true' ? {checked: true} : {}} onChange={(e) => setValue('conley2', e.target.value)} /> Sì</label>
              <label className="flex items-center gap-1 text-sm"><input type="radio" value="false" {...watch('conley2') === 'false' ? {checked: true} : {}} onChange={(e) => setValue('conley2', e.target.value)} /> No</label>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <span className="text-sm text-slate-700">Perdita di urine/feci recandosi in bagno? (1 pt)</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-1 text-sm"><input type="radio" value="true" {...watch('conley3') === 'true' ? {checked: true} : {}} onChange={(e) => setValue('conley3', e.target.value)} /> Sì</label>
              <label className="flex items-center gap-1 text-sm"><input type="radio" value="false" {...watch('conley3') === 'false' ? {checked: true} : {}} onChange={(e) => setValue('conley3', e.target.value)} /> No</label>
            </div>
          </div>

          <h4 className="font-medium text-slate-800 border-b border-slate-100 pb-2 mb-3 mt-6">Deterioramento Cognitivo</h4>
          
          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-slate-700">Compromissione della marcia / instabile (1 pt)</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-1 text-sm"><input type="radio" value="true" {...watch('conley4') === 'true' ? {checked: true} : {}} onChange={(e) => setValue('conley4', e.target.value)} /> Sì</label>
              <label className="flex items-center gap-1 text-sm"><input type="radio" value="false" {...watch('conley4') === 'false' ? {checked: true} : {}} onChange={(e) => setValue('conley4', e.target.value)} /> No</label>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <span className="text-sm text-slate-700">Agitato / Irrequieto (2 pt)</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-1 text-sm"><input type="radio" value="true" {...watch('conley5') === 'true' ? {checked: true} : {}} onChange={(e) => setValue('conley5', e.target.value)} /> Sì</label>
              <label className="flex items-center gap-1 text-sm"><input type="radio" value="false" {...watch('conley5') === 'false' ? {checked: true} : {}} onChange={(e) => setValue('conley5', e.target.value)} /> No</label>
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-slate-100">
            <span className="text-sm text-slate-700">Mancanza del senso del pericolo / deterioramento giudizio (3 pt)</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-1 text-sm"><input type="radio" value="true" {...watch('conley6') === 'true' ? {checked: true} : {}} onChange={(e) => setValue('conley6', e.target.value)} /> Sì</label>
              <label className="flex items-center gap-1 text-sm"><input type="radio" value="false" {...watch('conley6') === 'false' ? {checked: true} : {}} onChange={(e) => setValue('conley6', e.target.value)} /> No</label>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}