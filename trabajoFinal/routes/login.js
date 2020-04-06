var express = require('express');
var router = express.Router();
const usuariosModel = require('../models/usuariosModel');
const md5 = require('md5')

router.get('/',(req,res,next)=> {
    res.render('login');
});
router.post('/',async(req,res,next)=>{

    if(req.body.contra != "" && req.body.usuario !=""){
        let result = await usuariosModel.authUser(req.body.usuario,md5(req.body.contra));
        if(result.length > 0) {
            console.log(result)
            let id = result[0].id_usuario;
            let permisos = result[0].permisos;

            if(permisos == 1){
               
                req.session.admin = id;
                res.redirect('/admin');
            } else {
               
                req.session.usuario = id;
                res.redirect('/discos/all');
            }
        } else {
            res.render('login',{message:"Usuario o password incorrectos"})

        }

    }
    else{
        res.render('login',{message:"los datos no son correctos"})
    }

})
module.exports = router;