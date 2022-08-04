import { api, LightningElement } from 'lwc';

export default class Cast extends LightningElement {

    @api title = '';
    @api date = '';
    @api description = '';

    selectItem(event) {
        console.log(event.currentTarget)
        console.log(event.currentTarget.querySelector('.details'))
        event.currentTarget.querySelector('.details')?.classList.toggle('hide')
    }
}