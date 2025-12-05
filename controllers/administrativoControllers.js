import express from "express";
import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
import { Op } from "sequelize";
import Administrador from "../models/Administrador.js"




const homeAdministrativo = async (req,res)=>{
    
    const datosAdmin =  await Administrador.findOne();
    const { form } = req.query; 
    const activeForm = form || 'datos'; 
    res.status(201).render('../views/dashboard/administrativo/ver',{
        APPNAME : process.env.APP_NAME,
        csrfToken : req.csrfToken(),
        titulo : 'Panel Administrativo',
        subTitulo : 'Control Administrativo de las barberias',
        active: 'administrativo',
        btn : 'EDITAR',
        usuario : {
            idAdministrador : datosAdmin.idAdministrador,
            nombre : datosAdmin.nombre,
            email : datosAdmin.email,
        },
        activeForm,
        mostrarData : form === 'data',
        mostrarComisiones : form === 'comisiones',
        mostrarHistorial : form === 'historial',
        mostrarDocumentacion : form === 'documentacion',

    })
}




//ACTUALIZAR DATOS ADMIN
const datosAdminPost = async (req, res)=>{

    const { nombre, email, password, idAdministrador } = req.body;

    await check('nombre')
    .trim()
    .notEmpty()
    .withMessage('Debes dar un nombre para el administrador')
    .run(req);

    await check('email')
    .trim()
    .isEmail()
    .withMessage('Debes darme un email para registrar.')
    .run(req);

    // Validar password solo si vino algo
    if (password && password.trim().length > 0) {
         

    await check('password')
        .trim()
        .isLength({ min: 3 })
        .withMessage('La contraseña debe ser de mas de 3 caracteres.')
        .run(req);

    await check('password_again')
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden 🥴');
        }
        return true;
        })
        .run(req);
    }

    const resultado = validationResult(req);
    const erroresValidacion = resultado.array();
    const errsPorCampo = {};

    erroresValidacion.forEach(err => {
    if (!errsPorCampo[err.path]) {
        errsPorCampo[err.path] = err.msg; // o err si quieres más info
    }
    });

    // SOLO si hay errores
    if (!resultado.isEmpty()) {
    return res.status(400).render('../views/dashboard/administrativo/ver', {
        APPNAME : process.env.APP_NAME,
        csrfToken : req.csrfToken(),
        titulo : 'Panel Administrativo',
        subTitulo : 'Control Administrativo de las barberias',
        active: 'administrativo',
        btn : 'EDITAR',
        errores : erroresValidacion,
        usuario : {
        idAdministrador,
        nombre,
        email,
        }, 
        errs : errsPorCampo,
    });
    }
    //Fin validación de errores de llenado de campos

    //Evaluo que no hayan mas de dos correos iguales.
    const emailRepetido = await Administrador.findOne(
            {
                where : {
                    [Op.and]:[
                        { idAdministrador : {[Op.ne]: idAdministrador}}
                    ],
                    [Op.or]:[
                        {email : email}
                    ]
                }
            }
    )

    if(emailRepetido){
        return res.status(400).render('../views/dashboard/administrativo/ver', {
        APPNAME : process.env.APP_NAME,
        csrfToken : req.csrfToken(),
        titulo : 'Panel Administrativo',
        subTitulo : 'Control Administrativo de las barberias',
        active: 'administrativo',
        btn : 'EDITAR',
        errores : erroresValidacion,
        usuario : {
        idAdministrador,
        nombre,
        },
        unique : true,
        errores : [{
            msg : 'El correo electronico ya esta registrado con otro usuario'
        }],
        });
    }
    
    //En caso que no exista correos iguales, procedo a actualizar.
    const administrador = await Administrador.findByPk(idAdministrador);
    administrador.nombre = nombre;
    administrador.email = email;
    if(password && password.trim().length > 0){
        const sailt = await bcrypt.genSalt(10);
        administrador.password = await bcrypt.hash(password, sailt)
    }

    administrador.save();
    const datosAdmin =  await Administrador.findOne();
    return res.status(400).render('../views/dashboard/administrativo/ver', {

        APPNAME : process.env.APP_NAME,
        csrfToken : req.csrfToken(),
        titulo : 'Panel Administrativo',
        subTitulo : 'Control Administrativo de las barberias',
        active: 'administrativo',
        usuario : {
            idAdministrador,
            nombre,
            email,
        },
        success : [{
            msg : 'Listo, edité los datos con éxito'
        }],
        btn : 'EDITAR OTRA VEZ.'})

    
}

export {
    homeAdministrativo, datosAdminPost
}