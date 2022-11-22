'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "137f2de3e5b71139eac8aa000a6e751e",
"assets/assets/authors/andrea_bartz.jpg": "979524bb700f4cc806ff53aa95237796",
"assets/assets/authors/fiona_barton.jpg": "4a5ae6686206e815c16a7e35b4ace030",
"assets/assets/authors/greer_hendricks.jpg": "7a64eca6ff4cc581810f6a6984bcc46f",
"assets/assets/authors/karen_thompson_walker.jpg": "3a2504dfacefeeb1fe7794e8910cc04c",
"assets/assets/authors/kristen_roupenian.jpg": "1f8077c8c527f12b0ab36299c13c44d4",
"assets/assets/authors/pam_jenoff.jpg": "a2e98da79dba9833ebab796fb183c15c",
"assets/assets/authors/sophie_mackintosh.jpg": "e723322b35a7b9ff59059a1691e04e53",
"assets/assets/authors/stepanie_land.jpg": "c893ecf03848c7710e0e81c4767c3b2f",
"assets/assets/authors/tara_conklin.jpg": "af410b33aae5d9cd2497e2067af5eba6",
"assets/assets/authors/whitney_scharer.jpg": "9287739b27c1d76138b37a404e07b798",
"assets/assets/authors/yangsze_choo.jpg": "381c66f721d9582f1bd659c967814030",
"assets/assets/books/an_anonymous_girl_by_greer_hendricks.jpg": "f779d0c20662686f2e22fd7b6a63ade4",
"assets/assets/books/maid_by_stepanie_land.jpg": "2e9e6932294c03e858b9ef019ae3c150",
"assets/assets/books/the_age_of_light_by_whitney_scharer.jpg": "44f355f95f72c1cba8928dd0b22ebbe5",
"assets/assets/books/the_dreamers_by_karen_thompson.jpg": "941ab032f234067b921a29290d82bb2b",
"assets/assets/books/the_last_romantics_by_tara_conklin.jpg": "f17621391c102aa219b1a8a3d570a9ff",
"assets/assets/books/the_lost_girls_of_paris_by_pam_jenoff.jpg": "0dd6cbff2afa48baff65ddc253a365f9",
"assets/assets/books/the_lost_night_by_andrea_bartz.jpg": "6cfd66ab45aa95c94e2bef93c7e28ffe",
"assets/assets/books/the_night_tiger_by_yangsze_choo.jpg": "5bb31836c2708061b5ec5403715c8150",
"assets/assets/books/the_suspect_by_fiona_barton.jpg": "c877dc92496f35a0f107006084f4e176",
"assets/assets/books/the_water_cure_by_sophie_mackintosh.jpg": "e62f932fe905682245a8050184d4f82b",
"assets/assets/books/you_know_you_want_this_by_kristen_roupenian.jpg": "567d417f21177b9ee0e35a2defb96455",
"assets/assets/bulgatti.ttf": "f77d596601561fab72febcedc822849f",
"assets/assets/sans_Italic.ttf": "e88ec18827526928e71407a24937825a",
"assets/assets/sans_Regular.ttf": "eae9c18cee82a8a1a52e654911f8fe83",
"assets/FontManifest.json": "5c21eda2e9e0641259fe8c8867d9894e",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "4905431c020cd64450ea9982c3b2399e",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "54f7f256f19334af71770297ef957662",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "21bb903b1c80352f23c34df281066857",
"/": "21bb903b1c80352f23c34df281066857",
"main.dart.js": "ed600ad267f540de328cf105ffef9d68",
"manifest.json": "9684c5a597fdd78b0f2b1864f46b714e",
"version.json": "aa7ed2ae84f827c98bfcc81b6956af1b"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
