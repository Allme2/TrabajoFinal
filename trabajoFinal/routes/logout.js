const express = require('express');
const router = express.Router();
router.get('/', (req,res,next)=> {
    req.session.destroy();
    res.redirect('/noticias/all');
})


module.exports = router;