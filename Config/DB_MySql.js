const mysql = require('mysql');
const MYSQL_CONF=require("./Config").MYSQL_CONF;


   




let pool = mysql.createPool({
    host: MYSQL_CONF.HOST,
    user: MYSQL_CONF.USERNAME,
    password: MYSQL_CONF.PASSWORD,
    database: MYSQL_CONF.DATABASE,
    port: MYSQL_CONF.PORT,
});
   let  exec= function (sql, option) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, option, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })
    };
module.exports = {
    exec,
    escape:mysql.escape
};