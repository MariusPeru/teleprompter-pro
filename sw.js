const CACHE_NAME = 'teleprompter-pro-cache-v3'; // Versión incrementada para reflejar cambios

// NOTA: Es altamente recomendable usar un paso de compilación (build step) con herramientas
// como Vite o Webpack para transpilar TSX a JS y empaquetar tus archivos.
// La lista de URLs a continuación asume que estás cacheando los archivos finales (assets) generados.
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  // Ejemplo de assets compilados. Deberías ajustar estas rutas a las de tu proyecto.
  '/assets/index.js',
  '/assets/main.css',
  // Usa las versiones de producción de las librerías para mejor rendimiento.
  // Si usas un empaquetador, estas librerías se incluirían en tu 'index.js'.
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
];

// Evento de instalación: guarda en caché los assets principales de la aplicación (app shell).
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      console.log('Cache abierto, guardando el app shell.');
      await cache.addAll(URLS_TO_CACHE);
    } catch (error) {
      console.error('Falló el cacheo del app shell:', error);
    }
  })());
});

// Evento de activación: limpia cachés antiguos.
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => {
        if (cacheName !== CACHE_NAME) {
          console.log('Borrando caché antiguo:', cacheName);
          return caches.delete(cacheName);
        }
      })
    );
  })());
});

// Evento de fetch: sirve desde la caché primero, y si no, desde la red (estrategia Cache-First).
self.addEventListener('fetch', event => {
  // Solo nos interesan las peticiones GET.
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(event.request);

    // Si la respuesta está en caché, la retornamos.
    if (cachedResponse) {
      return cachedResponse;
    }

    // Si no, la buscamos en la red.
    try {
      const networkResponse = await fetch(event.request);
      // Solo cacheamos respuestas válidas (status 200 y no opacas).
      if (networkResponse && networkResponse.status === 200 && networkResponse.type !== 'opaque') {
        await cache.put(event.request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      console.error('La petición de red falló:', error);
      // Aquí podrías devolver una página offline de fallback si la tuvieras en caché.
      throw error;
    }
  })());
});