importScripts('workbox-sw.prod.v2.0.3.js');

const workboxSW = new self.WorkboxSW();

workboxSW.precache([]);
const networkFirst = workboxSW.strategies.networkFirst({
  networkTimeoutSeconds: 3,
  plugins: [{
    fetchDidFail: ({originalRequest, request}) =>{
      self.clients.matchAll().then(all =>{
        all.map(client =>{
          client.postMessage({
            cache:true
          });
        });
      });
      return originalRequest;
    },
    requestWillFetch: ({request}) =>{
      self.clients.matchAll().then(all =>{
        all.map(client =>{
          client.postMessage({
            cache:false
          });
        });
      });
      return new Request(request);
    }
  }
  ]
});
const router = workboxSW.router.registerRoute(
  'https://api.openweathermap.org/data/2.5/weather(.*)',
  networkFirst
);
console.log(router);
