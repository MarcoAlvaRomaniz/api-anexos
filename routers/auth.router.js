//llamado de express
const express = require('express');
//router de express
const router = express.Router();

const Auth = require('../service/auth.services');
const { json } = require('body-parser');
const auth = new Auth();
const multer = require('multer')
const uploadNone = multer();

router.post('/login',uploadNone.none(),async(req,res,next)=>{
    try{
        const {body} = req;
    
        const login = await auth.login(body);
        if(login.success){
            res.status(200).json(login);
        }else{
            res.status(404).json(login);
        } 
    }catch(error){
        next(error);
    }
    
})
router.post('/',async(req,res,next)=>{
    try{
        const {body, params} = req;
        const crear = await auth.create(body);
        if(crear.success){
            res.status(200).json({success:true,message:'usuario creado',data:crear.data});
        }else{
            res.status(400).json({success:false,message:crear.message});
        }
        
    }catch(error){
        next(error);
    }
})

module.exports = router;