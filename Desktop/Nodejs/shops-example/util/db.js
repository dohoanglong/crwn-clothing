const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'shop',
    connectionLimit: 50,
    password: "password"
});

const pool_query = util.promisify(pool.query).bind(pool);

module.exports = {
    load: sql=> pool_query(sql),
    add: (entity, tableName) => pool_query(`INSERT INTO ${tableName} SET ?`, entity),
    del: (condition, tableName) => pool_query(`DELETE FROM ${tableName} WHERE ?`, condition),
    patch: (entity, condition, tableName) => pool_query(`UPDATE ${tableName} set ? where ?`, [entity, condition])
}