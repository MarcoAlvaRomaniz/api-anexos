//llamado de express
const express = require('express');
//llamado del metodo router
const router = express.Router();
//importacion del servicio
const Mail = require('../service/mail.services');
//importacion multer
const multer = require('multer');
const mail = new Mail();

router.post('/',async(req,res)=>{
    const {body} = req;
    try {
        const enviarCorreo = await mail.send(body);
        if(enviarCorreo){
            res.status(201).json({success:true, message:"correo enviado con éxito"});
        }
    } catch (error) {
        res.status(500).json({success:false, message:"Error al enviar correo"});
    }
})
module.exports = router;