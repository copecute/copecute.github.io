importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();
  workbox.core.setCacheNameDetails({
    prefix: 'thn-sw',
    suffix: 'v22',
    precache: 'install-time',
    runtime: 'run-time'
  });

  const FALLBACK_HTML_URL = 'https://cdn.minhgiang.pro/archive/pwa/offline.html';
  const version = workbox.core.cacheNames.suffix;
  
  workbox.precaching.precacheAndRoute([
    {url: FALLBACK_HTML_URL, revision: null},
    {url: 'https://cdn.minhgiang.pro/archive/pwa/manifest.json', revision: null},
    {url: 'https://cdn.minhgiang.pro/archive/favicon/apple-icon-60x60.png', revision: null}
  ]);

  workbox.routing.setDefaultHandler(new workbox.strategies.NetworkOnly());

  workbox.routing.registerRoute(
    new RegExp('.(?:css|js|png|gif|jpg|svg|ico)$'),
    new workbox.strategies.CacheFirst({
      cacheName: 'images-js-css-' + version,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 60 * 24 * 60 * 60,
          maxEntries: 200,
          purgeOnQuotaError: true
        })
      ],
    }), 'GET'
  );

  workbox.routing.setCatchHandler(({event}) => {
    switch (event.request.destination) {
      case 'document':
        return caches.match(FALLBACK_HTML_URL);
        break;
      default:
        return Response.error();
    }
  });

  self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys()
        .then(keys => keys.filter(key => !key.endsWith(version)))
        .then(keys => Promise.all(keys.map(key => caches.delete(key))))
    );
  });

  // Lắng nghe sự kiện push và hiển thị thông báo
  self.addEventListener('push', function(event) {
    var data = event.data.json();
    
    var options = {
      body: data.body,
      icon: data.icon,
      image: data.image,
      data: {
        url: data.url
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });

  // Lắng nghe sự kiện notificationclick và mở URL khi thông báo được nhấp vào
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    var url = event.notification.data.url;
    if (url && url !== 'none') {
      event.waitUntil(
        clients.openWindow(url)
      );
    }
  });

} else {
  console.log('Oops! Workbox did not load');
}
