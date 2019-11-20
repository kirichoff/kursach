const express = require('express');
const path = require('path');
const graphqlHTTP = require('express-graphql');
const mainShema = require('./src/mainShema.js');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser({limit: '50mb'}));
app.use('/api/graphQL', graphqlHTTP({
    schema: mainShema
}));
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/news_operator/build/index.html'));
});
const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
