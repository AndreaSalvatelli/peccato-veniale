# EDEN NIGHT CLUB — progetto indipendente

Requisiti: Node.js 22 LTS e npm. Nessun account ChatGPT o servizio Sites richiesto.

## Avvio

```sh
npm install
npm run dev
```

Aprire http://localhost:3000. Produzione: `npm run build` seguito da `npm start`.

## GitHub / Vercel

Caricare questa cartella su GitHub. node_modules, .next e segreti sono esclusi da .gitignore. Importare il repository in Vercel, preset Next.js, Node.js 22, comandi predefiniti e nessuna directory output personalizzata. Per l’invio email occorrono le variabili SMTP descritte in INVIO-CANDIDATURE.md. Repository remoto e deployment non sono creati da questo export.

## Contenuti

Home: app/page.tsx. Feste e prenotazioni: app/eventi/page.tsx (/eventi). Testi e recapiti: data/. Sezioni: components/. Stili originali: app/globals.css. Immagini, logo e favicon: public/.

## Limiti originali conservati

Il form è dedicato alle candidature e invia email con fino a 4 foto opzionali. Per attivarlo configurare SMTP seguendo INVIO-CANDIDATURE.md. Messaggio e foto sono facoltativi.

Font di sistema Arial, Helvetica, Georgia e Times New Roman: nessuna dipendenza da server font. Conservate le differenze tra sistemi del sito originale.

Esclusi .openai, strumenti Sites, vecchia cronologia Git e cartelle di lavoro. Rimossa output: export per il normale flusso Next.js build/start e Vercel. Il cocktail è ora una copia locale della stessa immagine Pexels; fonte https://www.pexels.com/photo/5947012/ . Gli altri asset sono copiati senza alterazioni.

## Protezione del form
Turnstile Managed, rate limiting distribuito e honeypot: configurazione obbligatoria in PROTEZIONE-CANDIDATURE.md e .env.example. SMTP resta invariato.
