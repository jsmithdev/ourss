import { api, LightningElement } from 'lwc';

export default class Loading extends LightningElement {

    @api width = ''
    @api height = ''

    renderedCallback() {
        if(this.width) {
            this.template.querySelector('img').style.width = this.width
        }
        if(this.height) {
            this.template.querySelector('img').style.height = this.height
        }
    }
}