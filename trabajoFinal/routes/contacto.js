const express = require('express');
const router = express.Router();
const correoModel = require('../models/correoModel');
// Una peticion muestra la pàgina contacto
// Un post que envie el correo

// funcion que muestra la vista de contacto
router.get('/', (req,res,next)=> {
    res.render('contacto');
});

// recibe los datos del formulario y envia un correo
router.post('/',async (req,res,next)=> {
    let objMsg = {

        nombre : req.body.nombre,
        correo : req.body.correo,
        comentario : req.body.comentario
    }
    // el id de la operacion se almacena en la variable respuesta
    let respuesta = await correoModel.main(objMsg);
 
    if(respuesta) {

        res.render('contacto', {status : true,message : 'Correo enviado, en breve nos contactaremos'})
    } else {
        res.render('contacto', {status : false,message : 'No se pudo enviar el correo'})
    }
})

module.exports = router;