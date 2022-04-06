import { track, LightningElement } from 'lwc';

import {
    addCast,
    updateCast,
    deleteCast,
    storeCast,
    hasBeenHour,
    defaults,
} from '../../data/util';

import {
    getItems,
    setItem,
    deleteItemById,
} from '../../data/idb'

import {
    getRemoteDb,
} from '../../data/fire';


export default class App extends LightningElement {

    @track casts = []
    current = {}
    message = ''
    isLoading = true
    showAuth = false;
    showSettings = false;
    user = {}
    selected = {}
    hasDetails = false;

	constructor() {
		super();
        console.log()
		this.worker = new Worker(new URL('./../../workers/data.js', import.meta.url));
		this.worker.addEventListener( 'message', event => 
            this.processed( event.data?.whoami || 'web worker', event ) );
	}

    get dom(){
        return {
            app: this.template.querySelector('.app'),
            section: this.template.querySelector('section'),
        }
    }


    async connectedCallback () {
        this.startLoading();
    }

    renderedCallback() {
        if(!this._init){
            this._init = true;
            this.onkeyup = this.hotkeys;


            const done = () => {
                this.isLoading = false;
            }

            setTimeout(done, 1000)
        }
    }
    

    view(str){
        if(str === 'casts'){
            this.dom.section.scrollTo(0, 0)
        }
        else if(str === 'details'){
            this.dom.section.scrollTo(this.dom.section.scrollWidth / 3, 0)
        }
        else if(str === 'settings'){this.dom.section.scrollTo(this.dom.section.scrollWidth / 1, 0)
        }
    }

    setCurrent({detail}){

        const {
            id,
            parentid,
        } = detail;

        const parent = this.casts.find(x => x.id === parentid)
        
        const item = parent
            .items.find(x => x.id === id) 

        this.current = Object.assign({
            name: parent.title,
            image: parent.image,
        }, item);
        
        console.log(this.current)
    }

    async addCast({detail}){
        const {url, id} = detail;
        console.log('addCast ', url)
        this.casts = [...this.casts, (await addCast(url, id))]
        console.log({
            CastsNow: this.casts,
        })
    }

    hotkeys(event){
        console.log('hotkeys ', event.key)
        const {key} = event;

        if(key === 'Space') console.log('space');
    }

    radio({detail}){

        const {callback} = detail;

        const feed = this.casts[Math.floor(Math.random() * this.casts.length) + 0]
        const cast = feed.items[Math.floor(Math.random() * feed.items.length) + 0]
        console.log(cast)
        console.log(callback)
        this.current = cast;
        setTimeout(() => callback(cast), 1000)
    }
    
    messenger({detail}){
        this.message = detail.message;
    }

    async refresh({detail}){
        console.log('refresh ')
        const {feed, id} = detail;

        const cast = await updateCast(feed, id)
        console.log(JSON.parse(JSON.stringify({feed, id, updated: cast})))

        this.casts = [
            cast,
            ...this.casts.filter(c => c.id !== id),
        ];

        console.log(JSON.parse(JSON.stringify({casts: this.casts})))

        if(detail.cb) detail.cb(cast);
    }

    remove({detail}){
        
        const {id} = detail;
        
        deleteCast(id)
    }

    scroll(){
        this.dom.app.scrollIntoView({
            inline: 'start',
            block: 'start',
            //behavior: 'smooth',
        })
    }

    auth(){
        this.showAuth = true;
    }

    settings({detail}){
        if(detail){
            this.view('settings')
        }
        else {
            this.view('casts')
        }
    }

    playlist({detail}){
        if(detail){
            this.view('details')
        }
        else {
            this.view('casts')
        }
    }

    /**
     * used to run sign in process
     */
    signIn() {
        this.template.querySelector('ui-auth').signIn();
    }

    /**
     * ran when a user has logged in
     * @param {Event} event object which has the user as a detail
     */
    loggedIn({detail}) {

        this.user = detail.user;
        // if haven't already, check remote db
        if(!this.remoteDbChecked){
            this.checkRemoteDb();
        }
    }

    /**
     * used to set & show details of a cast
     * @param {Event} event object which has the cast as a detail
     */
    showDetail({detail}) {
        this.selected = detail;
        if(!this.hasDetails){
            this.hasDetails = true;
            setTimeout(() => this.view('details'), 50)
        }
        else {
            this.view('details')
        }
    }

    /**
     * starts process to load from local db
     * if no local db, show a couple of defaults
     */
    async startLoading(){

        const casts = await getItems('casts')

        if(!casts.length){
            defaults.map(async url => {
                this.worker.postMessage({
                    url,
                    store: true,
                    type: 'parse',
                });
            })

            // have loaded some defaults
            // on login, we'll check remote db
            return true;
        }
        else {
            console.log('App: had local casts')
            console.log(casts)
            this.casts = casts;
        }

        if(!this.remoteDbChecked){
            this.checkRemoteDb();
        }
        
        return true;
    }

    /**
     * check remote db for feeds
     * @returns undefined
     */
    async checkRemoteDb(){
        console.log('App: checking remote db')
        this.remoteDbChecked = true;
        
        // only run if it's been over an hour
        const lastRun = localStorage.lastRemotePull;
        if(lastRun){
            if(!hasBeenHour(lastRun)){
                console.log('App: last remote pull was less than an hour ago')
                return;
            }
        }
        localStorage.lastRemotePull = new Date().getTime()

        const urls = this.casts.map(x => x.feed)
        const remoteDb = await getRemoteDb('casts');
        const newFeeds = remoteDb.filter(x => !urls.includes(x.url))
        if(newFeeds.length){
            console.log('App: new feeds: ', newFeeds)
            newFeeds.map(async data => {
                const {id, url} = data;
                this.worker.postMessage({
                    id,
                    url,
                    store: true,
                    type: 'parse',
                });
            })
        }
    }

    /**
     * ran when the data web worker sends a message
     * @param {String} name of process from web worker
     * @param {MessageEvent} event sent back from web worker
     */
    async processed(name, event){
        console.log('PROCESSING started by: ', name)
        console.log(event)
        if(name === 'worker-parser'){
            const {data, store} = event.data;
            if(store){
                setItem('casts', data)
            }
            this.casts = [...this.casts, data]
        }
    }


    /* async function updateCast(url, id){
        await deleteCast(id)
        return storeCast( (await parseUrl(url, id) ))
    }

    async function deleteCast(id){
        return deleteItemById('casts', id)
    } */

}