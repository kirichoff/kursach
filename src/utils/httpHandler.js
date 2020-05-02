module.exports = function httpHandler(app,model,exclude,path,type='get') {
    for(let name in model){
        if(exclude.find(el=> el === name))
            continue;
        app[type](`${path}${name}`, async (req,res)=>{
            let q = type === 'get'? req.query : req.body;
            let re = await model[name](q);
            res.send(re);
            })
    }
};
