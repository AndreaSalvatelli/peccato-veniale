import {recruitment} from './recruitment';
import {site} from './settings';
export const faqs = [
 {question:'In cosa consiste il lavoro di ragazza immagine?',answer:recruitment.roleDescription+' '+recruitment.roleBoundary},
 {question:'Devo avere già esperienza?',answer:'L’esperienza è preferibile, ma puoi candidarti anche per la tua prima esperienza. Cerchiamo ragazze dai 18 ai 40 anni, con immagine curata e facilità nel relazionarsi con il pubblico.'},
 {question:'Quali sono i compensi?',answer:`€${recruitment.pay.firstExperience} — prima esperienza. Le altre fasce sono ${recruitment.pay.dailyRates.slice(1).map(rate=>'€'+rate).join(' e ')}.`},
 {question:'Quanto tempo devo essere disponibile?',answer:recruitment.commitment+' '+recruitment.contract},
 {question:'Quali sono gli orari?',answer:site.hours.map(h=>`${h.days}: dalle ${h.opening} alle ${h.closing}.`).join(' ')+' La navetta passa in alloggio verso le 21:30.'},
 {question:'L’alloggio è incluso? Come raggiungo il locale?',answer:recruitment.housing.description},
 {question:'Devo bere alcolici con i clienti?',answer:'Il drink offerto può essere analcolico. Il tuo compito è mantenere una conversazione educata e professionale per la durata della consumazione.'},
 {question:'A chi posso rivolgermi durante il turno?',answer:'In sala sono presenti il responsabile, gli addetti alla sicurezza e il personale del locale. Lo staff offre assistenza per le esigenze lavorative e personali.'},
 {question:'Come posso candidarmi?',answer:'Puoi scriverci su WhatsApp, chiamarci oppure utilizzare il modulo contatti. Presentati e raccontaci la tua esperienza e disponibilità. In questa demo il modulo simula l’invio: usa WhatsApp o il telefono per contattarci realmente.'},
 {question:'Posso venire come cliente o organizzare una festa?',answer:`Sì, organizziamo addii al celibato, compleanni e altre occasioni in compagnia. L’ingresso è gratuito, senza consumazione obbligatoria. Il drink offerto alla ragazza costa ${site.admission.offeredDrink}€. Contattaci per il tuo tavolo o per organizzare la serata.`}
];
