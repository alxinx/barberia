import { DataTypes } from "sequelize";
import db from "../config/db.js";

const ProductosServicios = db.define('ProductosServicios', {

    idProductoServicio : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique : true,
        primaryKey : true
    },
    nombreProductoServicio : {
        type : DataTypes.STRING,
        allowNull : false
    },
    tipo : {
        type: DataTypes.ENUM('Producto', 'Servicio'),
        defaultValue: 'Servicio'
    },
    precio : {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
        validate: {
            isDecimal: true
        }
    },

    ean : {
        type : DataTypes.STRING,
        unique : true,
        allowNull : true,
        validate : {
            len : [13,13],
            isNumeric : true
        }
    },
    sku : {
        type : DataTypes.STRING,
        unique : true,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    activo  : {
       type : DataTypes.BOOLEAN,
       defaultValue : true,
    }
}, {
    tableName : 'ProductosServicios',
    timestamps : true
});

export default ProductosServicios;
