request = require('./model.config');
const model = {};
model.Register = ({login,password,rights,email,phoneNumber}) => {
    // Query
    let query = `
        Insert         
        into
             MazShop.dbo.UserShop
            (login,password,rights,email,phoneNumber)            
        values
            ('${login}','${password}',${rights},'${email}',${phoneNumber})
           `;
    return request(query);
};
model.AddShopItem = ({description,header,previewImage,price}) =>{
    let query = `
        Insert         
        into
             MazShop.dbo.ShopItem
            (description,header,previewImage,price)           
        values
            ('${description}','${header}',${previewImage},${price});
            select @@IDENTITY as Id  
           `;
    return request(query);
};
model.AddOrder = ({itemId, userId, status, startDate})=>{
    let query = `
    insert       
    into
        MazShop.dbo.OrderShop
        (itemId, userId, status, startDate) value (${itemId},${userId},${status},'${startDate}')`;
    return request(query)
};
model.AddItemContent = ({itemId, content}) =>{
    let query = `
    insert       
    into
        MazShop.dbo.ItemContent(itemId, content)
        values (${itemId},'${content}')
       `;
    return request(query)
};
model.AddItemComment = ({itemId, content,userId}) =>{
    let query = `
    insert       
    into
        MazShop.dbo.ItemComment(itemId, content, userId)
        values (${itemId},'${content}',${userId})
       `;
    return request(query)
};
model.AddChar = ({itemId, charName, charContent}) =>{
    let query = `
    insert       
    into
        MazShop.dbo.Characteristic(itemId, charName, charContent)
        values (${itemId},'${charName}','${charContent}')
       `;
    return request(query)
};
model.AddToCart = ({ItemId,count,userId})=>{
    // Query
    let query = `
        Insert         
        into
            MazShop.dbo.Cart
            (ItemId,count,userId)            
        values
            ('${ItemId}','${count}','${userId}')
           `;
    return request(query);
};

module.exports = model;
