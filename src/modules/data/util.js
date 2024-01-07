
const baseProxyName = __PROXY__;
//const baseProxyLoc = 'lambda-url.us-east-1.on.aws';
const baseProxyLoc = 'execute-api.us-east-1.amazonaws.com/default/RustProxy';

import { 
    parseUrl,
 } from './parse';

import { 
    deleteItemById, 
    setItem,
    //checkBaseExists,
} from './idb';

export const HOUR = 3600000;//60*60*1000

export const baseProxyUri = baseProxyName+'.'+baseProxyLoc+'?url=';

export function hasBeenHour(time){
    const now = new Date().getTime();
    const diff = now - time;
    return diff > HOUR;
}

export const defaults = {
    view: 'casts',
    feeds: [
        {
            "id": "efb14fb7-3cbe-a5dd-5643-67502cf7cb7b",
            "title": "StarTalk Radio",
            "feed": "https://feeds.simplecast.com/4T39_jAj",
            "rank": 0,
            "categories": {
                "16": "Comedy",
                "28": "History",
                "77": "Society",
                "78": "Culture"
            },
            "img":"https://image.simplecastcdn.com/images/8b62332a-56b8-4d25-b175-1e588b078323/832ccedd-f592-4297-90c4-bb2eee3c5a24/3000x3000/image.jpg?aid=rss_feed",
        },
        {
            "id": "b684f123-4d82-9197-be67-430a717fc888",
            "title": "The Dollop with Dave Anthony and Gareth Reynolds",
            "feed": "https://thedollop.libsyn.com/rss",
            "rank": 0,
            "categories": {
                "16": "Comedy",
                "28": "History",
                "77": "Society",
                "78": "Culture"
            },
            "img": "https://www.omnycontent.com/d/playlist/885ace83-027a-47ad-ad67-aca7002f1df8/22b063ac-654d-428f-bd69-ae2400349cde/65ff0206-b585-4e2a-9872-ae240034c9c9/image.jpg?t=1642981771&size=Large",
        },
    ],
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

export async function deleteCast(id){
    return deleteItemById('casts', id)
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
            const res = await getAudioByProxy(url)
            console.log('ourssFetch: Proxy response')
            console.log(res)
            return res;
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

    const proxyUrl = 'https://'+baseProxyUri;

    return fetch( proxyUrl + encodeURIComponent(url) );
}


/**
 * return a object url from a blob
 * @param {Blob} blob
 * @returns {String} object url
 */
export function getBlobUrl(blob){
    const Url = window.URL || window.webkitURL;
    const url = Url.createObjectURL(blob);
    setTimeout(() => Url.revokeObjectURL(url), 1000);
    return url;
}

/* 
todo decide to download images for potential offline use

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
 */