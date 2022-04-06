import { api, LightningElement } from 'lwc';
//import AwesomeModal from 'awesomemodal'

export default class Modal extends LightningElement {

    is = 'modal'
    isOpen = false
    
    @api options = {}

    @api
    open(){
        console.log('OPEN')
        this.isOpen = true;
    }

    @api
    close(){
        console.log('CLOSE')
        this.isOpen = false;
    }

    /* renderedCallback() {

        const el = this.template.querySelector('.awesomemodal')

        this.modal = new AwesomeModal(el, {options: this.options})
    } */

    error(type, message){
        this.toast(message, type, 'error')
    }

    toast( message = '', title = 'Info', variant = 'info') {

        this.dispatchEvent('toast', {
            detail: {
                title,
                message,
                variant,
            }
        })
    }
}