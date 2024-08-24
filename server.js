//importo las rutas 
const routerAPI = require('./routers/index.js');
const express = require('express');
const app = express();
const port = 3000;
//manejo de archivos
const fs = require('fs');
//variable para envio de informacion
const {send} = require('process');
const server= require('http').Server(app);
//Llamado de cors
const cors= require('cors');
//manejador de errores
const {logErrors, errorHandler} = require('./middleware/error.handler.js');
const {log} = require('console');
app.use(cors());
app.use(express.json());
routerAPI(app);
app.use(logErrors);
app.use(errorHandler);
//inicio de estaticos para poder renderizar los archivos de imagen
app.use('/uploads',express.static('uploads'));

//inicio del servidor
app.listen(port,()=>{
    console.log(`servidor escuchando en http://localhost:${port}`);
})