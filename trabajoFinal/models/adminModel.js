const pool = require('../bd');

async function eliminarDiscoPorId(id){
    try{
        let query = "delete from discos where id_d = ?";
        let rows = await pool.query(query,id);
        return rows;
    } catch(error) {
        throw error;
    }
}


async function getDiscosAdmin() {
    try {
       
        let query = "select *, DATE_FORMAT(fecha_creacion,'%d/%m/%Y') as fecha from discos join autor on autor.id = discos.id_autor order by id_d desc";
        let rows = await pool.query(query);
        return rows;
    } catch(error){
        throw error;
    }
}

async function getAutores() {
    try{
        let query = "select * from autor";
        let rows = await pool.query(query);
        return rows;
    } catch(error) {
        throw error;
    }
}

async function crearDisco(obj) {
    try {
        let query = "insert into discos set ?";
        let rows = await pool.query(query,obj);
        return rows;
    } catch(error) {
        throw error;
    }

}
module.exports = {crearDisco,getDiscosAdmin, eliminarDiscoPorId, getAutores}