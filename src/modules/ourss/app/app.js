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
    getKeys,
    setItem,
    getItems,
    deleteItemById,
} from '../../data/idb'

import {
    getRemoteDb,
    setRemoteDb,
} from '../../data/fire';

import {
    gestureListeners,
} from '../../data/gesture';


export default class App extends LightningElement {

    @track casts = []
    current = {}
    message = ''
    isLoading = false
    showAuth = false;
    user = {}
    selected = {}
    favorites = []

    constructor() {
        super();
        this.worker = new Worker(new URL('./../../workers/data.js', import.meta.url));
        this.worker.addEventListener('message', event =>
            this.processed(event));
    }

    get hasDetails() {
        return Object.keys(this.selected).length
    }

    get dom() {
        return {
            app: this.template.querySelector('.app'),
            main: this.template.querySelector('main'),
            playlist: this.template.querySelector('ui-playlist'),
        }
    }


    async connectedCallback() {
        this.startLoading();
    }

    renderedCallback() {
        if (!this._init) {
            this._init = true;
            this.onkeyup = this.hotkeys;
            //gestureListeners.bind(this).call();
        }
    }

    view(str) {
        if (str === 'casts') {
            this.dom.main.scrollTo(0, 0)
        }
        else if (str === 'details') {
            this.dom.main.scrollTo(this.dom.main.scrollWidth / 3, 0)
        }
        else if (str === 'settings') {
            this.dom.main.scrollTo(this.dom.main.scrollWidth / 1, 0)
        }
        else if (str === 'playlist') {
            this.current?.id
                ? this.dom.main.scrollTo(this.dom.main.scrollWidth / 2, 0)
                : this.dom.main.scrollTo(this.dom.main.scrollWidth / 3, 0);
        }
    }
    navigate({ detail }) {

        const { view, value } = detail;

        console.log('App: v/v ', view, value)

        if (value === undefined || value === true) {
            this.view(view)
        }
        else {
            this.view(this._view_prev)
        }
        this._view_prev = view || defaults.view;
    }

    setCurrent({ detail }) {

        const {
            id,
            parentid,
        } = detail;

        const parent = this.casts.find(x => x.id === parentid)

        //console.log('App: setCurrent: ', id, parentid, parent)

        const item = parent?.items.find(x => x.id === id)

        if (!item) { return console.log('App: no items') }

        this.current = Object.assign({
            name: parent.title,
            image: parent.image,
        }, item);

        //console.log(this.current)
    }

    async addCast({ detail }) {
        const { url, id } = detail;
        //console.log('addCast ', url)
        this.casts = [...this.casts, (await addCast(url, id))]
        //console.log({
        //    CastsNow: this.casts,
        //})
    }

    hotkeys(event) {
        //console.log('hotkeys ', event.key)
        const { key } = event;

        if (key === 'Space') console.log('space');
    }

    radio() {

        const radio = new Audio(`/resources/radio.mp3`)
        radio.loop = true
        radio.play()

        const callback = () => {
            radio.pause()
        }

        const feed = this.casts[Math.floor(Math.random() * this.casts.length) + 0]
        const cast = feed.items[Math.floor(Math.random() * feed.items.length) + 0]

        this.setCurrent({
            detail: {
                id: cast.id,
                parentid: feed.id,
            }
        });
        setTimeout(() => callback(), 1000)
    }

    messenger({ detail }) {
        this.message = detail.message;
    }

    async refresh({ detail }) {

        const { feed, id, callback } = detail;

        const cast = await updateCast(feed, id)

        this.updateSortCast(cast)

        if (callback) callback(cast);
    }
    async favorite({ detail }) {

        const { cast } = detail;
        console.log('App: favorite ', cast)

        // update local db
        deleteCast(cast.id)
        setItem('casts', cast);

        this.updateSortCast(cast)

        // add to favorites
        this.favorites = [...this.favorites, cast.id]

        const user = {
            id: this.user.uid,
            favorites: this.favorites,
        }

        if (!this.user.uid) return console.warn('no user');

        // update remote db
        const res = await setRemoteDb('users', user)

        console.info('App: favorite results: ', res)


        if (detail.cb) detail.cb();
    }

    remove({ detail }) {

        const {
            id,
            store,
        } = detail;

        deleteItemById(store, id);

        if (store === 'audio') {
            this.playlist = this.playlist.filter(x => x.id !== id);
        }
        else if (store === 'casts') {
            this.casts = this.casts.filter(x => x.id !== id);
        }
    }

    next({ detail }) {

        const {
            id,
            parent,
        } = detail;

        const cast = this.casts.find(x => x.title === parent);

        this.dom.playlist.next(id, cast.id);
    }

    scroll() {
        this.dom.app.scrollIntoView({
            inline: 'start',
            block: 'start',
            //behavior: 'smooth',
        })
    }

    auth() {
        this.showAuth = true;
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
    loggedIn({ detail }) {

        //console.log('App: user info ', detail.user)

        this.user = detail.user;
        // if haven't already, check remote db
        if (!this.remoteDbChecked) {
            this.checkRemoteDb();
        }
    }

    /**
     * used to set & show details of a cast
     * @param {Event} event object which has the cast as a detail
     */
    showDetail({ detail }) {
        this.selected = detail;
        setTimeout(() => this.view('details'), 0)
    }

    /**
     * starts process to load from local db
     * if no local db, show a couple of defaults
     */
    async startLoading() {

        const casts = await getItems('casts')//, 'date'

        if (!casts.length) {
            defaults.feeds.map(async url => {
                this.worker.postMessage({
                    url,
                    store: true,
                    type: 'parse',
                });
            })

            console.log('App: had to get default casts')
            // have loaded some defaults
            // on login, we'll check remote db
            return true;
        }
        else {
            console.log('App: had local casts')
            this.updateSortCasts(casts)
        }

        this.isLoading = false;

        if (!this.remoteDbChecked) {
            this.checkRemoteDb();
        }

        return true;
    }

    /**
     * check remote db for feeds
     * @returns undefined
     */
    async checkRemoteDb() {
        console.log('App: checking remote db')
        this.remoteDbChecked = true;

        // only run if it's been over an hour
        const lastRun = localStorage.lastRemotePull;
        if (lastRun) {
            if (!hasBeenHour(lastRun)) {
                console.log('App: last remote pull was less than an hour ago')
                return;
            }
        }
        localStorage.lastRemotePull = new Date().getTime()

        const urls = this.casts.map(x => x.feed)
        const remoteDb = await getRemoteDb('casts');
        const newFeeds = remoteDb.filter(x => !urls.includes(x.url))
        if (newFeeds.length) {
            console.log('App: new feeds: ', newFeeds)
            newFeeds.map(async data => {
                const { id, url } = data;
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
     * @param {MessageEvent} event sent back from web worker
     */
    async processed(event) {

        const { data, store, whoami } = event.data;

        console.log('PROCESSED by: ', whoami)
        console.log(event)
        if (whoami === 'worker-parser') {
            if (store && data) {
                setItem('casts', data)
            }
            if (data) {
                this.updateSortCast(data)
            }
        }
    }

    updateSortCast(cast) {
        if (!cast) return;

        const { id } = cast;
        const faves = this.casts.filter(c => c.fav && c.id !== id)
        const others = this.casts.filter(c => !c.fav && c.id !== id)

        if (cast.fav) {
            this.casts = [
                cast,
                ...faves,
                ...others,
            ];
        }
        else {
            this.casts = [
                ...faves,
                cast,
                ...others,
            ];
        }
    }

    updateSortCasts(casts) {

        const faves = casts.filter(c => c.fav)
        const others = casts.filter(c => !c.fav)

        this.casts = [
            ...faves,
            ...others,
        ];
    }


    queue({ detail }) {

        const {
            id,
            parentid,
        } = detail;

        const parent = this.casts.find(x => x.id === parentid)

        const item = parent?.items.find(x => x.id === id)

        item.parentid = parentid;

        this.dom.playlist.queue(item)
    }
}