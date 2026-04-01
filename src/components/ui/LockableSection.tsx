import { useState } from 'react';
import { Lock, LockOpen } from 'lucide-react';

interface Props {
  title: string;
  children: React.ReactNode;
  headerAction?: React.ReactNode;  // shown only when unlocked (e.g. "Aggiungi riga")
  headerRight?: React.ReactNode;   // always visible (e.g. score display)
  defaultLocked?: boolean;
}

export function LockableSection({ title, children, headerAction, headerRight, defaultLocked = false }: Props) {
  const [locked, setLocked] = useState(defaultLocked);

  return (
    <section className="bg-slate-50 p-6 rounded-xl border border-emerald-100">
      <div className="flex items-center justify-between mb-4 border-b border-emerald-100 pb-2">
        <h3 className="text-lg font-semibold text-emerald-700">{title}</h3>
        <div className="flex items-center gap-3">
          {headerRight}
          <div className="flex items-center gap-2 print:hidden">
            {!locked && headerAction}
          <button
            type="button"
            onClick={() => setLocked(l => !l)}
            title={locked ? 'Sblocca sezione' : 'Blocca sezione'}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
              locked ? 'bg-amber-400' : 'bg-slate-200'
            }`}
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full shadow flex items-center justify-center transition-all duration-200 ${
              locked ? 'left-6 bg-white text-amber-500' : 'left-0.5 bg-white text-slate-400'
            }`}>
              {locked ? <Lock size={11} /> : <LockOpen size={11} />}
            </span>
          </button>
          </div>
        </div>
      </div>
      <fieldset disabled={locked} className={locked ? 'opacity-60 pointer-events-none select-none' : ''}>
        {children}
      </fieldset>
    </section>
  );
}
