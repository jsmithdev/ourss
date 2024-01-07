
import {
    parseUrl,
} from '../data/parse';


self.addEventListener( 'message', ({data}) => {

    const {type, store, actionId} = data;

    console.log('Worker Data: ', data);

    if(type === 'parse'){

        parseUrl(data)
        .then(d => self.postMessage({
            data: d,
            actionId,
            store,
            whoami: 'worker-parser',
        }));
    }
    else if(type === 'parse-array'){

        const {casts} = data;

        for (const newData of casts) {

            parseUrl(newData)
            .then(d => self.postMessage({
                data: d,
                store,
                whoami: 'worker-parser',
            }));
        }
    }
} );