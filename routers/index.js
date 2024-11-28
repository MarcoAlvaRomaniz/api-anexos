//llamado de express para el servidor
const express = require('express');
//importacion de la ruta de condiciones
const anexosRouter = require('./anexo.ruoter.js');
const authRouter = require('./auth.router.js');
const mailRouter = require('./mail.router.js');
const { auth } = require('firebase-admin');


function routerAPI(app){
    const router = express.Router();
    app.use('/api/v1',router);
    router.use('/anexos',anexosRouter);
    router.use('/auth',authRouter);
    router.use('/mail',mailRouter);
}
module.exports = routerAPI;
