import { Lock, LockOpen } from 'lucide-react';

interface LockToggleProps {
  locked: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md';
  title?: string;
}

export function LockToggle({ locked, onToggle, size = 'sm', title }: LockToggleProps) {
  const isMd = size === 'md';
  return (
    <button
      type="button"
      onClick={onToggle}
      title={title ?? (locked ? 'Sblocca' : 'Blocca')}
      className={`relative rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${
        isMd ? 'w-12 h-6' : 'w-9 h-5'
      } ${locked ? 'bg-emerald-600' : 'bg-slate-200'}`}
    >
      <span className={`absolute top-0.5 rounded-full bg-white shadow flex items-center justify-center transition-all duration-200 ${
        isMd ? 'w-5 h-5' : 'w-4 h-4'
      } ${locked
        ? `${isMd ? 'left-6' : 'left-4'} text-emerald-600`
        : 'left-0.5 text-slate-400'
      }`}>
        {locked
          ? <Lock size={isMd ? 11 : 9} />
          : <LockOpen size={isMd ? 11 : 9} />
        }
      </span>
    </button>
  );
}
