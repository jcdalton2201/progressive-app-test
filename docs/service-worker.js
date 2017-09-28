importScripts('workbox-sw.prod.v2.0.3.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
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
    "url": "index.html",
    "revision": "5ca41e5ea6a7cde0f259de77f2ea4a5a"
  },
  {
    "url": "manifest.json",
    "revision": "6d7536f70f8802c6e2c0587516764154"
  },
  {
    "url": "weather-web.7b01148fcc9f938519784b59c96cba96f18ca93780fb59089f4620c8af5e1ebb.js",
    "revision": "69ef9258e111f7118910b8acd2bda115"
  },
  {
    "url": "weather-web.7b01148fcc9f938519784b59c96cba96f18ca93780fb59089f4620c8af5e1ebb.js.map",
    "revision": "44c3f6ad3423a9af049631fdf5d651cd"
  },
  {
    "url": "workbox-sw.prod.v2.0.3.js.map",
    "revision": "885cfe847c003220cb276a98321c5f61"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
