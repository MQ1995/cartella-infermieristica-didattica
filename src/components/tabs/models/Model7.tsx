import { useFormContext, useWatch } from 'react-hook-form';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Select } from '../../ui/Select';
import { LockableSection } from '../../ui/LockableSection';

const SUB     = 'text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3';
const DIVIDER = 'border-t border-slate-200 my-5';
const BOX     = 'rounded-lg border border-slate-200 p-3 space-y-3';
const RADIO   = 'w-4 h-4 text-emerald-600 focus:ring-emerald-500';
const CB      = 'w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500';
const RL      = 'flex items-center gap-1.5 cursor-pointer text-sm text-slate-700';

export default function Model7() {
  const { register } = useFormContext();

  const bodyImageChange   = useWatch({ name: 'bodyImageChange' });
  const interviewAttitude = useWatch({ name: 'interviewAttitude' }) as string[] | undefined;

  return (
    <LockableSection title="7. Percezione e concetto di sé">
      <div className="space-y-5">

        {/* ── Dati soggettivi ── */}
        <p className={SUB}>Dati soggettivi</p>
        <div className="space-y-3">
          <Textarea
            name="selfDescription"
            label="Come descrive se stesso? Ha notato cambiamenti nel modo in cui si percepisce da quando è iniziata la malattia?"
            rows={3}
          />
          <Textarea
            name="selfEfficacy"
            label="Come si sente rispetto alla propria capacità di gestire la situazione?"
            rows={2}
          />

          <div className={BOX}>
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-slate-700 min-w-[240px]">Ha notato cambiamenti nell'immagine corporea?</span>
              <label className={RL}><input type="radio" value="false" {...register('bodyImageChange')} className={RADIO} /> No</label>
              <label className={RL}><input type="radio" value="true"  {...register('bodyImageChange')} className={RADIO} /> Sì</label>
            </div>
            {bodyImageChange === 'true' && (
              <>
                <div className="border-t border-slate-100" />
                <Textarea name="bodyImageChangeDetails" label="Descrizione" rows={2} />
              </>
            )}
          </div>
        </div>

        <div className={DIVIDER} />

        {/* ── Esame fisico / osservazione ── */}
        <p className={SUB}>Esame fisico e osservazione</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

          <Select
            name="eyeContact"
            label="Contatto oculare"
            options={[
              { label: 'Presente',          value: 'Presente' },
              { label: 'A tratti assente',  value: 'A tratti assente' },
              { label: 'Assente',           value: 'Assente' },
            ]}
          />

          <Input name="voicePatterns" label="Modelli della voce e della parola" placeholder="es. tono basso, voce incerta" />
        </div>

        <div className={BOX}>
          <p className="text-sm font-medium text-slate-700">Atteggiamento al colloquio</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {['Rilassato', 'Nervoso', 'Assertivo', 'Passivo', 'Spaventato', 'Ansioso', 'Depresso', 'Altro'].map(v => (
              <label key={v} className={RL}>
                <input type="checkbox" value={v} {...register('interviewAttitude')} className={CB} /> {v}
              </label>
            ))}
          </div>
          {interviewAttitude?.includes('Altro') && (
            <>
              <div className="border-t border-slate-100" />
              <Input name="interviewAttitudeOther" label="Specificare" />
            </>
          )}
        </div>

        <div className={DIVIDER} />

        {/* ── Aspetti emotivi ── */}
        <p className={SUB}>Aspetti emotivi</p>
        <div className="space-y-3">
          <Textarea
            name="emotionalState"
            label="Stato emotivo percepito (ansia, paura, speranza, rassegnazione...)"
            rows={2}
          />
          <Textarea
            name="copingStrategies"
            label="Strategie di coping abituali e risorse personali"
            rows={2}
          />
        </div>

        <div className={DIVIDER} />

        {/* ── Note ── */}
        <Textarea name="model7Notes" label="Note" rows={3} />

        {/* ── Status bar ── */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 bg-white shadow-md border-l-4 border-emerald-600 rounded-r-lg">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Valutazione modello 7</span>
          <div className="flex gap-6">
            {['FUNZIONALE', 'DISFUNZIONALE'].map(v => (
              <label key={v} className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                <input type="radio" value={v} {...register('model7Status')} className={RADIO} />
                {v}
              </label>
            ))}
          </div>
        </div>

      </div>
    </LockableSection>
  );
}
