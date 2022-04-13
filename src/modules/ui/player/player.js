import { api, LightningElement } from 'lwc';

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
        if(item?.id){
            this._current = item;
            if(isNew) this.setNew();
        }
    }
    
    navigate(view, value) {
        
        this.dispatchEvent(new CustomEvent('navigate', {
            bubbles: true,
            composed: true,
            detail: {
                view,
                value,
            },
        }));
    }
    toggleSettings() {
        this.showSettings = !this.showSettings;
        this.navigate('settings', this.showSettings)
    }
    
    toggleList() {
        this.showList = !this.showList;
        this.navigate('details', this.showList)
    }

    get src() {
        return this.current?.enclosures?.find(x => x)?.url || this.current.src || localStorage.src || '';
    }
    get currentImage() {
        return this.current?.itunes_image?.href || this.current.image;
    }
    get title() {
        return this.current?.title || '';
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
            modal: this.template.querySelector('ui-modal'),
        }
    }

    togglePlay() {

        this.paused = !this.paused;

        if(this.paused) {
            console.log('Player: pausing')
            this.pause();
        }
        else {
            
            setTimeout(() => this.play()
                .then(() => console.log('Player: playing'))
                .catch(msg => this.loadPrevious(msg))
            , 0);
        }
    }

    loadPrevious(message) {
        console.log('Player: loading previous', message)
        //console.log(this.current)
        
        this._current = {
            src: localStorage.src,
            image: localStorage.image,
            time: localStorage.time,
            name: localStorage.name,
            title: localStorage.title,
        }
        
        this.newAudio()
    }

    newAudio(options = {}) {
        console.log('Player: setting new audio', options)
        
        this.Audio = new Audio(this.src);
        this.dom.image.style.backgroundImage = `url(${this.currentImage})` || '';
        this.Audio.currentTime = this.current?.time || 0;

        this.Audio.addEventListener('timeupdate', event => this.updateTime(event));
        this.Audio.addEventListener('playing', event => this.playing(event));
        this.Audio.addEventListener('emptied', event => this.emptied(event));
        this.Audio.addEventListener('pause', () => {
            this.paused = true;
        });
        this.Audio.addEventListener('play', () => {
            this.paused = false;
        });
        if(options.autoplay){
            if(this.Audio.canplay){
                this.Audio.play();
            }
            else {
                this.Audio.addEventListener('canplay', () => this.Audio.play());
            }
        }
    }


    play() {
        //return this.dom.audio.play();
        return this.Audio.play();
    }
    pause() {
        //return this.dom.audio.pause();
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
            this.dom.progressAmount.style.width = `${((time / duration) * 100)}%`
            this.duration = '-'+new Date((duration * 1000) - (time * 1000))
                .toISOString().substr(11, 8).replace(/00:/g, '')
        }
        if(time) {
            this.currentTime = new Date(time * 1000).toISOString().substr(11, 8);
            localStorage.time = time
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

    setNew() { 

        this.Audio.pause()

        this.newAudio({
            autoplay: true,
        })
        
        //Mechanics
        //localStorage['audioTitle'] = String(this.title);
        localStorage.image = this.currentImage
        localStorage.currentTime = 0
        localStorage.src = this.src
        localStorage.title = this.title
        localStorage.name = this.name
        //localStorage['audioName'] = String(this.name);


        // todo need retest src error via mobile fix
        if ('mediaSession' in navigator) {
            // eslint-disable-next-line no-undef
            navigator.mediaSession.metadata = new MediaMetadata({
                title: this.title,
                artist: this.name,
                artwork: [{
                    src: this.currentImage
                }]
            })
            
            const play = async () => {
                await this.play()
                navigator.mediaSession.playbackState = "playing";
            }
            const pause = async () => {
                await this.pause()
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
    playing() {
        
        if(!this.name || !this.title) { return }

        const message =`${this.name}\n${this.title}`
        
        console.log('Player: playing ', message)
        //this.sendMessage( message );
    }
    emptied() {

        if(!this.name || !this.title) { return }

        const message =`${this.title || this.name} is over`

        console.log('Player: emptied ', message)
        
        //this.sendMessage(message);
    }

    radio() {

        const radio = new Audio(`/resources/radio.mp3`)
        radio.loop = true
        radio.play()

        const callback = () => {
            radio.pause()
            //this.togglePlay()
            this.Audio.addEventListener('ended', () => this.radio())
        }

        this.dispatchEvent(new CustomEvent('radio', {
            bubbles: true,
            composed: true,
            detail: {
                callback: callback.bind(this),
            },
        }));
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
}