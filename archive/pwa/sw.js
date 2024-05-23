self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received');
  const title = 'Thông báo đến từ ứng dụng';
  const options = {
    body: event.data.text(),
    icon: '//blogger.googleusercontent.com/img/a/AVvXsEiYorgTwvKTp7bjT_1O6HrAl2K4vYEcimlyzfv-0UNwF8x_ov7avCHuZoVdg6K-u2GhL7bOUOmL9DSC4YiBQOF82bmOxYFhmzcd_S15-AikwfL83vmYIAPuBtCPGeRsRfAiVw0REdGk-GZltwNDSWuKC-WFGvU1WwUCASD8CynnsGpOH91geRjUW2rVmC0=w301-h154-p-k-no-nu',
    badge: '//cdn.minhgiang.pro/archive/favicon/android-icon-192x192.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://www.minhgiang.pro')
  );
});
