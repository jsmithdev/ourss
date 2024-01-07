import './imports.js';

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