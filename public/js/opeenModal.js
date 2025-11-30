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

/***/ "./src/js/openModal.js":
/*!*****************************!*\
  !*** ./src/js/openModal.js ***!
  \*****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n(function () {\n    const btnAbrir = document.getElementById('btnAbrirModal');\n    const btnCerrar = document.getElementById('btnCerrarModal');\n    const btnCancelar = document.getElementById('btnCancelarModal');\n    const modal = document.getElementById('modalBarbero');\n\n    if (!btnAbrir || !modal) return;\n\n    function abrirModal() {\n      modal.classList.remove('hidden');\n      // opcional: bloquear scroll del body\n      document.body.classList.add('overflow-hidden');\n    }\n\n    function cerrarModal() {\n      modal.classList.add('hidden');\n      document.body.classList.remove('overflow-hidden');\n    }\n\n    btnAbrir.addEventListener('click', abrirModal);\n    btnCerrar.addEventListener('click', cerrarModal);\n    btnCancelar.addEventListener('click', cerrarModal);\n\n    // cerrar si hace click en el fondo oscuro (pero no en el contenido)\n    modal.addEventListener('click', function (e) {\n      if (e.target === modal) {\n        cerrarModal();\n      }\n    });\n\n    // cerrar con ESC\n    document.addEventListener('keydown', function (e) {\n      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {\n        cerrarModal();\n      }\n    });\n  })()\n\n//# sourceURL=webpack://prestamos/./src/js/openModal.js?\n}");

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
/******/ 	__webpack_modules__["./src/js/openModal.js"](0,__webpack_exports__,__webpack_require__);
/******/ 	
/******/ })()
;