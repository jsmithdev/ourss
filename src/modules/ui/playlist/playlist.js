import { api, LightningElement } from 'lwc';

import {
    getKeys,
    setItem,
    getItems,
    getItemById,
    getItemsByKeys,
    deleteItemById,
} from '../../data/idb';

import {
    ourssFetch,
} from '../../data/util';

export default class Cast extends LightningElement {

    items = [];

    get itemsCount() {
        return this.items.length;
    }
    

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

        deleteItemById('audio', id);
    }


    async getLocalBlob(id = '') {
        return (await getItemById( 'audio', id ))?.blob;
    }

    async setBlobByUrl(item) {
        const audio = {
            id: item.id,
            parentid: item.parentid,
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
            const response = await ourssFetch(url, 'audio')
            return this.trackProgress( response, item );
        }
        catch (e) {
            console.warn('Browser and Proxy could not retrieve')
            console.warn(e)
        }
    }

    async trackProgress(response, item) {

        try {

            const reader = response.body.getReader()

            // Step 2: get total length
            item.size = Number(response.headers.get('Content-Length') || response.headers.get('Content-Length'));

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

        const audios = await getItems('audio');

        //console.log('Playlist: loading audios ', audios)

        const parentIds = await audios.map(x => x.parentid);

        //console.log('Playlist: loading parentIds ', parentIds)

        const casts = await getItemsByKeys('casts', parentIds)

        //console.log('Playlist: loading casts ', casts)

        this.items = audios.reduce((acc, k) => {

            const c = casts.find(c => c.id === k.parentid);
            const i = c?.items?.find(i => i.id === k.id);

            //console.log('App: loading i ',  JSON.parse(JSON.stringify(i)))

            if(i) return [...acc, i];

            return acc;
        }, []);

        //console.log('Playlist: loaded items ', JSON.parse(JSON.stringify(this.items)))
    }

    
}

