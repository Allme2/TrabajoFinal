const pool = require('../bd');

async function getComentarioPorIdDisco(id) {
    try {
        let query = "select * from comentario where id_discos = ?";
        const rows = await pool.query(query,[id]);
        return rows;
        
    } catch(error) {
        console.log(error);
    }
}

async function insertoComentario(objeto){
    try {
        let query = "insert into comentario set ?";
        let rows = await pool.query(query,[objeto]);
        return rows;
    } catch(error) {
        console.log(error);
    }
}

module.exports = {getComentarioPorIdDisco, insertoComentario}