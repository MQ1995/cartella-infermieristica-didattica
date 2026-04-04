import { useState } from 'react';
import { ChevronDown, ChevronUp, NotebookPen, Pencil, Save } from 'lucide-react';
import { ConfirmDeleteButton } from '../../ui/ConfirmDeleteButton';
import { LockToggle } from '../../ui/LockToggle';

export function ScaleCard({ locked, onToggleLock, onRemove, header, notes, children }: {
  locked: boolean;
  onToggleLock: () => void;
  onRemove: () => void;
  header: React.ReactNode;
  notes?: string;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasNote = !!notes;
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${
      locked ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 bg-white'
    }`}>
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50/80 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        {header}
        <div className="flex items-center gap-1.5 flex-shrink-0 print:hidden" onClick={e => e.stopPropagation()}>
          {hasNote && !expanded && (
            <span className="text-emerald-600 p-1">
              <NotebookPen size={14} />
            </span>
          )}
          <LockToggle locked={locked} onToggle={onToggleLock} />
          {!locked && <ConfirmDeleteButton onConfirm={onRemove} size={15} />}
          <button type="button" className="text-slate-400 hover:text-slate-600 p-1" onClick={() => setExpanded(e => !e)}>
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        </div>
      </div>
      {expanded && (
        <>
          <fieldset disabled={locked} className={`border-t border-slate-200 ${locked ? 'cursor-not-allowed select-none' : ''}`}>
            <div className="p-5 space-y-4">
              {children}
            </div>
          </fieldset>
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
