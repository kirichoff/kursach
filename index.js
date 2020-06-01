require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const model = require('./src/Model/modelCombainer');
const jwt = require('./src/utils/jwt');
const httpHandler = require('./src/utils/httpHandler');
const cors = require('cors');
const app = express();
const doc = require('./src/report/docxGenerator')
require('dotenv').config();
const {docReports} = require('./src/report/reports')

app.use(cors());
app.use(require('compression')());
app.use(bodyParser({limit: '50mb'}));

const exclude = ['get'];

httpHandler(app,model.post,exclude,'/api/post/','post');

httpHandler(app,model.get,exclude,'/api/get/');

app.all(`/api/Login`,async (req,res)=>{
    let user = await model.get.Login(req.body);
    if (user.request){
        res.send({token: jwt.generate(req.body.login),userId: user.userId })
    }
    else {
        res.status(401);
        res.send({ex: 'invalid user or password'})
    }
});
app.get(`/api/model/`,async (req,res)=>{
    res.send( await JSON.stringify( {
        "post": Object.keys(model.post),
        "get":  Object.keys(model.get)
        }))
});

for(let item in docReports) {
    app.get(`/docx/${item}`, async (req, res) => {
        res.setHeader('Content-Disposition', `attachment; filename=${item}.docx`);
        res.send(Buffer.from(await docReports[item](), 'base64'));
    })
}

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/client/build/')));
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
