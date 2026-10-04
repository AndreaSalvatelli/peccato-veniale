import type { Announcement } from '@/types/content';
export const site = { name: 'PECCATO VENIALE', phone: '+393279805751', phoneLabel: '+39 327 980 5751', whatsapp: '+393270170679', whatsappLabel: '+39 327 017 0679', address: 'Via del Commercio 55', city: 'Montecassiano (MC) Italy', hours: [{days:'Tutti i giorni',opening:'22:00',closing:'04:00'}], vat: '02575400441', admission: { label:'Ingresso gratuito', details:'Senza consumazione obbligatoria', offeredDrink:15 } };
export function whatsappLink(message = 'Ciao Peccato Veniale, vorrei informazioni per una serata e la prenotazione di un tavolo.') { return `https://wa.me/${site.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`; }
export const announcement: Announcement = { enabled: false, title: 'Una nuova notte ti aspetta', message: '', ctaLabel: 'Feste e prenotazioni', ctaUrl: '/eventi' };
export const navigation = [{label:'Il locale',href:'#locale'},{label:'Feste e prenotazioni',href:'/eventi'},{label:'Gallery',href:'#gallery'},{label:'Contatti',href:'#contatti'},{label:'Lavora con noi',href:'#lavora-con-noi'},{label:'Domande frequenti',href:'#domande-frequenti'}];
export const applicationMessage = 'Ciao Peccato Veniale, vorrei informazioni per candidarmi come ragazza immagine.';
export const reservationMessage = 'Ciao Peccato Veniale, vorrei informazioni per prenotare un tavolo.';
