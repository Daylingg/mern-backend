/**rutas de usuarios
    host + /api/auth
 */

// const express=require('express')
// const router = express.Router() //esto es lo mismo q 
const {Router}=require('express')
const router=Router()
const {check}=require('express-validator')//se encarga de validar un campo a la vez
const {validarCampos}=require('../middlewares/validar-campos')
const {validarJWT}=require('../middlewares/validar-jwt')

const{crearUsuario, revalidarToken, loginUsuario}=require('../controllers/auth') //de esta manera desestructuro lo q importo



router.get('/renew',validarJWT,revalidarToken);


router.post('/new',
    [
        check('name','El name es obligatorio').not().isEmpty(),//esta regla dice q el nombre es obligatorio y no puede estar vacio
        check('email','El email es obligatorio').isEmail(),//pregunta si es un email
        check('password','El password debe tener minimo 6 caracteres').isLength({min:6}),//pregunta si el leng minimo tiene 6 caracteres
        validarCampos
    ],
    crearUsuario
);


router.post('/',
    [
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe tener minimo 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    loginUsuario
);




module.exports=router; //esta es la forma de exportar