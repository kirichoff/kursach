const sql = require("mssql");
const config =  {
    user: 'admin',
    password: '3558076Dima',
    server: 'database-1.c77yw8caf69z.us-east-2.rds.amazonaws.com',
    port:1433,
    database: 'MazShop',
};
module.exports = function request (query){
    return sql.connect(config).then(pool => {
        return pool.request()
            .query(query)
    }).then(result => {
        console.log('reqRES',result);
        return result.recordset;
    }).catch(err => {
        console.log('ERR',err);
        if (err === 'ECONNCLOSED'){
            return request(query)
        }
        return {error: err && err.originalError && err.originalError.info}
    });
};
