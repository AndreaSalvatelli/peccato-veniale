'use client';
import Script from 'next/script';
import {forwardRef,useEffect,useImperativeHandle,useRef} from 'react';
export type TurnstileHandle={verify:()=>Promise<string>;reset:()=>void};
type Api={render:(element:HTMLElement,options:Record<string,unknown>)=>string;execute:(id:string)=>void;reset:(id:string)=>void;remove:(id:string)=>void};
declare global{interface Window{turnstile?:Api}}
const errorMessage='Impossibile verificare la richiesta. Riprova più tardi.';
export default forwardRef<TurnstileHandle>(function CandidaturaTurnstile(_,ref){
 const container=useRef<HTMLDivElement>(null),widget=useRef<string|null>(null);
 const pending=useRef<{resolve:(token:string)=>void;reject:(error:Error)=>void;timer:ReturnType<typeof setTimeout>}|null>(null);
 const sitekey=process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
 function finish(token?:string){const p=pending.current;if(!p)return;clearTimeout(p.timer);pending.current=null;if(token)p.resolve(token);else p.reject(new Error(errorMessage));}
 function reset(){finish();if(widget.current!==null)window.turnstile?.reset(widget.current);}
 function render(){if(!sitekey||!container.current||!window.turnstile||widget.current!==null)return;
  widget.current=window.turnstile.render(container.current,{sitekey,action:'candidatura',appearance:'interaction-only',execution:'execute',size:'flexible',theme:'dark','response-field':false,callback:(token:string)=>finish(token),'error-callback':()=>finish(),'expired-callback':()=>finish(),'timeout-callback':()=>finish()});
 }
 useImperativeHandle(ref,()=>({verify:()=>new Promise<string>((resolve,reject)=>{
  render();if(!window.turnstile||widget.current===null){reject(new Error(errorMessage));return;}
  reset();pending.current={resolve,reject,timer:setTimeout(()=>{finish();if(widget.current!==null)window.turnstile?.reset(widget.current);},120000)};
  try{window.turnstile.execute(widget.current);}catch{finish();}
 }),reset}));
 useEffect(()=>()=>{finish();if(widget.current!==null)window.turnstile?.remove(widget.current);widget.current=null;},[]);
 return <><div ref={container}/>{sitekey&&<Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={render} onError={()=>finish()}/>}</>;
});
