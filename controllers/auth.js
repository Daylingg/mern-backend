const {response}=require('express');//desestructuro esto express.response para obt la ayuda del tipado
const bcrypt=require('bcryptjs')
const Usuario=require('../models/Usuario')
const {generarJWT}=require('../helpers/jwt')



const crearUsuario=async(req,res=response)=>{
    //console.log(req.body)
    const{name,email,password}=req.body

    try {
        let usuario =await Usuario.findOne({email})//se busca si un usuario tiene el correo q se esta pasando
        
        if(usuario){//si devuelve null no existe el correo pero si existe retornamos un error
            return res.status(400).json({
                ok:false,
                msg:'Un usuario existe con ese correo'
            })
        }
        usuario=new Usuario(req.body)

        //encriptar contraseña
        const salt = bcrypt.genSaltSync()
        usuario.password=bcrypt.hashSync(password,salt)

        await usuario.save()//graba en base de datos

        //generar token JWT ...para q el usuario se loguee desde q cree su cuenta
        const token = await generarJWT(usuario.id,usuario.name)

        res.status(201).json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hubo un error, hable con el administrador'
        })
    }
    
}


const loginUsuario=async(req,res=response)=>{
    
    const{email,password}=req.body

    try {
        const usuario =await Usuario.findOne({email})//se busca si un usuario tiene el correo q se esta pasando
        
        if(!usuario){//si no encuentra el usuario por el correo lanza un error
            return res.status(400).json({
                ok:false,
                msg:'El usuario no existe con ese correo'
            })
        }

        //confirmar los password
        const validPassword= bcrypt.compareSync(password,usuario.password)//compara el password q se entra con el q esta en la bd

        if(!validPassword){//si no es valido el password lanzamos un error
            res.status(400).json({
                ok:false,
                msg:'Password incorrecto'
            })
        }

        //generacion del token json web token 
        const token = await generarJWT(usuario.id,usuario.name)

        res.status(201).json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hubo un error, hable con el administrador'
        })
    }
    
    
}


const revalidarToken=async(req,res=response)=>{
    
    const {uid, name}=req //de la req extraemos el uid y el name del usuario para generar un token
    

    //generar JWT
    const token = await generarJWT(uid,name)

    res.status(201).json({
        ok:true,
        uid,
        name,
        token
    })
}

module.exports={
    crearUsuario,
    revalidarToken,
    loginUsuario
}