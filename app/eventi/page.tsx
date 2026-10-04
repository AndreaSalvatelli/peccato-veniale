import type {Metadata} from 'next';
import Header from '@/components/Header';
import EventsSection from '@/components/EventsSection';
import GallerySection from '@/components/GallerySection';
import Footer from '@/components/Footer';
import MobileCTA from '@/components/MobileCTA';
export const metadata:Metadata={title:'Feste e prenotazioni | PECCATO VENIALE · Morrovalle',description:'Organizza addii al celibato, compleanni e occasioni speciali al Peccato Veniale di Morrovalle. Scopri gli ambienti e prenota un tavolo.'};
export default function EventsPage(){return <><a className="skip-link" href="#main">Vai al contenuto</a><Header eventsPage/><main id="main" className="events-page"><div id="top"/><EventsSection standalone/><GallerySection numbered={false}/></main><Footer/><MobileCTA booking/></>}
