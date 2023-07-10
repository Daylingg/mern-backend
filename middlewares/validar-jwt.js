const {response}=require('express')
const jwt=require('jsonwebtoken')


const validarJWT=(req, res=response, next)=>{

    const token=req.header('x-token')

    if(!token){//si da null o undefine lanzmos msj de error pq no esta autenticado
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la peticion'
        })
    }

    try {

        //extraemos el payload pq me interesa el uid del usuario...se desestructura el payload para extraer el uid y el name
        //const payload=jwt.verify(
        const {uid,name}=jwt.verify(    
            token,
            process.env.SECRET_JWT_SEED
        )

        //console.log(payload)
        req.uid=uid
        req.name=name
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no valido'
        })
    }

    next()

}



module.exports={
    validarJWT
}