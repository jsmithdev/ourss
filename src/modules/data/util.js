
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
        'https://feeds.feedburner.com/thebuglefeed',
        //'https://www.omnycontent.com/d/playlist/885ace83-027a-47ad-ad67-aca7002f1df8/d07cfb12-42fa-4a5e-b579-aca8005d018b/011c9cdc-63a0-4eaa-b377-aca8005d019e/podcast.rss',
        //'https://feeds.feedburner.com/dancarlin/history?format=xml',
        'https://thedollop.libsyn.com/rss',
        //'https://lexfridman.com/feed/podcast',
        //'https://feeds.simplecast.com/Ao0C24M8',
        //'https://www.omnycontent.com/d/playlist/aaea4e69-af51-495e-afc9-a9760146922b/f7adbeff-8e96-4861-ab31-aa7a000e2532/62743333-5a2a-4fe0-81b8-aa7a000e253d/podcast.rss',
    ]
}

/**
 * Chunk an array to smaller arrays
 * @param {Array} arr array to chunk
 * @param {Number} n items per chunk
 * @return {Iterator} iterator of chunks
 */
export function* chunk(arr, n) {
    for (let i = 0; i < arr.length; i += n) {
      yield arr.slice(i, i + n);
    }
}

export async function storeCast(cast) {

    if(!cast) return console.warn('storeCast: no cast provided')
    if(!cast.imageData && cast.image){
        const res = await ourssFetch(cast.image, 'image')
        if(!res?.ok) {
            return console.warn('storeCast: image fetch failed', res)
        }
        cast.imageData = await res.blob();
    }
    
    setItem('casts', cast);

    return cast;
}

export async function addCast(url, id){
    const cast = await parseUrl(url, id)
    addToFire(url, cast.id)
    return storeCast(cast)
}

export async function updateCast(url, id){
    //await deleteCast(id)

    const cast = await parseUrl(url, id)

    //console.log('updateCast: ', cast)

    return storeCast(cast)
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


/**
 * parse url and return structured object
 * @param {String} url url of feed to parse
 * @param {String} type type of url (audio, image)
 * @returns {Object} response object
 */
export async function ourssFetch(url, type) {
    try {
        console.log('ourssFetch: Fetching feed')
        const res = await fetch(url)
        return res; 
    } catch (error) {
        console.warn(error)
        console.log('ourssFetch: Feed failed, trying again...')
        try {

            if(type === 'audio'){
                const res = await getAudioByProxy(url)
                console.log('ourssFetch: Proxy response')
                console.log(res)
                return res;
            }
            else if(type === 'image'){
                const res = await getAudioByProxy(url)
                return res;
            }
        } catch (error) {
            console.info('Fallback failed. Can\'t parse the url ', url)
            console.warn(error)
        }
    }
    
    return undefined;
}

/**
 * fallback function to parse feed via a proxy
 * @param {String} url of feed
 * @returns Promise resolves rss/xml text from feed
 */
async function getAudioByProxy(url) {

    const proxyUrl = 'https://web-production-8950.up.railway.app'
    //return await (await fetch(`${proxy}?type=blob&url=${encodeURIComponent(url)}`)).blob();
    return await fetch( `${proxyUrl}?url=${encodeURIComponent(url)}` );
}


async function getImageByProxy(url){

    return fetch(`https://proxy.cors.sh/${url}`, {
        headers: {
          'x-cors-api-key': '6f2dfcef-6d8d-4d29-b1f3-1f1fcb07e4cb',
        }
    });
}


/**
 * fallback function to get response via proxy
 * @param {String} url of feed
 * @returns Promise resolves rss/xml text from feed
 */
async function getByLambdaProxy(url) {

    const proxyUrl = 'https://bg43qynlm5msjalfb3kd6eisti0mdils.lambda-url.us-east-1.on.aws'

    return fetch(`${proxyUrl}?url=${encodeURIComponent(url)}`);
}

/**
 * return a object url to a blob
 * @param {Blob} blob
 * @param {String} type
 * @returns {String} url
 */
export function getBlobUrl(blob){
    const Url = window.URL || window.webkitURL;
    const url = Url.createObjectURL(blob);
    setTimeout(() => Url.revokeObjectURL(url), 1000);
    return url;
}