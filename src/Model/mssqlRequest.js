request = require('./model.config');
const model = {security:{}};
model.security.GetUser = ({login,password})=> {
    let query = `
        select
            * 
        from
            MazShop.dbo.UserShop
        where
            login = '${ login }' 
            and password = '${ password }'`;
        return request(query);
};

model.GetContent = id =>{
    let query = `
        select
            * 
        from
              MazShop.dbo.ItemContent
        where itemId = ${id}
              `;
    return request(query);
};
model.security.GetUserById = ({id})=>{
    let query = `
        select
            * 
        from
              MazShop.dbo.UserShop
        where userId = ${id}
              `;
    return request(query);
};
model.GetUserCart =  (userId)=>{
    // Query
    let query = `
        select
            * 
        from
            MazShop.dbo.Cart 
        where
            userId = '${userId}'
           `;
    return request(query);
};
model.Login = async ({login,password})=> {
    console.log(login,password)
    let query = `
        select
            * 
        from
            MazShop.dbo.UserShop
        where
            login = '${ login }' 
            and password = '${ password }'`;
    let req = await request(query);
    console.log(req);
    if(req[0]){
        return{request: true,userId:req[0].userId };
    }
    else{
        return{request: false};
    }

};
model.GetShopItem = ({ShopItemId}) =>{
    let query = `
    select * from MazShop.dbo.ShopItem where ShopItemId = '${ShopItemId}'`;
    return request(query);
};
model.GetPreviewImage = ({imageId}) =>{
    let query = `
    select content from MazShop.dbo.ItemContent where contentId = '${imageId}'`;
    return request(query);
};
module.exports = model;
