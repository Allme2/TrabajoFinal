const mysql = require('mysql');
const util = require('util');
// Grupo de conexiones SQL que se ejecutan dentro de mi servidor
let pool = mysql.createConnection({
    connectionLimit : 10, // 1. cuantas conexiones maximas (hilos)
    host : 'localhost', // 2. host (localhost),
    user : 'root', // 3. user
    password : '', // 4. password
    database : 'prueba'  // 5. database
});

// pool nos habilita a realizar consultas a una tabla

pool.query = util.promisify(pool.query);

module.exports = pool;