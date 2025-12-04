import express from "express";
import { check, validationResult } from "express-validator";

const homeAdministrativo = (req,res)=>{
    res.status(201).render('../views/dashboard/administrativo/ver',{
        APPNAME : process.env.APP_NAME,
        csrfToken : req.csrfToken(),
        titulo : 'Panel Administrativo',
        subTitulo : 'Control Administrativo de las barberias',
        active: 'administrativo',
    })
}

export {
    homeAdministrativo  
}