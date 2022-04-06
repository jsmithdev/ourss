/* eslint-disable @lwc/lwc/no-inner-html */
/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import { LightningElement } from 'lwc';

export default class Listen extends LightningElement {

    init() {
        this.registerElements()
    }

    setProperties() {
        this.is = 'listen'
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

        // //console.log('instance was created.')
    }

    parseAttributes() {

        //this.name = this.getAttribute('name');

        //this.something = parseInt(this.getAttribute('something'));
    }

    registerElements() {

        this.dom = {}
        this.dom.container = this.root.querySelector('.container')
        this.dom.gridContainer = this.root.querySelector('.gridContainer')
        this.dom.gridBox = this.root.querySelector('.grid-box')
        this.dom.cards = Array.from(this.root.querySelectorAll('.card'))
        this.dom.player = this.root.ownerDocument.querySelector('ourrss-player')
        this.dom.paths = Array.from(this.root.querySelectorAll('path'))

        this.addListeners()

    }

    addListeners() {

        // eslint-disable-next-line no-return-assign
        this.dom.paths.map(p => p.onclick = () => p.parentElement.click())
        this.ready()
    }

    ready() {


    }

    mkCard(feed) {

        let lines = ''

        if (feed.items) {
            feed.items.map(x => {
                if (x.enclosures) {

                    lines +=
                        `<li class="enc" data-name="${feed.title}" data-title="cast" data-audio="${x.enclosures[0].url}" >
                        ${x.title}<br/>${new Date(x.created).toDateString()}
                    </li>`
                }
                return x
            })
        }

        let card = document.createElement('div')
        card.classList.add('card')
        card.dataset.title = feed.title
        console.dir(feed)
        card.innerHTML +=
            `<span class="card-actions">
                <svg class="delete" data-title="${feed.title}" data-feed="${feed.feed}" style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#1b94d5" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                </svg>
                <svg class="refresh" data-title="${feed.title}" data-feed="${feed.feed}" style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="#1b94d5" d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" />
                </svg>
            </span>
            <img draggable="false" class="card-img" src="${feed.image}"  />

            <div class="card-body">
                ${feed.title}
                <ul>
                    ${lines}
                </ul>
            </div>
        `;

        card.onclick = (e) => {

            const target = e.target

            if (target.classList.contains('card')) {
                console.log('card clicked')
            }
            if (target.classList.contains('refresh')) {

                target.style.transform = 'rotate(360deg)'

                let bool = false
                setInterval(() => {
                    // eslint-disable-next-line no-unused-expressions
                    bool ?
                        target.style.transform = 'rotate(360deg)' : target.style.transform = 'rotate(360deg)'
                    bool = bool ?
                        false : true
                }, 500)

                console.dir(target.parentElement.parentElement.dataset.title)
                

            }


            if (target.classList.contains('delete')) {
                let delElm = target
                if (delElm.tagName === 'path') {
                    delElm = delElm.parentElement
                }
                console.log('Delete todo ', delElm.tagName)
                console.dir(delElm.parentElement.parentElement)
                const title = delElm.parentElement.parentElement.dataset.title
                console.log(title)
                return false
            }

            this.dom.cards.map(x => x.classList.remove('card-active'))

            if (target.tagName.toLowerCase() === 'li') {

                const card = target.parentElement.parentElement.parentElement
                const image = card.querySelector('.card-img')

                this.dom.player.setAttribute('image', image.src)
                this.dom.player.setAttribute('src', target.dataset.audio)
                this.dom.player.setAttribute('name', target.dataset.name)
                this.dom.player.setAttribute('title', target.dataset.title)
                this.dom.player.setAttribute('play', true)

            }

            if (!card.classList.contains('card')) {
                card = e.target.parentElement
            }

            const img = card.querySelector('img')
            const body = card.querySelector('.card-body')

            if (card.classList.contains('card-active')) {

                this.dom.container.style.height = 'auto'
                this.dom.gridContainer.style.width = '75%'
                card.classList.remove('card-active')
                Array.from(this.root.querySelectorAll('.card')).map(x => x.style.opacity = 1)


            } else {

                document.body.scrollTop = 0
                this.dom.gridContainer.style.width = '100%'
                card.parentElement.prepend(card)
                card.classList.add('card-active')
                const cards = Array.from(this.root.querySelectorAll('.card')).filter(x => !x.classList.contains('card-active'))
                // eslint-disable-next-line no-return-assign
                cards.map(x => x.style.opacity = 0)
            }

        }

        this.dom.gridBox.appendChild(card)
    }
}

/*


    // Fires when an attribute was added, removed, or updated.
    attributeChangedCallback(attr, oldVal, newVal) {


         if ('mk-card' === attr) {
            console.log(newVal, ' was passed into mk-card')
            //const feed = Util.getFeedByName(newVal)
            //console.log('** newCast (listen')
            //console.dir(feed)

            const data = this.mkCard(JSON.parse(newVal))
            
        } else if ('mk-all') {
            console.log(newVal, ' was passed into mk-all')
            this.dom.gridBox.innerHTML = ''
            //const store = new Store()
            //const audio = store.get('audio')
            //audio.feeds.map(x => this.mkCard(x))
            this.removeAttribute('mk-all')
        }

    }



---------------


Util.getFeedByName(target.parentElement.parentElement.dataset.title).then(curr => {

    console.dir(curr)

    const name = curr.title
    const feed = curr.feed

    const msg = {
        head: `Refreshing ${name}`,
        body: `${feed}`
    }
    ipc.send('message', msg);

    Util.getRSS(feed).then(rss => {

        console.dir(rss)
        const card = target.parentElement.parentElement
        const ul = card.querySelector('ul')
        ul.innerHTML = ''
        ul.classList.add('refresh')

        let lines = ''

        rss.items.map(x => 
            x.enclosures ? 
                ul.innerHTML += `
                    <li class="enc" data-name="${feed.title}" data-audio="${x.enclosures[0].url}" >
                        ${x.title}<br/>${new Date(x.created).toDateString()}
                    </li>
                ` : console.log('No enclosures.'))

        const store = new Store()
        const audio = store.get('audio')

        for (let i = 0; i < audio.feeds.length; i++) {
            if (audio.feeds[i].title === rss.title) {
                console.log('found')
                audio.feeds[i].items  = rss.items
            }
        }

        store.set('audio', audio)
        setTimeout(() => {
            ul.classList.remove('refresh')
            clearInterval(animate)
        }, 1000);
    })
    .catch(x => console.log('Error: ', x))
})
*/


        //const store = new Store();

        //const audio = store.get('audio')
        //if (!store.get('audio')) {
        //	const audio = {}
        //	audio.feeds = []
        //	store.set('audio', audio)
        //} else {
        //	audio.feeds.map(x => this.mkCard(x))
        //}
/*

        const autoUpdate = setInterval(() => Util.getAllAudio.then(feed => {
            console.log('AUTO UPDATE')
            Util.getRSS(feed).then(rss => {
                    var selectElement = form.querySelector('input[name="pwd"]');

                    const card = document.querySelector('div[title""]')
                    const ul = card.querySelector('ul')
                    ul.innerHTML = ''
                    ul.classList.add('refresh')

                    let lines = ''

                    rss.items.map(x => {
                        if (x.enclosures) {

                            lines +=
                                `<li class="enc" data-name="${feed.title}" data-title="cast" data-audio="${x.enclosures[0].url}" >
                                        ${x.title}<br/>${new Date(x.created).toDateString()}
                                    </li>`
                        }
                    })
                    ul.innerHTML = lines

                    const store = new Store()
                    const audio = store.get('audio')

                    for (let i = 0; i < audio.feeds.length; i++) {
                        //console.log(audio.feeds[i].title, ' VS ', rss.title)
                        if (audio.feeds[i].title === rss.title) {
                            //console.log('b4 ', audio.feeds.length)
                            audio.feeds.splice(i, 1)
                            //console.log('after ', audio.feeds.length)

                        }
                    }

                    audio.feeds.push(rss)
                    store.set('audio', audio)
                    setTimeout(() => {
                        ul.classList.remove('refresh')
                        clearInterval(animate)
                    }, 1000);
                })
                .catch(x => console.log('Error: ', x))

        }), 1000 * 60 * 30)
        */