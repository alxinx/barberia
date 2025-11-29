import express from "express";
import {loginPage, registerPage, forgotPassPage, registerPagePost, loginPagePost, recoveryPasswordPost, recoveryPassword,  forgotPassPagePost, confirmAccount} from '../controllers/adminControllers.js'
const route = express.Router();

route.get('', loginPage)
route.get('/register',registerPage)
route.get('/forgot',forgotPassPage)
route.get('/confirmar/:token', confirmAccount)
route.get('/recuperar/:token',recoveryPassword)


route.post('', loginPagePost)
route.post('/register', registerPagePost)
route.post('/forgot', forgotPassPagePost);
route.post('/recuperar/:token',recoveryPasswordPost)



export default route