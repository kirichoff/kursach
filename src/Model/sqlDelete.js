request = require('./model.config');
const model = {};
model.DeleteItemContent = ({contentId})=>{
    // Query
    let query = `
        delete
        from
            ItemContent
            where
            contentId = ${contentId}
           `;
    return request(query);
};
model.DeleteItem = ({ShopItemId}) =>{
    let query = `
        delete
        from
            ShopItem
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
            Cart
            where
            itemId = ${ShopItemId} and userId = ${userId}
           `;
    return request(query);
};

model.DeleteCategory = ({categoryId}) =>{
    let query = `
        delete
        from
            Category
            where
            categoryId = ${categoryId}`;
    return request(query);
};
model.DeleteOrder =({orderId}) => {
   let query = `
    delete from OrderShop where orderId=${orderId}`;
    return request(query);
} ;

model.DeleteImages =({imageId}) => {
    let query = `delete from images where imageId = ${imageId}`;
    return request(query);
} ;

model.DeletePost =({postId}) => {
    let query = `delete from Post where postId = ${postId}`;
    return request(query);
} ;


model.DeleteFeature = async ({charId}) => {
    let query = `delete from Characteristic where charId = ${charId} `;
    return request(query);
};

module.exports=model;
