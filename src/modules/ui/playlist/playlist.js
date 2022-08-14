import { api, LightningElement } from 'lwc';

import {
    getKeys,
    setItem,
    getItems,
    getItemById,
    getItemsByKeys,
    deleteItemById,
} from '../../data/idb';

export default class Cast extends LightningElement {

    @api items = [];

    @api next(prevId, prevParent) {
        
        //console.log('Playlist: next call - ', prevId, ' -- ', prevParent);
        
        if(prevId & prevParent){
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

        // get next thats not the prev
        if(this.items.length){

            const {
                id,
                parentid,
            } = this.items.find(x => x.id !== prevId);
    
            if(id & parentid){
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

            this.dispatchEvent(new CustomEvent('radio', {
                bubbles: true,
                composed: true,
            }));
        }
    }

    @api
    async queue(item) {

        if (!item?.id) { return console.log('App: no items') }

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

        if (!id || !parentid) { return undefined }

        this.dispatchEvent(new CustomEvent('remove', {
            bubbles: true,
            composed: true,
            detail: {
                id: parentid + ';;;' + id,
                store: 'audio',
            },
        }));
    }


    /**
     * get audio 
     * @param {String} url 
     * @returns {Blob} | undefined
     */
    async getLocalBlob(url) {
        return (await getItemById(url, 'audio'))?.blob;
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
            //return (await fetch(url)).blob();
            return this.progressFetch(url);
        }
        catch (e) {
            //console.log(e)
            console.info('Trying proxy')
            try {
                return this.progressFetch('https://ourrss-proxy.herokuapp.com/' + url);
            }
            catch (e) {
                console.info('Proxy could retrieve either')
                console.error(e)
            }
        }
    }

    async progressFetch(url) {

        const item = this.items.find(x => x.id === url)

        try {

            const response = await fetch(url);

            const reader = response.body.getReader();

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

            try {
                
                const response = await fetch('https://ourrss-proxy.herokuapp.com/' + url);

                const reader = response.body.getReader();

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

    }

    /**
   * get data from url in blob form
   * @param {String} url 
   * @returns Blob | undefined
   */
    async saferFetch(url) {
        try {
            //return (await fetch(url)).blob();
            return fetch(url);
        }
        catch (e) {
            //console.log(e)
            console.info('Trying proxy')
            try {
                return fetch('https://ourrss-proxy.herokuapp.com/' + url);
            }
            catch (e) {
                console.info('Proxy could retrieve either')
                console.error(e)
            }
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
            const i = c.items.find(i => i.id === id);

            //console.log('App: loading i ',  JSON.parse(JSON.stringify(i)))

            return [...acc, i];
        }, []);
    }
}