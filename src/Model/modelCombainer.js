module.exports =
    {
        get:
            {
                ...require('./sqlGet'),
                ...require('./sqlDelete'),
                ...require('./sqlStatistick')
            },
        post: {
            ...require('./sqlUpdate'),
            ...require('./sqlInserts'),
        }
    };
