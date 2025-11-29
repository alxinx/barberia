import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import {Administrador} from '../models/index.js';
dotenv.config();
const rutaProtegida = async (req, res, next)=>{
    const token = req.cookies?._token //Capturo el token en la cookie
    if(!token){
        return res.status(401).json({ error: 'No autorizado' });
    }
    try {
        const decoded = jwt.verify(token, process.env.APP_PRIVATEKEY);
        //idAdministrador
        const admin = await Administrador.findByPk(decoded.id.id)
        if (!admin){
            return res.redirect('/login');
        }

        // Disponibles para controladores y vistas
        req.admin = admin.nombre;
        res.locals.admin = admin.nombre;
        res.set('Cache-Control', 'no-store');
        next();

    } catch (e) {
        console.error('Error en protegerRuta:', e.message);
       // return res.redirect('/admin');
      }

}


export {
    rutaProtegida
}