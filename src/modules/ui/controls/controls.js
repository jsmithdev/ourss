import { LightningElement } from 'lwc';

export default class Controls extends LightningElement {

    init() {
        this.registerElements()
    }

    setProperties() {
        this.is = 'electron-controls'
    }

    // Fires when an instance was removed from the document.
    detachedCallback() {
    }

    // Fires when an instance was inserted into the document.
    attachedCallback() {
        var template = this.owner.querySelector('template')
        var clone = document.importNode(template.content, true)
        this.root = this.createShadowRoot()
        this.root.appendChild(clone)
        this.init()
    }


    // Fires when an instance of the element is created.
    createdCallback() {
        this.setProperties()
        this.parseAttributes()
    }

    parseAttributes() {

    }

    registerElements() {

        this.dom = {}
        this.dom.restore = this.root.querySelector('.restore')
        this.dom.mini = this.root.querySelector('.mini')
        this.dom.maxi = this.root.querySelector('.maxi')
        this.dom.close = this.root.querySelector('.close')


        setTimeout(() => this.addListeners(), 2000)
    }

    addListeners() {
        console.dir(this.dom)
        console.dir(this.dom.restore)
        this.dom.restore.onclick = () => {
            this.dom.restore.classList.add('hide')
            this.dom.maxi.classList.remove('hide')
            this.dispatch('app-restore', true)
        }
        this.dom.maxi.onclick = () => {
            this.dom.maxi.classList.add('hide')
            this.dom.restore.classList.remove('hide')
            this.dispatch('app-maxi', true)
        }
        this.dom.mini.onclick = () => this.dispatch('app-mini', true)
        this.dom.close.onclick = () => this.dispatch('app-close', true)

        this.ready()
    }

    ready() {
    }

    dispatch(name, value) {
        this.dispatchEvent(new CustomEvent(name, {
            bubbles: true,
            composed: true,
            detail: {
                value,
            }
        }))
    }
}