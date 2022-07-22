import { track, api, LightningElement } from 'lwc';

//import {
//    getItemById,
//} from '../../data/idb';

export default class Cast extends LightningElement {

    current = {}
    items = []

    isLoading = false

    @api
    get cast() {
        return this.current;
    }
    set cast(c) {
        console.log('Cast: set given ', c)

        const cast = JSON.parse(JSON.stringify(c));
        
        const tmp = document.createElement('div');
        tmp.innerHTML = cast.description || '';
        cast.description = tmp.textContent || tmp.innerText || '';

        this.items = cast.items.map(obj => {
            const tmp = document.createElement('div');
            tmp.innerHTML = obj.description || '';
            obj.description = tmp.textContent || tmp.innerText || '';
            return obj;
        })

        this.current = cast;

        console.log('Cast: set current cast ', cast)
    }

    togLoad() {
        this.isLoading = !this.isLoading
    }

    selectItem(event) {

        const { id } = event.currentTarget.dataset;
        
        if(this.prevSelected === id){
            console.log('Cast: toggling off ', id)
            this.items = this.items.map(i => {
                
                i.selected = false;
                
                return i
            })

            this.prevSelected = undefined;
            event.target.querySelector('.controls')?.classList.toggle('show')    

            return undefined
        }

        this.prevSelected = id;
        console.log('Cast: toggling on ', id)

        this.items = this.items.map(i => {
            
            i.selected = i.id === id;
            
            return i
        })

        setTimeout(() => event.target.querySelector('.controls')?.classList.toggle('show'), 0)
    }

    play(event) {

        const {
            id,
            parentid,
        } = event.currentTarget.dataset;

        console.log('Cast: play ', id, ' of ', parentid)

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

        const cb = c => {
            console.log('CALLBACK ', c)
            this.cast = c;
            this.isLoading = false
        }

        // todo pass only what's needed
        this.dispatchEvent(new CustomEvent('refresh', {
            bubbles: true,
            composed: true,
            detail: {
                ...this.cast,
                cb,
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
            detail: { id },
        }));
    }

    addToQueue(event) {
        const { id } = event.target.dataset;
        console.log('Cast: add to queue ', id)
    }
}