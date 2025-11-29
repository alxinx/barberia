import express from "express";
import csrf from "csurf";
import dotenv from 'dotenv';
import multer from "multer";
import cookieParser from "cookie-parser";
import db from "./config/db.js"
import adminRoutes from "./routes/adminRoutes.js";
import dashboardRoute from "./routes/dashboardRoute.js"


dotenv.config;
const app = express();
const port = process.env.APP_PORT;
const upload = multer();

try {
    db.sync()
    await db.authenticate();
    console.log('Conection Success')
} catch (error) {
    console.log(`No se pudo conectar:  ${error}`)
}




app.use(express.urlencoded({extended: true}));
app.use( express.static('public'));
app.set("view engine", "pug");
app.set("views", "./views");
app.use(upload.any());
app.use (cookieParser());
app.use (csrf({ cookie : true}))



app.use('/admin',adminRoutes);
app.use('/panel', dashboardRoute);





app.listen(port, 
    console.log(`server run in ${process.env.APP_URL}:${port}`)
)
 