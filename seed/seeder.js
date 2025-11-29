import productosServicios from './productosServicios.js';
import ProductosServicios from '../models/ProductoServicio.js'
import Cliente from '../models/Cliente.js'
import clientes from './clientes.js'
import barberos from './barberos.js';

import {Barbero, PuntosDeVenta} from "../models/index.js"


import db from '../config/db.js';


const importarDatos = async () => {
    try {
        //Autentico
        await db.authenticate();
        console.log('Conexión a DB OK');
       //Genero Columnas
        await db.sync(); 


        await Promise.all(
            [   Barbero.bulkCreate(barberos),

            ],
    
        )
        console.log('Datos Importados')
        process.exit(0);

    } catch (error) {
        console.log(`El error es : ${error} `);
        process.exit(1)
        
    }
}


//Eliminaré todos los datos en caso de ser necesario. 
const eliminarDatos = async()=>{

    try {   
        Promise.all([
            Cliente.destroy({where : {}, truncate : true}),
            ProductosServicios.destroy({where : {}, truncate : true})
        ])
        
    } catch (error) {
        console.log(`Error al eliminar : ${error}`);
        process.exit(1);
    }
}

if(process.argv[2]=== '-i'){
    importarDatos()
}

if(process.argv[2]=== '-e'){
    eliminarDatos()
}