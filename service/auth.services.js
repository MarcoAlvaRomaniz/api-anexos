const {db} = require('../bd/firebase.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//creacion de clases
class Auth{
    constructor(){
        this.collection = 'users';
        this.jwtkey = process.env.JWT_KEY;
    }
    async create(data){
        const {correo, pass} =data
        if(!correo || !pass){
            return {success:false,message:'datos faltantes para crear usuario'};
        }
        try{
            console.log("entrarndo al try")
            const user = await db.collection(this.collection).where("correo","==",correo).get();
            console.log(user);
            if(!user.empty){
                console.log('Ese usuario ya existe');
                return {success:false,message:'El usuario ya existe'};
            }
            const passHash = await bcrypt.hash(pass,10);
            data.pass = passHash;
            const nuevoUsuario = await db.collection(this.collection).add(data);
            if(nuevoUsuario.id){
                return{success:true}
            }

        }catch(error){
            return {success:false,error};
        }
        return {success:true,data};
        
    }
    async login(data){
        console.log('[ERROR AQUI]',data)
        const {correo,pass}= data;
        if(correo.empty || pass.empty){
            return{success:false,message:'faltan datos para ingreso al sistema'};
        }
        const usuarioBD = await db.collection(this.collection).where("correo","==",correo).get();
        const passBD = usuarioBD.docs[0].data().pass;
        // if(!usuarioBD.exists){
        //     return{sucess:false,message:'el usuario no existe'};
        // }
        console.log(usuarioBD);
        const isValidPass = await bcrypt.compare(pass,passBD);
        console.log(isValidPass);
        if(!isValidPass){
            return{sucess:false,message:'datos incorrectos vuelve a intentar'};
        }
        const token = jwt.sign({usuarioDatos:data},this.jwtkey,{expiresIn:'1h'})
        return{sucess:true, data:token};
    }
}
module.exports = Auth;