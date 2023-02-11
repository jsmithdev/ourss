import { track, api, LightningElement } from 'lwc';

import {
    chunk,
    
} from './../../data/util.js';

const CHUNK_SIZE = 75;

export default class Cast extends LightningElement {

    current = {}
    groups = []

    itemIndex = 0;
    isLoading = false;

    @api
    get cast() {
        return this.current;
    }
    set cast(c) {
        this.current = c;
        this.itemIndex = 1;
        this.groups = [...chunk(c.items, CHUNK_SIZE)];
    }

    get items(){
        // per item index, return group; runs once if index is 0
        return [...Array((this.itemIndex)).keys()]
            .flatMap(i => this.groups[i])
    }

    get imageSrc(){
        return this.cast.imageData ? URL.createObjectURL(this.cast.imageData) : this.cast.image;
    }

    renderedCallback(){
        this.template.querySelector('.items')
            .addEventListener('scroll', e => this.scrollBottom(e));
    }

    scrollBottom({target}) {

        // is user at the bottom of items
        const isBottom = target.scrollHeight - target.scrollTop === target.clientHeight;

        if (isBottom){
            // increment index if less than size
            if(this.itemIndex < this.groups.length) this.itemIndex++;
        }
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

        const cast = {...this.cast}
        cast.fav = true;

        // todo pass only what's needed
        this.dispatchEvent(new CustomEvent('favorite', {
            bubbles: true,
            composed: true,
            detail: {
                cast,
            },
        }));
    }


    removeCast(event) {

        if(!confirm(`Are you sure you want to remove ${this.cast.title}?`)){
            return console.log('Cast: canceling deletion');
        }

        const { id } = this.cast;
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