import { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Plus, Lock, LockOpen, NotebookPen, ChevronDown, ChevronUp } from 'lucide-react';
import { ConfirmDeleteButton } from '../ui/ConfirmDeleteButton';

const INPUT_CLS = 'w-full px-2 py-1.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default disabled:text-slate-800';

const TISSUE_TYPES = [
  { value: 'riepitelizzazione', label: 'Riepitelizzazione' },
  { value: 'granulazione', label: 'Granulazione' },
  { value: 'fibrina', label: 'Fibrina' },
  { value: 'necrotico', label: 'Necrotico' },
];

// ---------- Presidi section ----------

function DevicesSection() {
  const { register, watch, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'devices' });
  const [lockedRows, setLockedRows] = useState<Set<number>>(new Set());
  const [toggledNotes, setToggledNotes] = useState<Set<number>>(new Set());

  const toggleLock = (i: number) => setLockedRows(prev => {
    const next = new Set(prev); next.has(i) ? next.delete(i) : next.add(i); return next;
  });
  const toggleNotes = (i: number) => setToggledNotes(prev => {
    const next = new Set(prev); next.has(i) ? next.delete(i) : next.add(i); return next;
  });

  const addRow = () => append({
    deviceType: '', present: true, placementDate: '', renewalDate: '', dressingType: '', notes: '',
  });

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Presidi</h3>
        <button
          type="button"
          onClick={addRow}
          className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
        >
          <Plus size={16} /> Aggiungi presidio
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-sm text-slate-500 italic p-6 bg-slate-50 border border-slate-200 rounded-lg text-center print:hidden">
          Nessun presidio inserito. Clicca "Aggiungi presidio" per iniziare.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600">
                <th className="px-2 py-2 text-left font-semibold w-48">Tipo presidio</th>
                <th className="px-2 py-2 text-center font-semibold w-20">Presente</th>
                <th className="px-2 py-2 text-left font-semibold w-36">Data posizionamento</th>
                <th className="px-2 py-2 text-left font-semibold w-36">Data rinnovo</th>
                <th className="px-2 py-2 text-left font-semibold">Tipo medicazione</th>
                <th className="px-2 py-2 print:hidden w-16" />
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => {
                const locked = lockedRows.has(index);
                const hasNote = !!watch(`devices.${index}.notes`);
                const isExpanded = hasNote ? !toggledNotes.has(index) : toggledNotes.has(index);
                return (
                  <>
                    <tr
                      key={field.id}
                      className={`border-b border-slate-100 last:border-0 align-middle ${isExpanded ? 'bg-amber-50 border-b-0' : ''} ${locked ? 'opacity-60' : (!isExpanded ? 'hover:bg-slate-50' : '')}`}
                    >
                      <td className={`px-1 py-1 ${isExpanded ? 'border-l-4 border-amber-400' : ''}`}>
                        <input {...register(`devices.${index}.deviceType`)} placeholder={locked ? '—' : 'es. CVC, SNG, drenaggio'} disabled={locked} className={INPUT_CLS} />
                      </td>
                      <td className="px-2 py-1 text-center">
                        <input
                          {...register(`devices.${index}.present`)}
                          type="checkbox"
                          disabled={locked}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 rounded border-slate-300 disabled:cursor-default"
                        />
                      </td>
                      <td className="px-1 py-1">
                        <input {...register(`devices.${index}.placementDate`)} type="date" disabled={locked} className={INPUT_CLS} style={locked ? { WebkitTextFillColor: 'rgb(30 41 59)' } : undefined} />
                      </td>
                      <td className="px-1 py-1">
                        <input {...register(`devices.${index}.renewalDate`)} type="date" disabled={locked} className={INPUT_CLS} style={locked ? { WebkitTextFillColor: 'rgb(30 41 59)' } : undefined} />
                      </td>
                      <td className="px-1 py-1">
                        <input {...register(`devices.${index}.dressingType`)} placeholder={locked ? '—' : 'es. medicazione sterile'} disabled={locked} className={INPUT_CLS} />
                      </td>
                      <td className="px-1 py-1 print:hidden">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => toggleNotes(index)}
                            title={isExpanded ? 'Nascondi note' : 'Aggiungi nota'}
                            className={`relative p-1 rounded transition-colors ${hasNote ? 'text-emerald-600 hover:text-emerald-700' : 'text-slate-300 hover:text-slate-500'}`}
                          >
                            <NotebookPen size={15} />
                            {hasNote && !isExpanded && (
                              <span className="absolute top-0.5 right-0 w-2 h-2 bg-rose-500 rounded-full" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleLock(index)}
                            title={locked ? 'Sblocca riga' : 'Blocca riga'}
                            className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${locked ? 'bg-amber-400' : 'bg-slate-200'}`}
                          >
                            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow flex items-center justify-center transition-all duration-200 ${locked ? 'left-4 text-amber-500' : 'left-0.5 text-slate-400'}`}>
                              {locked ? <Lock size={9} /> : <LockOpen size={9} />}
                            </span>
                          </button>
                          {!locked && <ConfirmDeleteButton onConfirm={() => remove(index)} size={15} />}
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr key={`${field.id}-notes`} className="bg-amber-50 border-b border-slate-200">
                        <td colSpan={6} className="px-3 pb-2 border-l-4 border-amber-400">
                          <textarea
                            {...register(`devices.${index}.notes`)}
                            placeholder="Note aggiuntive per questo presidio..."
                            rows={2}
                            disabled={locked}
                            className="w-full px-3 py-2 border border-amber-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-amber-400 bg-white resize-none disabled:bg-transparent disabled:border-transparent disabled:cursor-default"
                          />
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ---------- Wound care section ----------

function WoundEntry({ index, onRemove, locked, onToggleLock }: {
  index: number;
  onRemove: () => void;
  locked: boolean;
  onToggleLock: () => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const { register, watch } = useFormContext();
  const prefix = `woundCare.${index}`;
  const etiology = watch(`${prefix}.etiology`);
  const location = watch(`${prefix}.location`);

  const summary = [etiology, location].filter(Boolean).join(' — ') || 'Nuova lesione';

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 bg-white cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-slate-700 text-sm truncate block">{summary}</span>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0 print:hidden" onClick={e => e.stopPropagation()}>
          <button
            type="button"
            onClick={onToggleLock}
            title={locked ? 'Sblocca scheda' : 'Blocca scheda'}
            className={`relative w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${locked ? 'bg-amber-400' : 'bg-slate-200'}`}
          >
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow flex items-center justify-center transition-all duration-200 ${locked ? 'left-4 text-amber-500' : 'left-0.5 text-slate-400'}`}>
              {locked ? <Lock size={9} /> : <LockOpen size={9} />}
            </span>
          </button>
          {!locked && <ConfirmDeleteButton onConfirm={onRemove} size={15} />}
          <button type="button" className="text-slate-400 hover:text-slate-600 p-1" onClick={() => setExpanded(e => !e)}>
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>

      {/* Body */}
      {expanded && (
        <div className={`border-t border-slate-200 bg-slate-50 p-4 ${locked ? 'opacity-60' : ''}`}>
          <fieldset disabled={locked} className={`space-y-4 ${locked ? 'pointer-events-none' : ''}`}>
            {/* Row 1: eziologia, sede, dimensioni */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Eziologia</label>
                <select {...register(`${prefix}.etiology`)} className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default">
                  <option value="">—</option>
                  <option>Traumatica</option>
                  <option>Chirurgica</option>
                  <option>Lesione da pressione</option>
                  <option>Ustione</option>
                  <option>Altro</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Sede</label>
                <input {...register(`${prefix}.location`)} placeholder={locked ? '—' : 'es. tallone sx, sacro'} className={INPUT_CLS} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Dimensioni (L × P × H cm)</label>
                <input {...register(`${prefix}.dimensions`)} placeholder={locked ? '—' : 'es. 3 × 2 × 0.5 cm'} className={INPUT_CLS} />
              </div>
            </div>

            {/* Row 2: tipo tessuto */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">Tipo tessuto</label>
              <div className="flex flex-wrap gap-4">
                {TISSUE_TYPES.map(t => (
                  <label key={t.value} className="flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer">
                    <input
                      {...register(`${prefix}.tissueType`)}
                      type="checkbox"
                      value={t.value}
                      className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                    />
                    {t.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Row 3: essudato */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Essudato</label>
                <select {...register(`${prefix}.exudatePresent`)} className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default">
                  <option value="">—</option>
                  <option value="si">Presente</option>
                  <option value="no">Assente</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Quantità</label>
                <select {...register(`${prefix}.exudateQuantity`)} className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default">
                  <option value="">—</option>
                  <option>Scarso</option>
                  <option>Moderato</option>
                  <option>Abbondante</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Qualità</label>
                <select {...register(`${prefix}.exudateQuality`)} className="w-full px-2 py-1.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default">
                  <option value="">—</option>
                  <option>Sieroso</option>
                  <option>Siero-ematico</option>
                  <option>Ematico</option>
                  <option>Purulento</option>
                </select>
              </div>
            </div>

            {/* Row 4: margini, cute perilesionale */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Margini</label>
                <input {...register(`${prefix}.margins`)} placeholder={locked ? '—' : 'es. regolari, irregolari, sottominati'} className={INPUT_CLS} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Cute perilesionale</label>
                <input {...register(`${prefix}.perilesionalSkin`)} placeholder={locked ? '—' : 'es. integra, macerata, eritematosa'} className={INPUT_CLS} />
              </div>
            </div>

            {/* Row 5: medicazione, detersione, prodotti, fissaggio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Medicazione utilizzata</label>
                <input {...register(`${prefix}.dressingUsed`)} placeholder={locked ? '—' : 'es. idrocolloide, schiuma di poliuretano'} className={INPUT_CLS} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Detersione</label>
                <input {...register(`${prefix}.cleansing`)} placeholder={locked ? '—' : 'es. soluzione fisiologica'} className={INPUT_CLS} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Prodotti</label>
                <input {...register(`${prefix}.products`)} placeholder={locked ? '—' : 'es. antisettici, enzimi proteolitici'} className={INPUT_CLS} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Fissaggio</label>
                <input {...register(`${prefix}.fixation`)} placeholder={locked ? '—' : 'es. cerotto, benda, rete tubolare'} className={INPUT_CLS} />
              </div>
            </div>

            {/* Row 6: date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Data esecuzione</label>
                <input {...register(`${prefix}.executionDate`)} type="date" className={INPUT_CLS} style={locked ? { WebkitTextFillColor: 'rgb(30 41 59)' } : undefined} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-600">Data rinnovo</label>
                <input {...register(`${prefix}.renewalDate`)} type="date" className={INPUT_CLS} style={locked ? { WebkitTextFillColor: 'rgb(30 41 59)' } : undefined} />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">Note</label>
              <textarea
                {...register(`${prefix}.notes`)}
                rows={2}
                placeholder={locked ? '—' : 'Osservazioni aggiuntive...'}
                className="w-full px-3 py-2 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white resize-y disabled:bg-transparent disabled:border-transparent disabled:cursor-default"
              />
            </div>
          </fieldset>
        </div>
      )}
    </div>
  );
}

function WoundCareSection() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'woundCare' });
  const [lockedRows, setLockedRows] = useState<Set<number>>(new Set());

  const toggleLock = (i: number) => setLockedRows(prev => {
    const next = new Set(prev); next.has(i) ? next.delete(i) : next.add(i); return next;
  });

  const addWound = () => append({
    etiology: '', location: '', dimensions: '', tissueType: [],
    exudatePresent: '', exudateQuantity: '', exudateQuality: '',
    margins: '', perilesionalSkin: '', dressingUsed: '', cleansing: '',
    products: '', fixation: '',
    executionDate: new Date().toISOString().slice(0, 10),
    renewalDate: '', notes: '',
  });

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Lesioni cutanee e medicazioni</h3>
        <button
          type="button"
          onClick={addWound}
          className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
        >
          <Plus size={16} /> Aggiungi lesione
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-sm text-slate-500 italic p-6 bg-slate-50 border border-slate-200 rounded-lg text-center print:hidden">
          Nessuna lesione inserita. Clicca "Aggiungi lesione" per iniziare.
        </div>
      ) : (
        <div className="space-y-3">
          {fields.map((field, index) => (
            <WoundEntry
              key={field.id}
              index={index}
              onRemove={() => remove(index)}
              locked={lockedRows.has(index)}
              onToggleLock={() => toggleLock(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- Main tab ----------

export default function DevicesTab() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <DevicesSection />
      <WoundCareSection />
    </div>
  );
}
