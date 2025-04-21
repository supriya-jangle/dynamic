self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(cacheRes => {
        if (cacheRes) return cacheRes;
  
        return fetch(event.request).then(fetchRes => {
          return caches.open('dynamic-v1').then(cache => {
            cache.put(event.request, fetchRes.clone());
            return fetchRes;
          });
        });
      })
    );
  });
  