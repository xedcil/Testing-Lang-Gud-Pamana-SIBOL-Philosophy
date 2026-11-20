const V='tlg-v2',F=['./','./index.html','./data.js','./manifest.webmanifest'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!=='tlg-audio').map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const r=e.request;
if(r.headers.has('range')){e.respondWith(caches.match(r.url).then(async m=>{if(!m)return fetch(r);const b=await m.arrayBuffer(),g=/bytes=(\d*)-(\d*)/.exec(r.headers.get('range')),s=+g[1]||0,n=g[2]?+g[2]:b.byteLength-1;
return new Response(b.slice(s,n+1),{status:206,headers:{'Content-Type':m.headers.get('Content-Type')||'audio/mpeg','Content-Range':'bytes '+s+'-'+n+'/'+b.byteLength}})}));return}
e.respondWith(caches.match(r).then(m=>m||fetch(r)))});
