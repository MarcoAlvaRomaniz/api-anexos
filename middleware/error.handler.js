//middlerware para identificar errores en la consola
function logErrors(err,req,res,next){
    console.log('[LOG ERROR]:');
    console.log(err);
    next(err);
}
//middlerware para enviar al cliente
function errorHandler(err,req,res,next){
    console.log('[ERROR HANDLER];')
    res.status(500).json({
        message:err.message,
        stack:err.stack
    })
}
module.exports = {logErrors, errorHandler};