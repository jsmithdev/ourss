import { createElement } from 'lwc';
import OurssApp from 'ourss/app';

const app = createElement('ourss-app', { is: OurssApp });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);

const mode = (() => {
    try {
        // eslint-disable-next-line no-undef
        return `${__MODE__}`;
    } catch (e) {
        return 'dev';
    }
})();

console.log('Mode: ', mode)

if (mode === 'production') {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js');
        });
    }
}