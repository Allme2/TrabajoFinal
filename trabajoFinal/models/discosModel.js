
const pool = require('./../bd'); 

async function updateDisco(obj,id) {
    try {
        let query = "update discos set ? where id_d = ?"
        let rows = await pool.query(query,[obj,id]);
        return rows;
    } catch(error) {
        throw error;
    }
}

async function getDiscos() {
    try {  
        let consulta =  "select *, DATE_FORMAT(fecha_creacion,'%d/%m/%Y') as fecha from discos";
        let rows =  await pool.query(consulta);
        return rows;
    } catch(error) {
        throw error;
    }

}


async function getDisco(id) {
    
    try {
        let query = "select * from discos join autor on discos.id_autor = autor.id where id_d = ?";
        let rows = await pool.query(query,[id]);
        return rows; 
    } catch(error){
        throw error;
    }

}



module.exports = {getDiscos, getDisco,updateDisco}