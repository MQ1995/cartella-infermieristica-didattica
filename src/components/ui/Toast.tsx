import { useEffect, useState } from 'react';
import { CheckCircle, Trash2, FolderOpen } from 'lucide-react';

export type ToastType = 'save' | 'load' | 'delete';

interface ToastProps {
  type: ToastType;
  onDone: () => void;
}

const CONFIG = {
  save:   { icon: <CheckCircle size={18} className="text-emerald-500" />, message: 'File salvato con successo', bg: 'border-emerald-200 bg-emerald-50' },
  load:   { icon: <FolderOpen   size={18} className="text-sky-500"     />, message: 'File caricato con successo', bg: 'border-sky-200 bg-sky-50' },
  delete: { icon: <Trash2       size={18} className="text-rose-500"    />, message: 'Tutti i dati sono stati eliminati', bg: 'border-rose-200 bg-rose-50' },
} as const;

export function Toast({ type, onDone }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // trigger enter animation
    const show = requestAnimationFrame(() => setVisible(true));
    const hide = setTimeout(() => setVisible(false), 2800);
    const done = setTimeout(onDone, 3200);
    return () => { cancelAnimationFrame(show); clearTimeout(hide); clearTimeout(done); };
  }, [onDone]);

  const { icon, message, bg } = CONFIG[type];

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium text-slate-700 transition-all duration-300 ${bg} ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      {icon}
      {message}
    </div>
  );
}
