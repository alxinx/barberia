import { DataTypes, STRING, UUIDV4 } from "sequelize";
import db from "../config/db.js";

const PreciosXPunto = db.define('PreciosProductosServicios', {
    id : {
        type: DataTypes.INTEGER,
        unique : true,
        autoIncrement : true,
        primaryKey : true
    },
    idProductoServicio : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull : false,
        references : {
            model : 'ProductosServicios',
            key : 'idProductoServicio'    
        },
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
   
    },
    idPuntoVenta : {
        type : DataTypes.UUID,
        defaultValue : UUIDV4,
        allowNull : false,
        references : {
            model : 'PuntosDeVenta',
            key : 'idPuntoVenta'
        },
        onDelete : 'CASCADE',
        onUpdate : 'CASCADE'
    },
    precioEnPunto : {
        type : DataTypes.DECIMAL(10,2),
        defaultValue : 0,
    },
    autorizado : {
        type : DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue : false,
    }

}, {
    tableName : 'PreciosProductosServicios',
    timestamps : true
});

export default PreciosXPunto;
