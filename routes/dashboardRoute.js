import express from "express";
import {home, crearPuntosVenta, crearPuntosVentaPost, listadoPuntosVenta, editarPuntosVenta,editarPuntosVentaPost, logOut} from "../controllers/dashboardControllers.js";

import {listadoBarberos,agregarBarberos,agregarBarberosPost, loadDatosBarbero} from "../controllers/barberosControllers.js"

import {rutaProtegida} from "../middlewares/authMiddleware.js"

const route = express.Router();
route.use(rutaProtegida)
route.get('/', home)


//PUNTOS DE VENTA
route.get('/puntos_de_venta', crearPuntosVenta)
route.get('/listadoPuntosVenta', listadoPuntosVenta)
route.get('/editarPunto/:idPuntoVenta', editarPuntosVenta )
route.post('/editarPunto/:idPuntoVenta', editarPuntosVentaPost )
route.post('/puntos_de_venta', crearPuntosVentaPost)
//FIN PUNTOS DE VENTA




//BARBEROS

route.get('/barberos', listadoBarberos)
route.get('/nuevoBarbero', agregarBarberos)
route.get('/barberos/ver/:idBarbero', loadDatosBarbero )


route.post('/nuevoBarbero',agregarBarberosPost);





//ANOTHERS
route.get('/logOut',logOut );


export default route
