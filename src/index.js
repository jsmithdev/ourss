import { createElement } from 'lwc';
import OurssApp from 'ourss/app';

const app = createElement('ourss-app', { is: OurssApp });
// eslint-disable-next-line @lwc/lwc/no-document-query
document.querySelector('#main').appendChild(app);
