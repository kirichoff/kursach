module.exports = function httpHandler(app,model,exclude,path) {
    for(let name in model){
        if(exclude.find(el=> el === name))
            continue;
        app.get(`${path}${name}`, async (req,res)=>{
            let re = await model[name](req.body);
            res.send(re);
        })
    }
};
