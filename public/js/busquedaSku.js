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

/***/ "./src/js/busquedaSku.js":
/*!*******************************!*\
  !*** ./src/js/busquedaSku.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\nconst codigoInput = document.getElementById('codigo');\n\ncodigoInput.addEventListener('change', async (e) => {\n  const valor = e.target.value.trim();\n  if (!valor) return;\n\n  const res = await fetch(`/panel/puntosDeVenta/buscarSkuEan/${valor}`);\n  const data = await res.json();\n\n  const contenedor = document.getElementById('botonAgregarProducto');\n  const contenedorBtnAdd = document.getElementById('botonAgregarInventario');\n\n\n  if (!data.ok) {\n    document.getElementById('nombre').value = \"No existe\"\n    document.getElementById('codigo').value = \"\"\n    contenedor.innerHTML = `\n\n      <a href=\"/panel/administrativo/productosServicios/nuevo\" target=\"_blank\" class=\"px-5 py-2 rounded-lg text-sm font-medium text-white bg-green-500 cursor-pointer\">  EL PRODUCTO NO EXITSTE. HAS CLICK AQUI PARA AGREGARLO </a>\n        `;\n    contenedorBtnAdd.innerHTML = ``\n    return;\n  }\n\n  const { producto } = data;\n\n  document.getElementById('nombre').value = producto.nombreProductoServicio;\n  document.getElementById('idProductoServicio').value = producto.idProductoServicio;\n  contenedor.innerHTML = ``;\n  contenedorBtnAdd.innerHTML = `<button \n            type=\"submit\"\n            class=\"px-5 py-2 rounded-lg text-sm font-medium text-white bg-green-500 cursor-pointer\"\n        >\n            AGREGAR AL INVENTARIO DE LA TIENDA\n        </button>`\n});\n\n\nconst form = document.getElementById('formInventario');\n\nform.addEventListener('submit', async (e) => {\n  e.preventDefault();\n\n  const btn = form.querySelector('button');\n  btn.disabled = true;\n\n  const res = await fetch('/panel/inventario/agregar', {\n    method: 'POST',\n    body: new FormData(form)\n  });\n\n  const data = await res.json();\n\n  if (!data.ok) {\n    btn.disabled = false;\n    alert('Error');\n    return;\n  }\n\n\n  //await cargarInventario();\n\n  // 2️⃣ feedback\n  alert('Producto agregado');\n\n  // 3️⃣ reset parcial\n  form.reset();\n  btn.disabled = false;\n});\n\n\n//# sourceURL=webpack://prestamos/./src/js/busquedaSku.js?\n}");

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
/******/ 	__webpack_modules__["./src/js/busquedaSku.js"](0,__webpack_exports__,__webpack_require__);
/******/ 	
/******/ })()
;