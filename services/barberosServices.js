import { Barbero, PuntosDeVenta } from "../models/index.js";


//Load Barber Data

const loadBarberData =  async (idBarbero)=>{
    const barberData = await Barbero.findOne(
            {
                include :[
                    {
                        model : PuntosDeVenta,
                        as : 'barberia',
                        attributes : ['nombre']
                    }
                ]
            },
           {where : {idBarbero : idBarbero}}
        )
    return barberData
}



export {
    loadBarberData
}