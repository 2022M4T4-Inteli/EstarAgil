// Setup das bibliotecas
const {Pool} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Conectar com a Base de Dados:
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect',() => {
    error?
    console.log(`There was an error while starting database...\n ${error}`) :
    console.log(' 🚀 Database was connected');
});

module.exports = {
    query: (text, params) => pool.query(text,params)
}