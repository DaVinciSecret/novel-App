const mysql = require('mysql');

var pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'',
    database:'novel',
    connectionLimit:20,
    multipleStatements:true
});

//冻结pool对象，防止被篡改
Object.freeze(pool);

module.exports = pool;