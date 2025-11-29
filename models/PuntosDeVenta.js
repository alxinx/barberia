import { DataTypes, UUIDV4 } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db.js";

const PuntosDeVenta = db.define('PuntosDeVenta', {
    idPuntoVenta : {
        type : DataTypes.UUID,
        defaultValue : UUIDV4,
        unique : true,
        primaryKey : true,
        allowNull : false
    },
    nombre : {
        type : DataTypes.STRING,
        allowNull : false,
        set(value){
            this.setDataValue('nombre', value.toLowerCase())
        }
    },
    direccion :  DataTypes.STRING,
   WhatsApp: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
        // solo dígitos, opcionalmente comenzando por +
        is: /^[+]?\d+$/i
        }
    },
    ciudad : {
        type : DataTypes.STRING,
        allowNull : false,
        defaultValue : 'Medellín'
    },
    capacidad : {
        type : DataTypes.INTEGER,
        allowNull : false,
        defaultValue : 1,
        validate : {
            min : 1
        }
    },
    nit : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
    },
    razonSocial : DataTypes.STRING,
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
        set(value) {
            this.setDataValue('email', value.toLowerCase())
        },
        validate : {
            isEmail : true
        }
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    foto : DataTypes.STRING,
}, {
    tableName : 'PuntosDeVenta',
    timestamps : true,
    hooks : {
        beforeCreate : async function(puntoVenta){
            const salt = await bcrypt.genSalt(10);
            puntoVenta.password = await bcrypt.hash(puntoVenta.password, salt )
        },
       beforeUpdate : async function(puntoVenta){
             if (puntoVenta.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    puntoVenta.password = await bcrypt.hash(puntoVenta.password, salt);
                }
}
    }
})


export default PuntosDeVenta;

