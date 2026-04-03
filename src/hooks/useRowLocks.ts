import { useState, useCallback } from 'react';

export function useRowLocks() {
  const [lockedRows, setLockedRows] = useState<Set<number>>(new Set());

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
