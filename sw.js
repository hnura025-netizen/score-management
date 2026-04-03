const CACHE_NAME = 'msps-portal-v23';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './logo.png',
  'https://gstatic.com/firebasejs/10.7.1/firebase-app.js',
  'https://gstatic.com/firebasejs/10.7.1/firebase-firestore.js',
  'https://gstatic.com/firebasejs/10.7.1/firebase-auth.js'
];

// Install Event: Cache the essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('MSPS Cache Opened');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event: Cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch Event: Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
