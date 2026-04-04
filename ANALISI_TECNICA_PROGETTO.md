# Analisi Tecnica: Progetto Cartella Infermieristica Didattica

Questo documento fornisce una valutazione completa dell'architettura e dell'implementazione del software "Cartella Infermieristica Didattica", analizzando lo stato attuale (v1) e i prototipi evolutivi (v2).

---

## 1. Stato dell'Arte e Punti di Forza (v1)

### Stack Tecnologico Moderno
L'utilizzo di **React 19**, **Vite** e **Tailwind CSS 4** pone il progetto all'avanguardia dello sviluppo web. La scelta di React 19 permette di sfruttare le ultime ottimizzazioni del compilatore e di gestire componenti asincroni in modo nativo. L'integrazione di Tailwind 4 tramite variabili CSS native riduce l'overhead di configurazione e migliora la velocità di build.

### Dominio Clinico Esaustivo
Il software traspone con successo un modello clinico complesso ( Gordon Functional Health Patterns) e scale validate internazionalmente (Braden, Barthel, Conley, MUST, GCS, AVPU, Borg, THROAT, NRS, Bristol). La completezza del dominio è il vero valore aggiunto del progetto, rendendolo uno strumento didattico di alto livello.

### UX Specifica (Clinical Workflow)
*   **Global Search (⌘K):** L'implementazione di un motore di ricerca interno con indicizzazione per parole chiave è una soluzione eccellente per navigare in un dataset di centinaia di campi. L'uso della **CSS Custom Highlight API** per l'evidenziazione dei risultati è una scelta tecnica sofisticata e performante.
*   **Print-First Design:** L'app è progettata per essere stampata correttamente, con media queries Tailwind dedicate (`print:block`, `print:break-after-page`) che trasformano la SPA in un documento formale.

### Privacy e Portabilità
L'approccio **Local-First** garantisce la conformità ai dati sensibili (GDPR-friendly) senza necessità di backend. L'esportazione/importazione in formato JSON offre portabilità totale tra dispositivi.

---

## 2. Criticità e Debolezze Identificate (v1)

### Duplicazione e Manutenibilità (WET vs DRY)
Ogni modello di Gordon (1-11) è implementato come un'entità isolata. Questo comporta una ripetizione massiccia di logica UI (gestione dei titoli, toggle per lo stato funzionale/disfunzionale, gestione delle note conclusive). Un cambiamento strutturale richiesto dal modello clinico richiederebbe l'aggiornamento manuale di 11 file diversi.

### Type Safety vs Runtime Validation
L'uso di interfacce TypeScript garantisce la coerenza del codice in fase di sviluppo, ma non protegge l'utente da input errati o matematicamente impossibili (es. Pressione Arteriosa negativa o BMI errato). La mancanza di una validazione a runtime (schema validation) rende i dati salvati potenzialmente incoerenti.

### Affidabilità dei Calcoli Clinici
I calcoli critici (BMI, punteggi totali delle scale, bilancio idrico) sono spesso definiti all'interno della logica dei componenti React. Questo mescola la presentazione con la logica di business clinica, rendendo difficile testare i calcoli in isolamento e aumentando il rischio di errori logici non rilevati.

### Gestione dello Stato e Performance
L'uso di `watch()` sull'intero oggetto del form per il salvataggio automatico senza un meccanismo di *debounce* può causare picchi di utilizzo della CPU e lag nell'interfaccia (input lag) quando il dataset della cartella diventa molto popolato.

---

## 3. Evoluzione Architetturale (Esempi in v2)

I prototipi presenti nella sottocartella `nursing-app-v2` mostrano come superare queste criticità tramite un'architettura più scalabile:

### Feature-Based Architecture
Spostamento verso una struttura organizzata per domini funzionali (`core`, `features`, `shared`).
*   **Vantaggio:** Riduzione delle dipendenze circolari e miglior isolamento del codice.

### Schema Centralizzato (Zod)
Sostituzione delle interfacce TS con schemi **Zod** (`src/core/store/schema.ts`).
*   **Vantaggio:** Validazione istantanea di ogni input e garanzia che i dati esportati siano sempre corretti secondo i vincoli clinici.

### Pattern Composition (ModelWrapper)
Centralizzazione della logica ripetitiva tramite il `ModelWrapper.tsx`.
*   **Vantaggio:** Ogni modello Gordon definisce ora solo i propri campi specifici (DRY), mentre l'infrastruttura (titoli, status bar, note) è gestita in un unico punto.

### Reactive Calculations & Persistence
*   **Automazione:** Implementazione di "Watchers" (es. in `Model2.tsx`) per il calcolo reattivo del BMI e della categoria di peso.
*   **Debounce:** L'hook `usePersistence.ts` ottimizza il salvataggio nel database locale (LocalStorage/IndexedDB) riducendo la frequenza di scrittura e migliorando la fluidità dell'app.

### UI Kit Atomico
Creazione di componenti base (`Input`, `Select`, `Checkbox`) in `src/shared/components/ui/` per garantire accessibilità (ARIA) e consistenza visiva costante in tutta l'applicazione.
