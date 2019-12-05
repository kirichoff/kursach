module.exports =
    {
    ...require('./mssqlRequest'),
        ...require('./sqlInserts'),
        get: {...require('./sqlGet')},
    security: {...require('./sqlInserts').security,...require('./mssqlRequest').security}
    };
