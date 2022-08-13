import {XMLParser} from 'fast-xml-parser';
import { guid } from './util';

/**
 * parse url and return structured object
 * @param {String} url of feed to parse
 * @param {String} id of feed; Optional, if not provided, will be generated
 * @returns {Object} structured object else undefined
 */
export async function parseUrl(url, id) {
    try {
        console.log('Parser: Fetching feed')
        return parse(await (await fetch(url)).text(), url, id);
    } catch (error) {
        console.warn(error)
        console.log('Parser: Feed failed, trying again...')
        try {
            return parse(await proxy(url), url, id);
        } catch (er) {
            console.warn(er)
            console.info('Fallback failed. Can\'t parse the url ', url)
        }
    }
    
    return undefined;
}

/**
 * fallback function to parse feed via a proxy
 * @param {String} url of feed
 * @returns Promise resolves rss/xml text from feed
 */
async function proxy(url) {
    const response = await fetch('https://ourrss-proxy.herokuapp.com/' + url);
    return response.text();
}

/**
 * 
 * @param {String} data rss/xml text from feed 
 * @param {String} url of feed
 * @param {String} id of feed; Optional, if not provided, will be generated
 * @returns {Object} structured object else undefined
 */
export function parse (data, url, id = guid()) {

    const options = {
        ignoreAttributes : false,
        attributeNamePrefix : ""
    };
    
    const parser = new XMLParser(options);
    const result = parser.parse(data);

    let channel = result.rss && result.rss.channel ? result.rss.channel : result.feed;
    if (Array.isArray(channel)) channel = channel[0];

    const rss = {
        id,
        feed: url,
        title: channel.title || '',
        description: channel.description || '',
        link: channel.link && channel.link.href ? channel.link.href : channel.link,
        image: parseImage(channel.image || channel["itunes:image"] ),
        category: channel.category || [],
        items: []
    };

    let items = channel.item || channel.entry;
    if (items && !Array.isArray(items)) items = [items];

    for (let i = 0; i < items.length; i++) {
        const val = items[i];
        const media = {};
        
        const desc = val.summary?.$text ? val.summary.$text : val.description

        const obj = {
            get id(){ return this.src },
            get src(){ return this.enclosures.find(x => x.url)?.url },
            title: val.title && val.title.$text ? val.title.$text : val.title,
            description: desc,
            link: val.link && val.link.href ? val.link.href : val.link,
            author: val.author && val.author.name ? val.author.name : val['dc:creator'],
            published: val.created ? Date.parse(val.created) : val.pubDate ? Date.parse(val.pubDate) : Date.now(),
            created: val.updated ? Date.parse(val.updated) : val.pubDate ? Date.parse(val.pubDate) : val.created ? Date.parse(val.created) : Date.now(),
            category: val.category || [],
            content: val.content && val.content.$text ? val.content.$text : val['content:encoded'],
            enclosures: val.enclosure ? Array.isArray(val.enclosure) ? val.enclosure : [val.enclosure] : [],

            get date(){ return new Date(this.created).toDateString() },
            moddate: new Date().getTime(),
            selected: false,
        };

        ['content:encoded', 'podcast:transcript', 'itunes:summary', 'itunes:author', 'itunes:explicit', 'itunes:duration', 'itunes:season', 'itunes:episode', 'itunes:episodeType', 'itunes:image']
            .forEach(s => { if (val[s]) obj[s.replace(':', '_')] = val[s] });

        if (val['media:thumbnail']) {
            Object.assign(media, { thumbnail: val['media:thumbnail'] });
            obj.enclosures.push(val['media:thumbnail']);
        }

        if (val['media:content']) {
            Object.assign(media, { thumbnail: val['media:content'] });
            obj.enclosures.push(val['media:content']);
        }

        if (val['media:group']) {

            if (val['media:group']['media:title'])
                obj.title = val['media:group']['media:title'];

            if (val['media:group']['media:description'])
                obj.description = val['media:group']['media:description'];

            if (val['media:group']['media:thumbnail'])
                obj.enclosures.push(val['media:group']['media:thumbnail'].url);

        }

        rss.items.push({ ...media, ...obj });
    }


    return rss;
}

/**
 * helper function to parse image url
 * @param {Array || Object} data array or object to search for image url 
 * @returns {String} url of image
 */
function parseImage(data){
    if(Array.isArray(data)){
        const o = data.reverse().find(x => x.url || x.href)
        return o.url || o.href;
    }
    return data.url || data.href;
}