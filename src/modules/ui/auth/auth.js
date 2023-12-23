import { api, LightningElement } from 'lwc';

import {
    login,
    logout,
} from '../../data/mongo.js';

export default class Auth extends LightningElement {

    constructor() {
        super();
        //onAuthStateChanged
    }
    
    @api
    async login() {
        
        try {
            //const user = await signIn();
            const user = await login();
            this.dispatchEvent(new CustomEvent('loggedin', {detail: {user}}));
        }
        catch(e) {
            console.log('error signing in')
            console.log(e)
        }
    }
    @api
    async logout() {
        
        try {
            const user = await logout();
            this.dispatchEvent(new CustomEvent('loggedout', {detail: {user}}));
        }
        catch(e) {
            console.log('error signing in')
            console.log(e)
        }
    }
}