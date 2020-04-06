"use strict"; // cabecera del lenguaje
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main(objeto) {
    try {

        let transporter = nodemailer.createTransport({
            // simple mail transfer protocol, pop3
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'juanchiov98@gmail.com', // generated ethereal user
            pass: 'mikeshinodalpjuan98' // generated ethereal password
          },
        //   transport security layer
          tls: {
              rejectUnauthorized : false
          }
        });
        let info = await transporter.sendMail({
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: 'juanchiov98@gmail.com', // list of receivers
          subject: "CONTACTO DESDE LA WEB ✔", // Subject line
      
          html: "El usuario : "+objeto.nombre + " con correo : " +objeto.correo + " mando el siguiente mensaje :<br> "+objeto.comentario // html body
        });
      
        return info.messageId;


    } catch(error) {
        console.log(error);
    }
}

module.exports = {main}