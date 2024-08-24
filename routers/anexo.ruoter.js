//Lamado de express
const express = require('express');
//llamado del metodo router
const router = express.Router();
//importacion del servicio
const Anexo = require('../service/anexos.service');
//importacion multer
const multer = require('multer');
const { db } = require('../bd/firebase');
//se crea una instancia para multer para cuando no se reciben archivos
const uploadNone = multer();
//instancia para la clase anexos
const anexo = new Anexo();
// crear rutas para la funcion
router.get('/',async(req,res,next)=>{
    try{
        const getAllAnexos = await anexo.getAll();
        res.status(200).json(getAllAnexos);
    }catch(error){
        next(error);
    }
})
router.get('/:id',async(req,res,next)=>{
   const { id } =req.params;
   try{
        const getAnexo = await anexo.getOne(id);
        res.status(200).json(getAnexo);
   }catch(error){
    next(error);
   }
   
})
router.post('/',uploadNone.none(),async(req,res,next)=>{
    try{
        let data = req.body;
        console.log('Prueba de llegada',data);
        let newAnexo = await anexo.create(data);
        res.status(200).json(newAnexo);        
    }catch(error){
        next(error);
    }
})
router.patch('/:id',uploadNone.none(),async(req,res,next)=>{
    //extraer el id del objeto solicitu del subobjeto params y hacer una destructuracion
    const {id}=req.params;
    //consultar el body de la solicitud
    const {body}=req;
    //intento de mandar los datos el service
    try{
        //proceso de actualizacion
        const update = await anexo.update(id,body);
        //al terminar el update con await se envia una respuesta a la consola con respuesta satisfactoria
        res.status(200).json(update);
    }catch(error){
        res.status(500).json(update);
        next(error)
    }
})
//ruta para eliminacion de un anexo especifico, consultado por id
router.delete('/:id',uploadNone.none(),async(req,res,next)=>{
    try{
        const {id} = req.params;
        const deleteAnexo = await anexo.delete(id);
        res.status(200).json(deleteAnexo); 
    }catch(error){
        next(error)
    }    
})
//modificar un registro de anexo
module.exports = router;