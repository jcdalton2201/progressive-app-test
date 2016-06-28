var dataCacheName = 'weatherData-v1';
var cacheName = 'weatherPWA-step-6-1';
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/scripts/card-list.js',
  '/scripts/card.js',
  '/scripts/weather-api.js',
  '/styles/inline.css',
  'https://npmcdn.com/@reactivex/rxjs/dist/global/Rx.umd.js'
];
const addToCache = function(request) {
  caches.open(cacheName).then(function(cache) {
    console.log('adding a request',request);
    return cache.add(request);
  });
}
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  const host = new URL(e.request.url).hostname;
    e.respondWith(
      caches.match(e.request).then(function(response) {
        if(response) {
          return response;
        }
        else {
          if(host === 'api.openweathermap.org'){
            addToCache(e.request);
          }
          return fetch(e.request);
        }
      })
    );
});
