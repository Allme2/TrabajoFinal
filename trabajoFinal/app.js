var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//mis rutas
const discosRouter = require('./routes/discos');
const loginRouter = require('./routes/login');
const registroRouter = require('./routes/registro');
const contactoRouter = require('./routes/contacto');
const logoutRouter = require('./routes/logout');
const adminRouter = require('./routes/admin');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret : 'secret', 
  saveUninitialized : true,
  resave : true,
  cookie : {maxAge : null}
  
}));

// comprobar la sesion del usuario que ingresa y proteger las rutas que involucren al administrador

// Middleware
guardianAdmin = async(req,res,next)=> {
  try {

    if(req.session.admin) {
      console.log("ingresaste como administrador")
      // funcion que continua con el flujo de ejecucion del programa
      // me permite cargar adminRouter
      next();
    } else {
      console.log("denegado")
      res.redirect('/login');
    }
  } catch(error) {
    console.log(error);
    res.redirect('/login');
  }
} 


app.use('/', indexRouter);
app.use('/users', usersRouter);
// habilito mis rutas
// redirige el trafico a los archivos .js en la carpeta routes.
app.use('/registro',registroRouter);
app.use('/discos',discosRouter);
app.use('/login',loginRouter);
app.use('/contacto', contactoRouter);
app.use('/logout', logoutRouter);
app.use('/admin', guardianAdmin, adminRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
