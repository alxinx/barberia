import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
import { Op } from "sequelize";
import { money } from "../helpers/formatMoney.js"

import Administrador from "../models/Administrador.js"
import {ProductosServicios, PuntosDeVenta, DisponibilidadProducto, PreciosProductosServicios  } from "../models/index.js";



//=====================================================================================//
//=====================================[GET METH]=====================================//
//=====================================================================================//

const homeAdministrativo = async (req,res)=>{
    const datosAdmin =  await Administrador.findOne();
    const listaProductos =await ProductosServicios.findAll()
    const listaPuntosVenta = await PuntosDeVenta.findAll()
    const { form, producto } = req.query; 
    const activeForm = form || 'datos'; 
    const nuevo = producto;        
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
        nuevo,
        listaProductos,
        listaPuntosVenta,
        mostrarData : form === 'data',
        mostrarComisiones : form === 'comisiones',
        mostrarHistorial : form === 'historial',
        mostrarDocumentacion : form === 'documentacion',
        //Funciones:
        money   
    })
}


//CARGAR PAGINA PRODUCTOS Y SERVICIOS
const administrativoProductosServicios = async(req,res)=>{

    const POR_PAGINA =8 ;
    const paginaActual = parseInt(req.query.page) || 1;

    const limit = POR_PAGINA;
    const offset = (paginaActual - 1) * limit;

    // findAndCountAll -> te trae filas + total
    const { rows: listaProductos, count: totalRegistros } = await ProductosServicios.findAndCountAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']]                // opcional, pero recomendado
    });

    const totalPaginas = Math.ceil(totalRegistros / POR_PAGINA);

    // helpers para el paginador
    const tienePaginaAnterior = paginaActual > 1;
    const tienePaginaSiguiente = paginaActual < totalPaginas;
    const paginaAnterior = paginaActual - 1;
    const paginaSiguiente = paginaActual + 1;

    // array de páginas (1, 2, 3, ...)
    const paginas = [];
    for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
    }

     res.status(201).render('../views/dashboard/administrativo/verProductosServicios',{
        APPNAME : process.env.APP_NAME,
        csrfToken : req.csrfToken(),
        titulo : 'Panel Administrativo',
        subTitulo : 'Productos y Servicios',
        active: 'administrativo',
        listaProductos,
        activeForm : 'productosyservicios',
        listaProductos,
        paginaActual,
        totalPaginas,
        paginas,
        tienePaginaAnterior,
        tienePaginaSiguiente,
        paginaAnterior,
        paginaSiguiente,
     })
}







const administrativoNuevoProductoServicio = async(req,res)=>{
    
    const listaProductos =await ProductosServicios.findAll();
    const listaPuntosVenta = await PuntosDeVenta.findAll()

    res.status(201).render('../views/dashboard/administrativo/nuevoProductoServicio',{
        APPNAME : process.env.APP_NAME,
        csrfToken : req.csrfToken(),
        titulo : 'Panel Administrativo',
        subTitulo : 'Ingresar un nuevo productos y servicios',
        active: 'administrativo',
        listaProductos,
        listaPuntosVenta,
        activeForm : 'productosyservicios'
     })

}


//EDICION DE PRODUCTO/SERVICIO
const editarProductoServicio = async(req, res)=>{
    const {idProductoServicio}=req.params
    console.log(idProductoServicio)
    const datosProducto =await ProductosServicios.findOne({ where : {idProductoServicio : idProductoServicio}})
    const listaPuntosVenta = await PuntosDeVenta.findAll()
    const disponible = await DisponibilidadProducto.findAll({where : {idProductoServicio:idProductoServicio}})
    
    const idsPuntosDisponibles = disponible.map(d => d.idPuntoVenta);

    const precios = await PreciosProductosServicios.findAll({
  where: { idProductoServicio }
});
    
        const preciosPorPunto = {};
            precios.forEach(p => {
            preciosPorPunto[p.idPuntoVenta] = p.precioEnPunto;
        });
    
        console.log(idsPuntosDisponibles)

    res.status(201).render('../views/dashboard/administrativo/editarProductoServicio',{
        APPNAME : process.env.APP_NAME,
        csrfToken : req.csrfToken(),
        titulo : 'Panel Administrativo',
        subTitulo : 'Editar un nuevo productos y servicios',
        active: 'administrativo',
        card : 'datosProductoServicio',
        datosProducto,
        listaPuntosVenta,
        idsPuntosDisponibles,
        preciosPorPunto,
        activeForm : 'productosyservicios'
     }) 
}




//CARGAR PAGINA COMISIONES
const administrativoComisiones = async(req,res)=>{
    
     res.status(201).render('../views/dashboard/administrativo/verComisiones',{
        APPNAME : process.env.APP_NAME,
        csrfToken : req.csrfToken(),
        titulo : 'Panel Administrativo',
        subTitulo : 'Comisiones',
        active: 'administrativo',
        activeForm : 'comisiones'
     })

}


const administrativoInformes = async(req,res)=>{
    
     res.status(201).render('../views/dashboard/administrativo/verInformes',{
        APPNAME : process.env.APP_NAME,
        csrfToken : req.csrfToken(),
        titulo : 'Panel Administrativo',
        subTitulo : 'Informes',
        active: 'administrativo',
        activeForm : 'informes'
     })

}


//=====================================================================================//
//=====================================[POST METH]=====================================//
//=====================================================================================//

//ACTUALIZAR DATOS ADMIN
const datosAdminPost = async (req, res)=>{

    const { nombre, email, password, idAdministrador } = req.body;
    const { form } = req.query; 
    const activeForm = form || 'datos';

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
        activeForm,
        mostrarData : form === 'data',
        mostrarComisiones : form === 'comisiones',
        mostrarHistorial : form === 'historial',
        mostrarDocumentacion : form === 'documentacion',
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
        activeForm,
        mostrarData : form === 'data',
        mostrarComisiones : form === 'comisiones',
        mostrarHistorial : form === 'historial',
        mostrarDocumentacion : form === 'documentacion',
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
        activeForm,
        mostrarData : form === 'data',
        mostrarComisiones : form === 'comisiones',
        mostrarHistorial : form === 'historial',
        mostrarDocumentacion : form === 'documentacion',
        
        btn : 'EDITAR OTRA VEZ.'})
}

const nuevoProductoServicio = async (req,res)=>{
    const precio = Number(req.body.precio.replace(/\./g, '')).toFixed(2);

    const {nombreProductoServicio,tipo,esPrecioGlobal, sku, activo, disponible, precioPorPunto } = req.body
   // const activeForm = form || 'datos'; 
   //console.log(disponible)
   //console.log(precioPorPunto)
    
    //VALIDACIÓN DE DATOS BÁSICOS.
    await check('nombreProductoServicio')
        .notEmpty()
        .withMessage('El producto o servicio necesita un nombre')
        .run(req)
    
    await check('tipo')
        .isIn(['Servicio', 'Producto'])
        .withMessage('Debes decirme si es un Producto o Servicio')
        .run(req)
    
    await check('precio')
        .customSanitizer(
            value =>{
                if (!value) return value;
                return  value.replace(/\./g, "") 
            }
        )
        .isNumeric()
        .withMessage('El precio debe ser numérico')
        .run(req)
    
    await check('esPrecioGlobal')
        .isIn(['0', '1'])
        .withMessage('Solo puedes poner Si o No')
        .run(req)
    
    if (esPrecioGlobal === 'No') {
        await check('precioPorPunto.*')
            .customSanitizer(value => {
            if (!value) return value;
            return String(value).replace(/\./g, "");
            })
            .isNumeric()
            .withMessage('Debes ponerle el precio que va a tener en el punto de venta. ')
            .run(req);
        }

        await check('sku')
            .notEmpty()
            .withMessage('Debes darme un SKU para identicar el producto o servicio')
            .run(req)


        await check('activo')
        .isIn(['0', '1'])
        .withMessage('Solo puedes poner Si o No')
        .run(req);

        
    const resultado = validationResult(req);
    const erroresValidacion = resultado.array();
    const errsPorCampo = {};
    erroresValidacion.forEach(err => 
        {
            if (!errsPorCampo[err.path]) {
                errsPorCampo[err.path] = err.msg;
            }
    });
    const listaPuntosVenta = await PuntosDeVenta.findAll()
    //Verificamos las validaciones
    if(!resultado.isEmpty()){

        
        return res.status(201).render('../views/dashboard/administrativo/nuevoProductoServicio',{
            APPNAME : process.env.APP_NAME,
            csrfToken : req.csrfToken(),
            titulo : 'Panel Administrativo',
            subTitulo : 'Ingresar un nuevo productos y servicios',
            active: 'administrativo',
            errores :errsPorCampo,
            datosProducto : {
                nombreProductoServicio,
                tipo,
                precio,
                sku,
                esPrecioGlobal,
                activo,
                disponible,
                precioPorPunto,
            },
            listaPuntosVenta,
            activeForm : 'productosyservicios'
        })
    }


    //  INGRESAMOS EL PRODUCTO PRIMERO.

   
    const servicioProducto = await ProductosServicios.create({
        nombreProductoServicio, tipo, precio, sku, activo
    })
    
    //ESTABLECEMOS SI EL PRECIO ES GLOBAL O NO LO ES
        //SI LO ES ENTONCES INGRESAMOS LOS PRECIOS EN CADA PUNTO DE VENTA CON EL ID DEL PRODUCTO (LO CAPTURAMOS CON EL ID QUE GENERO INGRESARLO)
    const idProducto = servicioProducto.idProductoServicio;
    const unidades = 1;
    console.log(disponible);
    const puntosVenta=[]
    for (const idPuntoVenta of disponible) {
        puntosVenta.push(idPuntoVenta)
        await DisponibilidadProducto.create({
            idProductoServicio: idProducto,
            idPuntoVenta: idPuntoVenta,
            unidadesDisponibles: unidades
        });
    }

    //LUEGO VERIFICAMOS SI LOS PRECIOS SON DISTINTOS EN LOS DIFERENTES PUNTOS
    if(esPrecioGlobal == 0){
        let contador = 0;
        for(const precio of precioPorPunto ){
            
            let precioBruto = precioPorPunto[contador] || '';
            // quitar puntos y convertir a número
            const limpio = String(precioBruto).replace(/\./g, '');
            const precioNum = Number(limpio) || 0;
            await PreciosProductosServicios.create({
                idProductoServicio : idProducto,
                idPuntoVenta : puntosVenta[contador],
                precioEnPunto : precioNum,
                autorizado : true
            })
            contador++
        }
    }

    // finalizamos y retornamos a al formulario
    
    return res.status(201).render('../views/dashboard/administrativo/nuevoProductoServicio',{
        APPNAME : process.env.APP_NAME,
        csrfToken : req.csrfToken(),
        titulo : 'Panel Administrativo',
        subTitulo : 'Ingresar un nuevo productos',
        active: 'administrativo',
        success : [
            { msg : `${tipo} agregado con exito. `}
        ],
        listaPuntosVenta,
        activeForm : 'productosyservicios'
        
    })


    
    
    //FINALIZAMOS Y REENVIAMOS RESPUESTA DE SUCCESS 
    

}






export {
    homeAdministrativo,
    datosAdminPost,
    administrativoProductosServicios,
    administrativoNuevoProductoServicio,
    nuevoProductoServicio,
    administrativoComisiones, 
    administrativoInformes,
    editarProductoServicio
}