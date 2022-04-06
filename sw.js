/* eslint-disable no-restricted-globals */
/* 
import { getRemoteDb } from './modules/data/fire.js';
import { getItems, setItem } from './modules/data/idb.js';
import { parseUrl } from './modules/data/parse.js';
import { 
    defaults,
    structure,
 } from './modules/data/utils.js';


//import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
//precacheAndRoute(self.__WB_MANIFEST);




self.addEventListener('sync', function (event) {
    console.log('meow1')
    console.log(event)
    if (event.tag === 'myFirstSync') {
        console.log('meow2')
        event.waitUntil(doSomeStuff())
    }
});

async function doSomeStuff() {

    // go get list of casts
    //const casts = await getRemoteDb('casts');
    //console.log(casts)

    // get local db of casts
    const local = await getItems('casts');
    console.log(local)

    // if no local at all, use defaults
    defaults.map(async feed => {
        const data = await parseUrl(x)
        const o = structure(data)
        setItem('casts', o)
    })

    return new Promise(resolve => resolve('meow333'))
} */