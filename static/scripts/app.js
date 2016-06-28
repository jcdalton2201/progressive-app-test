'use strict';
class App {
  constructor() {
    if('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('./service-worker.js')
               .then(function() { console.log('Service Worker Registered'); });
    }
    const sw = Rx.Observable.fromEvent(navigator.serviceWorker, 'message');
    sw.subscribe((ev)=>{
      document.dispatchEvent(new Event('backgroundSync'));
    });
  }
}
const app = new App();
