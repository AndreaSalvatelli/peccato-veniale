'use client';
import {useRef,useState} from 'react';
import type {FormEvent,ChangeEvent} from 'react';
import {ArrowUpRight,CheckCircle2} from 'lucide-react';
import CandidaturaTurnstile from './CandidaturaTurnstile';
import type {TurnstileHandle} from './CandidaturaTurnstile';
type Fields='name'|'phone'|'email'|'photos';
const photoTypes=['image/jpeg','image/png','image/webp'];
export default function ContactForm(){
 const [errors,setErrors]=useState<Partial<Record<Fields,string>>>({});
 const [photos,setPhotos]=useState<File[]>([]);
 const [checked,setChecked]=useState(false);
 const [sending,setSending]=useState(false);
 const [sendError,setSendError]=useState('');
 const turnstile=useRef<TurnstileHandle>(null);
 const submitLock=useRef(false);
 const photoInput=useRef<HTMLInputElement>(null);
 function addPhotos(e:ChangeEvent<HTMLInputElement>){
  const incoming=Array.from(e.target.files||[]);e.target.value='';setChecked(false);
  if(!incoming.length)return;
  let error='';
  if(photos.length+incoming.length>4)error='Puoi allegare al massimo 4 foto. Rimuovi una foto prima di aggiungerne altre.';
  else if(incoming.some(f=>!photoTypes.includes(f.type)))error='Scegli foto in formato JPG, PNG o WebP.';
  else if([...photos,...incoming].reduce((sum,f)=>sum+f.size,0)>3*1024*1024)error='Le foto possono pesare al massimo 3 MB in totale.';
  setErrors(previous=>({...previous,photos:error||undefined}));
  if(!error)setPhotos(previous=>[...previous,...incoming]);
 }
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault();if(submitLock.current)return;setChecked(false);setSendError('');const form=e.currentTarget;const data=new FormData(form);
  const value=(key:Fields)=>String(data.get(key)||'').trim();const next:Partial<Record<Fields,string>>={};
  if(value('name').length<2)next.name='Inserisci il tuo nome (almeno 2 caratteri).';
  if(!/^[+\d\s().-]{7,22}$/.test(value('phone'))||value('phone').replace(/\D/g,'').length<7)next.phone='Inserisci un numero di telefono valido.';
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value('email')))next.email='Inserisci un indirizzo email valido.';
  if(errors.photos)next.photos=errors.photos;
  setErrors(next);
  if(Object.keys(next).length){form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();return;}
  data.delete('photos');photos.forEach(photo=>data.append('photos',photo));submitLock.current=true;setSending(true);
  try{if(!turnstile.current)throw new Error('Impossibile verificare la richiesta. Riprova più tardi.');data.set('cf-turnstile-response',await turnstile.current.verify());const response=await fetch('/api/candidatura',{method:'POST',body:data});const result=await response.json();if(!response.ok||!result.ok)throw new Error(result.error||'Invio non riuscito.');setChecked(true);form.reset();setPhotos([]);}catch(error){setSendError(error instanceof Error?error.message:'Invio non riuscito. Riprova più tardi.');}finally{turnstile.current?.reset();submitLock.current=false;setSending(false);}
 }
 return <div className="contact-form-panel"><h3>Presentati a Peccato Veniale.</h3><p>Lascia i tuoi recapiti per candidarti. Se vuoi, raccontaci la tua esperienza e allega fino a 4 foto.</p><form onSubmit={submit} noValidate><div className="candidatura-honeypot" aria-hidden="true"><label htmlFor="company_website">Sito web</label><input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" /></div><div className="form-grid">
 {([{key:'name',label:'Nome',type:'text',placeholder:'Il tuo nome',auto:'given-name'},{key:'phone',label:'Telefono',type:'tel',placeholder:'+39',auto:'tel'},{key:'email',label:'Email',type:'email',placeholder:'La tua email',auto:'email'}] as const).map(f=><div className={`field field-${f.key}`} key={f.key}><label htmlFor={f.key}>{f.label} <span>*</span></label><input id={f.key} name={f.key} type={f.type} autoComplete={f.auto} placeholder={f.placeholder} required maxLength={f.key==='phone'?22:120} aria-invalid={!!errors[f.key]} aria-describedby={errors[f.key]?`${f.key}-error`:undefined} onChange={()=>setChecked(false)}/>{errors[f.key]&&<span role="alert" className="field-error" id={`${f.key}-error`}>{errors[f.key]}</span>}</div>)}
 <div className="field field-message"><label htmlFor="message">Messaggio (facoltativo)</label><textarea id="message" name="message" placeholder="Esperienza, disponibilità e domande sul lavoro…" rows={4} maxLength={2000} onChange={()=>setChecked(false)}/></div>
 <div className="field field-photos"><label htmlFor="photos">Foto (facoltative)</label><input ref={photoInput} id="photos" name="photos" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={addPhotos} aria-invalid={!!errors.photos} aria-describedby={`photos-help${errors.photos?' photos-error':''}`}/><p id="photos-help" className="photo-help">Fino a 4 foto in formato JPG, PNG o WebP. Massimo 3 MB complessivi.</p>{errors.photos&&<span role="alert" className="field-error" id="photos-error">{errors.photos}</span>}<span aria-live="polite">{photos.length} / 4 foto selezionate</span>{photos.length>0&&<ul className="photo-list">{photos.map((photo,i)=><li key={`${photo.name}-${photo.lastModified}-${i}`}><span>{photo.name}</span><button type="button" aria-label={`Rimuovi foto ${i+1}: ${photo.name}`} onClick={()=>{setPhotos(previous=>previous.filter((_,index)=>index!==i));setErrors(previous=>({...previous,photos:undefined}));setChecked(false);}}>Rimuovi</button></li>)}</ul>}</div>
 </div><p className="form-note">Nome, telefono ed email sono obbligatori. Messaggio e foto sono facoltativi.</p>{sendError&&<p role="alert" className="field-error">{sendError}</p>}<CandidaturaTurnstile ref={turnstile}/><button type="submit" className="button" disabled={sending}>{sending?'Invio in corso…':'Invia candidatura'}<ArrowUpRight size={18}/></button><div aria-live="polite">{checked&&<div className="form-success"><CheckCircle2 size={22}/><p><strong>Candidatura inviata.</strong> Abbiamo ricevuto i tuoi recapiti e le eventuali foto.</p></div>}</div></form></div>;
}
