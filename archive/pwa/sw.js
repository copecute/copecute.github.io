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
    { url: FALLBACK_HTML_URL, revision: null },
    { url: 'https://cdn.minhgiang.pro/archive/pwa/manifest.json', revision: null },
    { url: '/favicon.ico', revision: null }
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

  workbox.routing.setCatchHandler(({ event }) => {
    switch (event.request.destination) {
      case 'document':
        return caches.match(FALLBACK_HTML_URL);
      default:
        return Response.error();
    }
  });

  self.addEventListener('activate', function (event) {
    event.waitUntil(
      caches
        .keys()
        .then(keys => keys.filter(key => !key.endsWith(version)))
        .then(keys => Promise.all(keys.map(key => caches.delete(key))))
    );
  });

  // Yêu cầu quyền hiển thị thông báo từ người dùng khi service worker được cài đặt
  self.addEventListener('install', function (event) {
    event.waitUntil(
      self.registration.showNotification('Yêu cầu thông báo', {
        body: 'Chấp nhận để nhận thông báo từ chúng tôi.',
      })
    );
  });

  // Lắng nghe sự kiện push từ máy chủ và tạo thông báo
  self.addEventListener('push', function (event) {
    console.log('[Service Worker] Push Received');
    const title = 'Thông báo chào mừng';
    const options = {
      body: 'Chúc mừng bạn đã nhận được thông báo đầu tiên từ chúng tôi!',
      icon: 'icon.png'
    };

    event.waitUntil(self.registration.showNotification(title, options));
  });

} else {
  console.log('Oops! Workbox did not load');
}
