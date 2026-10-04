import {ArrowUpRight, MessageCircle} from 'lucide-react';
import {whatsappLink, applicationMessage} from '@/data/settings';
import {images} from '@/data/images';
export default function Hero(){return <section className="hero recruitment-hero" aria-labelledby="hero-title"><div className="hero-image" style={{backgroundImage:`url(${images.hero})`}}/><div className="hero-shade"/><div className="hero-content wrap"><p className="eyebrow"><span/> LAVORA CON NOI · MONTECASSIANO (MC)</p><h1 id="hero-title"><em>Peccato Veniale</em></h1><p className="hero-copy">Cerchiamo ragazze immagine dai 18 ai 40 anni.<br/>Entra a far parte del nostro staff in un ambiente organizzato e a contatto con il pubblico, con possibilità di alloggio a Porto Recanati, vicino al mare, oppure a Sambucheto (MC).</p><div className="button-row"><a className="button" href="#lavora-con-noi">Scopri il lavoro <ArrowUpRight size={19}/></a><a className="button button-outline" href={whatsappLink(applicationMessage)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/> Candidati su WhatsApp</a></div></div></section>}


