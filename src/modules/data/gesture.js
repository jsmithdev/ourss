
/**
 * Attach listeners used for gestures 
 * @param {Event} event 
 * @returns {undefined}
 */
export function gestureListeners () {
    this.dom.main.addEventListener(
        'touchstart',
        handleTouchStart.bind(this),
        false
    );
    this.dom.main.addEventListener(
        'touchmove',
        handleTouchMove.bind(this),
        false
    );
}

/**
 * Mark first touch (unless there's noswipe in classList) 
 * @param {Event} event 
 * @returns {undefined}
 */
function handleTouchStart(event) {
    if (ignoreSwipe(event)) {
        this._xDown = undefined;
        this._yDown = undefined;
        return;
    }

    const firstTouch = event.touches[0];
    this._xDown = firstTouch.clientX;
    this._yDown = firstTouch.clientY;
}
/**
 * On movement figure direction (unless there's noswipe in classList) 
 * @param {Event} event 
 * @returns {undefined}
 */
function handleTouchMove(event) {

    if (ignoreSwipe(event)) {
        event.preventDefault();
        return;
    }

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
        } else {
            /* down swipe */
            //console.info('app: down swipe ', true);
        }
    }

    /* reset values */
    this._xDown = null;
    this._yDown = null;
}

/**
 * Check if there's noswipe in classList
 * @param {Event} event 
 * @returns {Boolean} boolean
 */
function ignoreSwipe(event) {
    return event.path.slice(0, 5).some(x => x.classList?.contains('noswipe'));
}