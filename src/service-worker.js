importScripts('workbox-sw.prod.v2.0.3.js');

const workboxSW = new self.WorkboxSW();
workboxSW.precache([]);

workboxSW.router.registerRoute(
  'https://api.openweathermap.org/data/2.5/weather(.*)',
  workboxSW.strategies.staleWhileRevalidate()
);