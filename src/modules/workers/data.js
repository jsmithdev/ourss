
import {
    parseUrl,
} from './../data/parse';


self.addEventListener( 'message', async (event) => {

    const {type, url, id, store} = event.data;

    if(type === 'parse'){

        const data = await parseUrl(url, id);

        self.postMessage({
            data,
            store,
            whoami: 'worker-parser',
        });
    }
} );