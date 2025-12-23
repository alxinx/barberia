import path from "path";

export default {
    mode : 'development',
    entry : {
        mapa : "./src/js/mapa.js",
        closeToast : "./src/js/closetoast.js",
        async : "./src/js/async.js",
        opeenModal : "./src/js/openModal.js",
        mostrarPreciosPorPunto : "./src/js/mostrarPreciosPorPunto.js",
        busquedaSku : "./src/js/busquedaSku.js",
        charts : "./src/js/charts.js"

    },
    output : {
        filename : '[name].js',
        path : path.resolve('public/js')
    }
}