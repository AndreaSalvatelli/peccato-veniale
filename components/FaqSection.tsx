import {Plus,ArrowUpRight} from 'lucide-react';
import {faqs} from '@/data/faq';
import SectionHeading from './SectionHeading';
export default function FaqSection(){return <section id="domande-frequenti" className="section wrap faq-section"><div className="faq-intro"><SectionHeading index="06" label="DOMANDE FREQUENTI">Le risposte,<br/><em>prima di partire.</em></SectionHeading><p>Ruolo, orari, alloggio e candidature. Le informazioni che ti aiutano a scegliere.</p><a className="text-link" href="#come-funziona">Leggi come funziona il lavoro <ArrowUpRight size={18}/></a></div><div className="faq-list">{faqs.map(f=><details key={f.question}><summary><span>{f.question}</span><Plus size={22}/></summary><p>{f.answer}</p></details>)}</div></section>}
