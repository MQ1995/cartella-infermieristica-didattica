import { useState } from 'react';
import { Save, Pencil } from 'lucide-react';
import { LockToggle } from './LockToggle';

interface Props {
  title: string;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
  headerRight?: React.ReactNode;
  defaultLocked?: boolean;
}

export function LockableSection({ title, children, headerAction, headerRight, defaultLocked = false }: Props) {
  const [locked, setLocked] = useState(defaultLocked);

  return (
    <section className={`p-6 rounded-xl border border-emerald-100 transition-colors duration-200 ${locked ? 'bg-slate-100' : 'bg-slate-50'}`}>
      <div className="flex items-center justify-between mb-4 border-b border-emerald-100 pb-2">
        <h3 className="text-lg font-semibold text-emerald-700">{title}</h3>
        <div className="flex items-center gap-3">
          {headerRight}
          <div className="flex items-center gap-2 print:hidden">
            {!locked && headerAction}
            <LockToggle
              locked={locked}
              onToggle={() => setLocked(l => !l)}
              size="md"
              title={locked ? 'Sblocca sezione' : 'Blocca sezione'}
            />
          </div>
        </div>
      </div>
      <fieldset disabled={locked} className={locked ? 'cursor-not-allowed select-none' : ''}>
        {children}
      </fieldset>

      <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-emerald-100 print:hidden">
        <button
          type="button"
          onClick={() => setLocked(false)}
          disabled={!locked}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:hover:bg-transparent"
        >
          <Pencil size={14} /> Modifica
        </button>
        <button
          type="button"
          onClick={() => setLocked(true)}
          disabled={locked}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-emerald-600 text-white hover:bg-emerald-700 disabled:hover:bg-emerald-600"
        >
          <Save size={14} /> Salva
        </button>
      </div>
    </section>
  );
}
