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

/***/ "./src/js/mostrarPreciosPorPunto.js":
/*!******************************************!*\
  !*** ./src/js/mostrarPreciosPorPunto.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\nfunction mostrarPreciosXPunto(valor) {\n    \n    const seccion = document.getElementById('preciosPuntos'); // o el id que uses\n\n    if (!seccion) return;\n\n    if (valor === 'No') {\n        seccion.classList.remove('hidden');\n    } else {\n        seccion.classList.add('hidden');\n    }\n}\nfunction mostrarCampoPrecios(input) {\n    const ocultar = 'precio_'+input.id\n    const seccion = document.getElementById(ocultar);\n    if(input.checked===false){\n        seccion.classList.add('hidden')\n        seccion.querySelector('input').disabled = true;\n\n        \n    }else {\n        seccion.classList.remove('hidden');\n        seccion.querySelector('input').disabled = false;\n    }\n    \n}\n\nfunction ponerPuntosANumeros (input){\n   let valor = input.value.replace(/\\D/g, \"\");\n\n  if (!valor) {\n    input.value = \"\";\n    return;\n  }\n\n  input.value = valor.replace(/\\B(?=(\\d{3})+(?!\\d))/g, \".\");\n    \n}\n\n// hacerlo global para que el onchange lo encuentre\nwindow.mostrarPreciosXPunto = mostrarPreciosXPunto;\nwindow.mostrarCampoPrecios = mostrarCampoPrecios;\nwindow.ponerPuntosANumeros = ponerPuntosANumeros\n\n//# sourceURL=webpack://prestamos/./src/js/mostrarPreciosPorPunto.js?\n}");

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
/******/ 	__webpack_modules__["./src/js/mostrarPreciosPorPunto.js"](0,__webpack_exports__,__webpack_require__);
/******/ 	
/******/ })()
;