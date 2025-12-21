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
    const { form } = req.query; 
     const activeForm = form || 'datos'; 
    const datosPunto = await PuntosDeVenta.findOne({where : { idPuntoVenta : idPuntoVenta}})
    res.status(201).render('../views/dashboard/puntosVenta/ver',{
        APPNAME : process.env.APP_NAME,
        csrfToken : req.csrfToken(),
        titulo : `Datos de ${datosPunto.nombre}`,
        subTitulo : `Administra desde este panel lo relacionado con ${datosPunto.nombre}`,
        active: 'puntosventa',
        btn : 'EDITAR',
        datosPunto,
        activeForm,
        mostrarData : form === 'data',
        ingresosServicios : form == 'ingresosServicios',
        gastosCostos : form == 'gastosCostos',
        inventarioProductos : form == 'inventarioProductos',
        barberos : form == 'barberos',
        cajaReportes : form == 'cajaReportes',
    })
}


//POST EDICION PUNTO DE VENTA.
const editarPuntosVentaPost = async (req,res)=>{

    const {nombre, direccion, WhatsApp, ciudad, capacidad, nit, razonSocial, email, idPuntoVenta, password}=req.body
    const datosPunto = await PuntosDeVenta.findOne({where : { idPuntoVenta : idPuntoVenta}})


    //Valido los datos
    await check('nombre')
    .trim()
    .notEmpty()
    .withMessage('Necesito al menos el nombre').run(req);

    await check('direccion')
        .trim()
        .notEmpty()
        .withMessage('Debes darme la dirección. si no la sabes ubicate en el mapa de abajo')
        .run(req);

    await check ('WhatsApp')
    .trim()
    .notEmpty()
    .withMessage('Necesito el número de wsp')
    .run(req);

    await check('ciudad')
        .trim()
        .notEmpty()
        .withMessage('Es necesario que me pongas la ciudad')
        .run(req);

    
        await check('capacidad')
            .isNumeric()
            .withMessage('Necesito al menos 1 barbero')
            .run(req);
        
        await check('nit')
                .trim()
                .notEmpty()
                .withMessage('el NIT es importante para la facturación')
                .run(req);

        await check('razonSocial')
                .trim()
                .notEmpty()
                .withMessage('Necesitamos la razón social para la factura')
                .run(req)
        
        await check('email')
                .trim()
                .isEmail()
                .withMessage('Debes darme un email para que el punto de venta ingrese a su sesión')
                .run(req);
        if(password && password.trim() !== ''){
            await check('password')
                .trim()
                .isLength({min : 4})
                .withMessage('El password debe ser al menos de 4 caracteres.')
                .run(req);
        
        await check('password_again')
                .trim()
                .custom(( value , {req}) =>{
                    if(value != req.body.password){
                        throw new Error('Las contraseñas no coinciden');
                    }
                    return true
                })
                .run(req);

        }
       

    const resultado = validationResult(req);

    //Verifico si los campos estan correctamente llenados.
    const errores = resultado.array()
    const camposFallidos = errores.map(error =>  error.path)


    if(!resultado.isEmpty()){
            return res.status(201).render('../views/dashboard/puntosVenta/ver', {
            APPNAME : process.env.APP_NAME,
            csrfToken : req.csrfToken(),
            titulo : 'Edita punto de venta',
            active: 'puntosventa',
            errores : resultado.array(),
            camposFallidos : camposFallidos,
            datosPunto,
            usuario : {
                nombre: nombre, 
                direccion:  direccion, 
                WhatsApp:   WhatsApp, 
                ciudad: ciudad, 
                capacidad:  capacidad, 
                nit:    nit, 
                razonSocial:    razonSocial, 
                email:  email,
                idPuntoVenta : idPuntoVenta
            },
        btn : 'EDITAR'
        })
    }


    //Codigo para editar aqui
    
    //Verifico que no vayan a poner un  campo que sea repetido.
    const conflicto = await PuntosDeVenta.findOne({
        where : {
            
            [Op.and]:[
                { idPuntoVenta : {[Op.ne]: idPuntoVenta}}
            ],
            [Op.or]:[
                {WhatsApp : WhatsApp},
                {nit : nit},
                {email : email}
            ]
        }
    })


    console.log('___________________________________[183 LINE]___________________________________')
    console.log(conflicto);


     if(conflicto){
        //Verifico cual fue el que choco
        let camposDuplicados = [];
        if(conflicto.WhatsApp === WhatsApp){
            camposDuplicados.push("WhatsApp ")
        }
        if(conflicto.nit === nit){
            camposDuplicados.push("N.I.T ")
        }
        if(conflicto.email === email){
            camposDuplicados.push("Email")
        }

            return res.status(201).render('../views/dashboard/puntosVenta/ver', {
            APPNAME : process.env.APP_NAME,
            csrfToken : req.csrfToken(),
            titulo : 'Editar punto de venta',
            active: 'puntosventa',
            datosPunto,
            btn : 'EDITAR',
            errores : [{
                msg : `Lo lamento, pero no puedes registrar un punto de venta con ${camposDuplicados.join(', ')}, porque otro punto de venta ya lo tiene`
            }],
            usuario : {
                nombre : nombre,
                direccion:  direccion, 
                WhatsApp:   WhatsApp, 
                ciudad: ciudad, 
                capacidad:  capacidad, 
                nit:    nit, 
                razonSocial:    razonSocial, 
                email:  email,
                idPuntoVenta : idPuntoVenta
            }
        })
        }//Fin existencia campo repetido
    
    const  puntoVenta = await PuntosDeVenta.findByPk(idPuntoVenta);

    //Ejecuto la edición del campo
    puntoVenta.nombre = nombre;
    puntoVenta.direccion = direccion;
    puntoVenta.WhatsApp = WhatsApp;
    puntoVenta.ciudad = ciudad;
    puntoVenta.capacidad = capacidad;
    puntoVenta.nit = nit;
    puntoVenta.razonSocial=razonSocial;
    puntoVenta.email = email;

    if(password && password.trim() !== ''){
        puntoVenta.password = password
    }

    puntoVenta.save()
    //Success
        return res.status(201).render('../views/dashboard/puntosVenta/ver', {
        APPNAME : process.env.APP_NAME,
        csrfToken : req.csrfToken(),
        titulo : 'Editar punto de venta',
        active: 'puntosventa',
        datosPunto,
        btn : 'EDITAR OTRA VEZ',
        success : [{
                msg : `El punto de venta se actualizó exitosamente! 😌`
            }],
        usuario : {
            nombre : nombre,
            direccion:  direccion, 
            WhatsApp:   WhatsApp, 
            ciudad: ciudad, 
            capacidad:  capacidad, 
            nit:    nit, 
            razonSocial:    razonSocial, 
            email:  email,
            idPuntoVenta : idPuntoVenta,
        },
    });

}//Fin edicion punto de venta







export {
    crearPuntosVenta, listadoPuntosVenta, loadDatospuntoVenta, editarPuntosVentaPost
}