const express=require('express');
require('dotenv').config();
const cors=require('cors')
const {dbConnection}=require('./database/config')


//crear servidor de express
const app=express();

//base de datos
dbConnection()

//cors
app.use(cors())

//directorio publico
app.use(express.static('public')) //el use se ejecuta cada vez q se hace una peticion al servidor..actua como midelware

//lectura y parseo del body
app.use(express.json())//las peticiones q vengan en formato json les extraigo su contenido

//rutas
app.use('/api/auth',require('./routes/auth')); // lo referente a la autenticacion va a estar en esta ruta /api/auth..todo o q este archivo ./routes/auth va a exportar
app.use('/api/events',require('./routes/events'))

//escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT} `)
})