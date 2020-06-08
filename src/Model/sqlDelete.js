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
model.DeleteReport = ({reportId}) =>{
    let query = `
        delete
        from
            MazShop.dbo.Reports
            where
            reportId = ${reportId}
           `;
    return request(query);
};
model.DeleteCartItem = ({ShopItemId,userId}) =>{
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
    update MazShop.dbo.OrderShop set status = 1  where orderId=${orderId}`;
    return request(query);
} ;

model.DeleteImages =({imageId}) => {
    let query = `delete from MazShop.dbo.images where imageId = ${imageId}`;
    return request(query);
} ;

model.DeletePost =({postId}) => {
    let query = `delete from Post where postId = ${postId}`;
    return request(query);
} ;


model.DeleteFeature = async ({charId}) => {
    let query = `delete from MazShop.dbo.Characteristic where charId = ${charId} `;
    return request(query);
};

model.DeleteComment = async ({commentId,ratingId}) => {


    request(`delete from  MazShop.dbo.Rating where ratingId = ${ratingId}`)
    let query = `
        delete from         
             MazShop.dbo.ItemComment       
        where commentId = ${commentId}`;



    return request(query)
}

module.exports=model;
