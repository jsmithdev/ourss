
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('activate', (event) => {
	console.log('Service worker activated');
	event.waitUntil(self.clients.claim());
});

/* 
import { getRemoteDb } from './modules/data/fire.js';
import { getItems, setItem } from './modules/data/idb.js';

self.addEventListener('sync', function (event) {
    console.log('meow1')
    console.log(event)
    if (event.tag === 'myFirstSync') {
        event.waitUntil(process())
    }
});

async function process() {
    return new Promise(resolve => resolve('meow333'))
}
*/