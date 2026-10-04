# Verifica della migrazione

Controlli eseguiti il 26 settembre 2026:

- Installazione pulita con npm install: riuscita. Audit npm: 0 vulnerabilità.
- npm run build, npm run typecheck e npm start: riusciti.
- Home e /eventi in produzione: HTTP 200.
- Tutti i 23 asset pubblici, incluso il cocktail locale: HTTP 200.
- Componenti, CSS, pagine e asset originali: identici byte per byte alla versione sorgente. Solo data/images.ts cambia l'URL del cocktail da remoto a locale.
- Browser a 1440x1000 e 390x844: nessun overflow orizzontale su entrambe le pagine.
- Menu mobile e passaggio /eventi -> /#locale: funzionanti.
- Anchor locali sulle due pagine: tutti i target esistono.
- Gallery: apertura, avanzamento e chiusura verificati; 10 fotografie.
- FAQ: apertura risposta verificata.
- Form: errori sui quattro campi vuoti e stato di successo demo verificati. Nessun invio reale previsto.
- Collegamenti WhatsApp, telefono, mappa e social: destinazioni originali conservate; non sono stati inviati messaggi o effettuate chiamate. Disponibilità dei siti esterni non garantita da questo controllo.
- Font di sistema e breakpoints originali preservati.

La compatibilità del progetto è verificata localmente con il normale runtime Next.js. Non è stato creato un deployment Vercel né un repository GitHub remoto.
