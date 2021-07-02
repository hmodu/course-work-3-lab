var cacheName = 'AfterSchoolLesson-v1';
var cacheFiles = [
   'index.html',
   'group.html',
   'products.js',
   'AfterSchoolLesson.webmanifest',
   'images/SONG Unique Logo Design.jpg',
   'images/product-ball.jpg',
   'images/product-bball.jpg',
   'images/product-education.jpg',
   'images/product-english.jpg',
   'images/product-farm.jpg',
   'images/product-geo.jpg',
   'images/product-karate.jpg',
   'images/product-math.jpg',
   'images/product-maths.jpg',
   'images/product-music.jpg',
   'images/product-swim.jpg',
];

self.addEventListener('install', (e) => {
   console.log('[Service Worker] Install');
   e.waitUntil(
      caches.open(cacheName).then((cache) => {
         console.log('[Service Worker] Caching all the files');
         return cache.addAll(cacheFiles);
      })
   );
});


self.addEventListener('fetch', function (e) {
   e.respondWith(
      caches.match(e.request).then(function (r) {
         // Download the file if it is not in the cache, 
         return r || fetch(e.request).then((response) =>
            // add the new file to cache
            caches.open(cacheName).then(function (cache) {
               cache.put(e.request, response.clone());
               return response;
            }));
      })
   );
});
