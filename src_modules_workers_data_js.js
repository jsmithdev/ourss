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

/***/ "./src/modules/data/idb.js":
/*!*********************************!*\
  !*** ./src/modules/data/idb.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"checkBaseExists\": () => (/* binding */ checkBaseExists),\n/* harmony export */   \"clearStore\": () => (/* binding */ clearStore),\n/* harmony export */   \"deleteItemById\": () => (/* binding */ deleteItemById),\n/* harmony export */   \"getItemById\": () => (/* binding */ getItemById),\n/* harmony export */   \"getItems\": () => (/* binding */ getItems),\n/* harmony export */   \"getItemsByKeys\": () => (/* binding */ getItemsByKeys),\n/* harmony export */   \"getKeys\": () => (/* binding */ getKeys),\n/* harmony export */   \"setItem\": () => (/* binding */ setItem)\n/* harmony export */ });\n/* harmony import */ var idb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! idb */ \"./node_modules/idb/build/index.js\");\n\nconst DB_NAME = 'ourss';\nconst VERSION = 2;\nconst DB = (0,idb__WEBPACK_IMPORTED_MODULE_0__.openDB)(DB_NAME, VERSION, {\n  upgrade(db) {\n    if (!db.objectStoreNames.contains('casts')) {\n      // Create a store of objects\n      db.createObjectStore('casts', {\n        // The 'id' property of the object will be the key.\n        keyPath: 'id',\n        autoIncrement: false\n      });\n    }\n\n    if (!db.objectStoreNames.contains('audio')) {\n      // Create a store of objects\n      db.createObjectStore('audio', {\n        // The 'id' property of the object will be the key.\n        keyPath: 'id',\n        autoIncrement: false\n      });\n    }\n\n    if (!db.objectStoreNames.contains('images')) {\n      // Create a store of objects\n      db.createObjectStore('images', {\n        // The 'id' property of the object will be the key.\n        keyPath: 'id',\n        autoIncrement: false\n      });\n    }\n  }\n\n});\n/* export async function createStore(store) {\n\treturn openDB(DB_NAME, 1, {\n\t\tupgrade(db) {\n\t\t\t// Create a store of objects\n\t\t\tdb.createObjectStore(store, {\n\t\t\t\t// The 'id' property of the object will be the key.\n\t\t\t\tkeyPath: 'id',\n\t\t\t\tautoIncrement: true,\n\t\t\t});\n\t\t},\n\t});\n} */\n\n/**\n * Get item by id\n * @param {String} store \n * @param {String} uid \n * @returns {Promise<Object>} single item from store\n */\n\nasync function getItemById(store, uid) {\n  return (await DB).get(store, uid);\n}\n/**\n * Delete item by id\n * @param {String} store \n * @param {String} uid \n * @returns {Promise<Object>} single item from store\n */\n\nasync function deleteItemById(store, uid) {\n  return (await DB).delete(store, uid);\n}\n/**\n * Set item (item/Object must have id/key)\n * @param {String} store name of store\n * @param {Object} item object to store\n * @returns {Promise<Object>} single item from store\n */\n\nasync function setItem(store, item) {\n  return (await DB).put(store, item);\n}\n/**\n * Get all items from the database store\n * @param {String} store name of database store to get all from\n * @param {String} orderBy field to order by\n * @returns {Promise} resolves  array of items\n */\n\nasync function getItems(store, orderBy) {\n  if (orderBy) return (await DB).getAllFromIndex(store, orderBy);\n  return (await DB).getAll(store);\n}\n/**\n * Get all keys/ids from a database store\n * @param {String} store name of database store to get all keys from\n * @returns {Promise} resolves  array of keys\n */\n\nasync function getKeys(store) {\n  return (await DB).getAllKeys(store);\n}\n/**\n * Ensure the database store exists\n * @param {String} store name of database store to get all from\n * @returns {Promise} resolves  array of items\n */\n\nasync function checkBaseExists(store) {\n  return (await window.indexedDB.databases()).map(db => db.name).includes(store);\n} // @param {Boolean} create Optional; create the store if it doesn't exist\n\n/**\n * Get array of items via keys\n * @param {String} store name of database store to get all from\n * @param {Array} keys array of keys to match\n * @returns {Promise} resolves an array of items\n */\n\nasync function getItemsByKeys(store, keys) {\n  let cursor = await (await DB).transaction(store).store.openCursor();\n  let items = [];\n\n  while (cursor) {\n    if (keys.includes(cursor.key)) {\n      items = [...items, cursor.value];\n    }\n\n    cursor = await cursor.continue();\n  }\n\n  return items;\n}\n/**\n * Clear a store's data\n * @param {String} store name of database store to get all from\n * @returns {Promise} resolves  array of items\n */\n\nasync function clearStore(store) {\n  return (await DB).clear(store);\n}\n\n//# sourceURL=webpack://ourss/./src/modules/data/idb.js?");

/***/ }),

/***/ "./src/modules/data/parse.js":
/*!***********************************!*\
  !*** ./src/modules/data/parse.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"baseProxyUri\": () => (/* binding */ baseProxyUri),\n/* harmony export */   \"parse\": () => (/* binding */ parse),\n/* harmony export */   \"parseUrl\": () => (/* binding */ parseUrl)\n/* harmony export */ });\n/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fast-xml-parser */ \"./node_modules/fast-xml-parser/src/fxp.js\");\n/* harmony import */ var fast_xml_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_xml_parser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/modules/data/util.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nconst baseProxyLoc = 'lambda-url.us-east-1.on.aws';\nconst baseProxyUri = `${_util__WEBPACK_IMPORTED_MODULE_1__.baseProxyName}.${baseProxyLoc}?url=`;\n/**\n * parse url and return structured object\n * @param {String} url of feed to parse\n * @param {String} id of feed; Optional, if not provided, will be generated\n * @returns {Object} structured object else undefined\n */\n\nasync function parseUrl(url, id) {\n  try {\n    console.log('Parser: Fetching feed');\n    return parse(await (await fetch(url)).text(), url, id);\n  } catch (error) {\n    console.warn(error);\n    console.log('Parser: Feed failed, trying again...');\n\n    try {\n      return parse(await proxy(url), url, id);\n    } catch (er) {\n      console.warn(er);\n      console.info('Fallback failed. Can\\'t parse the url ', url);\n    }\n  }\n\n  return undefined;\n}\n/**\n * fallback function to parse feed via a proxy\n * @param {String} url of feed\n * @returns Promise resolves rss/xml text from feed\n */\n\nasync function proxy(url) {\n  const response = await fetch('https://' + baseProxyUri + encodeURIComponent(url));\n  return response.text();\n}\n/**\n * \n * @param {String} data rss/xml text from feed \n * @param {String} url of feed\n * @param {String} id of feed; Optional, if not provided, will be generated\n * @returns {Object} structured object else undefined\n */\n\n\nfunction parse(data, url, id = (0,_util__WEBPACK_IMPORTED_MODULE_1__.guid)()) {\n  const options = {\n    ignoreAttributes: false,\n    attributeNamePrefix: \"\"\n  };\n  const parser = new fast_xml_parser__WEBPACK_IMPORTED_MODULE_0__.XMLParser(options);\n  const result = parser.parse(data);\n  let channel = result.rss && result.rss.channel ? result.rss.channel : result.feed;\n  if (Array.isArray(channel)) channel = channel[0];\n  const rss = {\n    id,\n    feed: url,\n    title: channel.title || '',\n    description: channel.description || '',\n    link: channel.link && channel.link.href ? channel.link.href : channel.link,\n    image: parseImage(channel.image || channel[\"itunes:image\"]),\n    category: channel.category || [],\n    items: []\n  };\n  let items = channel.item || channel.entry;\n  if (items && !Array.isArray(items)) items = [items];\n\n  for (let i = 0; i < items.length; i++) {\n    const val = items[i];\n    const media = {};\n    const desc = val.summary?.$text ? val.summary.$text : val.description;\n    const obj = {\n      get id() {\n        return this.src;\n      },\n\n      get src() {\n        return this.enclosures.find(x => x.url)?.url;\n      },\n\n      parentid: id,\n      title: val.title && val.title.$text ? val.title.$text : val.title,\n      description: desc,\n      link: val.link && val.link.href ? val.link.href : val.link,\n      author: val.author && val.author.name ? val.author.name : val['dc:creator'],\n      published: val.created ? Date.parse(val.created) : val.pubDate ? Date.parse(val.pubDate) : Date.now(),\n      created: val.updated ? Date.parse(val.updated) : val.pubDate ? Date.parse(val.pubDate) : val.created ? Date.parse(val.created) : Date.now(),\n      category: val.category || [],\n      content: val.content && val.content.$text ? val.content.$text : val['content:encoded'],\n      enclosures: val.enclosure ? Array.isArray(val.enclosure) ? val.enclosure : [val.enclosure] : [],\n\n      get date() {\n        return new Date(this.created).toDateString();\n      },\n\n      moddate: new Date().getTime(),\n      selected: false\n    };\n    ['content:encoded', 'podcast:transcript', 'itunes:summary', 'itunes:author', 'itunes:explicit', 'itunes:duration', 'itunes:season', 'itunes:episode', 'itunes:episodeType', 'itunes:image'].forEach(s => {\n      if (val[s]) obj[s.replace(':', '_')] = val[s];\n    });\n\n    if (val['media:thumbnail']) {\n      Object.assign(media, {\n        thumbnail: val['media:thumbnail']\n      });\n      obj.enclosures.push(val['media:thumbnail']);\n    }\n\n    if (val['media:content']) {\n      Object.assign(media, {\n        thumbnail: val['media:content']\n      });\n      obj.enclosures.push(val['media:content']);\n    }\n\n    if (val['media:group']) {\n      if (val['media:group']['media:title']) obj.title = val['media:group']['media:title'];\n      if (val['media:group']['media:description']) obj.description = val['media:group']['media:description'];\n      if (val['media:group']['media:thumbnail']) obj.enclosures.push(val['media:group']['media:thumbnail'].url);\n    }\n\n    rss.items.push(_objectSpread(_objectSpread({}, media), obj));\n  }\n\n  return rss;\n}\n/**\n * helper function to parse image url\n * @param {Array || Object} data array or object to search for image url \n * @returns {String} url of image\n */\n\nfunction parseImage(data) {\n  if (Array.isArray(data)) {\n    const o = data.reverse().find(x => x.url || x.href);\n    return o.url || o.href;\n  }\n\n  return data.url || data.href;\n}\n\n//# sourceURL=webpack://ourss/./src/modules/data/parse.js?");

/***/ }),

/***/ "./src/modules/data/util.js":
/*!**********************************!*\
  !*** ./src/modules/data/util.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"HOUR\": () => (/* binding */ HOUR),\n/* harmony export */   \"addCast\": () => (/* binding */ addCast),\n/* harmony export */   \"baseProxyName\": () => (/* binding */ baseProxyName),\n/* harmony export */   \"chunk\": () => (/* binding */ chunk),\n/* harmony export */   \"defaults\": () => (/* binding */ defaults),\n/* harmony export */   \"deleteCast\": () => (/* binding */ deleteCast),\n/* harmony export */   \"fireCasts\": () => (/* binding */ fireCasts),\n/* harmony export */   \"getBlobUrl\": () => (/* binding */ getBlobUrl),\n/* harmony export */   \"guid\": () => (/* binding */ guid),\n/* harmony export */   \"hasBeenHour\": () => (/* binding */ hasBeenHour),\n/* harmony export */   \"ourssFetch\": () => (/* binding */ ourssFetch),\n/* harmony export */   \"storeCast\": () => (/* binding */ storeCast),\n/* harmony export */   \"updateCast\": () => (/* binding */ updateCast)\n/* harmony export */ });\n/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse */ \"./src/modules/data/parse.js\");\n/* harmony import */ var _idb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./idb */ \"./src/modules/data/idb.js\");\n\n\nconst baseProxyName = 'eys63niz7z4miobpicj7b2xbiu0djcpa';\nconst HOUR = 3600000; //60*60*1000\n\nfunction hasBeenHour(time) {\n  const now = new Date().getTime();\n  const diff = now - time;\n  return diff > HOUR;\n}\nconst defaults = {\n  view: 'casts',\n  feeds: [{\n    \"id\": \"efb14fb7-3cbe-a5dd-5643-67502cf7cb7b\",\n    \"title\": \"StarTalk Radio\",\n    \"feed\": \"https://feeds.simplecast.com/4T39_jAj\",\n    \"rank\": 0,\n    \"categories\": {\n      \"16\": \"Comedy\",\n      \"28\": \"History\",\n      \"77\": \"Society\",\n      \"78\": \"Culture\"\n    },\n    \"img\": \"https://image.simplecastcdn.com/images/8b62332a-56b8-4d25-b175-1e588b078323/832ccedd-f592-4297-90c4-bb2eee3c5a24/3000x3000/image.jpg?aid=rss_feed\"\n  }, {\n    \"id\": \"b684f123-4d82-9197-be67-430a717fc888\",\n    \"title\": \"The Dollop with Dave Anthony and Gareth Reynolds\",\n    \"feed\": \"https://thedollop.libsyn.com/rss\",\n    \"rank\": 0,\n    \"categories\": {\n      \"16\": \"Comedy\",\n      \"28\": \"History\",\n      \"77\": \"Society\",\n      \"78\": \"Culture\"\n    },\n    \"img\": \"https://www.omnycontent.com/d/playlist/885ace83-027a-47ad-ad67-aca7002f1df8/22b063ac-654d-428f-bd69-ae2400349cde/65ff0206-b585-4e2a-9872-ae240034c9c9/image.jpg?t=1642981771&size=Large\"\n  }]\n};\n/**\n * Chunk an array to smaller arrays\n * @param {Array} arr array to chunk\n * @param {Number} n items per chunk\n * @return {Iterator} iterator of chunks\n */\n\nfunction* chunk(arr, n) {\n  for (let i = 0; i < arr.length; i += n) {\n    yield arr.slice(i, i + n);\n  }\n}\nasync function storeCast(cast) {\n  if (!cast) return console.warn('storeCast: no cast provided');\n\n  if (!cast.imageData && cast.image) {\n    const res = await ourssFetch(cast.image, 'image');\n\n    if (!res?.ok) {\n      return console.warn('storeCast: image fetch failed', res);\n    }\n\n    cast.imageData = await res.blob();\n  }\n\n  (0,_idb__WEBPACK_IMPORTED_MODULE_1__.setItem)('casts', cast);\n  return cast;\n}\nasync function addCast(url, id) {\n  const cast = await (0,_parse__WEBPACK_IMPORTED_MODULE_0__.parseUrl)(url, id); // todo add to mongo\n\n  return storeCast(cast);\n}\nasync function updateCast(url, id) {\n  //await deleteCast(id)\n  const cast = await (0,_parse__WEBPACK_IMPORTED_MODULE_0__.parseUrl)(url, id); //console.log('updateCast: ', cast)\n\n  return storeCast(cast);\n}\nasync function deleteCast(id) {\n  return (0,_idb__WEBPACK_IMPORTED_MODULE_1__.deleteItemById)('casts', id);\n}\nasync function fireCasts() {\n  console.log('MODULES/DATA/UTIL: fireCasts CALLED');\n  /* const dbCasts = await initCasts('casts')\n  console.log('util: dbCasts')\n  console.log(dbCasts)\n  \n  return Promise.all(\n      dbCasts.map(async c => \n          storeCast( structure( (await parseUrl(c.feed, c.id) ))))\n  ); */\n}\nfunction guid() {\n  function s4() {\n    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);\n  }\n\n  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();\n}\n/**\n * parse url and return structured object\n * @param {String} url url of feed to parse\n * @param {String} type type of url (audio, image)\n * @returns {Object} response object\n */\n\nasync function ourssFetch(url, type) {\n  try {\n    console.log('ourssFetch: Fetching feed');\n    const res = await fetch(url);\n    return res;\n  } catch (error) {\n    console.warn(error);\n    console.log('ourssFetch: Feed failed, trying again...');\n\n    try {\n      if (type === 'audio') {\n        const res = await getAudioByProxy(url);\n        console.log('ourssFetch: Proxy response');\n        console.log(res);\n        return res;\n      } else if (type === 'image') {\n        const res = await getAudioByProxy(url);\n        return res;\n      }\n    } catch (error) {\n      console.info('Fallback failed. Can\\'t parse the url ', url);\n      console.warn(error);\n    }\n  }\n\n  return undefined;\n}\n/**\n * fallback function to parse feed via a proxy\n * @param {String} url of feed\n * @returns Promise resolves rss/xml text from feed\n */\n\nasync function getAudioByProxy(url) {\n  const proxyUrl = 'https://' + _parse__WEBPACK_IMPORTED_MODULE_0__.baseProxyUri;\n  return fetch(proxyUrl + encodeURIComponent(url));\n}\n/**\n * return a object url from a blob\n * @param {Blob} blob\n * @returns {String} object url\n */\n\n\nfunction getBlobUrl(blob) {\n  const Url = window.URL || window.webkitURL;\n  const url = Url.createObjectURL(blob);\n  setTimeout(() => Url.revokeObjectURL(url), 1000);\n  return url;\n}\n\n//# sourceURL=webpack://ourss/./src/modules/data/util.js?");

/***/ }),

/***/ "./src/modules/workers/data.js":
/*!*************************************!*\
  !*** ./src/modules/workers/data.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_parse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../data/parse */ \"./src/modules/data/parse.js\");\n\nself.addEventListener('message', async event => {\n  const {\n    type,\n    url,\n    id,\n    store\n  } = event.data;\n\n  if (type === 'parse') {\n    const data = await (0,_data_parse__WEBPACK_IMPORTED_MODULE_0__.parseUrl)(url, id);\n    self.postMessage({\n      data,\n      store,\n      whoami: 'worker-parser'\n    });\n  }\n});\n\n//# sourceURL=webpack://ourss/./src/modules/workers/data.js?");

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
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_fast-xml-parser_src_fxp_js-node_modules_idb_build_index_js"], () => (__webpack_require__("./src/modules/workers/data.js")))
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
/******/ 			return __webpack_require__.e("vendors-node_modules_fast-xml-parser_src_fxp_js-node_modules_idb_build_index_js").then(next);
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