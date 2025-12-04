import { check, validationResult } from "express-validator";
import { Op } from "sequelize";

import PuntosDeVenta from "../models/PuntosDeVenta.js";


//Cargo Pagina Puntos Venta.
const crearPuntosVenta = (req, res)=>{
    res.status(201).render('../views/dashboard/puntosVenta/nuevoPuntoVenta', {
        APPNAME : process.env.APP_NAME,
        csrfToken : req.csrfToken(),
        titulo : 'Crear punto de venta',
        subTitulo : 'Nuevo punto de venta',
        active: 'puntosventa',
        btn : 'GUARDAR'
    })
}


const listadoPuntosVenta = async (req,res)=>{
    const [listadoPuntosVenta] = await Promise.all([
        PuntosDeVenta.findAll()
    ])
    res.status(201).render('../views/dashboard/puntosVenta/listaPuntoVenta',{
        APPNAME : process.env.APP_NAME,
        csrfToken : req.csrfToken(),
        titulo : 'Listado de puntos de venta',
        subTitulo : 'Lista todos los puntos de venta',
        active: 'puntosventa',
        listadoPuntosVenta
    })
}


const loadDatospuntoVenta = async (req,res)=>{
    const {idPuntoVenta} = req.params
    const datosPunto = await PuntosDeVenta.findOne({where : { idPuntoVenta : idPuntoVenta}})
    res.status(201).render('../views/dashboard/puntosVenta/ver',{
        APPNAME : process.env.APP_NAME,
        csrfToken : req.csrfToken(),
        titulo : 'Listado de puntos de venta',
        subTitulo : 'Lista todos los puntos de venta',
        active: 'puntosventa',
        datosPunto
    })
}
export {
    crearPuntosVenta, listadoPuntosVenta, loadDatospuntoVenta
}