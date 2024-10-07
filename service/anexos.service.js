const {db} = require('../bd/firebase.js');

class Anexo {
    constructor(){
        this.collection = 'Anexos';
    }
    async getAll(limit = 10000, lastDoc = null){
        let query =  db.collection(this.collection).limit(limit);
        if(lastDoc){
            query = query.startAfter(lastDoc);
        }
        const getAnexos = await query.get();
        const anexos = getAnexos.docs.map(item => ({id: item.id, ...item.data() }));

        return {
            success: true,
            data: anexos,
            lastDoc: getAnexos.docs.length > 0 ? getAnexos.docs[getAnexos.docs.length - 1] : null
        };
    }
    async getOne(id) {
        const getAnexo = await db.collection(this.collection).doc(id).get();
        if(!getAnexo.exists){
            return{
                success:false,
                message:'el anexo solicitado no existe'
            }
        }
        return{
            success:true,
            data: getAnexo.data()
        };
        
    }
    async create(data){
        const addNewAnexo = await db.collection(this.collection).add(data);
        if(addNewAnexo.id){
            return{
                data:{
                    ...data,id:addNewAnexo.id
                },
                success:true,
                message:'Anexo creado con exito'
            }
        }else{
            return{
                succes:false,
                message:'Anexo no creado'
            };
        }
    }
    async update(id,newdata){
        console.log('[ID]',id);
        try{
            await db.collection(this.collection).doc(id).update(newdata);
            return{
                success:true,
                message:'Anexo actualizado con exito'
            };
        }catch(error){
            return{
                success:false,
                message:'Error completamente desconocido al actualizar el registro'
            }
        }
    }
    async delete(id){
        try{
            await db.collection(this.collection).doc(id).update({status: 'Baja'});
            return{
                success:true,
                message:'Registro dado de baja'
            }
        }catch(error){
            return{
                success:false,
                message:`Erro al momento de modificar el registro para baja, registro solicitado ${id}`
            };
        }
    }
}
module.exports = Anexo;