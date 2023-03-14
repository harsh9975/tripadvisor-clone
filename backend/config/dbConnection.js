const mysql = require('mysql');
const {DB_HOST,DB_USER,MYSQL_DB,DB_PASS } = process.env

const pool = mysql.createConnection({
    host:DB_HOST,
    user:DB_USER,
    password:DB_PASS,
    database:MYSQL_DB,
})

pool.connect(function(err){
    if(err) throw err;
    console.log(MYSQL_DB+" Database connected successfully")
})

module.exports = pool;