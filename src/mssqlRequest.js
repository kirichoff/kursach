const sql = require("mssql");
const config =  {
    user: 'sa',
    password: '12345',
    server: 'localhost',
    port:1433,
    database: 'MazShop',
};
sql.on('error', err => {
    console.log(err)
});
const model = {};

function request (query){
    return sql.connect(config).then(pool => {
        return pool.request()
            .query(query)
    }).then(result => {
        return result.recordset;
    }).catch(err => {
        console.log('ERR',err)
    });
}

model.GetUser = (login,password)=> {
    let query = `
        select
            * 
        from
            MazShop.dbo.UserShop
        where
            login = '${ login }' 
            and password = '${ password }'`;
        return request(query);
};
model.GetAllUsers = ()=> {
        // noinspection SqlDialectInspection
    let query = `
        select
            * 
        from
            MazShop.dbo.UserShop`;
    return request(query);
};
model.GetChar = (id)=>{
    let query = `
        select
            * 
        from
              MazShop.dbo.Characteristic
        where itemId = ${id}
              `;
    return request(query);
};
model.GetContent = id =>{
    let query = `
        select
            * 
        from
              MazShop.dbo.ItemContent
        where itemId = ${id}
              `;
    return request(query);
};
model.GetUserById = (id)=>{
    let query = `
        select
            * 
        from
              MazShop.dbo.UserShop
        where userId = ${id}
              `;
    return request(query);
};
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
            ('${description}','${header}','${previewImage}',${price})
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
model.GetUserCart =  (userId)=>{
    // Query
    let query = `
        select
            * 
        from
            MazShop.dbo.Cart 
        where
            userId = '${userId}'
           `;
    return request(query);
};
model.GetAllShopItems = () =>{
    // noinspection SqlDialectInspection
    let query = `
    select * from MazShop.dbo.ShopItem `;
    return request(query);
};
model.GetShopItem = (ShopItemId) =>{
    let query = `
    select * from MazShop.dbo.ShopItem where ShopItemId = '${ShopItemId}'`;
    return request(query);
};


module.exports = model;
