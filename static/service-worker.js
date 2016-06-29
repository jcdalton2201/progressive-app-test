var dataCacheName = 'weatherData-v2';
var cacheName = 'weatherPWA-2';
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/scripts/card-list.js',
  '/scripts/card.js',
  '/scripts/weather-api.js',
  '/styles/inline.css',
  '/images/icons/01d.svg',
  '/images/icons/02d.svg',
  '/images/icons/09d.svg',
  '/images/icons/10d.svg',
  '/images/icons/11d.svg',
  '/images/icons/13d.svg',
  'https://fonts.googleapis.com/css?family=Kaushan+Script',
  'https://npmcdn.com/@reactivex/rxjs@5.0.0-beta.9/dist/global/Rx.umd.js'
];
const fetchInBackground = function(request, sync){
  if(sync){
    return;
  }

  fetch(request.url).then((data)=>{
    console.log('we are done with call');
    addToCache(request.url);
    this.clients.matchAll().then((clients)=>{
      clients.map((client)=>{
        client.postMessage('background sync');
      });
    });
  });
}
const addToCache = function(request) {
  caches.open(cacheName).then(function(cache) {

    return cache.add(request);
  });
}
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  const fUrl = new URL(e.request.url)
  const host = fUrl.pathname;
  const query = fUrl.searchParams;
  const sync = query.get('sync');
    e.respondWith(
      caches.match(e.request).then(function(response) {
        if(response) {
          console.log('start');
          if(host.startsWith('/data/')){
            fetchInBackground(e.request, sync);
          }
          console.log('end');
          return response;
        }
        else {
          if(host.startsWith('/data/')){
            addToCache(e.request);
          }
          return fetch(e.request);
        }
      })
    );
});
