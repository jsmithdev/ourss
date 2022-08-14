import { api, LightningElement } from 'lwc';

import {
    clearStore,
} from '../../data/idb';

export default class Settings extends LightningElement {

    showSignIn = false;
    
    @api user = {}

    get username(){
        return this.user?.displayName || '';
    }

    get dom(){
        return {
            input: this.template.querySelector('input'),
        }
    }

    signIn() {
        this.dispatchEvent(new CustomEvent('signin', {
            bubbles: true,
            composed: true,
        }));
    }

	get version() {
		try {
			// eslint-disable-next-line no-undef
			return `v${__VERSION__}`;
		} catch (e) {
			return 'v1';
		}
	}


    addUrl() {
        const {value} = this.dom.input;
        console.log('ADD FEED: ', value)
        if(value && value.includes('https')){
            this.dispatchEvent(new CustomEvent('add', {
                bubbles: true,
                composed: true,
                detail: {
                    url: value,
                }
            }))
        }
        else {
            // todo have toast for user
            console.warn('URL should be valid and https')
        }
    }



    radio() {

        this.dispatchEvent(new CustomEvent('radio', {
            bubbles: true,
            composed: true,
        }));
    }

    async clearCache() {
        
        if(!confirm(`Are you sure you want delete all downloads?`)) return;

        //await clearStore('casts')
        await clearStore('audio')
        console.info('Cache cleared')
    }
}