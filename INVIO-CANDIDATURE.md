# Attivazione invio candidature

Destinatario: levelup.cef@gmail.com, impostato sul server. Il form raccoglie nome, telefono ed email obbligatori; messaggio facoltativo; massimo 4 foto JPG/PNG/WebP facoltative, per un totale di 3 MB.

1. Copiare .env.example in .env.local nella cartella del progetto.
2. Compilare SMTP_USER e SMTP_PASS con le credenziali del mittente. Non inserire segreti nel codice o nella chat.
3. Per usare Gmail: mantenere SMTP_HOST=smtp.gmail.com e SMTP_PORT=465, usare come SMTP_USER l'account Gmail mittente e come SMTP_PASS una password per app. Richiede verifica in due passaggi e disponibilità della funzione sull'account: https://support.google.com/accounts/answer/185833?hl=it
4. Riavviare npm run dev. Su Vercel inserire le stesse variabili in Environment Variables e ridistribuire il progetto.

Il destinatario non deve necessariamente essere il mittente. Si può usare un altro servizio SMTP compilando host, porta (465 SSL oppure 587 STARTTLS) e credenziali.

Le foto vengono allegate all'email; non sono salvate in public o in un database. La conferma compare solo dopo che il server SMTP ha accettato l'email; ciò non garantisce la consegna in Posta in arrivo anziché Spam. Senza credenziali il form mostra un errore e non una falsa conferma.

Verifiche: build e TypeScript; validazione server, limite 4 file, formato immagini, destinatario, messaggio vuoto, assenza di credenziali. Invio SMTP testato con simulazione, non ancora con un account reale.

Limite Vercel: https://vercel.com/docs/functions/limitations . Il limite applicativo di 3 MB lascia margine ai campi del modulo.

## Protezione antispam
Prima di inviare, configurare anche Turnstile Managed e Redis come descritto in PROTEZIONE-CANDIDATURE.md. Senza queste impostazioni il form blocca tutte le richieste.
