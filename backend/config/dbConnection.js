const mysql = require('mysql');
const {DB_HOST,DB_USER,MYSQL_DB,DB_PASS,DB_PORT } = process.env

const pool = mysql.createConnection({
    host:DB_HOST,
    port:DB_PORT,
    user:DB_USER,
    password:DB_PASS,
    database:MYSQL_DB,
})

pool.connect(function(err){
    if(err) throw err;
    console.log(MYSQL_DB+" Database connected successfully")
})

module.exports = pool;