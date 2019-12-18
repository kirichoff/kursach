request = require('./model.config');
const model = {};
model.UpdateShopItem = ({description,header,price,categoryId,ShopItemId})=>{
    // Query
    console.log('up',description,header,price,categoryId,ShopItemId);
    let query = `
        update         
            MazShop.dbo.ShopItem
            SET description = '${description}',
             header = '${header}',
             price = ${price},
             categoryId = ${categoryId}           
            where ShopItemId = ${ShopItemId}
           `;
    return request(query);
};
module.exports = model;
model.UpdateUser = ({email,phoneNumber,password,login,userId}) => {
    let query = `
    update
     MazShop.dbo.UserShop
             SET login = '${login}',
             password = '${password}',
             phoneNumber = ${phoneNumber} ,
             email = '${email}'           
             where userId = ${userId}`;
    return request(query);
    };
