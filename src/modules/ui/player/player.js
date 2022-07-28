import { api, LightningElement } from 'lwc';

import {
    setItem,
    getItemById,
} from '../../data/idb'

export default class Player extends LightningElement {

    autoplay = false;
    paused = true;
    currentTime = 0;

    Audio = {
        currentTime: 0,
    }

    @api
    get current(){
        return this._current || {};
    }
    set current(item){
        
        const isNew = (this._current?.id !== item?.id);

        if(item?.name){
            this._current = item;
            this.newAudio({
                autoplay: (isNew || localStorage.src !== item.src),
            });
        }
    }
    
    navigate(event) {

        const { view } = event.currentTarget.dataset || event.target.dataset;

        if(!view) return;
        
        this.dispatchEvent(new CustomEvent('navigate', {
            bubbles: true,
            composed: true,
            detail: {
                view,
            },
        }));
    }

    get src() {
        return this.current?.src || this.current.src || localStorage.src || '';
    }
    get currentImage() {
        return this.current?.itunes_image?.href || this.current.image;
    }
    get title() {
        const s = this.current?.title;
        if(!s) return '';
        return s.length > 50
            ? `${s.substring(0,45)}...`
            : s;
    }
    get name() {
        return this.current?.name || '';
    }

    get dom(){
        return {
            image: this.template.querySelector('.image'),
            progressAmount: this.template.querySelector('.progressAmount'),
            expand: this.template.querySelector('.expandid'),
            section: this.template.querySelector('section'),
        }
    }

    loadPrevious() {
        console.log('Player: loading previous')

        const store = {
            image: localStorage.image,
            name: localStorage.name,
            src: localStorage.src,
            time: localStorage.time,
            title: localStorage.title,
        }
        
        this.current = store;
    }

    async newAudio(options = {}) {
        console.log('Player: setting new audio', options)
        
        if(typeof this.Audio.pause === 'function') this.Audio.pause();

        const blob = await this.getLocalBlob(this.src);

        this.Audio = new Audio( blob ? URL.createObjectURL(blob) : this.src);

        this.Audio.currentTime = this.current?.time || 0;

        if(options.autoplay){
            if(this.Audio.canplay){
                this.Audio.play();
            }
            else {
                this.Audio.addEventListener('canplay', () => this.Audio.play());
            }
            this.paused = false;
        }

        this.dom.image.style.backgroundImage = `url(${this.currentImage})` || '';

        this.Audio.addEventListener('timeupdate', event => this.updateTime(event));
        //this.Audio.addEventListener('playing', event => this.playing(event));
        this.Audio.addEventListener('emptied', event => this.emptied(event));
        /* this.Audio.addEventListener('pause', () => {
            this.paused = true;
        });
        this.Audio.addEventListener('play', () => {
            this.paused = false;
        }); */
        
        
        this.metadata();
    }


    play() {
        console.log('Player: playing ', `${this.name} - ${this.title}`)
        if(typeof this.Audio.play === 'function') 
        this.paused = false;
        return this.Audio.play();
    }
    pause() {
        console.log('Player: pausing ', `${this.name} - ${this.title}`)
        this.paused = true;
        return this.Audio.pause();
    }
    back() {
        //this.dom.audio.currentTime = this.dom.audio.currentTime - 15
        this.Audio.currentTime = this.Audio.currentTime - 15
    }
    forward() {
        this.Audio.currentTime = this.Audio.currentTime + 30
    }

    updateTime() {
        const duration = this.Audio.duration
        const time = this.Audio.currentTime
        //console.log('updateTime ', time, ' duration ', duration)
        if (duration > 0) {
            navigator.mediaSession.setPositionState({ duration: time });
            // Move progress line 
            this.dom.progressAmount.style.width = `${((time / duration) * 100)}%`
            // 
            this.duration = '-'+new Date((duration * 1000) - (time * 1000))
                .toISOString().substring(11, 19).replace(/00:/g, '')
        }
        if(time) {
            localStorage.time = time
            this.currentTime = new Date(time * 1000).toISOString().substring(11, 19)
            navigator.mediaSession.setPositionState({
                duration,
                position: time,
            });
        }
    }
    progress(e) {
        console.log('PROGRESS ', e.pageX * (this.Audio.duration / window.innerWidth))
        this.Audio.currentTime = e.pageX * (this.Audio.duration / window.innerWidth);
        localStorage.time = this.Audio.currentTime
    }
    expand() {
        this.dom.expand.classList.toggle('expand')
        this.dom.section.classList.toggle('expand')
        this.dom.section.classList.remove('expand-full')
    }
    
    renderedCallback() {

        if(!this._init){
            this._init = true;
            
            this.loadPrevious();

            this.addEventListener('keyup', this.hotkeys);

            this.dom.section.addEventListener(
                'touchstart',
                event => this.handleTouchStart(event),
                false
            );
            this.dom.section.addEventListener(
                'touchmove',
                event => this.handleTouchMove(event),
                false
            );
        }
    }

    hotkeys(event){
        console.log('Player: hotkeys ', event.key)
        const {key} = event;

        if(key === 'Space') this.togglePlay();
    }

    metadata() { 
        console.log('Player: setting metadata ', `${this.name} - ${this.currentImage}`)
        
        localStorage.image = this.currentImage
        localStorage.currentTime = 0
        localStorage.src = this.src
        localStorage.title = this.title
        localStorage.name = this.name

        navigator.mediaSession.metadata = new MediaMetadata({
            title: this.title,
            artist: this.name,
            artwork: [{
                src: this.currentImage
            }]
        })
        
        const play = () => {
            this.play()
            navigator.mediaSession.playbackState = "playing";
        }
        const pause = () => {
            this.pause()
            navigator.mediaSession.playbackState = "paused";
        }


        navigator.mediaSession.setActionHandler('play', play)
        navigator.mediaSession.setActionHandler('pause', pause);
        navigator.mediaSession.setActionHandler('stop', pause);
        navigator.mediaSession.setActionHandler('seekbackward', () => this.back());
        navigator.mediaSession.setActionHandler('seekforward', () => this.forward());
        navigator.mediaSession.setActionHandler('previoustrack', () => this.back());
        navigator.mediaSession.setActionHandler('nexttrack', () => this.forward());

        //navigator.mediaSession.setActionHandler('seekto', function() { /* Code excerpted. */ });
        //navigator.mediaSession.setActionHandler('skipad', function() { /* Code excerpted. */ });
    }


    sendMessage(message) {
        
        this.dispatchEvent(new CustomEvent('message', {
            bubbles: true,
            composed: true,
            detail: {
                message,
            }
        }));
    }
    
    emptied() {

        if(!this.name || !this.title) { return }

        const message =`${this.title || this.name} is over`

        console.log('Player: emptied ', message)
        
        //this.sendMessage(message);
    }

    togglePlay(){
        if(this.paused) {
            this.play()
        }
        else {
            this.pause()
        }
    }

    auth() {

        this.dispatchEvent(new CustomEvent('auth', {
            bubbles: true,
            composed: true,
        }));
    }

    
    handleTouchStart(event) {
        if (this.ignoreSwipe(event)) {
            this._xDown = undefined;
            this._yDown = undefined;
            return;
        }
    
        const firstTouch = event.touches[0];
        this._xDown = firstTouch.clientX;
        this._yDown = firstTouch.clientY;
    }
    handleTouchMove(event) {

        event.preventDefault();
        
        if (!this._xDown || !this._yDown) {
            return;
        }
    
        const xUp = event.touches[0].clientX;
        const yUp = event.touches[0].clientY;
    
        const xDiff = this._xDown - xUp;
        const yDiff = this._yDown - yUp;
    
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            /*most significant*/
            if (this.xDiff > 0) {
                /* left swipe */
                //console.info('app: left swipe ', true);
            } else {
                /* right swipe */
                //console.info('app: right swipe ', true);
            }
        } else {
            if (this.yDiff > 0) {
                /* up swipe */
                //console.info('app: up swipe ', true);
                this.expand()
            } else {
                /* down swipe */
                //console.info('app: down swipe ', true);
                this.expand()
            }
        }
    
        /* reset values */
        this._xDown = null;
        this._yDown = null;
    }
    ignoreSwipe(event) {
        // if some touches come from elements with ignoreswipe class > ignore
        return Array.from(event.touches).some((t) =>
            t.target.classList.contains('noswipe')
        );
    }


    /**
     * get audio 
     * @param {String} url 
     * @returns {Blob} | undefined
     */
    async getLocalBlob(url){
        return (await getItemById( url, 'audio'))?.blob;
    }
}