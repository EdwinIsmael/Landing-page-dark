const CACHE_NAME = 'v1_cache_102';

let urlsToCache = [
    './', 
    './css/styles.css',
     './jquery.js', 
     './design/active-states.jpg', 
     './design/desktop-design.jpg', 
     './design/desktop-preview.jpg', 
     './design/mobile-design.jpg', 
     './images/bg-curvy-desktop.svg', 
     './main.js', 
     './manifest.json',
      './sw.js',
      './images/bg-curvy-mobile.svg', 
      './images/bg-quotes.png', 
      './images/CJEJ__1_-removebg-preview.png', 
      './images/favicon-32x32.png', 
      './images/fb.svg', 
      './images/icon-access-anywhere.svg', 

      './images/icon-any-file.svg',
      './images/icon-arrow.svg',
      './images/icon-collaboration.svg',
      './images/icon-email.svg',
      './images/icon-location.svg',
      './images/icon-phone.svg',
      './images/icon-security.svg',
      './images/illustration-intro.png',
      './images/illustration-stay-productive.png',
      './images/instagram.svg',
      './images/logo.svg',
      './images/profile-1.png',
      './images/profile-2.png',
      './images/twitter.svg', 
      './images/favicon.png',               
];

self.addEventListener('install', e => (
    e.waitUntil(
        caches.open(CACHE_NAME).then( cache => (
            cache.addAll(urlsToCache)
            .then( () => {
                self.skipWaiting();
            })
        ))
        .catch( err => {
            console.log('No se ha registrado el cache', err);
        })
    )
))

self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then( cacheNames => {
            return Promise.all(
                cacheNames.map( cacheName => {
                    
                    if( cacheWhiteList.indexOf(cacheName) === -1 ){
                        return caches.delelte(cacheName);
                    }
                })
            )
        }).then(() => {
            self.clients.claim();
        })
    )
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then( res => {
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    )
})