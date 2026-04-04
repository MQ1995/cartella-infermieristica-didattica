import { useState, useCallback, useEffect } from 'react';

function loadFromStorage(key: string): Set<number> {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return new Set(JSON.parse(raw) as number[]);
  } catch {}
  return new Set();
}

export function useRowLocks(storageKey?: string) {
  const [lockedRows, setLockedRows] = useState<Set<number>>(
    () => storageKey ? loadFromStorage(storageKey) : new Set()
  );

  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(Array.from(lockedRows)));
  }, [lockedRows, storageKey]);

  const toggleLock = useCallback((i: number) => {
    setLockedRows(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }, []);

  const isLocked = useCallback((i: number) => lockedRows.has(i), [lockedRows]);

  const lockRow = useCallback((i: number) => {
    setLockedRows(prev => new Set(prev).add(i));
  }, []);

  const unlockRow = useCallback((i: number) => {
    setLockedRows(prev => { const next = new Set(prev); next.delete(i); return next; });
  }, []);

  // Used when rows are reordered (e.g. drag & drop in CarePlanTab)
  const remapLocks = useCallback((fromIndex: number, toIndex: number, length: number) => {
    setLockedRows(prev => {
      const arr = Array.from({ length }, (_, i) => prev.has(i));
      const [item] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, item);
      return new Set(arr.flatMap((v, i) => v ? [i] : []));
    });
  }, []);

  return { lockedRows, toggleLock, isLocked, lockRow, unlockRow, remapLocks };
}
