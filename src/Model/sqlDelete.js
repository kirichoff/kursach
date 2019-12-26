request = require('./model.config');
const model = {};
model.DeleteItemContent = ({contentId})=>{
    // Query
    let query = `
        delete
        from
            MazShop.dbo.ItemContent
            where
            contentId = ${contentId}
           `;
    return request(query);
};

model.DeleteItem = ({ShopItemId}) =>{
    let query = `
        delete
        from
            MazShop.dbo.ShopItem
            where
            ShopItemId = ${ShopItemId}
           `;
    return request(query);
};
model.DeleteCartItem = ({ShopItemId,userId}) =>{
    let query = `
        delete
        from
            MazShop.dbo.Cart
            where
            itemId = ${ShopItemId} and ${userId}
           `;
    return request(query);
};

model.DeleteOrder =({orderId}) => {
   let query = `
    delete from MazShop.dbo.OrderShop where orderId=${orderId}`;
    return request(query);
} ;

module.exports=model;
