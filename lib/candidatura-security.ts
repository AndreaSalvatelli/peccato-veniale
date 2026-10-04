import {createHmac} from 'node:crypto';
import {isIP} from 'node:net';
export const SECURITY_ERROR='Impossibile inviare la richiesta. Riprova più tardi.';
export function clientIp(request:Request):string{
 // Vercel overwrites X-Forwarded-For at its trusted edge. Never trust arbitrary
 // proxy headers on a directly exposed standalone server.
 if(process.env.VERCEL==='1'){
  const ip=request.headers.get('x-forwarded-for')?.split(',')[0].trim()||'';
  if(!isIP(ip))throw new Error('Missing trusted IP');
  return isIP(ip)===6?new URL(`http://[${ip}]/`).hostname:ip;
 }
 if(['localhost','127.0.0.1','[::1]'].includes(new URL(request.url).hostname))return '127.0.0.1';
 throw new Error('Trusted proxy required');
}
export async function allowRequest(ip:string):Promise<boolean>{
 const url=process.env.UPSTASH_REDIS_REST_URL,token=process.env.UPSTASH_REDIS_REST_TOKEN,salt=process.env.RATE_LIMIT_IP_SALT;
 if(!url||!token||!salt||!url.startsWith('https://'))throw new Error('Rate limiter not configured');
 const key='eden:candidatura:'+createHmac('sha256',salt).update(ip).digest('hex');
 // Atomic increment + expiry: shared by all Vercel instances, 5 attempts / 15 min.
 const script="local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],900) end; return n";
 const response=await fetch(url,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(['EVAL',script,'1',key]),cache:'no-store',signal:AbortSignal.timeout(5000)});
 if(!response.ok)throw new Error('Rate limiter unavailable');
 const data=await response.json();
 if(data.error||!Number.isInteger(data.result)||data.result<1)throw new Error('Invalid rate limit response');
 return data.result<=5;
}
export async function verifyTurnstile(token:string,ip:string):Promise<boolean>{
 const secret=process.env.TURNSTILE_SECRET_KEY;
 const hosts=(process.env.TURNSTILE_ALLOWED_HOSTNAMES||'').split(',').map(h=>h.trim().toLowerCase()).filter(Boolean);
 if(!secret||!hosts.length||!token||token.length>2048)return false;
 const body=new URLSearchParams({secret,response:token,remoteip:ip.replace(/^\[|\]$/g,'')});
 const response=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body,cache:'no-store',signal:AbortSignal.timeout(8000)});
 if(!response.ok)return false;
 const result=await response.json();
 return result.success===true&&result.action==='candidatura'&&typeof result.hostname==='string'&&hosts.includes(result.hostname.toLowerCase());
}
