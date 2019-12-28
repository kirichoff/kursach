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
    console.log(ShopItemId,userId);
    let query = `
        delete
        from
            MazShop.dbo.Cart
            where
            itemId = ${ShopItemId} and userId = ${userId}
           `;
    return request(query);
};

model.DeleteCategory = ({categoryId}) =>{
    let query = `
        delete
        from
            MazShop.dbo.Category
            where
            categoryId = ${categoryId}`;
    return request(query);
};
model.DeleteOrder =({orderId}) => {
   let query = `
    delete from MazShop.dbo.OrderShop where orderId=${orderId}`;
    return request(query);
} ;

model.DeleteOrder =({imageId}) => {
    let query = `delete from MazShop.dbo.images where imageId = ${imageId}`;
    return request(query);
} ;


module.exports=model;
