import { useState } from 'react';
import { LockToggle } from '../ui/LockToggle';
import { useRowLocks } from '../../hooks/useRowLocks';
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';
import { Plus, ChevronDown, ChevronUp, NotebookPen, Pencil, Save } from 'lucide-react';
import { ConfirmDeleteButton } from '../ui/ConfirmDeleteButton';
import { Input } from '../ui/Input';
import { InfoTooltip } from '../ui/InfoTooltip';

const TA = 'w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white resize-y disabled:bg-transparent disabled:border-transparent disabled:cursor-default';

const INTAKE_FIELDS = [
  { key: 'intakeInfusions',   label: 'Infusioni EV' },
  { key: 'intakeOral',        label: 'Fluidi orali' },
  { key: 'intakeOther',       label: 'Altro' },
] as const;

const OUTPUT_FIELDS = [
  { key: 'outputUrine',       label: 'Urine' },
  { key: 'outputFeces',       label: 'Feci' },
  { key: 'outputVomit',       label: 'Vomito / Ristagno gastrico' },
  { key: 'outputPerspiratio', label: 'Perspiratio insensibilis' },
  { key: 'outputDrains',      label: 'Drenaggi' },
  { key: 'outputOther',       label: 'Altro' },
] as const;

function DayRow({ index, onRemove, locked, onToggleLock }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const { register } = useFormContext();

  const prefix = `fluidBalanceDays.${index}`;
  const intakeKeys  = INTAKE_FIELDS.map(f => `${prefix}.${f.key}`);
  const outputKeys  = OUTPUT_FIELDS.map(f => `${prefix}.${f.key}`);
  const date        = useWatch({ name: `${prefix}.date` });
  const intakeVals  = useWatch({ name: intakeKeys });
  const outputVals  = useWatch({ name: outputKeys });
  const notes       = useWatch({ name: `${prefix}.notes` }) as string;

  const toNum = (v: unknown) => parseFloat(String(v ?? '')) || 0;
  const totalIn  = (intakeVals  as string[]).reduce((s, v) => s + toNum(v), 0);
  const totalOut = (outputVals  as string[]).reduce((s, v) => s + toNum(v), 0);
  const balance  = totalIn - totalOut;
  const hasVals  = totalIn > 0 || totalOut > 0;
  const hasNote  = !!notes;

  const balanceColor = !hasVals ? 'text-slate-400' : balance > 0 ? 'text-blue-600' : balance < 0 ? 'text-rose-600' : 'text-emerald-600';
  const balanceBg    = !hasVals ? 'bg-slate-50 border-slate-200' : balance > 0 ? 'bg-blue-50 border-blue-200' : balance < 0 ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50 border-emerald-200';

  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${locked ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 bg-white'}`}>
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50/80 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        <Input
          name={`${prefix}.date`}
          label=""
          type="date"
          className="w-36 flex-shrink-0"
          onClick={e => e.stopPropagation()}
        />

        <div className="flex-1 grid grid-cols-3 gap-3 text-sm text-center">
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Entrate</div>
            <div className="font-semibold text-slate-700">{totalIn > 0 ? `${totalIn} ml` : '—'}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Uscite</div>
            <div className="font-semibold text-slate-700">{totalOut > 0 ? `${totalOut} ml` : '—'}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-0.5">Bilancio</div>
            <div className={`font-bold ${balanceColor}`}>
              {!hasVals ? '—' : `${balance > 0 ? '+' : ''}${balance} ml`}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0 print:hidden" onClick={e => e.stopPropagation()}>
          {hasNote && !expanded && (
            <span className="text-emerald-600 p-1">
              <NotebookPen size={14} />
            </span>
          )}
          <LockToggle locked={locked} onToggle={onToggleLock} title={locked ? 'Sblocca giornata' : 'Blocca giornata'} />
          {!locked && <ConfirmDeleteButton onConfirm={onRemove} size={15} />}
          <button type="button" className="text-slate-400 hover:text-slate-600 p-1" onClick={() => setExpanded(e => !e)}>
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <>
          <fieldset disabled={locked} className={`border-t border-slate-200 bg-slate-50 ${locked ? 'cursor-not-allowed select-none' : ''}`}>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    Entrate <span className="font-normal normal-case">(ml)</span>
                  </h5>
                  <div className="space-y-2">
                    {INTAKE_FIELDS.map(f => (
                      <Input key={f.key} name={`${prefix}.${f.key}`} label={f.label} type="number" placeholder="0" />
                    ))}
                    <Input name={`${prefix}.intakeOtherNote`} label="Specificare altro entrata" placeholder="es. irrigazioni..." />
                    <div className="flex justify-between items-center px-3 py-1.5 bg-white border border-slate-200 rounded text-sm mt-1">
                      <span className="font-semibold text-slate-600">Totale entrate</span>
                      <span className="font-bold text-slate-800">{totalIn > 0 ? `${totalIn} ml` : '—'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    Uscite <span className="font-normal normal-case">(ml)</span>
                  </h5>
                  <div className="space-y-2">
                    {OUTPUT_FIELDS.map(f =>
                      f.key === 'outputPerspiratio' ? (
                        <div key={f.key} className="flex flex-col space-y-1">
                          <label className="text-sm font-medium text-slate-700 flex items-center">
                            {f.label}
                            <InfoTooltip content="Formula: 10 ml × peso corporeo (kg) / 24h. Per un adulto di 70 kg ≈ 700 ml/die. Aumenta in caso di febbre (+100–150 ml per ogni °C sopra 37°C) o diaforesi." />
                          </label>
                          <input
                            type="number"
                            placeholder="0"
                            className="px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 print:border-b print:border-t-0 print:border-x-0 print:rounded-none print:shadow-none print:px-0 print:bg-transparent"
                            {...register(`${prefix}.${f.key}`)}
                          />
                        </div>
                      ) : (
                        <Input key={f.key} name={`${prefix}.${f.key}`} label={f.label} type="number" placeholder="0" />
                      )
                    )}
                    <Input name={`${prefix}.outputOtherNote`} label="Specificare altro uscita" placeholder="es. sudorazione..." />
                    <div className="flex justify-between items-center px-3 py-1.5 bg-white border border-slate-200 rounded text-sm mt-1">
                      <span className="font-semibold text-slate-600">Totale uscite</span>
                      <span className="font-bold text-slate-800">{totalOut > 0 ? `${totalOut} ml` : '—'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Balance summary */}
              <div className={`px-4 py-3 rounded-lg border-2 flex items-center justify-between transition-colors ${balanceBg}`}>
                <span className="text-sm font-semibold text-slate-600">
                  Bilancio {date ? date.split('-').reverse().join('-') : 'giornata'}
                </span>
                <div className="text-right">
                  <div className={`text-xl font-bold tabular-nums ${balanceColor}`}>
                    {!hasVals ? '—' : `${balance > 0 ? '+' : ''}${balance} ml`}
                  </div>
                  {hasVals && (
                    <div className="text-xs text-slate-500">
                      {balance > 0 ? 'Bilancio positivo' : balance < 0 ? 'Bilancio negativo' : 'Bilancio in pareggio'}
                    </div>
                  )}
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Note</label>
                <textarea
                  {...register(`${prefix}.notes`)}
                  rows={2}
                  placeholder={locked ? '' : 'Osservazioni aggiuntive (es. paziente con accesso venoso periferico, diaforesi...)'}
                  className={TA}
                />
              </div>
            </div>
          </fieldset>

          {/* Save / Edit footer */}
          <div className="flex justify-end gap-2 px-5 pb-4 pt-2 border-t border-slate-100 print:hidden">
            <button
              type="button"
              onClick={onToggleLock}
              disabled={!locked}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:hover:bg-transparent"
            >
              <Pencil size={14} /> Modifica
            </button>
            <button
              type="button"
              onClick={onToggleLock}
              disabled={locked}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-emerald-600 text-white hover:bg-emerald-700 disabled:hover:bg-emerald-600"
            >
              <Save size={14} /> Salva
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function FluidBalanceSection() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'fluidBalanceDays' });
  const { toggleLock, isLocked } = useRowLocks();

  const addDay = () => {
    const today = new Date().toISOString().slice(0, 10);
    append({ date: today, intakeInfusions: '', intakeOral: '', intakeOther: '', intakeOtherNote: '',
      outputUrine: '', outputFeces: '', outputVomit: '', outputPerspiratio: '', outputDrains: '',
      outputOther: '', outputOtherNote: '', notes: '' });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200">
          Bilancio idrico giornaliero
        </h3>
        <button
          type="button"
          onClick={addDay}
          className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
        >
          <Plus size={16} /> Aggiungi giornata
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-sm text-slate-500 italic p-6 bg-slate-50 border border-slate-200 rounded-lg text-center print:hidden">
          Nessuna giornata inserita. Clicca "Aggiungi giornata" per iniziare.
        </div>
      ) : (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <DayRow
              key={field.id}
              index={index}
              onRemove={() => remove(index)}
              locked={isLocked(index)}
              onToggleLock={() => toggleLock(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
