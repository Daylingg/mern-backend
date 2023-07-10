const {Schema,model}=require('mongoose')
const Usuario = require('./Usuario')


const EventoSchema= Schema({
    title:{
        type:String,
        required:true
    },
    notes:{
        type:String
    },
    start:{
        type:Date,
        required:true
    },
    endD:{
        type:Date,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,   //le dice a mongoose q esto es una referencia
        ref:Usuario,  //la referencia va a ser de usuario
        required:true
    }
})

//modificacion para verlo en json no en la base de datos....quita el __v y pone el id como lo quiero
EventoSchema.method('toJSON',function(){
    const {__v, _id, ...object}=this.toObject()
    object.id=_id
    return object
})

module.exports=model('Evento',EventoSchema)