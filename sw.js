const CACHE='andrea-golf-caddie-v3-0-stabile';
const ASSETS=["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./assets/club-card-driver.jpg", "./assets/club-card-gw.jpg", "./assets/club-card-hybrid4.jpg", "./assets/club-card-iron5.jpg", "./assets/club-card-iron6.jpg", "./assets/club-card-iron7.jpg", "./assets/club-card-iron8.jpg", "./assets/club-card-iron9.jpg", "./assets/club-card-putter.jpg", "./assets/club-card-pw.jpg", "./assets/club-card-sw.jpg", "./assets/club-card-wood5.jpg", "./assets/embedded-10a6637fbc35.webp", "./assets/embedded-126abfe6697c.jpg", "./assets/embedded-18d67dd98f90.jpg", "./assets/embedded-1f6dbaefeffe.webp", "./assets/embedded-2007757216ba.jpg", "./assets/embedded-21e369c00fc0.webp", "./assets/embedded-33371e78679a.webp", "./assets/embedded-37d71d616bdb.jpg", "./assets/embedded-3857a317e22d.webp", "./assets/embedded-417cba1063f3.jpg", "./assets/embedded-42de3c1fbc20.jpg", "./assets/embedded-4691ca9c53ea.webp", "./assets/embedded-50c9d6bec57d.jpg", "./assets/embedded-5603a20f4e52.jpg", "./assets/embedded-560fbad04f51.jpg", "./assets/embedded-56b85834d9c5.jpg", "./assets/embedded-5c68333f67bb.jpg", "./assets/embedded-5fda247c4063.jpg", "./assets/embedded-6189de4f34ca.jpg", "./assets/embedded-659c102b3c39.jpg", "./assets/embedded-6b2965174c1f.webp", "./assets/embedded-6dd5047503e9.webp", "./assets/embedded-7cf05d2e2ac4.jpg", "./assets/embedded-80554d287844.jpg", "./assets/embedded-808c96271ea7.jpg", "./assets/embedded-8310d8f48132.webp", "./assets/embedded-84f0881afde8.webp", "./assets/embedded-8a3273a39ac8.jpg", "./assets/embedded-942df7aea07c.jpg", "./assets/embedded-960cc2866212.webp", "./assets/embedded-9b6a20656ff8.webp", "./assets/embedded-9d40019ff34f.jpg", "./assets/embedded-a032824382c8.jpg", "./assets/embedded-a1df7a4427f5.jpg", "./assets/embedded-a2fee139ed1f.webp", "./assets/embedded-a531147ba1ce.jpg", "./assets/embedded-a67d1d3bb194.webp", "./assets/embedded-a9daa301d580.jpg", "./assets/embedded-b059dc7d5312.jpg", "./assets/embedded-b5150f52a382.jpg", "./assets/embedded-bbc38decaae6.webp", "./assets/embedded-bbe7a6a7d6ad.jpg", "./assets/embedded-c9b5447e7fea.webp", "./assets/embedded-cf8ab665125b.webp", "./assets/embedded-d0e59d63803a.jpg", "./assets/embedded-d6dd6f71c815.jpg", "./assets/embedded-e02e18026333.webp", "./assets/embedded-e1b83206d55c.jpg", "./assets/embedded-e5e2933a889d.webp", "./assets/embedded-ef1d4a9f40c7.jpg", "./assets/embedded-f034408e437c.jpg", "./assets/embedded-f47c78f2a409.jpg", "./assets/embedded-fcfd924f72c9.jpg", "./assets/home-montecchia.jpg", "./assets/montecchia-bianco-v2.jpg", "./assets/montecchia-bianco.jpg", "./assets/montecchia-rosso-v2.jpg", "./assets/montecchia-rosso.jpg", "./assets/montecchia-verde-v2.jpg", "./assets/montecchia-verde.jpg"];
self.addEventListener('install',event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
});
self.addEventListener('activate',event=>{
  event.waitUntil(Promise.all([
    caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))),
    self.clients.claim()
  ]));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  if(event.request.mode==='navigate'){
    event.respondWith(
      fetch(event.request,{cache:'no-store'})
        .then(response=>{
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put('./index.html',copy));
          return response;
        })
        .catch(()=>caches.match('./index.html'))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(event.request,copy));
      return response;
    }))
  );
});
