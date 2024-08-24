//llamado de express para el servidor
const express = require('express');
//importacion de la ruta de condiciones
const anexosRouter = require('./anexo.ruoter.js');

function routerAPI(app){
    const router = express.Router();
    app.use('/api/v1',router);
    router.use('/anexos',anexosRouter);
}
module.exports = routerAPI;
