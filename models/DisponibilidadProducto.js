import { DataTypes, STRING, UUIDV4 } from "sequelize";
import db from "../config/db.js";

const DisponibilidadProducto = db.define('disponibilidadProducto', {

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
    unidadesDisponibles : {
        type : DataTypes.INTEGER,
        defaultValue : 1
    }
}, {
    tableName : 'disponibilidadProducto',
    timestamps : true
});

export default DisponibilidadProducto;
