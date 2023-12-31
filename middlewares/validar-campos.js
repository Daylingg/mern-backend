const {response}=require('express');
const {validationResult}=require('express-validator');

const validarCampos=(req,res=response,next)=>{

    //manejo de errores
    const errors=validationResult(req)
    if(!errors.isEmpty()){//si hay errores
        return res.status(400).json({
            ok:false,
            msg:errors.mapped()
        })
    }

    next();

}

module.exports={
    validarCampos
}