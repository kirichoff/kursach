var fs = require('fs');

const patches=[
    '/src/Model',
    '/src/utils',
    '/client/src/components',
    '/client/src/pages',
    '/client/src/reducers',
    '/client/src/rest',
    '/client/src/utils',
    '/client/src/style'
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
