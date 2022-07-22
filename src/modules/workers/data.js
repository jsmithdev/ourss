
import {
    structure,
} from './../data/util';

import {
    parseUrl,
} from './../data/parse';


self.addEventListener( 'message', async (event) => {
    console.log(event)

    const {type} = event.data;
    console.log(type)

    if(type === 'parse'){
        const {url, id, store} = event.data;
        const data = await parseUrl(url, id);
        self.postMessage({
            data,
            store,
            whoami: 'worker-parser',
        });
    }
} );