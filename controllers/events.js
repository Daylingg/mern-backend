const {response}=require('express');
const Evento=require('../models/Evento')

const getEventos=async(req,res=response)=>{

    //con el find se buscan todos los eventos......con el populate se le pasa una referencia en este caso el user y devuelve todo, si solo queremos el nombre y id basta con especificar con comas los datos q queremos
    const eventos = await Evento.find().populate('user','name')

    return res.json({
        ok:true,
        eventos
    })

}

const crearEvento= async (req,res=response)=>{

    //console.log(req.body)
    const evento=new Evento(req.body)

    try {

        evento.user=req.uid
        const eventoGuardado= await evento.save()

        res.json({
            ok:true,
            evento: eventoGuardado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hubo un error, hable con el administrador'
        });
    }
    
    
}

const actualizarEvento=async(req,res=response)=>{

    const eventoId=req.params.id
    const uid=req.uid

    try {

        const evento=await Evento.findById(eventoId)

        if(!evento){//si no existe el evento lanzo error
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }

        if(evento.user.toString()!==uid){//si el usuario es diferente al uid no puede cambiar el evento de otro usuario
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio para hacer esta accion'
            })
        }

        const nuevoEvento={//creo un nuevo evento y lo desestructuro todo lo q me mande
            ...req.body,
            user:uid //se adiciona el user pq en la peticion no viene
        }

        const eventoActualizado= await Evento.findByIdAndUpdate(eventoId,nuevoEvento,{new:true})//se busca el evento por el id y se actualiza...se le pasa el id y el evento actualizado...{new:true} nos permite ver el documento actualizado

        res.json({
            ok:true,
            evento:eventoActualizado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hubo un error, hable con el administrador'
        })
    }

}

const eliminarEvento=async(req,res=response)=>{

    const eventoId=req.params.id
    const uid=req.uid

    try {

        const evento=await Evento.findById(eventoId)

        if(!evento){//si no existe el evento lanzo error
            return res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }

        if(evento.user.toString()!==uid){//si el usuario es diferente al uid no puede cambiar el evento de otro usuario
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio para hacer esta accion'
            })
        }


        await Evento.findByIdAndDelete(eventoId)//se busca el evento por el id y se elimina...se le pasa el id 

        res.json({
            ok:true
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hubo un error, hable con el administrador'
        })
    }


}



module.exports={
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}