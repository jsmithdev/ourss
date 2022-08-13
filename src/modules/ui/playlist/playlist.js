import { api, LightningElement } from 'lwc';

import {
    getKeys,
    setItem,
    getItems,
    getItemById,
    deleteItemById,
} from '../../data/idb';

export default class Cast extends LightningElement {

    @api items = [];

    @api next(prevId, prevParent) {
        //console.log('Playlist: next call - ', prevId, ' -- ', prevParent);
        // remove prev
        this.remove({
            currentTarget: {
                dataset: {
                    id: prevId,
                    parentid: prevParent,
                }
            }
        });

        // get next thats not the prev
        const {
            id,
            parentid,
        } = this.items.find(x => x.id !== prevId);

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

    refresh() {

        this.dispatchEvent(new CustomEvent('refresh', {
            bubbles: true,
            composed: true,
        }));
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

}