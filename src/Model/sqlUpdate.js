request = require('./model.config');
const model = {};
model.UpdateShopItem = ({description,header,price,categoryId,ShopItemId})=>{
    // Query
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
    let query = `
    update
     MazShop.dbo.Cart
             SET count = '${count}'         
             where userId = ${userId} and ItemId=${itemId}`;
    return request(query);

};

model.UpdateRating = ({ratingId,ratingValue})=>{
    let query = `
    update
        Rating
        set
        ratingValue = ${ratingValue}
    where ratingId = ${ratingId}`;
    return request(query)
};
model.UpdateFeature = ({charName,charContent,charId})=>{
    let query = `
    update
        MazShop.dbo.Characteristic
        set
       charName = '${charName}',
       charContent = '${charContent}'
        where charId = ${charId}`;
    return request(query)
};
model.UpdatePost = ({postId,text,image})=>{
    let query = `
    update
        MazShop.dbo.Post
        set
       text = '${text}',
       image = '${image}'
        where postId = ${postId}`;
    return request(query)
};

model.UpdateComment = ({content,commentId}) => {
    let query = `
        update         
             MazShop.dbo.ItemComment
        set
            content = '${JSON.stringify(content)}'        
        where commentId = ${commentId}`;
    return request(query)
}



module.exports = model;
