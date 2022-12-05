// Setup das bibliotecas
const {Pool} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Conectar com a Base de Dados:
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect',(err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log('Database was connected');
    }
    
});

module.exports = {
    query: (text, params) => pool.query(text,params)
}