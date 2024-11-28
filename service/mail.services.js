const nodemailer = require("nodemailer");

class Mail{
    constructor(){
        this.email = "sti@siradiacion.com.mx",
        this.password = "sir249-5",
        this.port = 587
    }
    async send(body){
        const confiMail ={
            host:"mail.siradiacion.com.mx",
            port:587,
            secure:false,
            auth:{user:this.email,pass:this.password}
        }
        //creamos la variable que va a realizar la funcion de enviar
        const transport = nodemailer.createTransport(confiMail);
        //configuracion del correo a enviar
        const opcionesCorreo ={
            from:"sti@siradiacion.com.mx",
            to:body.destinatario,
            subject:`${body.asunto}`,
            html:`
                ${body.mensaje}
            `
        }
        //Enviar correo
        await transport.sendMail(opcionesCorreo,(err,info)=>{
            if(err){
                return false;
            }else{
                console.log("Datos de envio", info);
            }
        })




        return true;
    }

}

module.exports = Mail;