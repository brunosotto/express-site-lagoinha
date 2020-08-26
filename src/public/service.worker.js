var cacheName = 'logoinhapromissao';
var filesToCache = [
  '/', 
  'css/style.css',
  '/css/animate.css',
  '/css/violetstyle.css',
  '/assets/boostrap/css/bootstrap.min.css',
  '/assets/boostrap/js/bootstrap.min.js',
  '/css/font/fontello.css',
  '/css/media-queries.css',
  '/manifest.json',
  '/plugins/revolution/css/settings.css',
  '/js/main.js',
  '/js/instagramConfigIblp.js',
  '/js/instagramConfigLegacy.js',
  '/assets/jquery/jquery.nav.js',
  '/assets/jquery/jquery.scrollTo.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});