import Barbero from "./Barbero.js";
import PuntosDeVenta from "./PuntosDeVenta.js";
import Administrador from './Administrador.js';  
import ProductosServicios from './ProductoServicio.js'

PuntosDeVenta.hasMany(Barbero, {
  as: 'barberos',
  foreignKey: 'idBarberia',         // 👈 NOMBRE REAL EN TABLA BARBERO
  sourceKey: 'idPuntoVenta'         // 👈 PK REAL EN PUNTOS DE VENTA
});

Barbero.belongsTo(PuntosDeVenta, {
  as: 'barberia',
  foreignKey: 'idBarberia',         // 👈 FK real
  targetKey: 'idPuntoVenta'         // 👈 PK real
});


    export {
        Barbero,
        PuntosDeVenta,
        Administrador,
        ProductosServicios
    }