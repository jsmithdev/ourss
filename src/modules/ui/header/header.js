import { api, track, LightningElement } from 'lwc';

export default class Header extends LightningElement {

    is = 'ourss-header'
    
    @track _message = 'Welcome to OurRSS!'

    @api 
    get message(){
        return this._message;
    }
    set message(value){
        this._message = value;
    }

    reload(){
        //window.location.reload()
        this.dispatchEvent(new CustomEvent('reload', {
            bubbles: true,
            composed: true,
        }));
    }
}