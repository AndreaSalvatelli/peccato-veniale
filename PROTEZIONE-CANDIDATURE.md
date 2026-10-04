# Protezione candidature (locale e Vercel)

Il form conserva campi, SMTP, destinatario e validazioni preesistenti. Nessuna credenziale è inclusa nel codice client, salvo la site key pubblica prevista da Cloudflare.

## Configurazione necessaria

Aggiungere in .env.local (e nelle Environment Variables del progetto Vercel) i valori presenti in .env.example:

- NEXT_PUBLIC_TURNSTILE_SITE_KEY: site key del widget Cloudflare.
- TURNSTILE_SECRET_KEY: secret del medesimo widget, solo server.
- TURNSTILE_ALLOWED_HOSTNAMES: host autorizzati, separati da virgola; senza https, porta o percorso. In produzione aggiungere il dominio effettivo ed eventuali host preview espliciti. Non usare wildcard.
- UPSTASH_REDIS_REST_URL e UPSTASH_REDIS_REST_TOKEN: endpoint HTTPS e token di un database Redis Upstash (disponibile anche dal Marketplace Vercel). Usare un database separato per i test.
- RATE_LIMIT_IP_SALT: segreto casuale stabile di almeno 32 caratteri. Serve a derivare chiavi Redis senza salvare l'IP in chiaro.

Creare il widget nel pannello Cloudflare scegliendo **Managed** e autorizzare gli stessi host. La modalità Managed viene scelta nel pannello, non nel codice. Il client usa appearance=interaction-only ed execution=execute: nessun elemento permanente aggiuntivo; il widget compare solo quando Cloudflare richiede interazione. Non nasconderlo via CSS. Riavviare npm run dev dopo la configurazione; su Vercel effettuare un nuovo deployment, perché la site key pubblica viene incorporata durante la build.

## Comportamento

- 5 tentativi per IP ogni 15 minuti, contatore atomico Redis con scadenza, condiviso tra istanze Vercel. Contano anche tentativi invalidi.
- Su Vercel viene usato X-Forwarded-For sovrascritto dalla piattaforma. Non usare header arbitrari di proxy intermedi. In localhost viene usato un unico bucket locale. Un altro hosting pubblico richiede un adattamento esplicito del proxy fidato.
- Il campo honeypot non è visibile, è escluso dalla tabulazione e dall'albero accessibile. Un valore non vuoto scarta la richiesta senza SMTP.
- Token verificato esclusivamente dal server via Siteverify, con controllo success, action=candidatura e hostname autorizzato. Token scaduti/usati o mancanti vengono rifiutati. Token rinnovato a ogni tentativo; reset dopo successo o errore.
- Rate limit superato: HTTP 429 e messaggio generico. Honeypot o token non valido: HTTP 400. Servizio di protezione non disponibile/configurazione assente: blocco dell'invio. Nessun fallback permissivo.
- Restano le validazioni dei campi e dei file, massimo 4 foto, firma/formato JPG PNG WebP, massimo 3 MB complessivi e lettura del corpo con limite anche senza Content-Length.
- Nessun dato della candidatura è inviato a Redis o Siteverify. Redis riceve solo il contatore identificato dall'hash IP; Cloudflare riceve token e IP per la verifica. SMTP continua a ricevere la candidatura e gli allegati.

## Verifiche

npm run build e npm run typecheck superati.

Eseguire `node --test tests/candidatura-security.test.cjs` per i 13 test di regressione. Provider e SMTP sono simulati: successo, fallimento, indisponibilità, token mancante/riutilizzato, hostname/action errati, honeypot, sesto tentativo, IP distinti, validazione allegati/campi e limite del corpo. Non vengono inviate email.

Browser desktop 1440x1000 e mobile 390x844: nessun overflow, campi invariati, honeypot nascosto/non tabulabile, errori di validazione e blocco senza configurazione Turnstile corretti. La challenge reale Cloudflare e Redis live richiedono chiavi valide; non sono stati collaudati contro account di produzione.

Fonti: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/ ; https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/widget-configurations/ ; https://vercel.com/docs/headers/request-headers ; https://upstash.com/docs/redis/features/restapi
