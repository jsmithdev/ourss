import { api, track, LightningElement } from 'lwc';


export default class Modal extends LightningElement {

    @api header
    @api trigger
    @api value
    /**
     * @description {String} small | medium | large
     */
    @api variant
    @api 
    get isActive(){ return this.active || false }
    set isActive(bool){ this.active = bool; }
    
    @track active
    @track data = []


    is = 'modal'


    @api
    show(){
        this.active = true;
    }
    
    get modalClassList(){

        if(this.variant === 'large'){
            return 'modal fade-in large'
        }
        else if(this.variant === 'small')      {
            return 'modal fade-in small'
        }

        return `modal fade-in medium ${this.active ? 'show' : ''}`
    }

    close(){
        this.active = false
        this.dispatch('close')
    }

    error(type, message){
        this.toast(message, type, 'error')
    }

    toast( message = '', title = 'Info', variant = 'info') {
        
        this.dispatch('toast', {
            title,
            message,
            variant,
        });
    }
    /**
     * dispatch a (bubbles & composed true) CustomEvent
     * @param {String} name name of event
     * @param {Object} detail object to send
     */
    dispatch(name, detail = {}){

        this.dispatchEvent(new CustomEvent( name , {
            bubbles: true, 
            composed : true,
            detail
        }))
    }
}