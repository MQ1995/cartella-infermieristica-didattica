# Cartella Infermieristica Didattica

App web per la documentazione clinica infermieristica a uso didattico, pensata per studenti di scienze infermieristiche durante il tirocinio.

## Funzionalità

- **Dati tirocinio e studente** — sede, periodo, tutor, dati anagrafici del paziente
- **Accertamento infermieristico** — 11 modelli funzionali di Gordon (anamnesi strutturata)
- **Scale di valutazione** — Braden, Conley, MUST, Barthel, GCS, AVPU, Borg, THROAT, NRS dolore
- **Monitoraggio** — parametri vitali, bilancio idrico, esami diagnostici
- **Diario clinico** — note giornaliere e nuovi problemi emersi
- **Prescrizione farmacologica** — griglia farmaci con orari di somministrazione
- **Presidi e medicazioni** — gestione dispositivi e lesioni cutanee
- **Piano assistenziale PES** — diagnosi infermieristica, obiettivi, interventi, valutazione
- **Ricerca globale** — `⌘K` per navigare tra sezioni e campi
- **Salvataggio automatico** — i dati persistono in locale (localStorage)
- **Export/Import JSON** — backup e ripristino su file
- **Stampa/PDF** — layout ottimizzato per la stampa

## Stack

React 19 · TypeScript · Vite · Tailwind CSS 4 · react-hook-form

## Sviluppo locale

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

L'output è in `dist/` — una SPA statica deployabile su qualsiasi hosting.

## Note

I dati non lasciano mai il dispositivo dell'utente. Non ci sono chiamate a server esterni.
