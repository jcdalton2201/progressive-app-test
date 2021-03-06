importScripts('workbox-sw.prod.v2.0.3.js');

const workboxSW = new self.WorkboxSW();

workboxSW.precache([
  {
    "url": "images/icons/01d.svg",
    "revision": "8152c97ff4e8f9659ee77cfcf2bfeb32"
  },
  {
    "url": "images/icons/01n.svg",
    "revision": "b5962829bece937542003079532aea21"
  },
  {
    "url": "images/icons/02d.svg",
    "revision": "57d93156cc146a18c71eb56e69a0ba93"
  },
  {
    "url": "images/icons/09d.svg",
    "revision": "7bf10b8c7472000c0c567f7780b4834e"
  },
  {
    "url": "images/icons/10d.svg",
    "revision": "d46687c95b18a3d5fedab4cf89d23222"
  },
  {
    "url": "images/icons/11d.svg",
    "revision": "199d246fa0057760966720c4247425dc"
  },
  {
    "url": "images/icons/13d.svg",
    "revision": "84844d348cafb07b6eb43b4e6b72508a"
  },
  {
    "url": "images/icons/50d.svg",
    "revision": "9263f89b39ab9ed6da5400af2621cd3a"
  },
  {
    "url": "images/icons/compass.svg",
    "revision": "efc103f529215ac3978fa44a120edf1c"
  },
  {
    "url": "images/icons/heat.svg",
    "revision": "79b885404f791bdf90cc57c00a180ebe"
  },
  {
    "url": "images/icons/icon-128x128.png",
    "revision": "b1b0f7b8adb5bb5568c370b1c8af29e9"
  },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "928538579a59f24888281462ce75ef7a"
  },
  {
    "url": "images/icons/icon-152x152.png",
    "revision": "300cd90366750e4abbab2205d219624e"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "ac65b2a8d6e7ad80fdab29f76edd91c7"
  },
  {
    "url": "images/icons/icon-256x256.png",
    "revision": "827577d4371bd0c83789fac7a2fe1546"
  },
  {
    "url": "images/icons/icon-32x32.png",
    "revision": "940d8b2f15cc3bee9e6997f9408bbea7"
  },
  {
    "url": "images/icons/thermometer.svg",
    "revision": "f7d0c98911756b4894c75a877081be5b"
  },
  {
    "url": "images/icons/tornado.svg",
    "revision": "2fff6568aa0f510a9c1a37bd6d6d39e4"
  },
  {
    "url": "images/icons/wind.svg",
    "revision": "c3e662b66ae4e97b5dcc6b1dd03b1c67"
  },
  {
    "url": "index.html",
    "revision": "92c301ab0fe45f5fc5e7d48584c39f6e"
  },
  {
    "url": "localforage.min.js",
    "revision": "04bbe882c627de0c0d294e1fa7d8ca8b"
  },
  {
    "url": "manifest.json",
    "revision": "ab2c5cff85f54fa42b80323bde420e4a"
  },
  {
    "url": "service-worker.js",
    "revision": "3dfdf2c1a2457aa80326612b444ba265"
  },
  {
    "url": "weather-web.e41a474f4e3b9b7788deb1335a7b470c261ff0eb35aba4ef52683a7bd35bc368.js",
    "revision": "70636bd61975070df642ce50ba11a807"
  },
  {
    "url": "weather-web.e41a474f4e3b9b7788deb1335a7b470c261ff0eb35aba4ef52683a7bd35bc368.js.map",
    "revision": "2ed1686d23c4b361dd4d53fb6635516f"
  },
  {
    "url": "workbox-sw.prod.v2.0.3.js",
    "revision": "60b4da760c6a02cbbf5efc80c4da7090"
  },
  {
    "url": "workbox-sw.prod.v2.0.3.js.map",
    "revision": "885cfe847c003220cb276a98321c5f61"
  }
]);
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
