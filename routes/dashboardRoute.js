import express from "express";

import {home, crearPuntosVentaPost, editarPuntosVenta,editarPuntosVentaPost, logOut} from "../controllers/dashboardControllers.js";

import {crearPuntosVenta, loadDatospuntoVenta, listadoPuntosVenta} from "../controllers/puntoVentaControllers.js"

import {homeAdministrativo, datosAdminPost, administrativoNuevoProductoServicio,  administrativoProductosServicios, administrativoComisiones, nuevoProductoServicio, administrativoInformes, editarProductoServicio} from "../controllers/administrativoControllers.js"


import {listadoBarberos,agregarBarberos,agregarBarberosPost, loadDatosBarbero, editoDatosBarbero} from "../controllers/barberosControllers.js"
import {uploadFotoBarbero} from '../config/uploadBarberos.js'

import {rutaProtegida} from "../middlewares/authMiddleware.js"

const route = express.Router();
route.use(rutaProtegida)
route.get('/', home)


//PUNTOS DE VENTA
route.get('/puntosDeVenta/nuevoPunto', crearPuntosVenta)
route.get('/puntosDeVenta/ver/:idPuntoVenta', loadDatospuntoVenta)
route.get('/puntosDeVenta', listadoPuntosVenta)
route.get('/editarPunto/:idPuntoVenta', editarPuntosVenta )

route.post('/puntosDeVenta/ver/:idPuntoVenta', editarPuntosVentaPost )
route.post('/puntosDeVenta/nuevoPunto', crearPuntosVentaPost)
//FIN PUNTOS DE VENTA




//BARBEROS

route.get('/barberos', listadoBarberos) 
route.get('/nuevoBarbero', uploadFotoBarbero.single('foto'), agregarBarberos)
route.get('/barberos/ver/:idBarbero', loadDatosBarbero )
route.post('/nuevoBarbero',agregarBarberosPost);
route.post('/barberos/ver/:idBarbero', editoDatosBarbero)




//ADMINISTRATIVOS
route.get('/administrativo', homeAdministrativo);
route.get('/administrativo/productosServicios', administrativoProductosServicios)
route.get('/administrativo/productosServicios/nuevo', administrativoNuevoProductoServicio)
route.get('/administrativo/productosServicios/editar/:idProductoServicio', editarProductoServicio)
route.get('/administrativo/comisiones', administrativoComisiones);
route.get('/administrativo/informes', administrativoInformes);

route.post('/administrativo/', datosAdminPost );
route.post('/administrativo/productosServicios/nuevo', nuevoProductoServicio)




//ANOTHERS
route.get('/logOut',logOut );


export default route
