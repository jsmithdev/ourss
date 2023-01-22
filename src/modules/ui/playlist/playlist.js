import { api, LightningElement } from 'lwc';

import {
    getKeys,
    setItem,
    getItems,
    getItemById,
    getItemsByKeys,
    deleteItemById,
} from '../../data/idb';

const proxyUrl = 'https://web-production-8950.up.railway.app'

export default class Cast extends LightningElement {

    items = [];

    @api next(prevId, prevParent) {
        
        console.log('Playlist: next call - ', prevId, ' -- ', prevParent);
        
        if(prevId && prevParent){
            // remove prev
            this.remove({
                currentTarget: {
                    dataset: {
                        id: prevId,
                        parentid: prevParent,
                    }
                }
            });
        }

        console.log('Playlist: has items? - ', this.items.length);

        // get next thats not the prev
        if(this.items.length){

            const {
                id,
                parentid,
            } = this.items.find(x => x.id !== prevId);

            console.log('Playlist: play next - ', id, ' -- ', parentid);

            if(id && parentid){
                // play next
                this.play({
                    currentTarget: {
                        dataset: {
                            id,
                            parentid,
                        }
                    }
                })
            }   
        }
        else {

            console.log('Playlist: playing radio');

            this.dispatchEvent(new CustomEvent('radio', {
                bubbles: true,
                composed: true,
            }));
        }
    }

    @api
    async queue(item) {

        if (!item?.id) { return console.log('Playlist: no items') }

        item.loading = true;
        item.loaded = 0;
        item.size = 0;

        this.items = [...this.items, item]

        // never run if exists
        if (!await this.getLocalBlob(item.id)) {
            // get remote data, set local blob
            this.setBlobByUrl(item);
        }
    }

    connectedCallback(){
        this.load()
    }

    play(event) {

        const {
            id,
            parentid,
        } = event.currentTarget.dataset;

        console.log('Playlist: selectItem ', id, ' of ', parentid)

        if (!id || !parentid) { return undefined }

        this.dispatchEvent(new CustomEvent('select', {
            bubbles: true,
            composed: true,
            detail: {
                id,
                parentid,
            },
        }));
    }

    remove(event) {

        const {
            id,
            parentid,
        } = event.currentTarget.dataset;

        console.log('Playlist: remove item ', id, ' of ', parentid)

        if (!id || !parentid) return undefined;

        this.items = this.items.filter(x => x.id !== id);

        deleteItemById('audio', parentid + ';;;' + id);
    }


    /**
     * get audio 
     * @param {String} url 
     * @returns {Blob} | undefined
     */
    async getLocalBlob(url) {
        return (await getItemById( 'audio', url ))?.blob;
    }

    async setBlobByUrl(item) {
        const audio = {
            id: `${item.parentid};;;${item.id}`,
            saved: new Date().getTime(),
            blob: await this.getUrlBlob(item.id),
        }

        if (audio.blob) {
            await setItem('audio', audio);
            item.loading = false;
            //this.items = [...this.items, item];
        }
    }

    /**
     * get data from url in blob form
     * @param {String} url 
     * @returns Blob | undefined
     */
    async getUrlBlob(url) {
        try {
            const item = this.items.find(x => x.id === url)
            const response = await saferFetch(url)
            console.log(response)
            return this.trackProgress( response, item );
        }
        catch (e) {
            console.info('Browser and Proxy could not retrieve')
            console.error(e)
        }
    }

    async trackProgress(response, item) {

        try {

            const reader = response.body.getReader()

            // Step 2: get total length
            item.size = Number(response.headers.get('Content-Length'));

            // Step 3: read the data
            item.loaded = 0; // received that many bytes at the moment
            const chunks = []; // array of received binary chunks (comprises the body)
            while (true) {
                const { done, value } = await reader.read();

                if (done) {
                    break;
                }

                chunks.push(value);
                item.loaded += value.length;

                //console.log(`Received ${item.loaded} of ${item.size}`)
            }

            return new Blob(chunks);
        }
        catch (error) {
            console.info(error)
        }

    }


    /**
     * check index db for cache and set playlist array
     * @returns {Array}
     */
    async load(){
        console.log('Playlist: loading ')

        const keys = await getKeys('audio');

        const parentIds = keys.map(k => k.substring(0, k.indexOf(';;;')))

        const casts = await getItemsByKeys('casts', parentIds)

        this.items = keys.reduce((acc, k) => {

            const parentid = k.substring(0, k.indexOf(';;;'));
            const id = k.substring(k.indexOf(';;;')+3, k.length)
            const c = casts.find(c => c.id === parentid);
            const i = c?.items?.find(i => i.id === id);

            //console.log('App: loading i ',  JSON.parse(JSON.stringify(i)))

            if(i) return [...acc, i];

            return acc;
        }, []);
    }

    
}


/**
 * parse url and return structured object
 * @param {String} url of feed to parse
 * @param {String} id of feed; Optional, if not provided, will be generated
 * @returns {Object} structured object else undefined
 */
 export async function saferFetch(url, id) {
    try {
        console.log('saferFetch: Fetching feed')
        const res = await fetch(url)
        return res; 
    } catch (error) {
        console.warn(error)
        console.log('saferFetch: Feed failed, trying again...')
        try {
            const res = await proxy(url)
            return res; 
        } catch (er) {
            console.warn(er)
            console.info('Fallback failed. Can\'t parse the url ', url)
        }
    }
    
    return undefined;
}

/**
 * fallback function to parse feed via a proxy
 * @param {String} url of feed
 * @returns Promise resolves rss/xml text from feed
 */
async function proxy(url) {

    //return await (await fetch(`${proxy}?type=blob&url=${encodeURIComponent(url)}`)).blob();
    return await fetch( `${proxyUrl}?url=${encodeURIComponent(url)}` );
}
