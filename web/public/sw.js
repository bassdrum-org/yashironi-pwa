// ダウンロードしてオフラインで表示するデータはこちらに追加
const STATIC_DATA = [
  '/',
  '/webgl1/Build/test.data',
  '/webgl1/Build/test.loader.js',
  '/webgl1/Build/test.framework.js',
  '/webgl1/Build/test.wasm',
  '/webgl2/Build/test.data',
  '/webgl2/Build/test.loader.js',
  '/webgl2/Build/test.framework.js',
  '/webgl2/Build/test.wasm',
  '/webgl3/Build/test.data',
  '/webgl3/Build/test.loader.js',
  '/webgl3/Build/test.framework.js',
  '/webgl3/Build/test.wasm',
  'Sakurazaka46.mp4',
  'favicon.ico',
  'manifest.webmanifest',
  'icons-192x192.png',
  'icons-512x512.png',
];

//　データをダウンロードする
self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('cache_v1').then(function(cache) {
     return cache.addAll(STATIC_DATA);
   })
 );
});

self.addEventListener('fetch', function(event) {
 console.log(event.request.url);

 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});

//　通知機能。使わないが万が一で保留
self.addEventListener('push', function (event) {
    if (event.data) {
      const data = event.data.json()
      const options = {
        body: data.body,
        icon: data.icon || '/icon.png',
        badge: '/badge.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: '2',
        },
      }
      event.waitUntil(self.registration.showNotification(data.title, options))
    }
  })
   
self.addEventListener('notificationclick', function (event) {
  console.log('Notification click received.')
  event.notification.close()
  event.waitUntil(clients.openWindow('<https://your-website.com>'))
})