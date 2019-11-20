request = require('./model.config');
const model = {};
model.GetUser = (login,password)=> {
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
model.GetAllUsers = ()=> {
        // noinspection SqlDialectInspection
    let query = `
        select
            * 
        from
            MazShop.dbo.UserShop`;
    return request(query);
};
model.GetChar = (id)=>{
    let query = `
        select
            * 
        from
              MazShop.dbo.Characteristic
        where itemId = ${id}
              `;
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
model.GetUserById = (id)=>{
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
model.GetAllShopItems = () =>{
    // noinspection SqlDialectInspection
    let query = `
    select * from MazShop.dbo.ShopItem `;
    return request(query);
};
model.GetShopItem = (ShopItemId) =>{
    let query = `
    select * from MazShop.dbo.ShopItem where ShopItemId = '${ShopItemId}'`;
    return request(query);
};
module.exports = model;
