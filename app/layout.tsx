import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Lavora con noi | PECCATO VENIALE · Morrovalle',description:'Lavora come ragazza immagine al Peccato Veniale a Morrovalle. Scopri mansioni, compensi, alloggio a Porto Recanati e Sambucheto (MC) e modalità di candidatura.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="it"><body>{children}</body></html>}
