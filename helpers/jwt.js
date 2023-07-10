const jwt =require('jsonwebtoken')


const generarJWT=(uid,name)=>{//se pasa como parametro lo q se necesita en el payload del token

    return new Promise((resolve,reject)=>{
        const payload={uid,name};

        //la firma del token(sing) tiene el payload, la palabra secreta para formar el token, la duracion y cuando se firma se llama al callback en el q tengo un error y si no se pudo generar el token mando el error
        jwt.sign(payload,process.env.SECRET_JWT_SEED,{expiresIn:'2h'},(err,token)=>{
            if(err){
                console.log('No se pudo generar el token')
                reject('No se pudo generar el token')
            }
            //si todo salio bien devuelvo el token
            resolve(token)
        })
    })

}


module.exports={
    generarJWT
}