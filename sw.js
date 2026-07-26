const CACHE_NAME = 'pwa-search-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// שלב ההתקנה - שמירת קבצי הבסיס בזיכרון המטמון
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// שלב התפיסה (Fetch) - החזרת קבצים מהמטמון במידה ואין אינטרנט
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
