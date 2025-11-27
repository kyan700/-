/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';

// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST || []);

clientsClaim();

// Static assets: Cache First
registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style' || request.destination === 'image',
  new CacheFirst({ cacheName: "static-assets-v1" })
);

// Dynamic data & API: Network First
registerRoute(
  ({ url }) => url.pathname.startsWith('/api') || url.pathname.endsWith('.json'),
  new NetworkFirst({ cacheName: "dynamic-data-v1" })
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
