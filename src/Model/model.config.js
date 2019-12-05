const sql = require("mssql");
const config =  {
    user: 'sa',
    password: '12345',
    server: 'localhost',
    port:1433,
    database: 'MazShop',
};
sql.on('error', err => {
    console.log(err)
});
module.exports = function request (query){
    return sql.connect(config).then(pool => {
        return pool.request()
            .query(query)
    }).then(result => {
        console.log(result)
        return result.recordset;
    }).catch(err => {
        console.log('ERR',err)
    });
};
