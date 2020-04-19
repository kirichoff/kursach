const sql = require("mssql");
const config =  {
    user: 'sa',
    password: '1234',
    server: 'localhost',
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

const pgp = require("pg-promise")(/*options*/);
const db = pgp("localhost://postgres:postgres@localhost:5433/MazShop");


module.exports = function request(query) {
return db.many(query)
    .then(function (data) {
        return data;
    })
    .catch(function (error) {
        console.log("ERROR:", error);
        if (error === 'ECONNCLOSED'){
            return request(query)
        }
        if(error.message === "No data returned from the query."){
            return [];
        }
        return {error: error && error.originalError && error.originalError.info}
    });

};
