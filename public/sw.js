self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
// Passthrough fetch handler — present for install criteria, does no caching.
self.addEventListener('fetch', () => {});
