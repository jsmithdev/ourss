import { api, LightningElement } from 'lwc';

//import {
//    getItemById,
//} from '../../data/idb';

export default class Cast extends LightningElement {

    @api
    items = []


    selectItem(event) {

        const { id } = event.currentTarget.dataset;
        
        console.log('Playlist: selectItem ', id)

    }

    play(event) {

        const {
            id,
            parentid,
        } = event.currentTarget.dataset;

        console.log('Playlist: selectItem ', id, ' of ', parentid)

        if(!id || !parentid){ return undefined }

        this.dispatchEvent(new CustomEvent('select', {
            bubbles: true,
            composed: true,
            detail: {
                id,
                parentid,
            },
        }));
    }
}