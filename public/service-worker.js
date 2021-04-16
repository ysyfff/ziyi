/**
Service Worker是一个标准的 web worker，浏览器用一个单独的线程来下载和执行它。
它没有调用 DOM 和其他页面 api 的能力，
但他可以拦截网络请求，包括页面切换，静态资源下载，ajax请求所引起的网络请求。
*/
// configuration
const
  version = '1618585863950',
  CACHE = version + '::ZiyiMember',
  installFilesEssential = [
    '/',
    '/manifest.json',
    '/favicon.ico',
    '/logo.jpeg',
  ];

// install static assets
function installStaticFiles() {
  return caches.open(CACHE)
    .then(cache => {
      return cache.addAll(installFilesEssential);
    });
}

function clearOldCaches() {
  return caches.keys()
    .then(keylist => {
      return Promise.all(
        keylist
          .filter(key => key !== CACHE)
          .map(key => caches.delete(key))
      );
    });
}


self.addEventListener('install', event => {
  event.waitUntil(
    installStaticFiles()
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    clearOldCaches()
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {

  if (event.request.method !== 'GET') return;
  let url = event.request.url;

  

  event.respondWith(
    // 打开缓存
    caches.open(CACHE)
      .then(cache => {
        // 匹配缓存
        return cache.match(event.request)
          .then(response => {
            // 匹配到缓存，使用缓存
            if (response) {
              return response;
            }
            // 未匹配到缓存，发起请求
            return fetch(event.request)
              .then(newreq => {
                console.log('network fetch: ' + url);
                // 请求成功后，缓存资源
                if (newreq.ok) cache.put(event.request, newreq.clone());
                return newreq;
              })
              .catch(()=>null);
          });

      }).catch(()=>null)
  );
});

