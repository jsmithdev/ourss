/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/data/fire.js":
/*!**********************************!*\
  !*** ./src/modules/data/fire.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addToFire\": () => (/* binding */ addToFire),\n/* harmony export */   \"getRemoteDb\": () => (/* binding */ getRemoteDb),\n/* harmony export */   \"onAuthStateChanged\": () => (/* binding */ onAuthStateChanged),\n/* harmony export */   \"signIn\": () => (/* binding */ signIn)\n/* harmony export */ });\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"./node_modules/firebase/app/dist/index.esm.js\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/index.esm.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/index.esm.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/* spell-checker: disable */\n // https://firebase.google.com/docs/web/setup#available-libraries\n\n\n\nconst firebaseConfig = {\n  apiKey: \"AIzaSyA_5wbhpuRPYajtRwWrkIQT7bXPfrkPNwY\",\n  authDomain: \"ourrss.firebaseapp.com\",\n  projectId: \"ourrss\",\n  storageBucket: \"ourrss.appspot.com\",\n  messagingSenderId: \"769887060069\",\n  appId: \"1:769887060069:web:fb08ec45b2f65c0d40068c\"\n}; // Initialize Firebase\n\nconst fire = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);\nconst auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(fire);\nconst provider = new firebase_auth__WEBPACK_IMPORTED_MODULE_1__.GoogleAuthProvider();\nfunction onAuthStateChanged(cb) {\n  console.log('onAuthStateChanged');\n  auth.onAuthStateChanged(cb);\n}\nasync function signIn() {\n  try {\n    const result = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.signInWithPopup)(auth, provider); // This gives you a Google Access Token. You can use it to access the Google API.\n    // The signed-in user info.\n\n    const user = result.user;\n    return user;\n  } catch (error) {\n    // Handle Errors here.\n    const errorCode = error.code;\n    console.log(errorCode);\n    const errorMessage = error.message;\n    console.log(errorMessage); // The email of the user's account used.\n\n    const email = error.email;\n    console.log(email); // The AuthCredential type that was used.\n\n    const credential = firebase_auth__WEBPACK_IMPORTED_MODULE_1__.GoogleAuthProvider.credentialFromError(error);\n    console.log(credential);\n    return errorMessage;\n  }\n}\n/**\n * \n * @param {String} name name of the collection\n * @returns {Array} array of objects; each object is a document in the collection\n * props are set by spreading the data from the document w/ id from document\n */\n\nasync function getRemoteDb(name) {\n  console.log('Fire: getRemoteDb name: ', name); // move to firestore\n\n  const db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getFirestore)(fire);\n  const ref = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.collection)(db, name);\n  const q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.query)(ref);\n  const ar = await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getDocs)(q);\n  const results = [];\n  ar.forEach(d => {\n    results.push(_objectSpread({\n      id: d.id\n    }, d.data()));\n  });\n  return results;\n}\nasync function addToFire(url, id) {\n  // move to firestore\n  const db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getFirestore)(fire);\n  console.log('Fire: db ', db);\n  const ref = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.collection)(db, \"casts\");\n  const o = {\n    url,\n    id\n  };\n  console.log('INSERT');\n  console.log(o);\n  await (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.setDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.doc)(ref), o);\n  return o;\n}\n\n//# sourceURL=webpack://ourss/./src/modules/data/fire.js?");

/***/ }),

/***/ "./src/modules/data/idb.js":
/*!*********************************!*\
  !*** ./src/modules/data/idb.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"checkBaseExists\": () => (/* binding */ checkBaseExists),\n/* harmony export */   \"deleteItemById\": () => (/* binding */ deleteItemById),\n/* harmony export */   \"getChildItems\": () => (/* binding */ getChildItems),\n/* harmony export */   \"getItemById\": () => (/* binding */ getItemById),\n/* harmony export */   \"getItems\": () => (/* binding */ getItems),\n/* harmony export */   \"setItem\": () => (/* binding */ setItem)\n/* harmony export */ });\n/* harmony import */ var idb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! idb */ \"./node_modules/idb/build/esm/index.js\");\n\nconst DB_NAME = 'ourss';\nconst VERSION = 1;\nconst DB = (0,idb__WEBPACK_IMPORTED_MODULE_0__.openDB)(DB_NAME, VERSION, {\n  upgrade(db) {\n    if (!db.objectStoreNames.contains('casts')) {\n      // Create a store of objects\n      db.createObjectStore('casts', {\n        // The 'id' property of the object will be the key.\n        keyPath: 'id',\n        autoIncrement: false\n      });\n    }\n  }\n\n});\n/* export async function createStore(store) {\n\treturn openDB(DB_NAME, 1, {\n\t\tupgrade(db) {\n\t\t\t// Create a store of objects\n\t\t\tdb.createObjectStore(store, {\n\t\t\t\t// The 'id' property of the object will be the key.\n\t\t\t\tkeyPath: 'id',\n\t\t\t\tautoIncrement: true,\n\t\t\t});\n\t\t},\n\t});\n} */\n\n/**\n * Get item by id\n * @param {String} store \n * @param {String} uid \n * @returns {Promise<Object>} single item from store\n */\n\nasync function getItemById(uid, store = 'casts') {\n  return (await DB).get(store, uid);\n}\n/**\n * Delete item by id\n * @param {String} store \n * @param {String} uid \n * @returns {Promise<Object>} single item from store\n */\n\nasync function deleteItemById(store, uid) {\n  return (await DB).delete(store, uid);\n}\n/**\n * Set item (item/Object must have id/key)\n * @param {String} store name of store\n * @param {Object} item object to store\n * @returns {Promise<Object>} single item from store\n */\n\nasync function setItem(store, item) {\n  return (await DB).put(store, item);\n}\n/**\n * Get all items from the database store\n * @param {String} store name of database store to get all from\n * @returns {Promise} resolves  array of items\n */\n\nasync function getItems(store) {\n  return (await DB).getAll(store);\n}\n/**\n * Ensure the database store exists\n * @param {String} store name of database store to get all from\n * @returns {Promise} resolves  array of items\n */\n\nasync function checkBaseExists(store) {\n  return (await window.indexedDB.databases()).map(db => db.name).includes(store);\n} // @param {Boolean} create Optional; create the store if it doesn't exist\n\n/**\n * Get items of a record / episodes of a show\n * @param {String} id id of parent record\n * @param {String} store (optional) name of database store to get all from\n * @returns {Promise} resolves  array of items\n */\n\nasync function getChildItems(id) {\n  return (await getItemById(id)).items;\n}\n\n//# sourceURL=webpack://ourss/./src/modules/data/idb.js?");

/***/ }),

/***/ "./src/modules/data/parse.js":
/*!***********************************!*\
  !*** ./src/modules/data/parse.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"parse\": () => (/* binding */ parse),\n/* harmony export */   \"parseUrl\": () => (/* binding */ parseUrl),\n/* harmony export */   \"structure\": () => (/* binding */ structure)\n/* harmony export */ });\n/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-xml-parser */ \"./node_modules/fast-xml-parser/src/fxp.js\");\n/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_xml_parser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/modules/data/util.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n/**\n * parse url and return structured object\n * @param {String} url of feed to parse\n * @param {String} id of feed; Optional, if not provided, will be generated\n * @returns {Object} structured object else undefined\n */\n\nasync function parseUrl(url, id) {\n  try {\n    return parse(await (await fetch(url)).text(), url, id);\n  } catch (error) {\n    try {\n      return parse(await proxy(url), url, id);\n    } catch (er) {\n      console.info('Fallback failed. Can\\'t parse the url ', url);\n      console.warn(er);\n    }\n  }\n\n  return undefined;\n}\n/**\n * fallback function to parse feed via a proxy\n * @param {String} url of feed\n * @returns Promise resolves rss/xml text from feed\n */\n\nasync function proxy(url) {\n  console.log('TRYING AGAIN');\n  const response = await fetch('https://ourrss-proxy.herokuapp.com/' + url); //const response = await fetch('https://cors-anywhere.herokuapp.com/' + url);\n\n  return response.text();\n}\n/**\n * \n * @param {String} data rss/xml text from feed \n * @param {*} url of feed\n * @param {*} id of feed; Optional, if not provided, will be generated\n * @returns {Object} structured object else undefined\n */\n\n\nfunction parse(data, url, id = (0,_util__WEBPACK_IMPORTED_MODULE_1__.guid)()) {\n  const options = {\n    ignoreAttributes: false,\n    attributeNamePrefix: \"\"\n  };\n  const parser = new fast_xml_parser__WEBPACK_IMPORTED_MODULE_0__.XMLParser(options);\n  const result = parser.parse(data);\n  let channel = result.rss && result.rss.channel ? result.rss.channel : result.feed;\n  if (Array.isArray(channel)) channel = channel[0];\n  const rss = {\n    id,\n    feed: url,\n    title: channel.title || '',\n    description: channel.description || '',\n    link: channel.link && channel.link.href ? channel.link.href : channel.link,\n    image: parseImage(channel.image || channel[\"itunes:image\"]),\n    category: channel.category || [],\n    items: []\n  };\n  let items = channel.item || channel.entry;\n  if (items && !Array.isArray(items)) items = [items];\n  console.log(items[0]);\n\n  for (let i = 0; i < items.length; i++) {\n    const val = items[i];\n    let media = {};\n    let obj = {\n      id: val.guid && val.guid.$t ? val.guid.$t : val.id,\n      title: val.title && val.title.$text ? val.title.$text : val.title,\n      description: val.summary && val.summary.$text ? val.summary.$text : val.description,\n      link: val.link && val.link.href ? val.link.href : val.link,\n      author: val.author && val.author.name ? val.author.name : val['dc:creator'],\n      published: val.created ? Date.parse(val.created) : val.pubDate ? Date.parse(val.pubDate) : Date.now(),\n      created: val.updated ? Date.parse(val.updated) : val.pubDate ? Date.parse(val.pubDate) : val.created ? Date.parse(val.created) : Date.now(),\n      category: val.category || [],\n      content: val.content && val.content.$text ? val.content.$text : val['content:encoded'],\n      enclosures: val.enclosure ? Array.isArray(val.enclosure) ? val.enclosure : [val.enclosure] : []\n    };\n    ['content:encoded', 'podcast:transcript', 'itunes:summary', 'itunes:author', 'itunes:explicit', 'itunes:duration', 'itunes:season', 'itunes:episode', 'itunes:episodeType', 'itunes:image'].forEach(s => {\n      if (val[s]) obj[s.replace(':', '_')] = val[s];\n    });\n\n    if (val['media:thumbnail']) {\n      Object.assign(media, {\n        thumbnail: val['media:thumbnail']\n      });\n      obj.enclosures.push(val['media:thumbnail']);\n    }\n\n    if (val['media:content']) {\n      Object.assign(media, {\n        thumbnail: val['media:content']\n      });\n      obj.enclosures.push(val['media:content']);\n    }\n\n    if (val['media:group']) {\n      if (val['media:group']['media:title']) obj.title = val['media:group']['media:title'];\n      if (val['media:group']['media:description']) obj.description = val['media:group']['media:description'];\n      if (val['media:group']['media:thumbnail']) obj.enclosures.push(val['media:group']['media:thumbnail'].url);\n    }\n\n    Object.assign(obj, {\n      media\n    });\n    rss.items.push(obj);\n  }\n\n  return structure(rss);\n}\n/**\n * Structure a cast of data\n * @param {Object} cast Object\n * @returns {Object} structured feed Object\n *  */\n\nfunction structure(cast) {\n  //console.log('STRUCTURE B4')\n  //console.log(cast)\n  cast.id = cast.id || (0,_util__WEBPACK_IMPORTED_MODULE_1__.guid)();\n  cast.items = cast.items.map((item, index) => _objectSpread(_objectSpread({}, item), {}, {\n    id: `item${index}`,\n    date: new Date(item.created).toDateString(),\n    data: item.enclosures || item.media,\n    moddate: new Date().getTime(),\n    selected: false\n  })); //console.log('STRUCTURE AFTER')\n  //console.log(cast)\n\n  return cast;\n}\n/**\n * helper function to parse image url\n * @param {Array || Object} data array or object to search for image url \n * @returns {String} url of image\n */\n\nfunction parseImage(data) {\n  if (Array.isArray(data)) {\n    const o = data.reverse().find(x => x.url || x.href);\n    return o.url || o.href;\n  }\n\n  return data.url || data.href;\n}\n\n//# sourceURL=webpack://ourss/./src/modules/data/parse.js?");

/***/ }),

/***/ "./src/modules/data/util.js":
/*!**********************************!*\
  !*** ./src/modules/data/util.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"HOUR\": () => (/* binding */ HOUR),\n/* harmony export */   \"addCast\": () => (/* binding */ addCast),\n/* harmony export */   \"defaults\": () => (/* binding */ defaults),\n/* harmony export */   \"deleteCast\": () => (/* binding */ deleteCast),\n/* harmony export */   \"fireCasts\": () => (/* binding */ fireCasts),\n/* harmony export */   \"guid\": () => (/* binding */ guid),\n/* harmony export */   \"hasBeenHour\": () => (/* binding */ hasBeenHour),\n/* harmony export */   \"parseAndStructure\": () => (/* binding */ parseAndStructure),\n/* harmony export */   \"storeCast\": () => (/* binding */ storeCast),\n/* harmony export */   \"structure\": () => (/* binding */ structure),\n/* harmony export */   \"updateCast\": () => (/* binding */ updateCast)\n/* harmony export */ });\n/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse */ \"./src/modules/data/parse.js\");\n/* harmony import */ var _idb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./idb */ \"./src/modules/data/idb.js\");\n/* harmony import */ var _fire__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fire */ \"./src/modules/data/fire.js\");\n\n\n\nconst HOUR = 3600000; //60*60*1000\n\nfunction hasBeenHour(time) {\n  const now = new Date().getTime();\n  const diff = now - time;\n  return diff > HOUR;\n}\nconst defaults = ['https://rss.art19.com/never-not-funny', //'https://rss.art19.com/the-daily',\n'https://brianposehnsnerdpoker.libsyn.com/rss' //'https://feeds.feedburner.com/thebuglefeed',\n//'https://www.omnycontent.com/d/playlist/885ace83-027a-47ad-ad67-aca7002f1df8/d07cfb12-42fa-4a5e-b579-aca8005d018b/011c9cdc-63a0-4eaa-b377-aca8005d019e/podcast.rss',\n//'https://feeds.feedburner.com/dancarlin/history?format=xml',\n//'https://thedollop.libsyn.com/rss',\n//'https://lexfridman.com/feed/podcast',\n//'https://feeds.simplecast.com/Ao0C24M8',\n//'https://www.omnycontent.com/d/playlist/aaea4e69-af51-495e-afc9-a9760146922b/f7adbeff-8e96-4861-ab31-aa7a000e2532/62743333-5a2a-4fe0-81b8-aa7a000e253d/podcast.rss',\n];\n/**\n * Structure a feed of data\n * @param {Object} feed Object\n * @returns {Object} structured feed Object\n * { id date, data, moddate }\n *  */\n\nfunction structure(feed) {\n  feed.id = feed.id || guid();\n  feed.items = feed.items.map((item, index) => ({\n    id: `item-${index}`,\n    date: new Date(item.created).toDateString(),\n    data: item.enclosures || item.media,\n    moddate: new Date().getTime()\n  }));\n  return feed;\n}\nfunction storeCast(cast) {\n  (0,_idb__WEBPACK_IMPORTED_MODULE_1__.setItem)('casts', cast);\n  return cast;\n} //function storeCasts(casts) {\n//    return casts.map(storeCast)\n//}\n\nasync function addCast(url, id) {\n  const cast = await (0,_parse__WEBPACK_IMPORTED_MODULE_0__.parseUrl)(url, id);\n  (0,_fire__WEBPACK_IMPORTED_MODULE_2__.addToFire)(url, cast.id);\n  return storeCast(cast);\n}\nasync function updateCast(url, id) {\n  await deleteCast(id);\n  return storeCast(await (0,_parse__WEBPACK_IMPORTED_MODULE_0__.parseUrl)(url, id));\n}\nasync function deleteCast(id) {\n  return (0,_idb__WEBPACK_IMPORTED_MODULE_1__.deleteItemById)('casts', id);\n}\nasync function fireCasts() {\n  console.log('MODULES/DATA/UTIL: fireCasts CALLED');\n  /* const dbCasts = await initCasts('casts')\n  console.log('util: dbCasts')\n  console.log(dbCasts)\n  \n  return Promise.all(\n      dbCasts.map(async c => \n          storeCast( structure( (await parseUrl(c.feed, c.id) ))))\n  ); */\n}\n/**\n * \n * @param {Object} feed or cast Object { id, url }\n * @returns {Object} structured feed Object with data parsed, see items[]\n */\n\nasync function parseAndStructure(feed) {\n  console.log('MODULES/DATA/UTIL: parseAndStructure CALLED');\n  return structure(await (0,_parse__WEBPACK_IMPORTED_MODULE_0__.parseUrl)(feed.url, feed.id));\n}\nfunction guid() {\n  function s4() {\n    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);\n  }\n\n  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();\n}\n\n//# sourceURL=webpack://ourss/./src/modules/data/util.js?");

/***/ }),

/***/ "./src/modules/workers/data.js":
/*!*************************************!*\
  !*** ./src/modules/workers/data.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../data/util */ \"./src/modules/data/util.js\");\n/* harmony import */ var _data_parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../data/parse */ \"./src/modules/data/parse.js\");\n\n\nself.addEventListener('message', async event => {\n  console.log(event);\n  const {\n    type\n  } = event.data;\n  console.log(type);\n\n  if (type === 'parse') {\n    const {\n      url,\n      id,\n      store\n    } = event.data;\n    const data = await (0,_data_parse__WEBPACK_IMPORTED_MODULE_1__.parseUrl)(url, id);\n    self.postMessage({\n      data,\n      store,\n      whoami: 'worker-parser'\n    });\n  }\n});\n\n//# sourceURL=webpack://ourss/./src/modules/workers/data.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_fast-xml-parser_src_fxp_js-node_modules_firebase_app_dist_index_esm_js-n-e4c4b3"], () => (__webpack_require__("./src/modules/workers/data.js")))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			"src_modules_workers_data_js": 1
/******/ 		};
/******/ 		
/******/ 		// importScripts chunk loading
/******/ 		var installChunk = (data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			while(chunkIds.length)
/******/ 				installedChunks[chunkIds.pop()] = 1;
/******/ 			parentChunkLoadingFunction(data);
/******/ 		};
/******/ 		__webpack_require__.f.i = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					importScripts(__webpack_require__.p + __webpack_require__.u(chunkId));
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkourss"] = self["webpackChunkourss"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = installChunk;
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			return __webpack_require__.e("vendors-node_modules_fast-xml-parser_src_fxp_js-node_modules_firebase_app_dist_index_esm_js-n-e4c4b3").then(next);
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;