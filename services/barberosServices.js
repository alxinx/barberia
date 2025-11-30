import { Barbero, PuntosDeVenta } from "../models/index.js";


//Load Barber Data

const loadBarberData = async (idBarbero) => {
  const barberData = await Barbero.findOne({
    where: { idbarbero: idBarbero },
    include: [
      {
        model: PuntosDeVenta,
        as: 'barberia',
        attributes: ['nombre']
      }
    ]
  });

  return barberData;
};




export {
    loadBarberData
}