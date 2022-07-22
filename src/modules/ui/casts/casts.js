import { api, LightningElement } from 'lwc';

import {
    getItemById,
} from '../../data/idb';

export default class Casts extends LightningElement {

    @api casts = []

    selected = {}
    isLoading = false

    get hasCasts() {
        return this.casts?.length > 0
    }

    async cardClick(event) {

        event.stopPropagation()

        const {id} = event.target.dataset;
        console.log(id)
        //this.selected = this.casts.find(x => x.id === id)
        this.selected = await getItemById(id)
        console.log(this.selected)
        console.log('db selected')
        console.log(JSON.parse(JSON.stringify({selected: this.selected})))
        
        this.lastTarget = id;

        //this.dispatchEvent(new CustomEvent('scroll', {
        //    bubbles: true,
        //    composed: true,
        //}));

        //this.toggleDetail()

        this.dispatchEvent(new CustomEvent('select', {
            bubbles: true,
            composed: true,
            detail: this.selected,
        }));
    }
}