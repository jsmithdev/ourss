import { api, LightningElement } from 'lwc';

export default class Login extends LightningElement {

    @api
    text = 'Please login to continue';

    login() {
        this.dispatchEvent(new CustomEvent('login', {
            bubbles: true,
            composed: true,
        }));
    }
    logout() {
        this.dispatchEvent(new CustomEvent('logout', {
            bubbles: true,
            composed: true,
        }));
    }
}