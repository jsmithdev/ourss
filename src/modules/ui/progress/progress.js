import { api, LightningElement } from 'lwc';

export default class Progress extends LightningElement {

    current = 0;
    percent = 0;
    percentage = '0Mb';

    @api type = 'item'; // item || bar

    @api max = 0;

    @api 
    get value (){ return this.current }
    set value (n){
        if(this.rendered) {
            this.current = this.toGroup( n.toFixed() )
            this.percent = ((n / this.max) * 100).toFixed()
            this.updateDom()
        }
    }

    get isBar(){
        return this.type === 'bar';
    }

    get length(){
        return this.toGroup( this.max.toFixed() )
    }

    get dom(){
        return {
            progress: this.template.querySelector('.progress'),
            progressAmount: this.template.querySelector('.progressAmount'),
            item: this.template.querySelector('.item'),
        }
    }

    get ratio(){
        return `${this.value} / ${this.length}`
    }


    renderedCallback(){
        this.rendered = true;
    }


    updateDom(){
        if(this.isBar){
            this.dom.progressAmount.style.width = `${this.percent}%`
            this.dom.progress.style.backgroundImage = `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${this.percent}%, var(--color-dark) 100%)`
        }
        else {
            this.dom.item.style.backgroundImage = `linear-gradient(to right, var(--color-accent) ${this.percent}%, var(--color-dark) 100%)`
        }
    }

    toGroup(n){
        return n >= 1000000 
            ? this.toMbString(n)
            : this.toKbString(n)
    }

    toMb(n){
        return (n / 1000000).toFixed()
    }

    toMbString(n){
        return `${(this.toMb(n))}Mb`
    }

    toKbString(n){
        return `${this.toKb(n)}Kb`
    }

    toKb(n){
        return (n / 1000).toFixed()
    }
}