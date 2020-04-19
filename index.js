const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const model = require('./src/Model/modelCombainer');
const jwt = require('./src/utils/jwt');
const httpHandler = require('./src/utils/httpHandler');
const app = express();
const cors = require('cors');
const dataFiling = require('./dataFiling');
app.use(bodyParser({limit: '50mb'}));

const exclude = ['get'];

dataFiling.ShopItems(model);


app.use(cors());

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
app.all(`/api/security/`,async (req,res,next)=>{
    next();
    // if (jwt.verify(req.headers.Authorization)){
    //     next()
    // }
    // else {
    //     res.status(401);
    //     res.send({ex: 'invalid token'})
    // }
});
app.get(`/api/model/`,async (req,res)=>{
    res.send( await JSON.stringify( {
        "post": Object.keys(model.post),
        "get":  Object.keys(model.get)
        }))
});


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/client/build/')));
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
