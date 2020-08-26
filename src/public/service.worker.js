var cacheName = 'logoinhapromissao';
var filesToCache = [
  '/',
  '/videos',
  '/devocionais',
  '/estudos-gc',
  '/dizimo',
  'css/darkmode.css',
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
  '/assets/jquery/jquery.scrollTo.js',
  '/plugins/revolution/js/jquery.plugins.min.js',
  '/plugins/revolution/js/jquery.revolution.min.js',
  '/images/logo-lagoinha-promissao-branco.svg',
  '/images/menu.svg',
  '/images/pastor-dani-familia.jpg',
  '/images/slide/s1.jpeg',
  '/images/slide/s2.png',
  '/images/slide/s3.png',
  '/images/slide/s4.png',
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