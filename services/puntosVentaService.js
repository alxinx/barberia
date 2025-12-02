import { Barbero, PuntosDeVenta } from "../models/index.js";

import { Op } from "sequelize";


let cacheListadoPuntosVenta = null;
const obtenerListadoBarberias = async ()=>{
    if (cacheListadoPuntosVenta !== null) {
        return cacheListadoPuntosVenta;
    }
    cacheListadoPuntosVenta = await PuntosDeVenta.findAll({
        order : [['nombre', 'ASC']]
    })
    return cacheListadoPuntosVenta
}


let cacheListadoBarberos = null;
const obtenerListadoBarberos = async () => {
  try {
    if (cacheListadoBarberos !== null) {
      return cacheListadoBarberos;
    }

    cacheListadoBarberos = await Barbero.findAll({
      include: [
        {
          model: PuntosDeVenta,
          as: 'barberia',
          attributes: ['nombre']
        }
      ],
      order: [['nombreBarbero', 'ASC']]
    });

    return cacheListadoBarberos;
  } catch (error) {
    console.error('Error en obtenerListadoBarberos:');
    console.error('message:', error.message);
    console.error('sql:', error.parent?.sql);
    console.error('sqlMessage:', error.parent?.sqlMessage);
    throw error; // para que Express siga mostrando el stack arriba
  }
};



const obtenerCamposDuplicados = async ({ whatsApp, email, identificacionBarbero, idBarbero }) => {
  // Construimos el where base

  console.log('ID BARBERO DESDE DUPLICADO:', idBarbero)
  const where = {
    [Op.or]: [
      { whatsApp },
      { identificacionBarbero },
      { email }
    ]
  };

  // Si estamos editando, excluimos el propio registro
  if (idBarbero != null) {
    where.idbarbero = { [Op.ne]: idBarbero }; // 👈 mismo nombre que en la BD
  }

  const registro = await Barbero.findOne({ where });

  let camposDuplicados = [];
  if (!registro) {
    return camposDuplicados;
  }

  if (registro.whatsApp === whatsApp) {
    camposDuplicados.push({
      msg: 'El WhatsApp ya está registrado',
      param: 'whatsApp'
    });
  }

  if (registro.email === email) {
    camposDuplicados.push({
      msg: 'El Email ya existe.',
      param: 'email'
    });
  }

  if (registro.identificacionBarbero === identificacionBarbero) {
    camposDuplicados.push({
      msg: 'El número de identificación ya existe.',
      param: 'identificacionBarbero'
    });
  }

  return camposDuplicados;
};







//Invalido el cache cuando por ejemplo, guardo un nuevo punto de venta. 
const invalidaCacheListado = () => {

    cacheListadoPuntosVenta = null
}


export {
    obtenerListadoBarberias,
    invalidaCacheListado,
    obtenerCamposDuplicados,
    obtenerListadoBarberos
}