
import {
    parseUrl,
} from './../data/parse';


self.addEventListener( 'message', async (event) => {

    const {type} = event.data;

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