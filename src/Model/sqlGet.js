request = require('./model.config');
const model = {};
model.GetAllUsers = async ()=> {
    // noinspection SqlDialectInspection
    let query = `
        select
            * 
        from
            MazShop.dbo.UserShop`;
    return request(query);
};
model.GetChar = ({id})=>{
    let query = `
        select
            * 
        from
              MazShop.dbo.Characteristic
        where itemId = ${id}
              `;
    return request(query);
};
model.GetAllShopItems = () =>{
    // noinspection SqlDialectInspection
    let query = `
    SELECT ShopItemId
     , description
     , header
     , price
     , content AS 'previewImage'
FROM MAZSHOP.DBO.SHOPITEM
         LEFT JOIN
     MAZSHOP.DBO
         .ITEMCONTENT
     ON
         SHOPITEM.SHOPITEMID = ITEMCONTENT.ITEMID
WHERE ITEMCONTENT.CONTENTID = (
    SELECT MIN(ITEMCONTENT.CONTENTID)
    FROM ITEMCONTENT
    WHERE ITEMCONTENT.ITEMID = SHOPITEM.SHOPITEMID
)
`;
    return request(query);
};


model.GetAllShopItemsFilter = ({category,min,max}) =>{
    // noinspection SqlDialectInspection
    console.log('values',min,max,category)
    let q = category &&`and ShopItem.CategoryId=${category}` || '';
    min = min || 1
    max = max || Number.MAX_VALUE
    let query = `
    SELECT ShopItemId
     , description
     , header
     , price
     , content AS 'previewImage'
FROM MAZSHOP.DBO.SHOPITEM
         LEFT JOIN
     MAZSHOP.DBO
         .ITEMCONTENT
     ON
         SHOPITEM.SHOPITEMID = ITEMCONTENT.ITEMID
WHERE ITEMCONTENT.CONTENTID = (
    SELECT MIN(ITEMCONTENT.CONTENTID)
    FROM ITEMCONTENT
    WHERE ITEMCONTENT.ITEMID = SHOPITEM.SHOPITEMID 
)${q} and ShopItem.price between ${min} and ${max} 
`;
    return request(query);
};


model.GetUser = ({login,password})=> {
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

model.GetContent = ({id}) =>{
    let query = `
        select
            * 
        from
              MazShop.dbo.ItemContent
        where itemId = ${id}`;
    return request(query);
};

model.GetUserById = ({id})=>{
    let query = `
        select
            * 
        from
              MazShop.dbo.UserShop
        where userId = ${id}
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
model.Login = async ({login,password})=> {
    console.log(login,password)
    let query = `
        select
            * 
        from
            MazShop.dbo.UserShop
        where
            login = '${ login }' 
            and password = '${ password }'`;
    let req = await request(query);
    return req;
};
model.getCategory = () => {
    // noinspection SqlDialectInspection
    let query = 'select * from MazShop.dbo.Category';
    return request(query);
}
model.GetShopItem = ({ShopItemId}) =>{
    let query = `
    select * from MazShop.dbo.ShopItem where ShopItemId = '${ShopItemId}'`;
    return request(query);
};
model.GetPreviewImage = ({imageId}) =>{
    let query = `
    select content from MazShop.dbo.ItemContent where contentId = '${imageId}'`;
    return request(query);
};
module.exports = model;
