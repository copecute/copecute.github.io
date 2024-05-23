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

  // Thêm vào cache cho các tài nguyên cố định
  workbox.precaching.precacheAndRoute([
    { url: FALLBACK_HTML_URL, revision: null },
    { url: 'https://cdn.minhgiang.pro/archive/pwa/manifest.json', revision: null },
    { url: '/favicon.ico', revision: null }
  ]);

  // Xử lý các loại tài nguyên khác
  workbox.routing.setDefaultHandler(new workbox.strategies.NetworkOnly());

  // Cache các tài nguyên CSS, JS, hình ảnh
  workbox.routing.registerRoute(
    new RegExp('.(?:css|js|png|gif|jpg|svg|ico)$'),
    new workbox.strategies.CacheFirst({
      cacheName: 'images-js-css-' + version,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 60 * 24 * 60 * 60, // 60 ngày
          maxEntries: 200,
          purgeOnQuotaError: true
        })
      ],
    }), 'GET'
  );

  // Xử lý các trường hợp ngoại lệ
  workbox.routing.setCatchHandler(({ event }) => {
    switch (event.request.destination) {
      case 'document':
        return caches.match(FALLBACK_HTML_URL);
      default:
        return Response.error();
    }
  });

  // Xử lý sự kiện activate để xoá cache cũ
  self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches
        .keys()
        .then(keys => keys.filter(key => !key.endsWith(version)))
        .then(keys => Promise.all(keys.map(key => caches.delete(key))))
    );
  });

  // Bổ sung phần mã mới để nhận tin từ Firebase và hiển thị thông báo
  importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js');
  importScripts('https://www.gstatic.com/firebasejs/9.6.0/firebase-messaging.js');

  // Khởi tạo Firebase với cấu hình của bạn
  const firebaseConfig = {
    apiKey: "AIzaSyCmBX3KYSElfzRkzOj2NtutU-Cav1H3baI",
    authDomain: "minh-giang-blog.firebaseapp.com",
    projectId: "minh-giang-blog",
    storageBucket: "minh-giang-blog.appspot.com",
    messagingSenderId: "827883992213",
    appId: "1:827883992213:web:58ca4e76eeef0895bb179c",
    measurementId: "G-E9B6GZT65G"
  };

  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

  // Lắng nghe sự kiện nhận tin nhắn từ Firebase Cloud Messaging
  self.addEventListener('push', function(event) {
    const payload = event.data ? event.data.json() : {};

    // Hiển thị thông báo cho người dùng
    self.registration.showNotification(payload.notification.title, {
      body: payload.notification.body,
      icon: payload.notification.icon,
      data: {
        url: payload.notification.click_action
      }
    });
  });

  // Xử lý sự kiện click trên thông báo
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    // Mở URL được chỉ định khi người dùng nhấp vào thông báo
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  });

  // Đăng ký để nhận thông báo từ Firebase Cloud Messaging
  messaging.onBackgroundMessage(function(payload) {
    console.log('[Service Worker] Received background message ', payload);
    // Hiển thị thông báo cho người dùng
    self.registration.showNotification(payload.notification.title, {
      body: payload.notification.body,
      icon: payload.notification.icon,
      data: {
        url: payload.notification.click_action
      }
    });
  });

} else {
  console.log('Oops! Workbox did not load');
}
