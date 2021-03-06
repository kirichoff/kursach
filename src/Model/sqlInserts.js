request = require('./model.config');
const get = require('./sqlGet');
const update = require('./sqlUpdate')
const model = {};

model.Register = async ({login, password, email, phoneNumber, adminKey}) => {
    // Query
    let isAdmin = null;
    if (adminKey) {
        let adminKeys = await request('SELECT * from AdminKey');
        isAdmin = adminKeys.find(i => i.keyString == adminKey)
    }

    let rights = isAdmin ? 1 : 2;

    let query = `
        Insert         
        into
             MazShop.dbo.UserShop
            (login,password,email,phoneNumber,rights)            
        values
            ('${login}','${password}','${email}',${phoneNumber},${rights});
            select @@IDENTITY as userId`;
    return request(query);
};
model.AddShopItem = ({description, header, price, categoryId}) => {

    let query = `
        Insert         
        into
             MazShop.dbo.ShopItem
            (description,header,categoryId,price)           
        values
            ('${description}','${header}',${categoryId},${price});
            select @@IDENTITY as Id  
           `;
    return request(query);
};

model.AddReport = async ({login,email,message}) =>{
    let query = `
        Insert         
        into
             MazShop.dbo.Reports
            (login,email,message)           
        values
            ('${login}','${email}','${message}');`;
    return request(query);
}

model.AddItemComment = async ({itemId,content,userId}) =>{
    console.log(itemId,content,userId)
    let comments = await get.GetComments({itemId: itemId});

    let comment = comments.find(c=> c.userId == userId && c.itemId == itemId)

    if(comment) {
        return update.UpdateComment({...comment,content: content});
    }
        let query = `
        Insert         
        into
             MazShop.dbo.ItemComment
            (itemId,content,userId)           
        values
            (${itemId},'${JSON.stringify(content)}',${userId});`;


    return request(query);
}

model.SetRating = ({itemId, userId, ratingValue}) => {
    let query = `insert into Rating(itemId,userId,ratingValue) values('${itemId}','${userId}','${ratingValue}')`;
    return request(query);
};

model.AddOrder = ({itemId, userId, status, startDate, count}) => {
    count = count || 1;
    let query = `
    insert       
    into
        MazShop.dbo.OrderShop
        (itemId, userId, status, startDate,count) values (${itemId},${userId},${status},'${startDate}',${count});
        delete from MazShop.dbo.Cart where Cart.ItemId = ${itemId}  
        `;
    return request(query)
};
model.AddItemContent = ({itemId, content}) => {

    let query = `
    insert       
    into
        MazShop.dbo.ItemContent(itemId, content)
        values (${itemId},'${content}')
       `;
    return request(query)
};
model.AddChar = ({itemId, charName, charContent}) => {
    let query = `
    insert       
    into
        MazShop.dbo.Characteristic(itemId, charName, charContent)
        values (${itemId},'${charName}','${charContent}')
       `;
    return request(query)
};
model.AddToCart = ({ItemId, count, userId}) => {
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

model.AddCartUser = async ({login, password, email, phoneNumber}) => {
    // Query
    let testing = `select userId from MazShop.dbo.UserShop where email = '${email}' `;
    let user = await request(testing);
    if (user.length > 0) {
        return user
    }

    let query = `
        Insert         
        into
             MazShop.dbo.UserShop
            (login,password,email,phoneNumber)            
        values
            ('${login}','${password}','${email}',${phoneNumber});
            select @@IDENTITY as userId
           `;
    return request(query);
};
model.SetCategory = async ({categoryName}) => {
    let query = `
    insert into Category(categoryName) values('${categoryName}');
  `;
    return request(query)
};

model.SetCategory2 = async ({categoryName}) => {

    let categories = await get.getCategory();


    let name = categories.find(k => k.categoryName === categoryName);

    if (name) {
        return name
    } else {
        let query = `
    insert into Category(categoryName) values('${categoryName}');
      select @@IDENTITY as categoryId
         `;
        let res = await request(query);
        return res[0];
    }
};
model.SetImages = async ({content}) => {
    let query = `insert into images(content) values('${content}')`;
    return request(query)
};

model.SetPost = ({text, image}) => {
    let query = `insert into Post(text,image) values('${text}','${image}')`;
    return request(query)
};

module.exports = model;
