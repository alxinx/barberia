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

/***/ "./src/js/charts.js":
/*!**************************!*\
  !*** ./src/js/charts.js ***!
  \**************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n\nwindow.dataSet = [\n                [1074000, 1750000, 1620000, 900000],\n                [1195000, 939000, 1655000, 1672000],\n                [2118000, 779000, 2762000, 3156000]\n                ]\n  console.log(\"dataset:\", window.dataSet);\n\n  const chart = new ApexCharts(\n    document.querySelector(\"#chart\"),\n    {\n      series: [\n        { name: \"Manila\", data: window.dataSet[0] },\n        { name: \"Monterrey\", data: window.dataSet[1] },\n        { name: \"Provenza\", data: window.dataSet[2] },\n      ],\n      chart: { type: \"area\", height: 350 }\n    }\n  );\n\n  chart.render();\n});\n\n\n//# sourceURL=webpack://prestamos/./src/js/charts.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/charts.js"](0,__webpack_exports__,__webpack_require__);
/******/ 	
/******/ })()
;