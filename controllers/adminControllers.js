import { check , validationResult } from "express-validator";
import bcrypt from "bcrypt";
import Administrador from '../models/Administrador.js'
import { checkDuplicados } from "../helpers/checkDuplicados.js";
import {generarId, generarJwt} from "../helpers/genToken.js"
import {emailConfirmacion, emailRecuperarPassword} from '../helpers/email.js';


//LOGIN GET
const loginPage = (req, res)=>{
    res.status(201).render('../views/auth/index', {
        titulo : 'LOGIN',
        csrfToken : req.csrfToken()
    });
}

//REGISTER GET
const registerPage = (req, res)=>{
    res.status(201).render('../views/auth/register', {
        titulo : 'REGISTRO',
        csrfToken : req.csrfToken()
    }
)
}


//FORGOT GET
const forgotPassPage = (req, res)=>{
    res.status(201).render('../views/auth/forgot', {
        titulo : 'Olvide la Contraseña',
        csrfToken : req.csrfToken()
    })
}


const recoveryPassword = async (req, res)=>{
    //Valido que si sea un token válido.
    const {token} = req.params;
    const usuario =  await Administrador.findOne({where : {token}});

    //En caso que no sea un token válido, entonces lo envio a quee se registre.
    if(!usuario){
          return   res.status(201).render('../views/auth/register', {
            titulo : 'REGISTRARSE',
            errores : [{
                msg : 'El token expiró o no existe. Registrare de nuevo'
            }]
        });
    }

    res.status(201).render('../views/auth/recovery', {
        titulo : 'Recuperar Contraseña',
        csrfToken : req.csrfToken()
    })
}


//FORGOT GET
const confirmAccount = async (req, res)=>{

    const { token } = req.params

    const usuario = await Administrador.findOne({where : {token}});
    if(!usuario){
          return   res.status(201).render('../views/auth/register', {
            titulo : 'REGISTRARSE',
            errores : [{
                msg : 'El token expiró o no existe. Registrare de nuevo'
            }]
        });
    }


    //Actualizo el token y la confirmacion

    usuario.token = null;
    usuario.confirmado = true;

    await usuario.save();

    res.redirect('/admin')
}

//Autenticar usuario e ingresar a panel
const loginPagePost = async (req, res)=>{
    await check('email').trim().isEmail().withMessage('Debes darme un email').run(req);
    await check('password').trim().isLength({min: 3}).withMessage('Debes darme una contraseña válida').run(req);
    const resultado = validationResult(req);

    const {email, password} = req.body;
    
    if(!resultado.isEmpty()){
        return res.status(400).render('../views/auth/index', {
            titulo : "LOGIN",
            csrfToken : req.csrfToken(),
            errores : resultado.array(),
            usuario : {
                email : email
            }
        })
    }

    //Verifico la existencia del usuario
    const usuario  =  await Administrador.findOne({where : {email}})
    if(!usuario){
        return res.render('../views/auth/index', {
            titulo : 'Login',
            csrfToken : req.csrfToken(),
            errores : [{
                msg : '🤔 El usuario no existe '
            }]
        })
    }


    //Confirmo si el usuario ya esta válidado! 
    if(!usuario.confirmado){
        return res.render('../views/auth/index', {
            titulo : 'Login',
            csrfToken : req.csrfToken(),
            errores : [{
                msg : 'Es necesario que confirmes tu email antes de ingresar 😬'
            }]
        })
    }


    //Revisamos el password
    if(!usuario.checkPassword(password)){
        return res.render('../views/auth/index', {
            titulo : 'Login',
            csrfToken : req.csrfToken(),
            errores : [{
                msg : '🚨 Password incorrecto 🚨'
            }]
        })
    }

    //Autenticar

    //Genero el jwt 
    const tkn = generarJwt({id : usuario.idAdministrador, nombre : usuario.nombre});

    //Almaceno el JWT  en cookie
    return res.cookie('_token', tkn, {
        httpOnly : true,
        secure : false 
    }).redirect('/panel');

}


const registerPagePost =  async (req, res)=>{

    await check('nombre').trim().notEmpty().withMessage("Falta el nombre").run(req);
    await check('email')
            .trim()
            .isEmail()
            .withMessage('Debe ser un email válido')
            .run(req);

    await check('password')
            .trim()
            .isLength({min:3, max:10})
            .withMessage('la contraseña debee ser al meenos de 3 caracteres')
            .run(req);
    
    await check('password-again')
            .trim()
            .custom( (value , {req})  => {
                if(value != req.body.password ){
                    throw new Error('Las contraseñas no coinciden 🥴');}
                    return true;})
            .run(req);
    const resultado = validationResult(req);
    const {nombre, email, password} = req.body
    
    
    //Validacion
    if(!resultado.isEmpty()){
            return res.status(400).render("../views/auth/register", {
            titulo : "Registrarse",
            csrfToken : req.csrfToken(),
            errores : resultado.array(),
            usuario : {
                nombre : nombre,
                email : email
            }
        })
    }

    //Verificar que el usuario no este duplicado

    if(await checkDuplicados(Administrador,'email',email)){
        return res.status(400).render("../views/auth/register", {
            titulo : "Registrarse",
            csrfToken : req.csrfToken(),
            errores : [{
                msg : 'El email ya existe!'
            }],
            usuario : {
                nombre : nombre
            }
        })
    }
   

    //Insertar usuarios:
       
    const token = generarId();
    const administrador = await Administrador.create({
        nombre, email, password, token
    })


    //Envío el email:
    emailConfirmacion({
            nombre : nombre,
            email : email, 
            token : token
        })




        

    if(administrador){

        return res.status(400).render("../views/auth/register", {
            titulo : "Registrarse",
            csrfToken : req.csrfToken(),
            success: {
                msg : "Administrador Creado Con Éxito."
            }
        })
    }


}



//FORGOT POST
const forgotPassPagePost = async (req, res)=>{

    await check('email').trim().isEmail().withMessage('Debes darme un email válido').run(req);

    const resultado = validationResult(req);
    const { email } = req.body

    if(!resultado.isEmpty()){
            return res.status(400).render('../views/auth/forgot', {
            titulo : 'Olvide la Contraseña',
            csrfToken : req.csrfToken(),
            errores : resultado.array(),
        })
    }


    //Buscamos el usuario

    const usuario = await Administrador.findOne( {where : {email}});

     //En caso que no exista usuario
    if(!usuario){
        return res.status(400).render('../views/auth/forgot', {
            titulo : 'Olvide la Contraseña',
            csrfToken : req.csrfToken(),
            errores : [{
                msg : 'Revisa el email, no lo encuentro 🥴'
            }]
        })
    }

    //Actializo los datos

    usuario.token = generarId();
    usuario.save()


    console.log(usuario.email)
    //Enviar Email
    emailRecuperarPassword( usuario.token,  usuario.email, usuario.nombre)


    //Render Mensaje  revisar su bandeja
    return res.status(400).render('../views/auth/forgot', {
            titulo : 'Olvide la Contraseña',
            csrfToken : req.csrfToken(),
            success : [{
                msg : 'Te enviamos un email con las instrucciones para recuperar la contraseña 😊.'
            }]
        })

    


}


const recoveryPasswordPost = async (req, res)=>{

    //Valido los campos.
    await check('password').trim().notEmpty().isLength({min : 3}).withMessage('Debes darme una contraseña al menos de 3 caracteres.').run(req);
    await check('password_again').trim().custom(( value , {req})=>{
        if(value != req.body.password){
            throw new Error ('Las contraseñas no coinciden');
            
        }
        return true;
    } ).run(req);


    const resultado =  validationResult(req);

    if(!resultado.isEmpty()){
         return res.render('../views/auth/recovery', {
            titulo : 'Reestablecer password',
            csrfToken : req.csrfToken(),
            errores : resultado.array()})
    }

    const token = req.params.token;
    const { password } = req.body;

    //Cambio la conotraseña.

    const usuario =  await  Administrador.findOne({where : {token}});

    //Verifico que si exista el token
    if(!usuario){
        return res.render('../views/auth/register', {
            titulo : "Registro",
             csrfToken : req.csrfToken(),
             errores : [{
                msg : "El token con que intentaste  cambiar la contraseña es inválido."
             }]
        })
    }

    const sailt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, sailt);
    usuario.token = null;
    await usuario.save();


    res.status(201).render('../views/auth/', {
        titulo : "Login",
        csrfToken : req.csrfToken(),
        success : [{
            msg : 'Contraseña restablecida correctamente'
        }]

    })

    



}


export {loginPage, 
        registerPage, 
        forgotPassPage, 
        registerPagePost, 
        loginPagePost, 
        forgotPassPagePost,
        recoveryPassword,
        recoveryPasswordPost,
    confirmAccount}