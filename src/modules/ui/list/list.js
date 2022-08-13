import { api, LightningElement } from 'lwc';

export default class Cast extends LightningElement {

    @api title = '';
    @api date = '';
    @api description = '';
    @api active = false;

    renderedCallback(){
        if(this.active){
            this.selectItem()
        }
    }

    selectItem() {
        this.template.querySelector('.details')?.classList.toggle('hide')
    }
}