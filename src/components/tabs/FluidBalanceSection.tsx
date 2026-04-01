import { useWatch } from 'react-hook-form';
import { LockableSection } from '../ui/LockableSection';
import { Input } from '../ui/Input';

const INTAKE_FIELDS = [
  { name: 'fluidIntakeInfusions',   label: 'Infusioni endovenose' },
  { name: 'fluidIntakeOral',        label: 'Fluidi orali' },
  { name: 'fluidIntakeOtherAmount', label: 'Altro' },
] as const;

const OUTPUT_FIELDS = [
  { name: 'fluidOutputUrine',       label: 'Urine' },
  { name: 'fluidOutputFeces',       label: 'Feci' },
  { name: 'fluidOutputVomit',       label: 'Vomito / Ristagno gastrico' },
  { name: 'fluidOutputPerspiratio', label: 'Perspiratio insensibilis' },
  { name: 'fluidOutputDrains',      label: 'Drenaggi' },
  { name: 'fluidOutputOtherAmount', label: 'Altro' },
] as const;

export default function FluidBalanceSection() {
  const intakeValues  = useWatch({ name: INTAKE_FIELDS.map(f => f.name) as unknown as string });
  const outputValues  = useWatch({ name: OUTPUT_FIELDS.map(f => f.name) as unknown as string });
  const otherIntakeNote  = useWatch({ name: 'fluidIntakeOtherNote' });
  const otherOutputNote  = useWatch({ name: 'fluidOutputOtherNote' });

  const toNum = (v: unknown) => parseFloat(String(v ?? '')) || 0;
  const totalIntake  = (intakeValues  as string[]).reduce((s, v) => s + toNum(v), 0);
  const totalOutput  = (outputValues  as string[]).reduce((s, v) => s + toNum(v), 0);
  const balance      = totalIntake - totalOutput;
  const hasValues    = totalIntake > 0 || totalOutput > 0;

  return (
    <LockableSection title="Bilancio idrico 24h">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ENTRATE */}
        <div>
          <h4 className="font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
            Entrate <span className="text-slate-400 font-normal text-xs">(ml)</span>
          </h4>
          <div className="space-y-3">
            {INTAKE_FIELDS.map(field => (
              <Input key={field.name} name={field.name} label={field.label} type="number" placeholder="0" />
            ))}
            {otherIntakeNote !== undefined && (
              <Input name="fluidIntakeOtherNote" label="Specificare altro entrata" placeholder="es. irrigazioni, ecc." />
            )}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-sm font-semibold text-slate-600">Totale entrate</span>
              <span className="text-sm font-bold text-slate-800">
                {totalIntake > 0 ? `${totalIntake} ml` : '—'}
              </span>
            </div>
          </div>
        </div>

        {/* USCITE */}
        <div>
          <h4 className="font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">
            Uscite <span className="text-slate-400 font-normal text-xs">(ml)</span>
          </h4>
          <div className="space-y-3">
            {OUTPUT_FIELDS.map(field => (
              <Input key={field.name} name={field.name} label={field.label} type="number" placeholder="0" />
            ))}
            {otherOutputNote !== undefined && (
              <Input name="fluidOutputOtherNote" label="Specificare altro uscita" placeholder="es. sudorazione, ecc." />
            )}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-sm font-semibold text-slate-600">Totale uscite</span>
              <span className="text-sm font-bold text-slate-800">
                {totalOutput > 0 ? `${totalOutput} ml` : '—'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* BILANCIO */}
      <div className={`mt-6 p-4 rounded-xl border-2 flex items-center justify-between transition-colors ${
        !hasValues        ? 'bg-slate-50 border-slate-200' :
        balance > 0       ? 'bg-blue-50 border-blue-200' :
        balance < 0       ? 'bg-rose-50 border-rose-200' :
                            'bg-emerald-50 border-emerald-200'
      }`}>
        <div>
          <div className="text-sm font-semibold text-slate-600 uppercase tracking-wider">Bilancio 24h</div>
          <div className="text-xs text-slate-400 mt-0.5">Entrate − Uscite</div>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold tabular-nums ${
            !hasValues  ? 'text-slate-300' :
            balance > 0 ? 'text-blue-600' :
            balance < 0 ? 'text-rose-600' :
                          'text-emerald-600'
          }`}>
            {!hasValues ? '—' : `${balance > 0 ? '+' : ''}${balance} ml`}
          </div>
          {hasValues && (
            <div className="text-xs font-medium text-slate-500 mt-0.5">
              {balance > 0 ? 'Bilancio positivo' : balance < 0 ? 'Bilancio negativo' : 'Bilancio in pareggio'}
            </div>
          )}
        </div>
      </div>
    </LockableSection>
  );
}
