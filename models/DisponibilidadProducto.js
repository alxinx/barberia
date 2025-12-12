import { DataTypes, UUIDV4 } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db.js";

const DisponibilidadProducto = db.define('disponibilidadProducto', {
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
    unidadesDisponibles : {
        type: DataTypes.INTEGER,
        defaultValue : 1,
    }

}, {
    tableName : 'disponibilidadProducto',
    timestamps : true,
    
})


export default DisponibilidadProducto;
