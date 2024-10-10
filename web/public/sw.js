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
  'image.png'
];

const CACHE_NAME = 'cache_v2';

//　データをダウンロードする
self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open(CACHE_NAME).then(function(cache) {
     return cache.addAll(STATIC_DATA);
   })
 );
});

// 古いキャッシュを削除
self.addEventListener('activate', function(event) {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  event.respondWith(
    fetch(event.request).then(function(networkResponse) {
      if (networkResponse.status === 200) {
        const responseClone = networkResponse.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseClone);
        });
      }
      return networkResponse;
    }).catch(function() {
      return caches.match(event.request);
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