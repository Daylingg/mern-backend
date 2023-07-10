const moment=require('moment')


const isDate=(value)=>{

    //console.log(value)
    if(!value){//si no existe
        return false //si regresa false el campo no es correcto
    }

    const fecha=moment(value)

    if(fecha.isValid()){//si la fecha es valida retornamos true
        return true
    }else{
        return false
    }
}

module.exports={
    isDate
}