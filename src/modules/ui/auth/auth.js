import { api, LightningElement } from 'lwc';

import {
    onAuthStateChanged,
    signIn,
} from '../../data/fire';

export default class Auth extends LightningElement {

    constructor() {
        super();
        onAuthStateChanged((user) => {
            if (user) {
                this.user = user;
                this.dispatchEvent(new CustomEvent('loggedin', {
                    detail: {
                        user: this.user,
                    },
                }));
            }
        })
    }
    
    @api
    async signIn() {
        try {
            const user = await signIn();
            this.dispatchEvent(new CustomEvent('loggedin', {detail: {user}}));
        }
        catch(e) {
            console.log('error signing in')
            console.log(e)
        }
    }
}