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
model.UpdateCountCart = ({itemId,userId,count}) =>{
    console.log('count',itemId,userId,count)
    let query = `
    update
     MazShop.dbo.Cart
             SET count = '${count}'         
             where userId = ${userId} and ItemId=${itemId}`;
    return request(query);

};
module.exports = model;
