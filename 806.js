(()=>{"use strict";var e,t,r={806:(e,t,r)=>{var n=r(932);(0,r(269).X3)("ourss",2,{upgrade(e){e.objectStoreNames.contains("casts")||e.createObjectStore("casts",{keyPath:"id",autoIncrement:!1}),e.objectStoreNames.contains("audio")||e.createObjectStore("audio",{keyPath:"id",autoIncrement:!1})}});var a=r(503),i=r(690);r(257);const o=(0,a.ZF)({apiKey:"AIzaSyA_5wbhpuRPYajtRwWrkIQT7bXPfrkPNwY",authDomain:"ourrss.firebaseapp.com",projectId:"ourrss",storageBucket:"ourrss.appspot.com",messagingSenderId:"769887060069",appId:"1:769887060069:web:fb08ec45b2f65c0d40068c"});function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){u(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}(0,i.v0)(o),new i.hJ;function l(e,t,r=function(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()}()){const a=new n.XMLParser({ignoreAttributes:!1,attributeNamePrefix:""}).parse(e);let i=a.rss&&a.rss.channel?a.rss.channel:a.feed;Array.isArray(i)&&(i=i[0]);const o={id:r,feed:t,title:i.title||"",description:i.description||"",link:i.link&&i.link.href?i.link.href:i.link,image:p(i.image||i["itunes:image"]),category:i.category||[],items:[]};let s=i.item||i.entry;s&&!Array.isArray(s)&&(s=[s]);for(let e=0;e<s.length;e++){const t=s[e],n={},a=t.summary?.$text?t.summary.$text:t.description,i={get id(){return this.src},get src(){return this.enclosures.find((e=>e.url))?.url},parentid:r,title:t.title&&t.title.$text?t.title.$text:t.title,description:a,link:t.link&&t.link.href?t.link.href:t.link,author:t.author&&t.author.name?t.author.name:t["dc:creator"],published:t.created?Date.parse(t.created):t.pubDate?Date.parse(t.pubDate):Date.now(),created:t.updated?Date.parse(t.updated):t.pubDate?Date.parse(t.pubDate):t.created?Date.parse(t.created):Date.now(),category:t.category||[],content:t.content&&t.content.$text?t.content.$text:t["content:encoded"],enclosures:t.enclosure?Array.isArray(t.enclosure)?t.enclosure:[t.enclosure]:[],get date(){return new Date(this.created).toDateString()},moddate:(new Date).getTime(),selected:!1};["content:encoded","podcast:transcript","itunes:summary","itunes:author","itunes:explicit","itunes:duration","itunes:season","itunes:episode","itunes:episodeType","itunes:image"].forEach((e=>{t[e]&&(i[e.replace(":","_")]=t[e])})),t["media:thumbnail"]&&(Object.assign(n,{thumbnail:t["media:thumbnail"]}),i.enclosures.push(t["media:thumbnail"])),t["media:content"]&&(Object.assign(n,{thumbnail:t["media:content"]}),i.enclosures.push(t["media:content"])),t["media:group"]&&(t["media:group"]["media:title"]&&(i.title=t["media:group"]["media:title"]),t["media:group"]["media:description"]&&(i.description=t["media:group"]["media:description"]),t["media:group"]["media:thumbnail"]&&i.enclosures.push(t["media:group"]["media:thumbnail"].url)),o.items.push(c(c({},n),i))}return o}function p(e){if(Array.isArray(e)){const t=e.reverse().find((e=>e.url||e.href));return t.url||t.href}return e.url||e.href}self.addEventListener("message",(async e=>{const{type:t,url:r,id:n,store:a}=e.data;if("parse"===t){const e=await async function(e,t){try{return console.log("Parser: Fetching feed"),l(await(await fetch(e)).text(),e,t)}catch(r){console.warn(r),console.log("Parser: Feed failed, trying again...");try{return l(await async function(e){return(await fetch(`https://bg43qynlm5msjalfb3kd6eisti0mdils.lambda-url.us-east-1.on.aws?url=${encodeURIComponent(e)}`)).text()}(e),e,t)}catch(t){console.warn(t),console.info("Fallback failed. Can't parse the url ",e)}}}(r,n);self.postMessage({data:e,store:a,whoami:"worker-parser"})}}))}},n={};function a(e){var t=n[e];if(void 0!==t)return t.exports;var i=n[e]={exports:{}};return r[e](i,i.exports,a),i.exports}a.m=r,a.x=()=>{var e=a.O(void 0,[751],(()=>a(806)));return a.O(e)},e=[],a.O=(t,r,n,i)=>{if(!r){var o=1/0;for(l=0;l<e.length;l++){for(var[r,n,i]=e[l],s=!0,c=0;c<r.length;c++)(!1&i||o>=i)&&Object.keys(a.O).every((e=>a.O[e](r[c])))?r.splice(c--,1):(s=!1,i<o&&(o=i));if(s){e.splice(l--,1);var u=n();void 0!==u&&(t=u)}}return t}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[r,n,i]},a.d=(e,t)=>{for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.f={},a.e=e=>Promise.all(Object.keys(a.f).reduce(((t,r)=>(a.f[r](e,t),t)),[])),a.u=e=>e+".js",a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;a.g.importScripts&&(e=a.g.location+"");var t=a.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),a.p=e})(),(()=>{var e={806:1};a.f.i=(t,r)=>{e[t]||importScripts(a.p+a.u(t))};var t=self.webpackChunkourss=self.webpackChunkourss||[],r=t.push.bind(t);t.push=t=>{var[n,i,o]=t;for(var s in i)a.o(i,s)&&(a.m[s]=i[s]);for(o&&o(a);n.length;)e[n.pop()]=1;r(t)}})(),t=a.x,a.x=()=>a.e(751).then(t),a.x()})();