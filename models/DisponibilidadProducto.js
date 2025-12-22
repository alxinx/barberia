import { DataTypes, UUIDV4 } from "sequelize";
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
    },
    recibido : {
        type : DataTypes.BOOLEAN,
        defaultValue : true
    }

}, {
    tableName : 'disponibilidadProducto',
    timestamps : true,
    indexes :[
        {
            unique : true,
            fields : ['idProductoServicio', 'idPuntoVenta']
        }
    ]
    
}, )


export default DisponibilidadProducto;
