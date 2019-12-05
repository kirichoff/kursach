request = require('./model.config');
const model = {security:{}};

model.GetAllUsers = async ()=> {

    // noinspection SqlDialectInspection
    let query = `
        select
            * 
        from
            MazShop.dbo.UserShop`;
    return request(query);
};
model.GetChar = ({id})=>{
    let query = `
        select
            * 
        from
              MazShop.dbo.Characteristic
        where itemId = ${id}
              `;
    return request(query);
};
model.GetAllShopItems = () =>{
    // noinspection SqlDialectInspection
    let query = `
    select * from MazShop.dbo.ShopItem `;
    return request(query);
};
module.exports = model;
