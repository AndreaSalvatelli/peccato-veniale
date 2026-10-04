import {allowRequest,clientIp,verifyTurnstile,SECURITY_ERROR} from '@/lib/candidatura-security';
import nodemailer from 'nodemailer';
export const runtime='nodejs';
const MAX_PHOTOS_BYTES=3*1024*1024;
const fail=(error:string,status=400)=>Response.json({error},{status});
export async function POST(request:Request){
 const origin=request.headers.get('origin');
 if(origin&&origin!==new URL(request.url).origin)return fail('Richiesta non consentita.',403);
 if(Number(request.headers.get('content-length')||0)>MAX_PHOTOS_BYTES+65536)return fail('Le foto devono pesare al massimo 3 MB in totale.',413);
 try{
  const ip=clientIp(request);
  if(!await allowRequest(ip))return fail(SECURITY_ERROR,429);
  // Limite applicato anche quando Content-Length non è presente.
  const reader=request.body?.getReader();if(!reader)return fail('Richiesta vuota.');
  const chunks:Uint8Array[]=[];let size=0;
  while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>MAX_PHOTOS_BYTES+65536){await reader.cancel();return fail('Le foto devono pesare al massimo 3 MB in totale.',413);}chunks.push(value);}
  const data=await new Response(Buffer.concat(chunks),{headers:{'content-type':request.headers.get('content-type')||''}}).formData();
  const text=(key:string)=>typeof data.get(key)==='string'?String(data.get(key)).trim():'';
  if(data.getAll('company_website').some(value=>typeof value!=='string'||value.trim()!==''))return fail(SECURITY_ERROR);
  const tokens=data.getAll('cf-turnstile-response');
  if(tokens.length!==1||typeof tokens[0]!=='string'||!await verifyTurnstile(tokens[0],ip))return fail(SECURITY_ERROR);
  const name=text('name'),phone=text('phone'),email=text('email'),message=text('message');
  if(name.length<2||name.length>120||/[\r\n]/.test(name))return fail('Inserisci un nome valido.');
  if(!/^[+\d\s().-]{7,22}$/.test(phone)||phone.replace(/\D/g,'').length<7)return fail('Inserisci un telefono valido.');
  if(email.length>120||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return fail('Inserisci un’email valida.');
  if(message.length>2000)return fail('Il messaggio può contenere al massimo 2000 caratteri.');
  const entries=data.getAll('photos');
  if(entries.some(f=>!(f instanceof File)))return fail('Allegati non validi.');
  const photos=entries as File[];
  if(photos.length>4)return fail('Puoi allegare al massimo 4 foto.');
  if(photos.reduce((sum,f)=>sum+f.size,0)>MAX_PHOTOS_BYTES)return fail('Le foto devono pesare al massimo 3 MB in totale.',413);
  const attachments=[];
  for(const [index,file] of photos.entries()){
   const content=Buffer.from(await file.arrayBuffer());
   const jpeg=content[0]===255&&content[1]===216&&content[2]===255;
   const png=content.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
   const webp=content.toString('ascii',0,4)==='RIFF'&&content.toString('ascii',8,12)==='WEBP';
   const type=jpeg?'image/jpeg':png?'image/png':webp?'image/webp':null;
   if(!type||file.type!==type)return fail('Allega solo foto JPG, PNG o WebP valide.');
   attachments.push({filename:`foto-${index+1}.${jpeg?'jpg':png?'png':'webp'}`,content,contentType:type});
  }
  const {SMTP_HOST,SMTP_USER,SMTP_PASS}=process.env;
  if(!SMTP_HOST||!SMTP_USER||!SMTP_PASS)return fail('Invio temporaneamente non disponibile. Contattaci su WhatsApp o per telefono.',503);
  const port=Number(process.env.SMTP_PORT||465);
  const transport=nodemailer.createTransport({host:SMTP_HOST,port,secure:port===465,requireTLS:port!==465,auth:{user:SMTP_USER,pass:SMTP_PASS},connectionTimeout:10000,socketTimeout:20000});
  const result=await transport.sendMail({from:SMTP_USER,to:'levelup.cef@gmail.com',replyTo:email,subject:'Nuova candidatura — PECCATO VENIALE',text:`Candidatura ragazza immagine\n\nNome: ${name}\nTelefono: ${phone}\nEmail: ${email}\n\nMessaggio: ${message||'Non inserito'}\n\nFoto allegate: ${photos.length}`,attachments});
  if(!result.accepted.length)return fail('Invio non riuscito. Riprova più tardi.',502);
  return Response.json({ok:true});
 }catch{return fail(SECURITY_ERROR,503);}
}
