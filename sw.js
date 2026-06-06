const CACHE_NAME = 'spells-cache-v1';
const CORE_URLS = [
  '/',
  '/index.html',
  '/src/index.css',
  '/manifest.json',
  '/pwa_icon.png',
  '/app_logo.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((res) => {
      return caches.open(CACHE_NAME).then((cache) => {
        try { cache.put(event.request, res.clone()); } catch (e) { /* ignore opaque failures */ }
        return res;
      });
    }).catch(() => cached))
  );
});
