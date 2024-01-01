
import {
    parseUrl,
} from './../data/parse';


self.addEventListener( 'message', async ({data}) => {

    const {type, store} = data;

    console.log('Worker Data: ', data);

    if(type === 'parse'){

        const toParse = await parseUrl(data);

        self.postMessage({
            data: toParse,
            store,
            whoami: 'worker-parser',
        });
    }
    else if(type === 'parse-array'){

        const {casts} = data;

        for (const newData of casts) {

            const data = await parseUrl(newData);

            self.postMessage({
                data,
                store,
                whoami: 'worker-parser',
            });
        }
    }
} );