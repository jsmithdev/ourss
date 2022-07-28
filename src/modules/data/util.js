
import { 
    parseUrl,
 } from './parse';

import { 
    deleteItemById, 
    setItem,
    //checkBaseExists,
} from './idb';

import {
    //initCasts,
    addToFire,
} from './fire'


export const HOUR = 3600000;//60*60*1000

export function hasBeenHour(time){
    const now = new Date().getTime();
    const diff = now - time;
    return diff > HOUR;
}

export const defaults = {
    view: 'casts',
    feeds: [
        'https://rss.art19.com/never-not-funny',
        //'https://rss.art19.com/the-daily',
        'https://brianposehnsnerdpoker.libsyn.com/rss',
        //'https://feeds.feedburner.com/thebuglefeed',
        //'https://www.omnycontent.com/d/playlist/885ace83-027a-47ad-ad67-aca7002f1df8/d07cfb12-42fa-4a5e-b579-aca8005d018b/011c9cdc-63a0-4eaa-b377-aca8005d019e/podcast.rss',
        //'https://feeds.feedburner.com/dancarlin/history?format=xml',
        //'https://thedollop.libsyn.com/rss',
        //'https://lexfridman.com/feed/podcast',
        //'https://feeds.simplecast.com/Ao0C24M8',
        //'https://www.omnycontent.com/d/playlist/aaea4e69-af51-495e-afc9-a9760146922b/f7adbeff-8e96-4861-ab31-aa7a000e2532/62743333-5a2a-4fe0-81b8-aa7a000e253d/podcast.rss',
    ]
}




export function storeCast(cast) {
    setItem('casts', cast);
    return cast;
}

//function storeCasts(casts) {
//    return casts.map(storeCast)
//}

export async function addCast(url, id){
    const cast = await parseUrl(url, id)
    addToFire(url, cast.id)
    return storeCast(cast)
}

export async function updateCast(url, id){
    await deleteCast(id)
    return storeCast( (await parseUrl(url, id) ))
}

export async function deleteCast(id){
    return deleteItemById('casts', id)
}

export async function fireCasts(){

    console.log('MODULES/DATA/UTIL: fireCasts CALLED')
    /* const dbCasts = await initCasts('casts')
    console.log('util: dbCasts')
    console.log(dbCasts)
    
    return Promise.all(
        dbCasts.map(async c => 
            storeCast( structure( (await parseUrl(c.feed, c.id) ))))
    ); */
}

export function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}

	return (
		s4() +
		s4() +
		'-' +
		s4() +
		'-' +
		s4() +
		'-' +
		s4() +
		'-' +
		s4() +
		s4() +
		s4()
	);
}