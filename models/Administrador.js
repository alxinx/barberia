import { DataTypes, Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db.js";



const Administrador = db.define('Administradores', {
    idAdministrador : {
        type : DataTypes.INTEGER,
        autoIncrement : true, 
        allowNull : false,
        primaryKey : true,
    },

    nombre : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
        validate : {
            isEmail : true,
        }
    },
    password : {
        type : DataTypes.STRING,
        allowNull: false,
    },
    token : DataTypes.STRING,
    confirmado : {
        type : DataTypes.BOOLEAN,
        defaultValue : false,
    },
    privilegios : {
        type : DataTypes.ENUM('ADMINISTRADOR', 'COBRADOR', 'DEUDOR'),
        default : 'ADMINISTRADOR'
    }

},
{
    timestamps: true, 
    tableName: 'Administradores' ,
    hooks : {
        beforeCreate : async function (administrador) {
            const sailt = await bcrypt.genSalt(10);
            administrador.password = await bcrypt.hash(administrador.password, sailt);
        }


    }
},
)

//PROTOTYPES FOR PASSWORD
Administrador.prototype.checkPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}




export default Administrador;

