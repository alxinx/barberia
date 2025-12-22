import Barbero from "./Barbero.js";
import PuntosDeVenta from "./PuntosDeVenta.js";
import Administrador from './Administrador.js';
import DisponibilidadProducto from './DisponibilidadProducto.js';
import ProductosServicios from './ProductoServicio.js';
import PreciosXPunto from './preciosProducto.js'
import PreciosProductosServicios from './PreciosProductosServicios.js'

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


// Un producto tiene muchas disponibilidades
ProductosServicios.hasMany(DisponibilidadProducto, { 
  foreignKey: "idProductoServicio",
  as : 'disponibilidades',
});

// Un producto tiene muchos precios por punto
ProductosServicios.hasMany(PreciosXPunto, {
  foreignKey : 'idProductoServicio',
  as : 'preciosPorPunto',
});

// Cada precio por punto pertenece a un producto
PreciosXPunto.belongsTo(ProductosServicios, {
  foreignKey: "idProductoServicio",
  as : 'producto',
});

// Cada disponibilidad pertenece a un producto
DisponibilidadProducto.belongsTo(ProductosServicios, {
  foreignKey: "idProductoServicio", 
  as : 'producto',
});



PuntosDeVenta.hasMany(DisponibilidadProducto, {
    foreignKey: "idPuntoVenta",
    as : 'disponibilidades'
  });
  
DisponibilidadProducto.belongsTo(PuntosDeVenta, {
    foreignKey: "idPuntoVenta",
    as : 'puntoDeVenta' 
  })


    export {
        Barbero,
        PuntosDeVenta,
        Administrador,
        DisponibilidadProducto,
        ProductosServicios,
        PreciosXPunto,
        PreciosProductosServicios
    }