const express = require('express');
const router = express.Router();
const usuariosModel = require('../models/usuariosModel');
const md5 = require('md5');


router.get('/', (req,res,next)=> {
    res.render('registro');
})

router.post('/', async (req,res,next)=> {
  
    console.log(md5(req.body.password));
    let objUsr = {
        mail : req.body.mail,
        nombre : req.body.nombre,
        apellido : req.body.apellido,
        password : md5(req.body.password),
       
    }
    
    let result = await usuariosModel.createUser(objUsr); 
    if(result){
        res.render('registro', {status : true,message : 'Registro exitoso'});
    } else {
        res.render('registro', {status : false,message : 'Error'}); 
    }
})

module.exports = router;
