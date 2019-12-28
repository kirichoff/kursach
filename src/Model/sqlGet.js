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


model.GetAllShopItemsFilter = ({category,min,max,searchQuery = ''}) =>{
    // noinspection SqlDialectInspection
    console.log('values',min,max,category);
    let q = category && `and ShopItem.CategoryId=${category}` || ' ';
    if (+category === 3){
        q=' ';
    }
    let s ='';
    if(searchQuery)
        s = `and ShopItem.header like '%${searchQuery}%'`;

    console.log(q);
    min = min || 1;
    max = max || Number.MAX_VALUE;
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
)  ${q} ${s} and ShopItem.price between ${min} and ${max} `;
    return  request(query);
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
model.GetUserCart =  ({userId})=>{
    console.log('UserID',userId)
    // Query
    let query = `
     SELECT
	count
,	cartId
,	userId
,   MazShop.dbo.ItemContent.itemId
,	description
,	header
,	price
,	CategoryId
,	content	AS 'previewImage'
FROM
	MAZSHOP.DBO.CART
INNER JOIN
	MAZSHOP.DBO
.SHOPITEM
ON
	CART.ITEMID	=	MAZSHOP.DBO.SHOPITEM.SHOPITEMID
INNER JOIN
	MAZSHOP.DBO
.ITEMCONTENT
ON
	MAZSHOP.DBO.CART.ITEMID	=	MAZSHOP.DBO.ITEMCONTENT.ITEMID
WHERE
	MAZSHOP.DBO.ITEMCONTENT.CONTENTID	=	(
		SELECT
			MIN(ITEMCONTENT.CONTENTID)
		FROM
			MAZSHOP.DBO.ITEMCONTENT
		WHERE
			MAZSHOP.DBO.ITEMCONTENT.ITEMID	=	MAZSHOP.DBO.SHOPITEM.SHOPITEMID
	) and MAZSHOP.DBO.CART.USERID	= ${userId}`;
    return request(query);
};
model.Login = async ({email,password})=> {
    let query = `
        select
            * 
        from
            MazShop.dbo.UserShop
        where
            email = '${ email }' 
            and password = '${ password }'`;
    let req = await request(query);
    return req;
};
model.getCategory = () => {
    // noinspection SqlDialectInspection
    let query = 'select * from MazShop.dbo.Category';
    return request(query);
};
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
model.GetOrders = async () =>{
  let query = `
    select login,orderId, phoneNumber,email,itemId,UserShop.userId as 'userId', 
        MazShop.dbo.OrderShop.count as count , startDate from UserShop INNER join OrderShop 
    on UserShop.userId=OrderShop.userId
  `;
  return request(query);
};

model.GetHeadersSearch = async ({value}) => {
    let query = `select header from MazShop.dbo.ShopItem where ShopItem.header like '%${value}%'`;
    return request(query);
};

model.GetImages = async ()=>{
    let query = `select * from MazShop.dbo.images `;
    return request(query);
};


module.exports = model;
