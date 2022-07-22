(()=>{"use strict";var e,t,r={806:(e,t,r)=>{var a=r(932);function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t,r=d()){const n=new a.XMLParser({ignoreAttributes:!1,attributeNamePrefix:""}).parse(e);let o=n.rss&&n.rss.channel?n.rss.channel:n.feed;Array.isArray(o)&&(o=o[0]);const s={id:r,feed:t,title:o.title||"",description:o.description||"",link:o.link&&o.link.href?o.link.href:o.link,image:c(o.image||o["itunes:image"]),category:o.category||[],items:[]};let u=o.item||o.entry;u&&!Array.isArray(u)&&(u=[u]),console.log(u[0]);for(let e=0;e<u.length;e++){const t=u[e];let r={},a={id:t.guid&&t.guid.$t?t.guid.$t:t.id,title:t.title&&t.title.$text?t.title.$text:t.title,description:t.summary&&t.summary.$text?t.summary.$text:t.description,link:t.link&&t.link.href?t.link.href:t.link,author:t.author&&t.author.name?t.author.name:t["dc:creator"],published:t.created?Date.parse(t.created):t.pubDate?Date.parse(t.pubDate):Date.now(),created:t.updated?Date.parse(t.updated):t.pubDate?Date.parse(t.pubDate):t.created?Date.parse(t.created):Date.now(),category:t.category||[],content:t.content&&t.content.$text?t.content.$text:t["content:encoded"],enclosures:t.enclosure?Array.isArray(t.enclosure)?t.enclosure:[t.enclosure]:[]};["content:encoded","podcast:transcript","itunes:summary","itunes:author","itunes:explicit","itunes:duration","itunes:season","itunes:episode","itunes:episodeType","itunes:image"].forEach((e=>{t[e]&&(a[e.replace(":","_")]=t[e])})),t["media:thumbnail"]&&(Object.assign(r,{thumbnail:t["media:thumbnail"]}),a.enclosures.push(t["media:thumbnail"])),t["media:content"]&&(Object.assign(r,{thumbnail:t["media:content"]}),a.enclosures.push(t["media:content"])),t["media:group"]&&(t["media:group"]["media:title"]&&(a.title=t["media:group"]["media:title"]),t["media:group"]["media:description"]&&(a.description=t["media:group"]["media:description"]),t["media:group"]["media:thumbnail"]&&a.enclosures.push(t["media:group"]["media:thumbnail"].url)),Object.assign(a,{media:r}),s.items.push(a)}return(p=s).id=p.id||d(),p.items=p.items.map(((e,t)=>i(i({},e),{},{id:`item${t}`,date:new Date(e.created).toDateString(),data:e.enclosures||e.media,moddate:(new Date).getTime(),selected:!1}))),p;var p}function c(e){if(Array.isArray(e)){const t=e.reverse().find((e=>e.url||e.href));return t.url||t.href}return e.url||e.href}(0,r(269).X3)("ourss",1,{upgrade(e){e.objectStoreNames.contains("casts")||e.createObjectStore("casts",{keyPath:"id",autoIncrement:!1})}});var u=r(503),p=r(690);r(257);const l=(0,u.ZF)({apiKey:"AIzaSyA_5wbhpuRPYajtRwWrkIQT7bXPfrkPNwY",authDomain:"ourrss.firebaseapp.com",projectId:"ourrss",storageBucket:"ourrss.appspot.com",messagingSenderId:"769887060069",appId:"1:769887060069:web:fb08ec45b2f65c0d40068c"});function d(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()}(0,p.v0)(l),new p.hJ,self.addEventListener("message",(async e=>{console.log(e);const{type:t}=e.data;if(console.log(t),"parse"===t){const{url:t,id:r,store:a}=e.data,n=await async function(e,t){try{return s(await(await fetch(e)).text(),e,t)}catch(r){try{return s(await async function(e){return console.log("TRYING AGAIN"),(await fetch("https://ourrss-proxy.herokuapp.com/"+e)).text()}(e),e,t)}catch(t){console.info("Fallback failed. Can't parse the url ",e),console.warn(t)}}}(t,r);self.postMessage({data:n,store:a,whoami:"worker-parser"})}}))}},a={};function n(e){var t=a[e];if(void 0!==t)return t.exports;var i=a[e]={exports:{}};return r[e](i,i.exports,n),i.exports}n.m=r,n.x=()=>{var e=n.O(void 0,[751],(()=>n(806)));return n.O(e)},e=[],n.O=(t,r,a,i)=>{if(!r){var o=1/0;for(p=0;p<e.length;p++){for(var[r,a,i]=e[p],s=!0,c=0;c<r.length;c++)(!1&i||o>=i)&&Object.keys(n.O).every((e=>n.O[e](r[c])))?r.splice(c--,1):(s=!1,i<o&&(o=i));if(s){e.splice(p--,1);var u=a();void 0!==u&&(t=u)}}return t}i=i||0;for(var p=e.length;p>0&&e[p-1][2]>i;p--)e[p]=e[p-1];e[p]=[r,a,i]},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce(((t,r)=>(n.f[r](e,t),t)),[])),n.u=e=>e+".js",n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),(()=>{var e={806:1};n.f.i=(t,r)=>{e[t]||importScripts(n.p+n.u(t))};var t=self.webpackChunkourss=self.webpackChunkourss||[],r=t.push.bind(t);t.push=t=>{var[a,i,o]=t;for(var s in i)n.o(i,s)&&(n.m[s]=i[s]);for(o&&o(n);a.length;)e[a.pop()]=1;r(t)}})(),t=n.x,n.x=()=>n.e(751).then(t),n.x()})();