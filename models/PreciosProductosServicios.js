import { DataTypes } from "sequelize";
import db from "../config/db.js";

const PreciosProductosServicios = db.define('PreciosProductosServicios', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
    },
    idProductoServicio : {
        type : DataTypes.UUID,
        allowNull :false
    }, 
    idPuntoVenta : {
         type : DataTypes.UUID,
        allowNull :false
    },
    precioEnPunto : {
        type: DataTypes.DECIMAL(10,2),
        defaultValue : 0,
    },
    autorizado : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : false
    }

}, {
    tableName : 'PreciosProductosServicios',
    timestamps : true,
    indexes : [{
        unique : true,
        fields : ['idProductoServicio', 'idPuntoVenta']
    }]
    
})


export default PreciosProductosServicios;

