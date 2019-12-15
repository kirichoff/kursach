module.exports =
    {
        get: {...require('./sqlGet'),     ...require('./sqlDelete'),
            ...require('./sqlUpdate')},
        post: {
            ...require('./sqlInserts'),

        }
    };
