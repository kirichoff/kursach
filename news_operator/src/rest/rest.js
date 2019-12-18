const server = 'http://localhost:5000/api';
const exclude = ['security','get'];
export const rest = {};
function reuest (server,api,type){
    return (params,token='') => {
        let query = '';
        if(type === 'get') {
           query = params && '?' + Object.keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&') || '';
        }
        let options = {
            method: type || 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
            };
        if(!type){
            options.body = JSON.stringify(params);
        }
        return fetch(server+api+query,options
        ).then(async data => {
                let j = await data.json();
                return j;
            })
            .catch(ex => ex)
            ;
    }
}
 export const createRest  = ()=> fetch(server+'/model',{method: 'GET'}).then(response=>response.json().then(res =>{
        let model  = res;
        console.log(model);
        for (let name of model.post) {
            if (exclude.find(el => el === name))
                continue;
            rest[name] = reuest(server + '/post/', name)
        }
     for (let name of model.get) {
         if (exclude.find(el => el === name))
             continue;
         rest[name] = reuest(server + '/get/', name,'get')
     }
    })
).catch(err=>console.log(err));




