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

eval("{__webpack_require__.r(__webpack_exports__);\nfunction sincronizarPreciosPorPunto() {\n  const select = document.getElementById('esPrecioGlobal');\n  const valor = select ? select.value : 'Si';\n\n  const contenedor = document.getElementById('preciosPuntos');\n  if (!contenedor) return;\n\n  const inputs = contenedor.querySelectorAll('input[name=\"precioPorPunto[]\"]');\n\n  if (valor === 'No') {\n    // 👉 No hay precio global → usamos precios por punto\n    contenedor.classList.remove('hidden');\n\n    inputs.forEach(input => {\n      // id del input: \"precio_manila\" → saco \"manila\"\n      const idPunto = input.id.replace('precio_', '');\n      const checkbox = document.getElementById(idPunto);\n      const activo = checkbox && checkbox.checked;\n\n      input.disabled = !activo;   // solo activos se envían\n      input.required = activo;    // y solo esos se validan\n      if (!activo) {\n        input.value = '';         // opcional: limpiar\n      }\n    });\n\n  } else {\n    // 👉 Sí hay precio global → se ignoran los precios por punto\n    contenedor.classList.add('hidden');\n\n    inputs.forEach(input => {\n      input.disabled = true;\n      input.required = false;\n      input.value = '';           // opcional\n    });\n  }\n}\n\n\n\n\nfunction mostrarPreciosXPunto(valor) {\n  sincronizarPreciosPorPunto()\n}\n\nfunction mostrarCampoPrecios(input) {\n  const ocultarId = 'precio_' + input.id;   // ej: precio_monterrey\n  const seccion = document.getElementById(ocultarId);\n\n  console.log(seccion)\n  if (!seccion) return;\n\n  const inputs = seccion.querySelectorAll('input');\n\n  if (!input.checked) {\n    // ✅ Ocultamos y deshabilitamos los campos de precio\n    seccion.classList.add('hidden');\n\n    inputs.forEach(i => {\n      i.disabled = true;    // no se envían\n      i.required = false;   // el navegador no los valida\n      // i.value = '';      // opcional: limpiar\n    });\n\n  } else {\n    // ✅ Mostramos y habilitamos los campos de precio\n    seccion.classList.remove('hidden');\n\n    inputs.forEach(i => {\n      i.disabled = false;   // se envían al backend\n      // si quieres que sean obligatorios:\n      // i.required = true;\n    });\n  }\n}\n\n\n\nfunction ponerPuntosANumeros (input){\n   let valor = input.value.replace(/\\D/g, \"\");\n\n  if (!valor) {\n    input.value = \"\";\n    return;\n  }\n\n  input.value = valor.replace(/\\B(?=(\\d{3})+(?!\\d))/g, \".\");\n    \n}\n\n// hacerlo global para que el onchange lo encuentre\nwindow.mostrarPreciosXPunto = mostrarPreciosXPunto;\nwindow.mostrarCampoPrecios = mostrarCampoPrecios;\nwindow.ponerPuntosANumeros = ponerPuntosANumeros\n\n//# sourceURL=webpack://prestamos/./src/js/mostrarPreciosPorPunto.js?\n}");

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