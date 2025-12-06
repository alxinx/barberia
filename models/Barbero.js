import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Barbero = db.define('Barbero', {

    idBarbero: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true
    },

    nombreBarbero: {
        type: DataTypes.STRING,
        allowNull: false
    },

    apellidoBarbero: DataTypes.STRING,

    identificacionBarbero: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },

    whatsApp: DataTypes.STRING,

    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    tipoEmpleado : {
        type : DataTypes.ENUM('Barbero', 'Administrador', 'Otro'),
        defaultValue : 'Barbero'
    },

    direccionBarbero: {
        type: DataTypes.STRING,
        allowNull: false
    },

    ciudad: DataTypes.STRING,

    comision: {
        type: DataTypes.DECIMAL(5,2),
        defaultValue: 0.00
    },

    idBarberia: {
        type: DataTypes.UUID,
        allowNull: false
    },

    foto: DataTypes.STRING

}, {
    tableName: 'Barbero',
    timestamps: true
});
 
export default Barbero;
