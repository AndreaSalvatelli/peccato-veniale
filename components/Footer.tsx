import {Instagram,Facebook} from 'lucide-react';

import TikTokIcon from './TikTokIcon';
import {socials} from '@/data/social';
import Logo from './Logo';
export default function Footer(){return <footer className="footer wrap"><div className="footer-top"><Logo/><div className="footer-addresses"><p><strong>Locale</strong><br/>Via del Commercio 55<br/>Montecassiano (MC)</p><p><strong>Sede legale</strong><br/>dati di esempio</p></div><div className="social-icons"><a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={19}/></a><a href={socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={19}/></a><a href={socials.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"><TikTokIcon size={19}/></a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} PECCATO VENIALE</span><div><span title="Pagina da predisporre prima del lancio">Privacy Policy <small>(in preparazione)</small></span><span title="Pagina da predisporre prima del lancio">Cookie Policy <small>(in preparazione)</small></span></div><a href="#top">Torna su ↑</a></div></footer>}
