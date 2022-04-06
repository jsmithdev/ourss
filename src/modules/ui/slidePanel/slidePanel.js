/* eslint-disable @lwc/lwc/no-api-reassignments */
import { api, LightningElement } from 'lwc';

const slidePanelOpen = new CustomEvent("slideopen", {
    bubbles: true
});

const slidePanelClose = new CustomEvent("slideclose", {
    bubbles: true
});

export default class SlidePanel extends LightningElement {

    @api 
    get transitionDuration() {
        return this._transitionDuration || '300';
    }
    set transitionDuration(value) {
        this._transitionDuration = value;
        this.updateTransitionDuration(value);
    }
    
    @api 
    get position () {
        return this._position;
    }
    set position(value) {

        this.removeAnchorClass(this._position);
        this.setAnchorClass(value);

        this._position = value;
    }

    @api 
    get open(){
        return this._open || false;
    }
    set open(value){
        this._open = value;
        if(this._open) {
            this.showRoot();
            this.showBackdrop();
            this.showPanel();
            this.attachEventListeners();

            this.dispatchEvent(slidePanelOpen);
        }
        else {
            this.hideRoot();
            this.hideBackdrop();
            this.hidePanel();

            this.dispatchEvent(slidePanelClose);

            this.template.removeEventListener("keydown", this._handleKeyDown.bind(this));
        }
    }


    timeoutId = 0;

    connectedCallback() {

        this.updateTransitionDuration(this.transitionDuration);

        this.attachEventListeners();

        if (this.position) {
            this.setAnchorClass(this.position);
        } else {
            this.setAnchorClass()
        }

        if (this.transitionDuration) {
            this.updateTransitionDuration(this.transitionDuration)
        }

        if (!this.open) {
            this.hideRoot();
            this.hideBackdrop();
            this.hidePanel();
        }
    }

    getRoot() {
        return this.template.querySelector(".slide-panel");
    }

    getBackdrop() {
        return this.template.querySelector(".slide-panel__backdrop");
    }

    hideBackdrop() {
        const backdrop = this.getBackdrop();
        if (backdrop) {
            backdrop.style.visibility = "hidden";
        }
    }

    showBackdrop() {
        const backdrop = this.getBackdrop();
        if (backdrop) {
            backdrop.style.opacity = "1";
            backdrop.style.removeProperty("visibility");
        }
    }

    hideRoot() {
        const root = this.getRoot();
        root?.setAttribute("aria-hidden", "true");
        if (root) {
            clearTimeout(this.timeoutId);
            this.timeoutId = window.setTimeout(() => {
                root.style.visibility = "hidden";
            // eslint-disable-next-line radix
            }, parseInt(this.transitionDuration))
        }
    }

    showRoot() {
        const root = this.getRoot();
        root?.setAttribute("aria-hidden", "false");
        if (root) {
            root.style.removeProperty("visibility");
        }
    }

    hidePanel() {
        const panel = this.getPanel();
        if (panel) {
            panel.style.removeProperty("transform");
            clearTimeout(this.timeoutId);
            this.timeoutId = window.setTimeout(() => {
                panel.style.visibility = "hidden";
            // eslint-disable-next-line radix
            }, parseInt(this.transitionDuration));
        }
    }


    getAnchorClass(position) {
        let className = "slide-panel__panel";
        switch (position) {
            case "left":
                className += "--left";
                break;
            case "right":
                className += "--right";
                break;
            case "top":
                className += "--top";
                break;
            case "bottom":
                className += "--bottom";
                break;
            default:
                className += "--left";
        }

        return className;
    }

    removeAnchorClass(position) {
        const className = this.getAnchorClass(position);
        const panel = this.getPanel();
        panel?.classList.remove(className);
    }

    setAnchorClass(position = "left") {
        const className = this.getAnchorClass(position);
        const panel = this.getPanel();
        panel?.classList.add(className);
    }


    get handleClose() {
        return this.getAttribute("handleClose")
    }

    set handleClose(value) {
        this.handleClose = value;
    }

    attachEventListeners() {
        const backdrop = this.getBackdrop();
        backdrop?.addEventListener("click", () => {
            this._handleBackdropClick();
        })

        this.template.addEventListener("keydown", this._handleKeyDown.bind(this));
    }

    getPanel() {
        return this.template.querySelector('.slide-panel__panel');
    }

    showPanel() {
        const panel = this.getPanel();
        if (panel) {
            panel.style.removeProperty("visibility");
        }
    }

    updateTransitionDuration(transitionDuration) {

        // todo make this a class / use css
        const styleSheet = 'todo'
        const style = this.template.querySelector("style");
        if (style) {
            style.textContent = `
            :host {
              transition-duration: ${transitionDuration}ms;
            }
            ${styleSheet}
          `
        }

        const backdrop = this.getBackdrop();
        if (backdrop) {
            backdrop.style.transitionDuration = this.transitionDuration + "ms";
        }

        const panel = this.getPanel();
        if (panel) {
            panel.style.transitionDuration = this.transitionDuration + "ms";
        }
    }

    _handleKeyDown(event) {
        event.preventDefault();
        if (event.key === "Escape") {
            this._open = false;
        }
    }

    _handleBackdropClick() {
        this._open = false;
    }
}
