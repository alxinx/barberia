import { DataTypes, STRING } from "sequelize";
import db from "../config/db.js";

const Cliente = db.define('Cliente', {

    idCliente : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique : true,
        primaryKey : true
    },
    nombreCliente : {
        type : DataTypes.STRING,
        allowNull : false
    },
    apellidoCliente : DataTypes.STRING,
    email : {
        type : DataTypes.STRING,
        validate : {
            isEmail : true
        }
    },
    whatsApp : DataTypes.STRING,

    
    convenio  : {
       type : DataTypes.BOOLEAN,
       defaultValue : true,
    }
}, {
    tableName : 'Cliente',
    timestamps : true
});

export default Cliente;
