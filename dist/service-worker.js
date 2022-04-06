/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/service-worker.js":
/*!*******************************!*\
  !*** ./src/service-worker.js ***!
  \*******************************/
/***/ (() => {

eval("/* eslint-disable no-restricted-globals */\n/* \nimport { getRemoteDb } from './modules/data/fire.js';\nimport { getItems, setItem } from './modules/data/idb.js';\nimport { parseUrl } from './modules/data/parse.js';\nimport { \n    defaults,\n    structure,\n } from './modules/data/utils.js';\n\n\n//import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';\n//precacheAndRoute(self.__WB_MANIFEST);\n\n\n\n\nself.addEventListener('sync', function (event) {\n    console.log('meow1')\n    console.log(event)\n    if (event.tag === 'myFirstSync') {\n        console.log('meow2')\n        event.waitUntil(doSomeStuff())\n    }\n});\n\nasync function doSomeStuff() {\n\n    // go get list of casts\n    //const casts = await getRemoteDb('casts');\n    //console.log(casts)\n\n    // get local db of casts\n    const local = await getItems('casts');\n    console.log(local)\n\n    // if no local at all, use defaults\n    defaults.map(async feed => {\n        const data = await parseUrl(x)\n        const o = structure(data)\n        setItem('casts', o)\n    })\n\n    return new Promise(resolve => resolve('meow333'))\n} */\n\n//# sourceURL=webpack://ourss/./src/service-worker.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/service-worker.js"]();
/******/ 	
/******/ })()
;