(()=>{"use strict";var e,t,r={40:(e,t,r)=>{var n=r(932);(0,r(269).X3)("ourss",2,{upgrade(e){e.objectStoreNames.contains("casts")||e.createObjectStore("casts",{keyPath:"id",autoIncrement:!1}),e.objectStoreNames.contains("audio")||e.createObjectStore("audio",{keyPath:"id",autoIncrement:!1}),e.objectStoreNames.contains("images")||e.createObjectStore("images",{keyPath:"id",autoIncrement:!1})}});const a="https://zqp716s5y4.execute-api.us-east-1.amazonaws.com/default/RustProxy?url=";function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}async function c(e){console.log("Parser: ",e);const{id:t}=e,r=e.url?e.url:e.feed;try{return console.log("Parser: Fetching feed ",r),u(await(await fetch(r)).text(),r,t)}catch(e){console.warn(e),console.log("Parser: Feed failed, trying again...");try{return u(await async function(e){return(await fetch(a+encodeURIComponent(e))).text()}(r),r,t)}catch(e){console.warn(e),console.info("Fallback failed. Can't parse the url ",r)}}}function u(e,t,r=function(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()}()){const a=new n.XMLParser({ignoreAttributes:!1,attributeNamePrefix:""}).parse(e);let o=a.rss&&a.rss.channel?a.rss.channel:a.feed;Array.isArray(o)&&(o=o[0]);const s={id:r,feed:t,title:o.title||"",description:o.description||"",link:o.link&&o.link.href?o.link.href:o.link,image:l(o.image||o["itunes:image"]),category:o.category||[],items:[]};let c=o.item||o.entry;c&&!Array.isArray(c)&&(c=[c]);for(let e=0;e<c.length;e++){const t=c[e],n={},a=t.summary?.$text?t.summary.$text:t.description,o={get id(){return this.src},get src(){return this.enclosures.find((e=>e.url))?.url},parentid:r,title:t.title&&t.title.$text?t.title.$text:t.title,description:a,link:t.link&&t.link.href?t.link.href:t.link,author:t.author&&t.author.name?t.author.name:t["dc:creator"],published:t.created?Date.parse(t.created):t.pubDate?Date.parse(t.pubDate):Date.now(),created:t.updated?Date.parse(t.updated):t.pubDate?Date.parse(t.pubDate):t.created?Date.parse(t.created):Date.now(),category:t.category||[],content:t.content&&t.content.$text?t.content.$text:t["content:encoded"],enclosures:t.enclosure?Array.isArray(t.enclosure)?t.enclosure:[t.enclosure]:[],get date(){return new Date(this.created).toDateString()},moddate:(new Date).getTime(),selected:!1};["content:encoded","podcast:transcript","itunes:summary","itunes:author","itunes:explicit","itunes:duration","itunes:season","itunes:episode","itunes:episodeType","itunes:image"].forEach((e=>{t[e]&&(o[e.replace(":","_")]=t[e])})),t["media:thumbnail"]&&(Object.assign(n,{thumbnail:t["media:thumbnail"]}),o.enclosures.push(t["media:thumbnail"])),t["media:content"]&&(Object.assign(n,{thumbnail:t["media:content"]}),o.enclosures.push(t["media:content"])),t["media:group"]&&(t["media:group"]["media:title"]&&(o.title=t["media:group"]["media:title"]),t["media:group"]["media:description"]&&(o.description=t["media:group"]["media:description"]),t["media:group"]["media:thumbnail"]&&o.enclosures.push(t["media:group"]["media:thumbnail"].url)),s.items.push(i(i({},n),o))}return s}function l(e){if(Array.isArray(e)){const t=e.reverse().find((e=>e.url||e.href));return t.url||t.href}return e.url||e.href}console.log(a),self.addEventListener("message",(async({data:e})=>{const{type:t,store:r}=e;if(console.log("Worker Data: ",e),"parse"===t){const t=await c(e);self.postMessage({data:t,store:r,whoami:"worker-parser"})}else if("parse-array"===t){const{casts:t}=e;for(const e of t){const t=await c(e);self.postMessage({data:t,store:r,whoami:"worker-parser"})}}}))}},n={};function a(e){var t=n[e];if(void 0!==t)return t.exports;var o=n[e]={exports:{}};return r[e](o,o.exports,a),o.exports}a.m=r,a.x=()=>{var e=a.O(void 0,[870],(()=>a(40)));return a.O(e)},e=[],a.O=(t,r,n,o)=>{if(!r){var i=1/0;for(l=0;l<e.length;l++){for(var[r,n,o]=e[l],s=!0,c=0;c<r.length;c++)(!1&o||i>=o)&&Object.keys(a.O).every((e=>a.O[e](r[c])))?r.splice(c--,1):(s=!1,o<i&&(i=o));if(s){e.splice(l--,1);var u=n();void 0!==u&&(t=u)}}return t}o=o||0;for(var l=e.length;l>0&&e[l-1][2]>o;l--)e[l]=e[l-1];e[l]=[r,n,o]},a.d=(e,t)=>{for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},a.f={},a.e=e=>Promise.all(Object.keys(a.f).reduce(((t,r)=>(a.f[r](e,t),t)),[])),a.u=e=>e+".js",a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;a.g.importScripts&&(e=a.g.location+"");var t=a.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),a.p=e})(),(()=>{var e={40:1};a.f.i=(t,r)=>{e[t]||importScripts(a.p+a.u(t))};var t=self.webpackChunkourss=self.webpackChunkourss||[],r=t.push.bind(t);t.push=t=>{var[n,o,i]=t;for(var s in o)a.o(o,s)&&(a.m[s]=o[s]);for(i&&i(a);n.length;)e[n.pop()]=1;r(t)}})(),t=a.x,a.x=()=>a.e(870).then(t),a.x()})();