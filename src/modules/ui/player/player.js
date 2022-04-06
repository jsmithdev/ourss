import { api, LightningElement } from 'lwc';

export default class Player extends LightningElement {

    autoplay = true;
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
    
    get showSettings() {
        return this._settings || false;
    }
    set showSettings(value) {
        this._settings = value;
        this.dispatchEvent(new CustomEvent('settings', {
            bubbles: true,
            composed: true,
            detail: value,
        }));
    }
    toggleSettings() {
        this.showSettings = !this.showSettings;
    }
    
    get showList() {
        return this._pl || false;
    }
    set showList(value) {
        this._pl = value;
        this.dispatchEvent(new CustomEvent('playlist', {
            bubbles: true,
            composed: true,
            detail: value,
        }));
    }
    toggleList() {
        this.showList = !this.showList;
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
        if(this.autoplay){
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
        this.showAdd = false
        this.showSettings = false
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
                console.info('app: left swipe ', true);
            } else {
                /* right swipe */
                console.info('app: right swipe ', true);
            }
        } else {
            if (this.yDiff > 0) {
                /* up swipe */
                console.info('app: up swipe ', true);
                this.expand()
            } else {
                /* down swipe */
                console.info('app: down swipe ', true);
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

    isMobile() {
        let check = false;
        // eslint-disable-next-line no-useless-escape
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }
}