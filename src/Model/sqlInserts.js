request = require('./model.config');
const get = require('./sqlGet');
const model = {};
model.Register = ({login,password,email,phoneNumber}) => {
// Query
    let query = `
        Insert         
        into
             UserShop
            (login,password,email,"phoneNumber")            
        values
            ('${login}','${password}','${email}',${phoneNumber});
           select lastval() as userId;`;
    return request(query);
};
model.AddShopItem = ({description,header,price,categoryId}) =>{
    console.log('add',description,header,price,categoryId);
    let query = `
        Insert         
        into
             ShopItem
            (description,"header","categoryId",price)           
        values
            ('${description}','${header}',${categoryId},${price});
                select lastval() as Id; 
           `;
    return request(query);
};

model.SetRating = ({itemId,userId,ratingValue}) => {
    let query = `insert into Rating(itemId,userId,ratingValue) values('${itemId}','${userId}','${ratingValue}')`;
    return request(query);
};

model.AddOrder = ({itemId, userId, status, startDate,count})=>{
    count = count || 1;
    let query = `
    insert       
    into
        OrderShop
        ("itemId", "userId", status, "startDate",count) 
        values (${itemId},${userId},${status},'${startDate}',${count});
        delete from Cart where Cart.ItemId = ${itemId}  
        `;
    return request(query)
};
model.AddItemContent = ({itemId, content}) =>{
    console.log('itemId',itemId);
    let query = `
    insert       
    into
        ItemContent("itemId", content)
        values (${itemId},'${content}')
       `;
    return request(query)
};
model.AddItemComment = ({itemId, content,userId}) =>{
    let query = `
    insert       
    into
        ItemComment("itemId", content, "userId")
        values (${itemId},'${content}',${userId})
       `;
    return request(query)
};
model.AddChar = ({itemId, charName, charContent}) =>{
    let query = `
    insert       
    into
        Characteristic(itemId, charName, charContent)
        values (${itemId},'${charName}','${charContent}')
       `;
    return request(query)
};
model.AddToCart = ({ItemId,count,userId})=>{
    // Query
    console.log('Add cart',{ItemId,count,userId})
    let query = `
        Insert         
        into
            Cart
            (ItemId,count,userId)            
        values
            ('${ItemId}','${count}','${userId}')
           `;
    return request(query);
};

model.AddCartUser = async ({login,password,email,phoneNumber}) => {
        // Query
        let testing = `select userId from UserShop where email = '${email}' `;
        let user = await request(testing);
        if(user.length > 0){
            return  user
        }
    let query = `
        Insert         
        into
             UserShop
            (login,password,email,phoneNumber)            
        values
            ('${login}','${password}','${email}',${phoneNumber});
            select lastval() as userId;
           `;
    return request(query);
    };
model.SetCategory = async ({categoryName}) =>{
    let query =`
    insert into Category(categoryName) values('${categoryName}');
  `;
    return request(query)
};

model.SetCategory2 = async ({categoryName}) =>{

    let categories = await get.getCategory() || [];
    console.log('Category',categoryName,'Categories',categories);

    let name = categories.find(k=> k.categoryName === categoryName);
    if (name){
        return name
    }
    else {
        let query = `
        insert into category(categoryName) values('${ categoryName }');
        select lastval() as categoryId;
        `;
        let res = await request(query);
        console.log(res,res)
        try {
            return res[0];
        }
        catch (e) {
            return {};
        }
    }
};
model.SetImages = async ({content}) =>{
    let query =`insert into images(content) values('${content}')`;
    return request(query)
};

model.SetPost = ({text,image}) =>{
    let query =`insert into Post(text,image) values('${text}','${image}')`;
    return request(query)
    };

module.exports = model;
