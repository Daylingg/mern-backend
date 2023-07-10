/**rutas de eventos
    host + /api/events
 */

const {Router}=require('express')
const router=Router()
const {check}=require('express-validator')
const {validarCampos}=require('../middlewares/validar-campos')
const {validarJWT}=require('../middlewares/validar-jwt')
const {isDate}=require('../helpers/isDate')

const {getEventos,crearEvento,actualizarEvento,eliminarEvento}=require('../controllers/events')

router.use(validarJWT)//decimos q cualquier peticion por debajo de esta debe validar el token para no tener q ponerlo de uno en uno en cada router

//obtener eventos
router.get('/',getEventos)

//crear nuevo evento
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom(isDate),//custom espera por una funcion para validar el campo en el q se llama
        check('endD','Fecha de fin es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento
)

//actualizar evento
router.put(
    '/:id',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('endD','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento
)

//eliminar evento
router.delete('/:id',eliminarEvento)

module.exports=router