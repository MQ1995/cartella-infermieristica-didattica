import { useEffect } from 'react';
import { useFormContext, useWatch, useFieldArray } from 'react-hook-form';
import { Plus } from 'lucide-react';
import { InfoTooltip } from '../ui/InfoTooltip';
import { useRowLocks } from '../../hooks/useRowLocks';

import { BradenCard, BRADEN_ITEMS, bradenRiskLevel } from './scales/BradenCard';
import { ConleyCard } from './scales/ConleyCard';
import { BarthelCard, BARTHEL_ITEMS } from './scales/BarthelCard';
import { GcsCard } from './scales/GcsCard';
import { AvpuCard } from './scales/AvpuCard';
import { PainCard } from './scales/PainCard';
import { BorgCard } from './scales/BorgCard';
import { BristolCard, BRISTOL_TYPES } from './scales/BristolCard';
import { ThroatCard, THROAT_ITEMS } from './scales/ThroatCard';
import { MustCard } from './scales/MustCard';

const EMPTY_MSG = (
  <div className="text-sm text-slate-500 italic p-6 bg-slate-50 border border-slate-200 rounded-lg text-center print:hidden">
    Nessuna valutazione inserita. Clicca "Aggiungi valutazione" per iniziare.
  </div>
);

function AddButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
    >
      <Plus size={16} /> Aggiungi valutazione
    </button>
  );
}

function ScaleSection({ title, tooltip, onAdd, children }: {
  title: string;
  tooltip: React.ReactNode;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4 border border-slate-200 rounded-xl p-5 bg-white">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 flex items-center gap-1">
          {title}
          <InfoTooltip content={tooltip} />
        </h3>
        <AddButton onClick={onAdd} />
      </div>
      {children}
    </div>
  );
}

function RangeTable({ rows }: { rows: [string, string][] }) {
  return (
    <table className="w-full text-xs border-collapse">
      <tbody>
        {rows.map(([range, label]) => (
          <tr key={range}>
            <td className="pr-3 font-mono font-bold">{range}</td>
            <td>{label}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function ScalesTab() {
  const { setValue, control } = useFormContext();

  // ── Braden ──────────────────────────────────
  const { fields: bradenFields, append: appendBraden, remove: removeBraden } = useFieldArray({ control, name: 'bradenEvaluations' });
  const { toggleLock: toggleLockBraden, isLocked: isLockedBraden } = useRowLocks('rowlocks_braden');
  const addBradenEval = () => appendBraden({
    date: new Date().toISOString().slice(0, 10),
    sensory: '', moisture: '', activity: '', mobility: '', nutrition: '', friction: '', notes: '',
  });

  const bradenEvals = useWatch({ name: 'bradenEvaluations' }) as Array<Record<string, string>> | undefined;
  useEffect(() => {
    if (!bradenEvals) return;
    const keys = BRADEN_ITEMS.map(i => i.key);
    for (let i = bradenEvals.length - 1; i >= 0; i--) {
      const ev = bradenEvals[i];
      if (keys.every(k => ev[k] !== undefined && ev[k] !== '')) {
        const total = keys.reduce((sum, k) => sum + parseInt(ev[k]), 0);
        setValue('bradenScore', total);
        setValue('pressureUlcerRisk', bradenRiskLevel(total).label);
        return;
      }
    }
  }, [bradenEvals, setValue]);

  // ── Conley ──────────────────────────────────
  const { fields: conleyFields, append: appendConley, remove: removeConley } = useFieldArray({ control, name: 'conleyEvaluations' });
  const { toggleLock: toggleLockConley, isLocked: isLockedConley } = useRowLocks('rowlocks_conley');
  const addConleyEval = () => appendConley({
    date: new Date().toISOString().slice(0, 10),
    conley1: '', conley2: '', conley3: '', conley4: '', conley5: '', conley6: '', notes: '',
  });

  // ── Barthel ─────────────────────────────────
  const { fields: barthelFields, append: appendBarthel, remove: removeBarthel } = useFieldArray({ control, name: 'barthelEvaluations' });
  const { toggleLock: toggleLockBarthel, isLocked: isLockedBarthel } = useRowLocks('rowlocks_barthel');
  const addBarthelEval = () => appendBarthel({
    date: new Date().toISOString().slice(0, 10),
    feeding: '', bathing: '', grooming: '', dressing: '', bowel: '',
    bladder: '', toilet: '', transfer: '', mobility: '', stairs: '', notes: '',
  });

  const barthelEvals = useWatch({ name: 'barthelEvaluations' }) as Array<Record<string, string>> | undefined;
  useEffect(() => {
    if (!barthelEvals) return;
    const keys = BARTHEL_ITEMS.map(i => i.key);
    for (let i = barthelEvals.length - 1; i >= 0; i--) {
      const ev = barthelEvals[i];
      if (keys.every(k => ev[k] !== undefined && ev[k] !== '')) {
        const total = keys.reduce((sum, k) => sum + parseInt(ev[k]), 0);
        setValue('barthelScore', String(total));
        return;
      }
    }
  }, [barthelEvals, setValue]);

  // ── GCS ─────────────────────────────────────
  const { fields: gcsFields, append: appendGcs, remove: removeGcs } = useFieldArray({ control, name: 'gcsEvaluations' });
  const { toggleLock: toggleLockGcs, isLocked: isLockedGcs } = useRowLocks('rowlocks_gcs');
  const addGcsEval = () => appendGcs({
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toTimeString().slice(0, 5),
    eyes: '', verbal: '', motor: '', notes: '',
  });

  const gcsEvals = useWatch({ name: 'gcsEvaluations' }) as Array<Record<string, string>> | undefined;
  useEffect(() => {
    if (!gcsEvals) return;
    for (let i = gcsEvals.length - 1; i >= 0; i--) {
      const ev = gcsEvals[i];
      if (ev.eyes && ev.verbal && ev.motor) {
        setValue('gcsScore', String(parseInt(ev.eyes) + parseInt(ev.verbal) + parseInt(ev.motor)));
        return;
      }
    }
  }, [gcsEvals, setValue]);

  // ── AVPU ────────────────────────────────────
  const { fields: avpuFields, append: appendAvpu, remove: removeAvpu } = useFieldArray({ control, name: 'avpuEvaluations' });
  const { toggleLock: toggleLockAvpu, isLocked: isLockedAvpu } = useRowLocks('rowlocks_avpu');
  const addAvpuEval = () => appendAvpu({
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toTimeString().slice(0, 5),
    score: '', notes: '',
  });

  const avpuEvals = useWatch({ name: 'avpuEvaluations' }) as Array<Record<string, string>> | undefined;
  useEffect(() => {
    if (!avpuEvals) return;
    for (let i = avpuEvals.length - 1; i >= 0; i--) {
      if (avpuEvals[i].score) {
        setValue('avpuScore', avpuEvals[i].score);
        return;
      }
    }
  }, [avpuEvals, setValue]);

  // ── Pain ────────────────────────────────────
  const { fields: painFields, append: appendPain, remove: removePain } = useFieldArray({ control, name: 'painEvaluations' });
  const { toggleLock: toggleLockPain, isLocked: isLockedPain } = useRowLocks('rowlocks_pain');
  const addPainEval = () => appendPain({
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toTimeString().slice(0, 5),
    score: '0', location: '', notes: '',
  });

  const painEvals = useWatch({ name: 'painEvaluations' }) as Array<Record<string, string>> | undefined;
  useEffect(() => {
    if (!painEvals) return;
    for (let i = painEvals.length - 1; i >= 0; i--) {
      if (painEvals[i].score !== undefined && painEvals[i].score !== '' && !isNaN(parseInt(painEvals[i].score))) {
        setValue('painNrs', painEvals[i].score);
        return;
      }
    }
  }, [painEvals, setValue]);

  // ── Borg ────────────────────────────────────
  const { fields: borgFields, append: appendBorg, remove: removeBorg } = useFieldArray({ control, name: 'borgEvaluations' });
  const { toggleLock: toggleLockBorg, isLocked: isLockedBorg } = useRowLocks('rowlocks_borg');
  const addBorgEval = () => appendBorg({
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toTimeString().slice(0, 5),
    score: '', notes: '',
  });

  // ── Bristol ─────────────────────────────────
  const { fields: bristolFields, append: appendBristol, remove: removeBristol } = useFieldArray({ control, name: 'bristolEvaluations' });
  const { toggleLock: toggleLockBristol, isLocked: isLockedBristol } = useRowLocks('rowlocks_bristol');
  const addBristolEval = () => appendBristol({
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toTimeString().slice(0, 5),
    type: '', notes: '',
  });

  // ── THROAT ──────────────────────────────────
  const { fields: throatFields, append: appendThroat, remove: removeThroat } = useFieldArray({ control, name: 'throatEvaluations' });
  const { toggleLock: toggleLockThroat, isLocked: isLockedThroat } = useRowLocks('rowlocks_throat');
  const addThroatEval = () => appendThroat({
    date: new Date().toISOString().slice(0, 10),
    time: new Date().toTimeString().slice(0, 5),
    lips: '', teeth: '', gums: '', mucosa: '', tongue: '',
    saliva: '', pharynx: '', voice: '', swallowing: '', notes: '',
  });

  const throatEvals = useWatch({ name: 'throatEvaluations' }) as Array<Record<string, string>> | undefined;
  useEffect(() => {
    if (!throatEvals) return;
    const keys = THROAT_ITEMS.map(i => i.key);
    for (let i = throatEvals.length - 1; i >= 0; i--) {
      const ev = throatEvals[i];
      if (keys.every(k => ev[k] !== undefined && ev[k] !== '')) {
        const total = keys.reduce((sum, k) => sum + parseInt(ev[k]), 0);
        setValue('throatScaleScore', String(total));
        return;
      }
    }
  }, [throatEvals, setValue]);

  // ── MUST ────────────────────────────────────
  const { fields: mustFields, append: appendMust, remove: removeMust } = useFieldArray({ control, name: 'mustEvaluations' });
  const { toggleLock: toggleLockMust, isLocked: isLockedMust } = useRowLocks('rowlocks_must');
  const addMustEval = () => appendMust({
    date: new Date().toISOString().slice(0, 10),
    step1Bmi: '', step2WeightLoss: '', step3AcuteDisease: '', notes: '',
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      <ScaleSection
        title="Scala Braden (Rischio Lesioni da Pressione)"
        tooltip={<RangeTable rows={[['≤ 9','Rischio Altissimo'],['10–12','Rischio Alto'],['13–14','Rischio Moderato'],['15–18','Rischio Basso'],['≥ 19','Nessun Rischio']]} />}
        onAdd={addBradenEval}
      >
        {bradenFields.length === 0 ? EMPTY_MSG : (
          <div className="space-y-4">
            {bradenFields.map((field, index) => (
              <BradenCard key={field.id} index={index} onRemove={() => removeBraden(index)} locked={isLockedBraden(index)} onToggleLock={() => toggleLockBraden(index)} />
            ))}
          </div>
        )}
      </ScaleSection>

      <ScaleSection
        title="Scala Conley (Rischio Cadute)"
        tooltip={<RangeTable rows={[['0–1','Non a rischio'],['≥ 2','A rischio di caduta']]} />}
        onAdd={addConleyEval}
      >
        {conleyFields.length === 0 ? EMPTY_MSG : (
          <div className="space-y-4">
            {conleyFields.map((field, index) => (
              <ConleyCard key={field.id} index={index} onRemove={() => removeConley(index)} locked={isLockedConley(index)} onToggleLock={() => toggleLockConley(index)} />
            ))}
          </div>
        )}
      </ScaleSection>

      <ScaleSection
        title="Scala MUST (Rischio Malnutrizione)"
        tooltip={<RangeTable rows={[['0','Rischio Basso'],['1','Rischio Medio'],['≥ 2','Rischio Alto']]} />}
        onAdd={addMustEval}
      >
        {mustFields.length === 0 ? EMPTY_MSG : (
          <div className="space-y-4">
            {mustFields.map((field, index) => (
              <MustCard key={field.id} index={index} onRemove={() => removeMust(index)} locked={isLockedMust(index)} onToggleLock={() => toggleLockMust(index)} />
            ))}
          </div>
        )}
      </ScaleSection>

      <ScaleSection
        title="Glasgow Coma Scale (GCS)"
        tooltip={<RangeTable rows={[['3–8','TBI Grave (Coma)'],['9–12','TBI Moderato'],['13–14','TBI Lieve'],['15','Coscienza integra']]} />}
        onAdd={addGcsEval}
      >
        {gcsFields.length === 0 ? EMPTY_MSG : (
          <div className="space-y-4">
            {gcsFields.map((field, index) => (
              <GcsCard key={field.id} index={index} onRemove={() => removeGcs(index)} locked={isLockedGcs(index)} onToggleLock={() => toggleLockGcs(index)} />
            ))}
          </div>
        )}
      </ScaleSection>

      <ScaleSection
        title="Scala AVPU (Livello di Coscienza)"
        tooltip={<RangeTable rows={[['A','Alert — Vigile e orientato'],['V','Voice — Risponde alla voce'],['P','Pain — Risponde al dolore'],['U','Unresponsive — Non risponde']]} />}
        onAdd={addAvpuEval}
      >
        {avpuFields.length === 0 ? EMPTY_MSG : (
          <div className="space-y-4">
            {avpuFields.map((field, index) => (
              <AvpuCard key={field.id} index={index} onRemove={() => removeAvpu(index)} locked={isLockedAvpu(index)} onToggleLock={() => toggleLockAvpu(index)} />
            ))}
          </div>
        )}
      </ScaleSection>

      <ScaleSection
        title="Scala di Borg (Dispnea / Sforzo percepito)"
        tooltip={<RangeTable rows={[['0','Nessuna'],['0.5–1','Molto lieve'],['2–3','Lieve – Moderata'],['4–6','Intensa'],['7–10','Molto intensa – Massimale']]} />}
        onAdd={addBorgEval}
      >
        {borgFields.length === 0 ? EMPTY_MSG : (
          <div className="space-y-4">
            {borgFields.map((field, index) => (
              <BorgCard key={field.id} index={index} onRemove={() => removeBorg(index)} locked={isLockedBorg(index)} onToggleLock={() => toggleLockBorg(index)} />
            ))}
          </div>
        )}
      </ScaleSection>

      <ScaleSection
        title="Indice di Barthel (ADL)"
        tooltip={<RangeTable rows={[['0–20','Dipendenza totale'],['21–60','Dipendenza grave'],['61–90','Dipendenza moderata'],['91–99','Dipendenza lieve'],['100','Indipendente']]} />}
        onAdd={addBarthelEval}
      >
        {barthelFields.length === 0 ? EMPTY_MSG : (
          <div className="space-y-4">
            {barthelFields.map((field, index) => (
              <BarthelCard key={field.id} index={index} onRemove={() => removeBarthel(index)} locked={isLockedBarthel(index)} onToggleLock={() => toggleLockBarthel(index)} />
            ))}
          </div>
        )}
      </ScaleSection>

      <ScaleSection
        title="Scala NRS (Valutazione del Dolore)"
        tooltip={<RangeTable rows={[['0','Nessun dolore'],['1–3','Dolore lieve'],['4–6','Dolore moderato'],['7–10','Dolore intenso']]} />}
        onAdd={addPainEval}
      >
        {painFields.length === 0 ? EMPTY_MSG : (
          <div className="space-y-4">
            {painFields.map((field, index) => (
              <PainCard key={field.id} index={index} onRemove={() => removePain(index)} locked={isLockedPain(index)} onToggleLock={() => toggleLockPain(index)} />
            ))}
          </div>
        )}
      </ScaleSection>

      <ScaleSection
        title="Scala THROAT (Salute del Cavo Orale)"
        tooltip={<RangeTable rows={[['0','Cavo orale sano'],['1–9','Lieve alterazione'],['10–18','Disfunzione moderata'],['19–27','Disfunzione grave']]} />}
        onAdd={addThroatEval}
      >
        {throatFields.length === 0 ? EMPTY_MSG : (
          <div className="space-y-4">
            {throatFields.map((field, index) => (
              <ThroatCard key={field.id} index={index} onRemove={() => removeThroat(index)} locked={isLockedThroat(index)} onToggleLock={() => toggleLockThroat(index)} />
            ))}
          </div>
        )}
      </ScaleSection>

      <ScaleSection
        title="Scala di Bristol (Caratteristiche delle Feci)"
        tooltip={
          <table className="w-full text-xs border-collapse">
            <tbody>
              {BRISTOL_TYPES.map(({ type, desc }) => (
                <tr key={type}>
                  <td className="pr-3 font-mono font-bold whitespace-nowrap">Tipo {type}</td>
                  <td>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
        onAdd={addBristolEval}
      >
        {bristolFields.length === 0 ? EMPTY_MSG : (
          <div className="space-y-4">
            {bristolFields.map((field, index) => (
              <BristolCard key={field.id} index={index} onRemove={() => removeBristol(index)} locked={isLockedBristol(index)} onToggleLock={() => toggleLockBristol(index)} />
            ))}
          </div>
        )}
      </ScaleSection>

    </div>
  );
}
