import { useEffect } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { NursingAssessment } from '../../core/store/schema';

export function usePersistence(methods: any) {
  // Caricamento iniziale
  useEffect(() => {
    const saved = localStorage.getItem('nursing-v2-draft');
    if (saved) {
      try {
        methods.reset(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load draft', e);
      }
    }
  }, [methods]);

  // Salvataggio automatico con debounce
  useEffect(() => {
    const subscription = methods.watch((value) => {
      const timeout = setTimeout(() => {
        localStorage.setItem('nursing-v2-draft', JSON.stringify(value));
      }, 1000);
      return () => clearTimeout(timeout);
    });
    return () => subscription.unsubscribe();
  }, [methods.watch]);
}
