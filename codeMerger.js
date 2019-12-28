var fs = require('fs');

const patches=[
    '/src/Model',
    '/src/utils',
    '/news_operator/src/components',
    '/news_operator/src/pages',
    '/news_operator/src/reducers',
    '/news_operator/src/rest',
    '/news_operator/src/utils',
    '/news_operator/src/style'
];
console.log("Usage: " + __dirname );
for (let path of patches) {
    fs.readdir(__dirname+path, function (err, items) {
        console.log('Error',err,__dirname);
        if(!err) {
            for (var i = 0; i < items.length; i++) {
                let data = fs.readFileSync(__dirname+path + "\\" + items[i], 'utf8');
                console.log('ITEMS',items[i]);
                fs.appendFile(__dirname + '\\combaineCode.js', `/////// ${items[i]}\n` + data,
                    function(err,data) {
                    })
            }
        }
    });
}
