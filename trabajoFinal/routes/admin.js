const express = require('express');
const router = express.Router()
const adminModel = require('../models/adminModel');
const discosModel = require('../models/discosModel');
const multer = require('multer');
const uuid = require('node-uuid');
const fs = require('fs'); 
const upload = multer({dest : './uploads'});


router.post('/editar', async(req,res,next)=> {
    try {

        let objdisco = {
            titulo : req.body.titulo,
            texto : req.body.texto
        }
        let id_d = req.body.id_d;
        let respuesta = await discosModel.updateDisco(objdisco,id_d)
        res.redirect('/admin');
    } catch(error) {
        console.log(error);
        res.render('errorpage');
    }
})

router.get('/editar/:id', async(req,res,next)=> {
    try {
        let id = req.params.id;
        let discos = await discosModel.getDiscos(id);
       
        res.render('editardisco',{disco_array : discos, idURL : id});

    } catch(error) {
        console.log(error);
        res.render('errorpage');
    }
})


router.post('/alta',upload.array('imagen',1),async(req,res,next)=> {
    try {
        var name_imagen = '';
        if(req.files[0].mimetype == 'image/jpeg' || req.files[0].mimetype == 'image/png') {
            if(req.files[0].size <= 1000000) {
                // enctype ="multipart/form-data"
                let array_mime = req.files[0].mimetype.split('/'); //image/jpeg
                let ext = array_mime[1]; // png | jpeg
                let nombre_aleatorio = uuid();
                name_imagen = nombre_aleatorio + "." + ext;
                let temporal_name = req.files[0].filename;
    

                fs.createReadStream('./uploads/'+temporal_name).pipe(fs.createWriteStream('./public/images/'+name_imagen))

                fs.unlink('./uploads/'+temporal_name,(err)=> {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("archivo temporal borrado")
                    }
                })
            } else {
                console.log("Imagen muy grande")
            }
            
        } else {
            console.log("formato incorrecto")
        }
        let objdisco = {
            titulo : req.body.titulo,
            id_autor : req.body.autor,
            texto : req.body.texto,
            // imagen : ''
            imagen : name_imagen
        }
        let resultado = await adminModel.creardisco(objdisco);
        res.redirect('/admin');
    } catch(error) {
        console.log(error);
        res.render('errorpage');
    }
})


router.get('/alta',async (req,res,next)=> {
    try {
        let autores = await adminModel.getAutores();
        res.render('altadisco', {array_autores : autores});
    } catch(error){
        res.render('error')
    }
})

router.get('/eliminar/:id', async(req,res,next)=> {
    try{
        let id = req.params.id;
        await adminModel.eliminarDiscoPorId(id);
        res.redirect('/admin');
    } catch(error) {
        render('errorpage')
    }
})
router.get('/',async (req,res,next)=> {

    try {
        let data = await adminModel.getDiscosAdmin();
        console.log(data);
        res.render('admin',{discos_array : data});
    } catch(error) {
        
        res.render('errorpage');
    }

})



module.exports = router;