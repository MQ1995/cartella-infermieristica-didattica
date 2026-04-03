import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { searchEntries } from '../../search-index';
import type { SearchEntry } from '../../search-index';

const TAB_COLORS: Record<string, string> = {
  general:     'bg-slate-400',
  assessment:  'bg-violet-400',
  scales:      'bg-amber-400',
  monitoring:  'bg-rose-400',
  diary:       'bg-sky-400',
  medications: 'bg-emerald-400',
  devices:     'bg-orange-400',
  careplan:    'bg-teal-400',
  procedures:  'bg-indigo-400',
};

interface Props {
  onNavigate: (entry: SearchEntry, query: string) => void;
  onClose: () => void;
}

export function SearchDialog({ onNavigate, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchEntries(query), [query]);

  // Reset selection when results change
  useEffect(() => setSelected(0), [results]);

  // Auto-focus input
  useEffect(() => { inputRef.current?.focus(); }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected(s => Math.min(s + 1, results.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected(s => Math.max(s - 1, 0));
      }
      if (e.key === 'Enter' && results[selected]) {
        onNavigate(results[selected], query);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [results, selected, onNavigate, onClose]);

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${selected}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [selected]);

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-24 px-4"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">

        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100">
          <Search size={18} className="text-slate-400 flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cerca sezioni, campi, scale..."
            className="flex-1 text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent"
          />
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-xs text-slate-400 border border-slate-200 rounded font-mono">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="overflow-y-auto max-h-96">
          {results.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-10">
              Nessun risultato per "<span className="font-medium text-slate-500">{query}</span>"
            </p>
          ) : (
            results.map((entry, i) => (
              <button
                key={entry.id}
                data-index={i}
                type="button"
                onMouseEnter={() => setSelected(i)}
                onClick={() => onNavigate(entry, query)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  i === selected ? 'bg-emerald-50' : 'hover:bg-slate-50'
                }`}
              >
                {/* Color dot */}
                <span className={`flex-shrink-0 w-2 h-2 rounded-full ${TAB_COLORS[entry.tab] ?? 'bg-slate-300'}`} />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{entry.label}</p>
                  <p className="text-xs text-slate-400 truncate">{entry.breadcrumb}</p>
                </div>

                <ArrowRight
                  size={14}
                  className={`flex-shrink-0 transition-opacity ${i === selected ? 'text-emerald-500 opacity-100' : 'opacity-0'}`}
                />
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-slate-100 text-xs text-slate-400">
          <span><kbd className="font-mono">↑↓</kbd> naviga</span>
          <span><kbd className="font-mono">↵</kbd> apri</span>
          <span><kbd className="font-mono">Esc</kbd> chiudi</span>
          {results.length > 0 && (
            <span className="ml-auto">{results.length} risultat{results.length === 1 ? 'o' : 'i'}</span>
          )}
        </div>

      </div>
    </div>
  );
}
