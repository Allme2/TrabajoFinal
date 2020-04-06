const pool = require('../bd');
async function createUser(objeto) {
  
    try {
   
        let query ="insert into usuario set ?";
        const rows = await pool.query(query,[objeto]);
        return rows;

    } catch(error) {
        throw error;
    }

}

async function authUser(user,password) {
    try {
       
        let query = "select * from usuario where mail = ? and password = ?";
        const rows = await pool.query(query,[user,password]);
        return rows;
        
    } catch(error) {
        throw error;
    }
}
module.exports = {createUser, authUser};