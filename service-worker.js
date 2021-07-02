var cacheName = 'AfterSchoolLesson-v1';
var cacheFiles = [
   'index.html',
   'group.html',
   'products.js',
   'lesson.webmanifest',
   '/images/file.jpg',
   'images/che.png',
   'images/bio.jpg',
   'images/psy.jpg',
   'images/geo.png',
   'images/zoo.jpg',
   'images/eng.jpg',
   'images/com.jpg',
   'images/mat.jpg',
   'images/soc.png',
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
