import { useState } from 'react';
import { Trash2, X, Check } from 'lucide-react';

interface Props {
  onConfirm: () => void;
  size?: number;
}

export function ConfirmDeleteButton({ onConfirm, size = 16 }: Props) {
  const [pending, setPending] = useState(false);

  if (pending) {
    return (
      <span className="flex items-center gap-1 print:hidden">
        <button
          type="button"
          onClick={() => { onConfirm(); setPending(false); }}
          className="p-1 text-white bg-rose-500 hover:bg-rose-600 rounded"
          title="Conferma eliminazione"
        >
          <Check size={size} />
        </button>
        <button
          type="button"
          onClick={() => setPending(false)}
          className="p-1 text-slate-500 hover:text-slate-700 rounded"
          title="Annulla"
        >
          <X size={size} />
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPending(true)}
      className="p-1 text-rose-400 hover:text-rose-600 print:hidden flex justify-center"
      title="Elimina riga"
    >
      <Trash2 size={size} />
    </button>
  );
}
