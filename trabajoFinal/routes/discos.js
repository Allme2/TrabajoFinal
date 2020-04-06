const express = require('express'); 
const router = express.Router();
const discosModel = require('../models/discosModel');
const comentariosModel = require('../models/comentariosModel');
const moment = require('moment');




router.post('/comentario',async (req,res,next)=> {
   
    let fecha = moment().format('YYYY-MM-DD');
 
    let id_discos = req.body.id_d;
    let comentario = req.body.comentario; 
    let objComentario = {
        id_discos : id_discos,
        comentario : comentario,
        fecha : fecha
    }
    console.log(objComentario);

    let resultado = await comentariosModel.insertoComentario(objComentario)
    console.log(resultado);

})

router.get('/all', async (req,res,next)=> {
    var status_session;
    
    if(req.session.usuario || req.session.admin) {
        status_session = true;
    } else {
        status_session = false;
    }
    let data = await discosModel.getDiscos() 
    res.render('discos',
     { 
         discos_array : data,
         session : status_session
    });

})



router.get('/:idDisco', async (req,res,next)=> {

    let status_session;
    if(req.session.usuario || req.session.admin) {
        status_session = true
    } else {
        status_session = false
    }

    let id = req.params.idDisco;
    let comentarios = await comentariosModel.getComentarioPorIdDisco(id);
    let data = await discosModel.getDisco(id);
    res.render('disco', {
        loggedIn : status_session,
        disco_array : data, 
        array_comentarios : comentarios,
        id_d : req.params.idDisco
    });
})

router.get('/', (req,res,next)=> {
    res.render('discos');
})



module.exports = router;