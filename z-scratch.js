const fetch = require('node-fetch');

const testUrl = 'https://www.patreon.com/rss/nerdpoker?auth=1a4mPdGsvu2JRekulAPn8_0wz1JIpaq_';

//const proxy = 'http://localhost:4242/api'
const proxy = 'https://bg43qynlm5msjalfb3kd6eisti0mdils.lambda-url.us-east-1.on.aws'

//getTest(testUrl);
//postTest(testUrl);

async function getTest(url){

    const endpoint = `${proxy}?url=${url}`;

    const response = await fetch(endpoint);
    
    const data = await response.text();
    console.log(data);
}

async function postTest(url){
    const response = await fetch(proxy, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            url,
        }),
    });
    
    const data = await response.text();
    console.log(data);
}