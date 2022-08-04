import { track, api, LightningElement } from 'lwc';

//import {
//    getItemById,
//} from '../../data/idb';

export default class Cast extends LightningElement {

    current = {}

    isLoading = false

    @api
    get cast() {
        return this.current;
    }
    set cast(c) {
        
        this.current = c;
    }

    get items(){
        return this.current.items || [];
    }

    play(event) {

        const {
            id,
            parentid,
        } = event.currentTarget.dataset;

        //console.log('Cast: play ', id, ' of ', parentid)

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

    refresh(event) {
        event.stopPropagation();
        event.cancelBubble = true;
        this.isLoading = true;

        const callback = c => {
            this.cast = c;
            this.isLoading = false
        }

        this.dispatchEvent(new CustomEvent('refresh', {
            bubbles: true,
            composed: true,
            detail: {
                id: this.cast.id,
                feed: this.cast.feed,
                callback,
            },
        }));
    }

    favorite(event) {

        event.stopPropagation();

        this.cast.fav = true;

        // todo pass only what's needed
        this.dispatchEvent(new CustomEvent('favorite', {
            bubbles: true,
            composed: true,
            detail: {
                cast: this.cast,
            },
        }));
    }


    removeCast(event) {

        if(!confirm(`Are you sure you want to remove ${this.cast.title}?`)){
            return console.log('Cast: canceling deletion');
        }

        const { id } = event.target.dataset;
        console.log('Cast: delete ', id)

        if (!id) return;

        this.dispatchEvent(new CustomEvent('delete', {
            bubbles: true,
            composed: true,
            detail: { 
                id,
                store: 'casts',
            },
        }));
    }

    addToQueue(event) {

        const {
            id,
            parentid,
        } = event.currentTarget.dataset;

        console.log('Cast: queue ', id, ' of ', parentid)

        if(!id || !parentid){ return undefined }

        this.dispatchEvent(new CustomEvent('queue', {
            bubbles: true,
            composed: true,
            detail: {
                id,
                parentid,
            },
        }));
    }
}

/* 


    selectItem(event) {

        const { id } = event.currentTarget.dataset;
        
        if(this.prevSelected === id){
            // toggling off
            this.items = this.items.map(i => {
                
                i.selected = false;
                
                return i
            })

            this.prevSelected = undefined;
            event.target.querySelector('.controls')?.classList.toggle('show')    

            return undefined
        }

        this.prevSelected = id;
        // toggling on

        this.items = this.items.map(i => {
            
            i.selected = i.id === id;
            
            return i
        })

        setTimeout(() => event.target.querySelector('.controls')?.classList.toggle('show'), 0)
    }
     */