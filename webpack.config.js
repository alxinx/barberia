import path from "path";

export default {
    mode : 'development',
    entry : {
        mapa : "./src/js/mapa.js",
        closeToast : "./src/js/closetoast.js",
        async : "./src/js/async.js",
        opeenModal : "./src/js/openModal.js"
    },
    output : {
        filename : '[name].js',
        path : path.resolve('public/js')
    }
}