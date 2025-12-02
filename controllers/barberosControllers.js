import express from "express";
const route = express.Router();
import { check, validationResult } from "express-validator";
import { Barbero, PuntosDeVenta } from "../models/index.js";
import {obtenerListadoBarberias, obtenerListadoBarberos, obtenerCamposDuplicados, invalidaCacheListado} from '../services/puntosVentaService.js'
import {loadBarberData} from '../services/barberosServices.js';



//Listado de barberias

const listadoBarberos = async (req, res) => {

    const listaBarberos = await obtenerListadoBarberos();
    res.status(201).render('../views/dashboard/barberos/listadoBarberos', {
        APPNAME : process.env.APP_NAME,
        titulo : 'Barberos',
        active: 'barberos',
        subTitulo : 'Listado de los barberos',
        listaBarberos
        
    })  

}






//LOAD FORM NUEVO BARBERO.
const agregarBarberos =  async (req, res) => {
  
    const listadoBarberias = await obtenerListadoBarberias();

    res.status(201).render('../views/dashboard/barberos/nuevoBarbero', {
        APPNAME : process.env.APP_NAME,
        titulo : 'Agregar Barbero',
        csrfToken : req.csrfToken(),
        active: 'barberos',
        subTitulo : 'Nuevo Barbero',
        listadoBarberias,
        btn : 'GUARDAR'
    })
}




//AGREGO UN NUEVO BARBERO.
const agregarBarberosPost = async (req, res) => {
    
    const listadoBarberias = await obtenerListadoBarberias();
    //Valido los campos 
    await check('nombreBarbero')
            .trim()
            .notEmpty()
            .withMessage('Cómo se llama el barbero?😬')
            .run(req);
    
    await check('apellidoBarbero')
            .trim()
            .notEmpty()
            .withMessage('Cómo se apellida el barbero?😬')
            .run(req);

    await check('identificacionBarbero')
            .trim()
            .notEmpty()
            .withMessage('Es necesaria la identificación')
            .run(req);

    await check('email')
            .trim()
            .isEmail()
            .withMessage('Es necesario un email')
            .run(req);

    await check('whatsApp')
            .trim()
            .notEmpty()
            .withMessage('El celular o whatsapp es necesario')
            .run(req);
    
    await check('direccionBarbero')
            .trim()
            .notEmpty()
            .withMessage('Dónde vive el barbero?')
            .run(req);
    
    await check('ciudad')
            .trim()
            .notEmpty()
            .withMessage('En cuál ciudad vive?')
            .run(req);

    await check('comision')
            .trim()
            .isFloat()
            .withMessage('Debes decirme cual va a ser la comisión por servicio, si no aplica, pon 0')
            .run(req);


    const {nombreBarbero, apellidoBarbero,identificacionBarbero, email, whatsApp, activo,direccionBarbero, ciudad,comision, idBarberia, foto} = req.body
    

    let resultados = validationResult(req);

    //Verifico si existe algún error en la validación.
    const erroresValidacion = resultados.array();

    //Si existen campos repetidos, los guardaré en este objeto para luego sacarlos al frontend.
    const errsPorCampo = {};
    erroresValidacion.forEach(err => 
        {
            if (!errsPorCampo[err.path]) {
                errsPorCampo[err.path] = err.msg;
            }
    });

    if(!resultados.isEmpty()){
        return res.status(400).render('../views/dashboard/barberos/nuevoBarbero', {
        APPNAME : process.env.APP_NAME,
        csrfToken : req.csrfToken(),
        titulo : 'Agregar Barbero',
        active: 'barberos',
        subTitulo : 'Nuevo Barbero',
        listadoBarberias,
        errs : errsPorCampo,
        usuario : {
            nombreBarbero : nombreBarbero,
            apellidoBarbero : apellidoBarbero,
            identificacionBarbero : identificacionBarbero,
            email : email,
            whatsApp : whatsApp,
            activo : activo,
            direccionBarbero: direccionBarbero,
            ciudad : ciudad,
            comision: comision
        },
        btn : 'VOLVER A GUARDAR'
    })

    }

    //Verifico si  el wsp o el email están repetidos. 
    const registrosRepetidos = await obtenerCamposDuplicados(req.body)
   
    const duplicadosObj = {};
        registrosRepetidos.forEach(err => {
            duplicadosObj[err.param] = err.msg;
        }); 

    
    if (registrosRepetidos.length > 0) {
        return res.status(400).render('../views/dashboard/barberos/nuevoBarbero', {
            APPNAME: process.env.APP_NAME,
            csrfToken: req.csrfToken(),
            titulo: 'Agregar Barbero',
            active: 'barberos',
            subTitulo: 'Nuevo Barbero',
            listadoBarberias,
            errs: duplicadosObj,   // 👈 ENVÍAS LOS DUPLICADOS
            usuario: req.body,
            btn: 'VOLVER A GUARDAR'
        });
    }

    //subo la foto



    //Procedo a guardar al barbero :)
    console.log(`Foto: ${foto}`)
    invalidaCacheListado();
    await Barbero.create({
        nombreBarbero, apellidoBarbero,identificacionBarbero, email, whatsApp, activo,direccionBarbero, ciudad,comision, idBarberia
    })

    


    //Regreso al formulario.
     return res.status(400).render('../views/dashboard/barberos/nuevoBarbero', {
        APPNAME : process.env.APP_NAME,
        csrfToken : req.csrfToken(),
        titulo : 'Agregar Barbero',
        active: 'barberos',
        subTitulo : 'Nuevo Barbero',
        listadoBarberias,
        success : [{
            msg : `${nombreBarbero} fue creado como barbero exitosamente 😎`
        }],
        btn : 'GUARDAR'
    })
}


//CARGO DATOS DE BARBERO
const loadDatosBarbero = async(req, res)=>{
    const listadoBarberias = await obtenerListadoBarberias();
    const idBarbero = req.params.idBarbero;
    const { form } = req.query;  
    console.log('--------------------------[CHECK POINT 204]--------------------------')
    console.log(form)

    const barberData = await loadBarberData(idBarbero);
        return res.status(400).render('../views/dashboard/barberos/ver', {
        APPNAME : process.env.APP_NAME,
        csrfToken : req.csrfToken(),
        titulo : 'Hoja del Barbero',
        active: 'barberos',
        subTitulo : 'Datos completos del barbero',
        barberData,
        listadoBarberias,
        mostrarComisiones : form === 'comisiones',
        mostrarHistorial : form === 'historial',
        mostrarDocumentacion : form === 'documentacion',
        btn : 'EDITAR '
    })
    
   
}

const editoDatosBarbero = async (req, res)=>{
    //Valido los datos.
    const listadoBarberias = await obtenerListadoBarberias();
    //Valido los campos 
    await check('nombreBarbero')
            .trim()
            .notEmpty()
            .withMessage('Cómo se llama el barbero?😬')
            .run(req);
    
    await check('apellidoBarbero')
            .trim()
            .notEmpty()
            .withMessage('Cómo se apellida el barbero?😬')
            .run(req);

    await check('identificacionBarbero')
            .trim()
            .notEmpty()
            .withMessage('Es necesaria la identificación')
            .run(req);

    await check('email')
            .trim()
            .isEmail()
            .withMessage('Es necesario un email')
            .run(req);

    await check('whatsApp')
            .trim()
            .notEmpty()
            .withMessage('El celular o whatsapp es necesario')
            .run(req);
    
    await check('direccionBarbero')
            .trim()
            .notEmpty()
            .withMessage('Dónde vive el barbero?')
            .run(req);
    
    await check('ciudad')
            .trim()
            .notEmpty()
            .withMessage('En cuál ciudad vive?')
            .run(req);


    const {nombreBarbero, apellidoBarbero,identificacionBarbero, email, whatsApp, activo,direccionBarbero, ciudad, idBarbero, idBarberia, foto} = req.body
    const barberData = await loadBarberData(idBarbero);


    let resultados = validationResult(req);

    //Verifico si existe algún error en la validación.
    const erroresValidacion = resultados.array();

    //Si existen campos repetidos, los guardaré en este objeto para luego sacarlos al frontend.
    const errsPorCampo = {};
    erroresValidacion.forEach(err => 
        {
            if (!errsPorCampo[err.path]) {
                errsPorCampo[err.path] = err.msg;
            }
    });


    if(!resultados.isEmpty()){
        return res.status(400).render('../views/dashboard/barberos/ver', {
        APPNAME : process.env.APP_NAME,
        csrfToken : req.csrfToken(),
        titulo : 'Agregar Barbero',
        active: 'barberos',
        subTitulo : 'Datos del barbero',
        listadoBarberias,
        barberData,
        errs : errsPorCampo,
        usuario : {
            nombreBarbero : nombreBarbero,
            apellidoBarbero : apellidoBarbero,
            identificacionBarbero : identificacionBarbero,
            email : email,
            whatsApp : whatsApp,
            activo : activo,
            direccionBarbero: direccionBarbero,
            ciudad : ciudad,
        },
        btn : 'VOLVER A EDITAR',
        })
    }
    //Verifico repetidos
    const registrosRepetidos = await obtenerCamposDuplicados(req.body)

    console.log(`Dato duplicado: ${registrosRepetidos}`)
    const duplicadosObj = {};
        registrosRepetidos.forEach(err => {
            duplicadosObj[err.param] = err.msg;
        }); 

    
    if (registrosRepetidos.length > 0) {
        return res.status(400).render('../views/dashboard/barberos/ver', {
            APPNAME: process.env.APP_NAME,
            csrfToken: req.csrfToken(),
            titulo: 'Agregar Barbero',
            active: 'barberos',
            subTitulo: 'Nuevo Barbero',
            listadoBarberias,
            barberData,
            errs: duplicadosObj,   // 👈 ENVÍAS LOS DUPLICADOS
            usuario: req.body,
            btn: 'VOLVER A EDITAR'
        });
    }

    //Edito los datos del usuario
    const edicion = await Barbero.findByPk(idBarbero)
    console.log('--------------------------[CHECK POINT 336]--------------------------')
    console.log(`Dato activo: ${barberData.activo}`)

    edicion.nombreBarbero = nombreBarbero;
    edicion.apellidoBarbero = apellidoBarbero;
    edicion.identificacionBarbero = identificacionBarbero;
    edicion.email = email;
    edicion.whatsApp = whatsApp;
    edicion.activo = activo;
    edicion.idBarberia = idBarberia
    edicion.direccionBarbero= direccionBarbero;
    edicion.ciudad = ciudad;
    edicion.save()
    
    invalidaCacheListado(); //Limpio el cache del listado,
    
    
    return res.status(400).render('../views/dashboard/barberos/ver', {
        APPNAME : process.env.APP_NAME,
        csrfToken : req.csrfToken(),
        titulo : 'Agregar Barbero',
        active: 'barberos',
        subTitulo : 'Datos del barbero',
        listadoBarberias,
        barberData,
        success : [
            {msg : `${nombreBarbero}. Fue editado con éxito.🙂`}
        ],
        btn : 'VOLVER A EDITAR '
    })
    //res.redirect('/panel/barberos/')
}//FIN EDICION DE DATO USUARIO






export {
        listadoBarberos,
        agregarBarberos,
        agregarBarberosPost,
        loadDatosBarbero,
        editoDatosBarbero
    }