import express from "express";

import {home, crearPuntosVentaPost, editarPuntosVenta,editarPuntosVentaPost, logOut} from "../controllers/dashboardControllers.js";

import {crearPuntosVenta, loadDatospuntoVenta, listadoPuntosVenta} from "../controllers/puntoVentaControllers.js"

import {homeAdministrativo} from "../controllers/administrativoControllers.js"


import {listadoBarberos,agregarBarberos,agregarBarberosPost, loadDatosBarbero, editoDatosBarbero} from "../controllers/barberosControllers.js"
import {uploadFotoBarbero} from '../config/uploadBarberos.js'

import {rutaProtegida} from "../middlewares/authMiddleware.js"

const route = express.Router();
route.use(rutaProtegida)
route.get('/', home)


//PUNTOS DE VENTA
//route.get('/puntos_de_venta', crearPuntosVenta)
route.get('/puntosDeVenta/ver/:idPuntoVenta', loadDatospuntoVenta)
route.get('/puntosDeVenta', listadoPuntosVenta)
route.get('/editarPunto/:idPuntoVenta', editarPuntosVenta )
route.post('/editarPunto/:idPuntoVenta', editarPuntosVentaPost )
route.post('/puntos_de_venta', crearPuntosVentaPost)
//FIN PUNTOS DE VENTA




//BARBEROS

route.get('/barberos', listadoBarberos)
route.get('/nuevoBarbero', uploadFotoBarbero.single('foto'), agregarBarberos)
route.get('/barberos/ver/:idBarbero', loadDatosBarbero )
route.post('/nuevoBarbero',agregarBarberosPost);
route.post('/barberos/ver/:idBarbero', editoDatosBarbero)




//ADMINISTRATIVOS
route.get('/administrativo', homeAdministrativo)


//ANOTHERS
route.get('/logOut',logOut );


export default route
