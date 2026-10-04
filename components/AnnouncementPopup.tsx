'use client';
import {useEffect,useRef} from 'react';
import {X} from 'lucide-react';
import {announcement} from '@/data/settings';
export default function AnnouncementPopup(){const dialog=useRef<HTMLDialogElement>(null);useEffect(()=>{if(announcement.enabled)dialog.current?.showModal()},[]);if(!announcement.enabled)return null;return <dialog ref={dialog} className="announcement" aria-labelledby="announcement-title"><button className="icon-button" aria-label="Chiudi avviso" onClick={()=>dialog.current?.close()}><X/></button><h2 id="announcement-title">{announcement.title}</h2><p>{announcement.message}</p><a href={announcement.ctaUrl} className="button" onClick={()=>dialog.current?.close()}>{announcement.ctaLabel}</a></dialog>}
