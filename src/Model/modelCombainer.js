module.exports =
    {
        get:
            {
                ...require('./sqlGet'),
                ...require('./sqlDelete'),
                ...require('./sqlUpdate'),
                ...require('./sqlStatistick')
            },
        post: {
            ...require('./sqlInserts'),

        }
    };
