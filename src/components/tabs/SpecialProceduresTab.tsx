import { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Plus, NotebookPen, ChevronLeft, ChevronRight } from 'lucide-react';
import { LockableSection } from '../ui/LockableSection';
import { LockToggle } from '../ui/LockToggle';
import { useRowLocks } from '../../hooks/useRowLocks';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Checkbox } from '../ui/Checkbox';
import { ConfirmDeleteButton } from '../ui/ConfirmDeleteButton';

const SUB     = 'text-sm font-semibold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-200 mb-4';
const DIVIDER = 'border-t border-slate-200 my-5';
const BOX     = 'rounded-lg border border-slate-200 p-4 space-y-3';
const ROW_INPUT = 'w-full px-2 py-1.5 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white disabled:bg-transparent disabled:border-transparent disabled:cursor-default disabled:text-slate-800';

// ─── Radios ──────────────────────────────────────────────────────────────────

function RadioGroup({ name, label, options }: { name: string; label: string; options: readonly string[] }) {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="flex flex-wrap gap-4">
        {options.map(v => (
          <label key={v} className="flex items-center gap-1.5 text-sm text-slate-700 cursor-pointer select-none">
            <input type="radio" value={v} {...register(name)} className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" />
            {v}
          </label>
        ))}
      </div>
    </div>
  );
}

const BI  = ['sì', 'no'] as const;
const TRI = ['sì/fatto', 'non applicabile', 'no'] as const;

// ─── Monitoring table (matches MonitoringSection pattern) ─────────────────────

interface MonCol {
  key: string;
  label: string;
  type?: string;
  width?: string;
  placeholder?: string;
}

function ProcedureMonitoringTable({
  fieldName,
  columns,
  emptyRow,
  addLabel = 'Aggiungi rilevazione',
}: {
  fieldName: string;
  columns: MonCol[];
  emptyRow: Record<string, string>;
  addLabel?: string;
}) {
  const { register, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ name: fieldName });
  const [toggledNotes, setToggledNotes] = useState<Set<number>>(new Set());
  const { toggleLock, isLocked } = useRowLocks();

  const toggleNotes = (i: number) => setToggledNotes(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });

  const addRow = () => {
    const now  = new Date();
    append({ ...emptyRow, time: now.toTimeString().slice(0, 5) });
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={addRow}
          className="text-sm bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-emerald-100 transition-colors print:hidden"
        >
          <Plus size={16} /> {addLabel}
        </button>
      </div>

      {fields.length === 0 ? (
        <div className="text-sm text-slate-500 italic p-4 bg-slate-50 border border-slate-200 rounded-lg text-center print:hidden">
          Nessuna rilevazione inserita.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {columns.map(col => (
                  <th key={col.key} className={`px-2 py-2 text-left font-semibold text-slate-600 whitespace-nowrap ${col.width ?? ''}`}>
                    {col.label}
                  </th>
                ))}
                <th className="px-2 py-2 print:hidden w-20" />
              </tr>
            </thead>
            <tbody>
              {fields.map((field, i) => {
                const hasNote  = !!watch(`${fieldName}.${i}.notes`);
                const expanded = hasNote ? !toggledNotes.has(i) : toggledNotes.has(i);
                const locked   = isLocked(i);
                return (
                  <>
                    <tr
                      key={field.id}
                      className={`${expanded ? 'bg-emerald-50 border-b-0' : `border-b border-slate-100 last:border-0 ${!locked ? 'hover:bg-slate-50' : ''}`}`}
                    >
                      {columns.map((col, ci) => (
                        <td key={col.key} className={`px-1 py-1 ${expanded && ci === 0 ? 'border-l-4 border-emerald-500' : ''}`}>
                          <input
                            {...register(`${fieldName}.${i}.${col.key}`)}
                            type={col.type ?? 'text'}
                            placeholder={locked ? '—' : (col.placeholder ?? '')}
                            disabled={locked}
                            className={ROW_INPUT}
                          />
                        </td>
                      ))}
                      <td className="px-1 py-1 print:hidden">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => toggleNotes(i)}
                            title={expanded ? 'Nascondi note' : 'Aggiungi nota'}
                            className={`relative p-1 rounded transition-colors ${hasNote ? 'text-emerald-600 hover:text-emerald-700' : 'text-slate-300 hover:text-slate-500'}`}
                          >
                            <NotebookPen size={15} />
                            {hasNote && !expanded && <span className="absolute top-0.5 right-0 w-2 h-2 bg-rose-500 rounded-full" />}
                          </button>
                          <LockToggle locked={locked} onToggle={() => toggleLock(i)} />
                          {!locked && <ConfirmDeleteButton onConfirm={() => remove(i)} size={15} />}
                        </div>
                      </td>
                    </tr>
                    {expanded && (
                      <tr key={`${field.id}-notes`} className="bg-emerald-50 border-b border-slate-200">
                        <td colSpan={columns.length + 1} className="px-3 pb-2 border-l-4 border-emerald-500">
                          <textarea
                            {...register(`${fieldName}.${i}.notes`)}
                            placeholder={locked ? 'Nessuna nota.' : 'Note aggiuntive per questa rilevazione...'}
                            rows={2}
                            disabled={locked}
                            className="w-full px-3 py-2 border border-emerald-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-emerald-400 bg-white resize-none disabled:bg-transparent disabled:border-transparent disabled:cursor-default"
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

// ─── Column configs ───────────────────────────────────────────────────────────

const ENDO_COLS: MonCol[] = [
  { key: 'time', label: 'Ora',   type: 'time', width: 'w-24' },
  { key: 'pa',   label: 'PA',    width: 'w-24', placeholder: 'mmHg' },
  { key: 'fc',   label: 'FC',    width: 'w-16', placeholder: 'bpm' },
  { key: 'tc',   label: 'TC',    width: 'w-16', placeholder: '°C' },
  { key: 'fr',   label: 'FR',    width: 'w-16', placeholder: 'atti/min' },
  { key: 'spo2', label: 'SpO₂',  width: 'w-16', placeholder: '%' },
  { key: 'nrs',  label: 'NRS',   width: 'w-14', placeholder: '0–10' },
];
const ENDO_EMPTY = { time: '', pa: '', fc: '', tc: '', fr: '', spo2: '', nrs: '', notes: '' };

const DIALISI_COLS: MonCol[] = [
  { key: 'time',     label: 'Ora',      type: 'time', width: 'w-24' },
  { key: 'weight',   label: 'Peso',     width: 'w-16', placeholder: 'kg' },
  { key: 'pa',       label: 'PA',       width: 'w-24', placeholder: 'mmHg' },
  { key: 'fc',       label: 'FC',       width: 'w-16', placeholder: 'bpm' },
  { key: 'fr',       label: 'FR',       width: 'w-16', placeholder: 'atti/min' },
  { key: 'spo2',     label: 'SpO₂',     width: 'w-16', placeholder: '%' },
  { key: 'qb',       label: 'QB',       width: 'w-16', placeholder: 'mL/min' },
  { key: 'qd',       label: 'QD',       width: 'w-16', placeholder: 'mL/min' },
  { key: 'pArt',     label: 'P.Art',    width: 'w-16', placeholder: 'mmHg' },
  { key: 'pVen',     label: 'P.Ven',    width: 'w-16', placeholder: 'mmHg' },
  { key: 'glycemia', label: 'Glicemia', width: 'w-20', placeholder: 'mg/dL' },
  { key: 'heparin',  label: 'Eparina',  width: 'w-20', placeholder: 'UI' },
  { key: 'therapy',  label: 'Terapia',  width: 'w-32' },
];
const DIALISI_EMPTY = { time: '', weight: '', pa: '', fc: '', fr: '', spo2: '', qb: '', qd: '', pArt: '', pVen: '', glycemia: '', heparin: '', therapy: '', notes: '' };

const BO_COLS: MonCol[] = [
  { key: 'time',      label: 'Ora',         type: 'time', width: 'w-24' },
  { key: 'pa',        label: 'PA',          width: 'w-24', placeholder: 'mmHg' },
  { key: 'fc',        label: 'FC',          width: 'w-16', placeholder: 'bpm' },
  { key: 'tc',        label: 'TC',          width: 'w-16', placeholder: '°C' },
  { key: 'pvc',       label: 'PVC',         width: 'w-16', placeholder: 'cmH₂O' },
  { key: 'fr',        label: 'FR',          width: 'w-16', placeholder: 'atti/min' },
  { key: 'spo2',      label: 'SpO₂',        width: 'w-16', placeholder: '%' },
  { key: 'nrs',       label: 'NRS',         width: 'w-14', placeholder: '0–10' },
  { key: 'glycemia',  label: 'Glicemia',    width: 'w-20', placeholder: 'mg/dL' },
  { key: 'input',     label: 'Entrate',     width: 'w-20', placeholder: 'mL' },
  { key: 'urine',     label: 'Diuresi',     width: 'w-20', placeholder: 'mL' },
  { key: 'bloodLoss', label: 'Perdite em.', width: 'w-24', placeholder: 'mL' },
  { key: 'balance',   label: 'Bilancio',    width: 'w-20', placeholder: 'mL' },
];
const BO_EMPTY = { time: '', pa: '', fc: '', tc: '', pvc: '', fr: '', spo2: '', nrs: '', glycemia: '', input: '', urine: '', bloodLoss: '', balance: '', notes: '' };

// ─────────────────────────────────────────────────────────────────────────────
// ENDOSCOPIA
// ─────────────────────────────────────────────────────────────────────────────
function EndoscopiaSection() {
  return (
    <LockableSection title="Scheda Endoscopia">
      <div className="space-y-5">

        {/* Intestazione */}
        <p className={SUB}>Dati procedura</p>
        <div className={BOX}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input name="endoscopia.date" label="Data" type="date" />
            <Input name="endoscopia.time" label="Ora"  type="time" />
            <Input name="endoscopia.ward" label="Degenza di provenienza" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700 mb-2">Prestazione prevista</p>
            <div className="flex flex-wrap gap-4">
              <Checkbox name="endoscopia.procedureEGDS"   label="EGDS" />
              <Checkbox name="endoscopia.procedureRSS"    label="RSS" />
              <Checkbox name="endoscopia.procedureColon"  label="Colonscopia" />
              <Checkbox name="endoscopia.procedureBronco" label="Broncoscopia" />
            </div>
          </div>
          <Input name="endoscopia.procedureOther" label="Altra prestazione" />
        </div>

        <div className={DIVIDER} />

        {/* PRE */}
        <p className={SUB}>Accertamento pre-procedura</p>
        <div className={BOX}>
          <RadioGroup name="endoscopia.preIdentification" label="Identificazione del paziente effettuata" options={BI} />
          <RadioGroup name="endoscopia.preConsent" label="Consenso informato (inclusa sedazione) completo e firmato" options={BI} />
        </div>

        <div className={DIVIDER} />

        {/* INTRA */}
        <p className={SUB}>Accertamento intra-procedurale</p>
        <div className="space-y-3">
          <div className={BOX}>
            <RadioGroup name="endoscopia.intraAntibiotic" label="Profilassi antibiotica somministrata negli ultimi 60 minuti" options={TRI} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RadioGroup name="endoscopia.intraFasting" label="Digiuno da liquidi/alimenti nelle ultime 6 h" options={BI} />
              <Input name="endoscopia.intraFastingNotes" label="Note digiuno" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RadioGroup name="endoscopia.intraBowelPrep"     label="Preparazione intestinale" options={['sì', 'no', 'incompleta'] as const} />
              <RadioGroup name="endoscopia.intraMedSuspension" label="Sospensione terapia farmacologica" options={BI} />
            </div>
          </div>
          <div className={BOX}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RadioGroup name="endoscopia.intraVascularAccess" label="Accesso venoso" options={['no', 'sì'] as const} />
              <Input name="endoscopia.intraVascularAccessDetails" label="Descrizione accesso venoso" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input name="endoscopia.intraStartTime" label="Ora inizio procedura" type="time" />
              <div className="space-y-2">
                <RadioGroup name="endoscopia.intraProcedureScheduled" label="Procedura effettuata" options={['programmata', 'altra'] as const} />
                <Input name="endoscopia.intraProcedureOther" label="Specificare altra procedura" />
              </div>
            </div>
          </div>
          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Anestesia</p>
            <div className="flex flex-wrap gap-4">
              <Checkbox name="endoscopia.intraAnesthesiaLocal"      label="Locale" />
              <Checkbox name="endoscopia.intraAnesthesiaAnxiolysis" label="Ansiolisi" />
              <Checkbox name="endoscopia.intraAnesthesiaSedation"   label="Sedazione" />
              <Checkbox name="endoscopia.intraAnesthesiaGeneral"    label="Generale" />
            </div>
          </div>
          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Dispositivi posizionati</p>
            <div className="flex flex-wrap gap-4">
              <Checkbox name="endoscopia.intraDeviceSNG"      label="SNG" />
              <Checkbox name="endoscopia.intraDeviceSND"      label="SND" />
              <Checkbox name="endoscopia.intraDeviceStent"    label="Stent biliare" />
              <Checkbox name="endoscopia.intraDeviceIVAccess" label="Accesso venoso periferico" />
            </div>
            <Input name="endoscopia.intraDeviceOther" label="Altro dispositivo" />
          </div>
          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Decubito paziente</p>
            <div className="flex flex-wrap gap-4">
              <Checkbox name="endoscopia.intraPositionSupine"  label="Supino" />
              <Checkbox name="endoscopia.intraPositionLateral" label="Laterale" />
              <Checkbox name="endoscopia.intraPositionProne"   label="Prono" />
            </div>
          </div>
          <div className={BOX}>
            <RadioGroup name="endoscopia.intraComplications" label="Complicanze durante la procedura" options={['no', 'sì'] as const} />
            <Textarea name="endoscopia.intraComplicationsDetails" label="Descrizione complicanze" rows={2} />
          </div>
          <div className={BOX}>
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider text-xs mb-2">Monitoraggio intra-procedurale</p>
            <ProcedureMonitoringTable fieldName="endoscopia.intraMonitoring" columns={ENDO_COLS} emptyRow={ENDO_EMPTY} />
          </div>
          <Input name="endoscopia.intraEndTime" label="Ora fine procedura" type="time" />
        </div>

        <div className={DIVIDER} />

        {/* POST */}
        <p className={SUB}>Accertamento post-procedura</p>
        <div className="space-y-3">
          <div className={BOX}>
            <RadioGroup name="endoscopia.postReassessment" label="Rivalutazione delle criticità per la gestione del post procedura" options={BI} />
            <RadioGroup name="endoscopia.postSampleLabel"  label="Corretta etichettatura del campione confermata" options={TRI} />
          </div>
          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Problemi nel post procedura</p>
            <div className="flex flex-wrap gap-4">
              <Checkbox name="endoscopia.postNausea"   label="Nausea" />
              <Checkbox name="endoscopia.postVomiting" label="Vomito" />
              <Checkbox name="endoscopia.postCough"    label="Tosse" />
              <Checkbox name="endoscopia.postDyspnea"  label="Dispnea" />
            </div>
            <Input name="endoscopia.postOther" label="Altro" />
          </div>
          <div className={BOX}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RadioGroup name="endoscopia.postFasting" label="Mantenimento del digiuno" options={['no', 'sì'] as const} />
              <Input name="endoscopia.postFastingDetails" label="Dettagli digiuno" />
            </div>
          </div>
          <div className={BOX}>
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider text-xs mb-2">Monitoraggio post-procedurale</p>
            <ProcedureMonitoringTable fieldName="endoscopia.postMonitoring" columns={ENDO_COLS} emptyRow={ENDO_EMPTY} />
          </div>
          <Input name="endoscopia.signatureDateTime" label="Data/ora firma" placeholder="es. 01/01/2025 10:00" />
        </div>

      </div>
    </LockableSection>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DIALISI
// ─────────────────────────────────────────────────────────────────────────────
function DialisiSection() {
  return (
    <LockableSection title="Scheda Dialisi">
      <div className="space-y-5">

        <p className={SUB}>Dati seduta</p>
        <div className={BOX}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input name="dialisi.date"      label="Data"                         type="date" />
            <Input name="dialisi.startTime" label="Ora inizio seduta"            type="time" />
            <Input name="dialisi.ward"      label="Paziente ricoverato in degenza" />
          </div>
        </div>

        <div className={DIVIDER} />

        <p className={SUB}>Parametri peso</p>
        <div className={BOX}>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <Input name="dialisi.initialWeight"   label="Peso iniziale (kg)" />
            <Input name="dialisi.lastWeight"      label="Ultimo peso (kg)" />
            <Input name="dialisi.deltaWeight"     label="Δ Peso (kg)" />
            <Input name="dialisi.dryWeight"       label="Peso secco (kg)" />
            <Input name="dialisi.totalWeightLoss" label="Calo impostato (kg)" />
          </div>
        </div>

        <div className={DIVIDER} />

        <p className={SUB}>Tipo e accesso</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Tipo di dialisi</p>
            <Checkbox name="dialisi.typePeritoneal"     label="Dialisi peritoneale" />
            <Checkbox name="dialisi.typeExtracorporeal" label="Dialisi extracorporea" />
          </div>
          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Accesso vascolare</p>
            <Checkbox name="dialisi.accessFistula" label="Fistola artero-venosa" />
            <Checkbox name="dialisi.accessCVC"     label="CVC" />
          </div>
          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Tipo di seduta</p>
            <Checkbox name="dialisi.sessionBicarbonate"       label="Bicarbonato dialisi" />
            <Checkbox name="dialisi.sessionUltrafiltration"   label="Ultrafiltrazione" />
            <Checkbox name="dialisi.sessionHemofiltration"    label="Emofiltrazione" />
            <Checkbox name="dialisi.sessionHemodiafiltration" label="Emodiafiltrazione" />
          </div>
        </div>

        <div className={DIVIDER} />

        <p className={SUB}>Monitoraggio seduta dialitica</p>
        <div className={BOX}>
          <ProcedureMonitoringTable
            fieldName="dialisi.monitoring"
            columns={DIALISI_COLS}
            emptyRow={DIALISI_EMPTY}
          />
        </div>

        <div className={DIVIDER} />

        <p className={SUB}>Chiusura seduta</p>
        <div className={BOX}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input name="dialisi.finalWeight" label="Peso finale (kg)" />
            <Input name="dialisi.endTime"     label="Ora fine seduta" type="time" />
          </div>
          <Textarea name="dialisi.notes" label="Segnalazioni" rows={3} />
          <Input name="dialisi.signatureDateTime" label="Data/ora firma" placeholder="es. 01/01/2025 10:00" />
        </div>

      </div>
    </LockableSection>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOCCO OPERATORIO
// ─────────────────────────────────────────────────────────────────────────────
function BloccoOperatorioSection() {
  return (
    <LockableSection title="Scheda Blocco Operatorio">
      <div className="space-y-5">

        <p className={SUB}>Dati intervento</p>
        <div className={BOX}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input name="bloccoOperatorio.date" label="Data" type="date" />
            <Input name="bloccoOperatorio.time" label="Ora"  type="time" />
            <Input name="bloccoOperatorio.ward" label="Degenza di provenienza" />
          </div>
          <Input name="bloccoOperatorio.surgery" label="Intervento chirurgico" />
        </div>

        <div className={DIVIDER} />

        {/* PRE */}
        <p className={SUB}>Accertamento pre-operatorio</p>
        <div className={BOX}>
          <RadioGroup name="bloccoOperatorio.preIdentification"    label="Identificazione dell'assistito effettuata" options={BI} />
          <RadioGroup name="bloccoOperatorio.preSurgeryConsent"    label="Consenso informato all'intervento chirurgico completo e firmato" options={BI} />
          <RadioGroup name="bloccoOperatorio.preAnesthesiaConsent"  label="Consenso informato anestesiologico completo e firmato" options={TRI} />
          <RadioGroup name="bloccoOperatorio.preTransfusionConsent" label="Consenso informato alla trasfusione completo e firmato" options={TRI} />
          <RadioGroup name="bloccoOperatorio.preBloodAvailability"  label="Disponibilità del sangue verificata" options={TRI} />
        </div>

        <div className={DIVIDER} />

        {/* INTRA */}
        <p className={SUB}>Accertamento intraoperatorio</p>
        <div className="space-y-3">
          <div className={BOX}>
            <RadioGroup name="bloccoOperatorio.intraAntibiotic" label="Profilassi antibiotica somministrata negli ultimi 60 minuti" options={TRI} />
          </div>
          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Anestesia</p>
            <div className="flex flex-wrap gap-4">
              <Checkbox name="bloccoOperatorio.intraAnesthesiaGeneral"      label="Generale" />
              <Checkbox name="bloccoOperatorio.intraAnesthesiaSedation"     label="Sedazione" />
              <Checkbox name="bloccoOperatorio.intraAnesthesiaLocoregional" label="Locoregionale" />
              <Checkbox name="bloccoOperatorio.intraAnesthesiaSpinal"       label="Spinale" />
              <Checkbox name="bloccoOperatorio.intraAnesthesiaEpidural"     label="Peridurale" />
              <Checkbox name="bloccoOperatorio.intraAnesthesiaLocal"        label="Locale" />
            </div>
          </div>
          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Gestione vie aeree</p>
            <div className="flex flex-wrap gap-4">
              <Checkbox name="bloccoOperatorio.intraAirwayOTTarmato" label="Tubo orotracheale armato" />
              <Checkbox name="bloccoOperatorio.intraAirwayOTT"       label="Tubo orotracheale" />
              <Checkbox name="bloccoOperatorio.intraAirwayNaso"      label="Tubo naso-tracheale" />
              <Checkbox name="bloccoOperatorio.intraAirwayCarlens"   label="Tubo Carlens" />
              <Checkbox name="bloccoOperatorio.intraAirwayLMA"       label="Maschera laringea" />
              <Checkbox name="bloccoOperatorio.intraAirwayMask"      label="Maschera facciale" />
            </div>
          </div>
          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Presidi</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Input name="bloccoOperatorio.intraSNG"             label="SNG" />
              <Input name="bloccoOperatorio.intraUrinaryCatheter" label="Catetere vescicale" />
              <Input name="bloccoOperatorio.intraCVP"             label="CVP" />
              <Input name="bloccoOperatorio.intraArterialAccess"  label="Accessi arteriosi" />
              <Input name="bloccoOperatorio.intraCVC"             label="CVC" />
              <Input name="bloccoOperatorio.intraSwanGanz"        label="Swan-Ganz" />
            </div>
          </div>
          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Decubito paziente</p>
            <div className="flex flex-wrap gap-4">
              <Checkbox name="bloccoOperatorio.intraPositionSupine"    label="Supino" />
              <Checkbox name="bloccoOperatorio.intraPositionLateralR"  label="Laterale dx" />
              <Checkbox name="bloccoOperatorio.intraPositionLateralL"  label="Laterale sin" />
              <Checkbox name="bloccoOperatorio.intraPositionSitting"   label="Seduto" />
              <Checkbox name="bloccoOperatorio.intraPositionProne"     label="Prono" />
              <Checkbox name="bloccoOperatorio.intraPositionGyneco"    label="Ginecologico" />
              <Checkbox name="bloccoOperatorio.intraPositionKneeChest" label="Genu-pettorale" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700 mt-2">Iperestensione arto superiore</p>
              <div className="flex gap-4 mt-1">
                <Checkbox name="bloccoOperatorio.intraArmHyperextR" label="Destra" />
                <Checkbox name="bloccoOperatorio.intraArmHyperextL" label="Sinistra" />
              </div>
            </div>
          </div>
          <div className={BOX}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input name="bloccoOperatorio.intraStartTime" label="Ora inizio intervento" type="time" />
              <Input name="bloccoOperatorio.intraIncision"  label="Incisione chirurgica" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Input name="bloccoOperatorio.intraBloodTransfusion"  label="Emotrasfusione" />
              <Input name="bloccoOperatorio.intraPlasmaTransfusion" label="Plasmatrasfusione" />
              <Input name="bloccoOperatorio.intraBloodRecovery"     label="Emorecupero" />
            </div>
          </div>
          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Conteggi e sicurezza</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <RadioGroup name="bloccoOperatorio.intraHistoImmediate"  label="Esame istologico estemporaneo" options={['no', 'sì'] as const} />
              <RadioGroup name="bloccoOperatorio.intraHistoDefinitive" label="Esame istologico definitivo"   options={['no', 'sì'] as const} />
              <RadioGroup name="bloccoOperatorio.intraGauzeCount"      label="Conteggio garze"               options={['no', 'sì'] as const} />
              <RadioGroup name="bloccoOperatorio.intraGauzeMatch"      label="Conteggio garze corrispondente" options={['no', 'sì'] as const} />
              <RadioGroup name="bloccoOperatorio.intraInstrumentCount" label="Conteggio strumenti"           options={['no', 'sì'] as const} />
              <RadioGroup name="bloccoOperatorio.intraInstrumentMatch" label="Conteggio strumenti corrispondente" options={['no', 'sì'] as const} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RadioGroup name="bloccoOperatorio.intraDressing" label="Medicazione" options={['compressiva', 'a piatto'] as const} />
              <Input name="bloccoOperatorio.intraEndTime" label="Ora fine intervento" type="time" />
            </div>
          </div>
        </div>

        <div className={DIVIDER} />

        {/* POST */}
        <p className={SUB}>Accertamento post-operatorio</p>
        <div className="space-y-3">
          <div className={BOX}>
            <RadioGroup name="bloccoOperatorio.postReassessment" label="Rivalutazione delle criticità per la gestione del post operatorio" options={BI} />
            <RadioGroup name="bloccoOperatorio.postSampleLabel"  label="Corretta etichettatura del campione confermata" options={TRI} />
          </div>
          <div className={BOX}>
            <p className="text-sm font-medium text-slate-700">Drenaggi</p>
            <div className="flex flex-wrap gap-4">
              <Checkbox name="bloccoOperatorio.postDrainThoracic"  label="Toracici" />
              <Checkbox name="bloccoOperatorio.postDrainAbdominal" label="Addominali" />
              <Checkbox name="bloccoOperatorio.postDrainBreast"    label="Mammella" />
              <Checkbox name="bloccoOperatorio.postDrainCranio"    label="Cranio" />
              <Checkbox name="bloccoOperatorio.postDrainSpine"     label="Colonna" />
              <Checkbox name="bloccoOperatorio.postDrainOther"     label="Altro" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Derivazione ventricolare</p>
              <div className="flex flex-wrap gap-4 mt-1">
                <Checkbox name="bloccoOperatorio.postDrainVentricularInt"    label="Interna" />
                <Checkbox name="bloccoOperatorio.postDrainVentricularExt"    label="Esterna" />
                <Checkbox name="bloccoOperatorio.postDrainVentricularClosed" label="Chiusa" />
                <Checkbox name="bloccoOperatorio.postDrainVentricularOpen"   label="Aperta" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Fili epicardici</p>
              <div className="flex gap-4 mt-1">
                <Checkbox name="bloccoOperatorio.postEpicardialAtrialWires"      label="2 atriali" />
                <Checkbox name="bloccoOperatorio.postEpicardialVentricularWires" label="2 ventricolari" />
              </div>
            </div>
          </div>
          <div className={BOX}>
            <Textarea name="bloccoOperatorio.postOperativeReport" label="Referto operatorio" rows={3} />
          </div>
          <div className={BOX}>
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider text-xs mb-2">Monitoraggio pre/intra/post operatorio</p>
            <ProcedureMonitoringTable fieldName="bloccoOperatorio.monitoring" columns={BO_COLS} emptyRow={BO_EMPTY} />
          </div>
          <div className={BOX}>
            <Textarea name="bloccoOperatorio.observations" label="Osservazioni" rows={3} />
            <Input name="bloccoOperatorio.signatureDateTime" label="Data/ora firma" placeholder="es. 01/01/2025 10:00" />
          </div>
        </div>

      </div>
    </LockableSection>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main tab
// ─────────────────────────────────────────────────────────────────────────────
type ProcedureId = 'endoscopia' | 'dialisi' | 'blocco';

const PROCEDURES: { id: ProcedureId; label: string }[] = [
  { id: 'endoscopia', label: 'Endoscopia' },
  { id: 'dialisi',    label: 'Dialisi' },
  { id: 'blocco',     label: 'Blocco Operatorio' },
];

export default function SpecialProceduresTab() {
  const [active, setActive] = useState<ProcedureId>('endoscopia');

  const currentIndex = PROCEDURES.findIndex(p => p.id === active);
  const prev = currentIndex > 0 ? PROCEDURES[currentIndex - 1] : null;
  const next = currentIndex < PROCEDURES.length - 1 ? PROCEDURES[currentIndex + 1] : null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Procedure Speciali</h2>
        <p className="text-sm text-slate-500 mt-1">Schede per procedure in aree specializzate</p>
      </div>

      {/* Sub-tab bar */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit">
        {PROCEDURES.map(p => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(p.id)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              active === p.id
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {active === 'endoscopia' && <EndoscopiaSection />}
      {active === 'dialisi'    && <DialisiSection />}
      {active === 'blocco'     && <BloccoOperatorioSection />}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-slate-200 print:hidden">
        {prev ? (
          <button
            type="button"
            onClick={() => setActive(prev.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors"
          >
            <ChevronLeft size={16} />{prev.label}
          </button>
        ) : <div />}
        {next && (
          <button
            type="button"
            onClick={() => setActive(next.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors"
          >
            {next.label}<ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
