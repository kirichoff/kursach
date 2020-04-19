request = require('./model.config');
const model = {};
model.DeleteItemContent = ({contentId})=>{
    // Query
    let query = `
        delete
        from
            dbo.ItemContent
            where
            contentId = ${contentId}
           `;
    return request(query);
};
model.DeleteItem = ({ShopItemId}) =>{
    let query = `
        delete
        from
            dbo.ShopItem
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
            dbo.Cart
            where
            itemId = ${ShopItemId} and userId = ${userId}
           `;
    return request(query);
};

model.DeleteCategory = ({categoryId}) =>{
    let query = `
        delete
        from
            dbo.Category
            where
            categoryId = ${categoryId}`;
    return request(query);
};
model.DeleteOrder =({orderId}) => {
   let query = `
    delete from dbo.OrderShop where orderId=${orderId}`;
    return request(query);
} ;

model.DeleteImages =({imageId}) => {
    let query = `delete from dbo.images where imageId = ${imageId}`;
    return request(query);
} ;

model.DeletePost =({postId}) => {
    let query = `delete from Post where postId = ${postId}`;
    return request(query);
} ;


model.DeleteFeature = async ({charId}) => {
    let query = `delete from dbo.Characteristic where charId = ${charId} `;
    return request(query);
};

module.exports=model;
