request = require('./model.config');
const model = {};
model.GetAllUsers = async () => {
    // noinspection SqlDialectInspection
    let query = `
        select
            * 
        from
            UserShop`;
    return request(query);
};
model.GetChar = ({id}) => {
    let query = `
        select
            * 
        from
              Characteristic
        where itemId = ${id}
              `;
    return request(query);
};
model.GetAllShopItems = () => {
    // noinspection SqlDialectInspection
    let query = `
    SELECT ShopItemId
     , description
     , header
     , price
     , content AS previewImage
FROM SHOPITEM
         LEFT JOIN
     ITEMCONTENT
     ON
         SHOPITEM.SHOPITEMID = ITEMCONTENT.ITEMID
WHERE ITEMCONTENT.CONTENTID = (
    SELECT MIN(ITEMCONTENT.CONTENTID)
    FROM ITEMCONTENT
    WHERE ITEMCONTENT.ITEMID = SHOPITEM.SHOPITEMID
)`;
    return request(query);
};


model.GetAllShopItemsFilter = async ({category, min, max, searchQuery = '', lastId}) => {
    // noinspection SqlDialectInspection
    console.log('values', min, max, category, searchQuery);
    let q = category && `and ShopItem.CategoryId=${category}` || ' ';
    let categories = await model.getCategory();
    let currentCategory = categories.find(k => k.categoryid === +category);
    console.log('Find category', currentCategory);
    if (currentCategory.categoryname === 'Все')
        q = ' ';
    let s = '';
    if (searchQuery)
        s = `and ShopItem.header like '%${searchQuery}%'`;
    lastId = lastId > 0 ? `and ShopItemId> ${lastId}` : '';
    console.log(lastId);
    min = min || 1;
    max = max || Number.MAX_VALUE;
    let query = `
    SELECT 
        ShopItemId
     , description
     , header
     , price
     , content AS previewImage
FROM SHOPITEM
         LEFT JOIN
     DBO
         .ITEMCONTENT
     ON
         SHOPITEM.SHOPITEMID = ITEMCONTENT.ITEMID
WHERE ITEMCONTENT.CONTENTID = (
    SELECT MIN(ITEMCONTENT.CONTENTID)
    FROM ITEMCONTENT
    WHERE ITEMCONTENT.ITEMID = SHOPITEM.SHOPITEMID 
)  ${q} ${s} ${lastId} and ShopItem.price between ${min} and ${max} `;
    return request(query);
};
model.GetRating = ({itemId}) => {
    console.log('itemID', itemId)
    let query = `select avg(ratingValue) as ratingValue  from Rating where itemId = ${itemId}`;
    return request(query);
};
model.GetRatingUser = ({itemId, userId}) => {
    let query = `select * from Rating where itemId = ${itemId} and userId = ${userId}`;
    return request(query);
};
model.GetUser = ({login, password}) => {
    let query = `
        select
            * 
        from
            UserShop
        where
            login = '${login}' 
            and password = '${password}'`;
    return request(query);
};

model.GetContent = ({id}) => {
    let query = `
        select
            * 
        from
              ItemContent
        where itemId = ${id}`;
    return request(query);
};

model.GetUserById = ({id}) => {
    let query = `
        select
            * 
        from
              UserShop
        where userId = ${id}
              `;
    return request(query);
};
model.GetUserCart = ({userId}) => {
    console.log('UserID', userId)
    // Query
    let query = `
     SELECT
	count
,	cartId
,	userId
,   ItemContent.itemId
,	description
,	header
,	price
,	CategoryId
,	content	AS previewImage
FROM
	CART
INNER JOIN
	SHOPITEM
ON
	CART.ITEMID	=	SHOPITEM.SHOPITEMID
INNER JOIN
    ITEMCONTENT
ON
	CART.ITEMID	=	ITEMCONTENT.ITEMID
WHERE
	ITEMCONTENT.CONTENTID	=	(
		SELECT
			MIN(ITEMCONTENT.CONTENTID)
		FROM
			ITEMCONTENT
		WHERE
			ITEMCONTENT.ITEMID	=	SHOPITEM.SHOPITEMID
	) and CART.USERID	= ${userId}
	limit 9;
	`;
    return request(query);
};
model.Login = async ({email, password}) => {
    let query = `
        select
            * 
        from
            UserShop
        where
            email = '${email}' 
            and password = '${password}'`;
    let req = await request(query);
    return req;
};
model.getCategory = () => {
    // noinspection SqlDialectInspection
    let query = 'select * from Category';
    return request(query);
};
model.GetShopItem = ({ShopItemId}) => {
    let query = `
    select * from ShopItem where ShopItemId = '${ShopItemId}'`;
    return request(query);
};
model.GetPreviewImage = ({imageId}) => {
    let query = `
    select content from ItemContent where contentId = '${imageId}'`;
    return request(query);
};
model.GetOrders = async () => {
    let query = `
    select login,orderId, phoneNumber,email,itemId,UserShop.userId as userId, 
        OrderShop.count as count , startDate from UserShop INNER join OrderShop 
    on UserShop.userId=OrderShop.userId
  `;
    return request(query);
};

model.GetHeadersSearch = async ({value}) => {
    let query = `select  header from ShopItem where ShopItem.header like '%${value}%' limit 7`;
    return request(query);
};

model.GetImages = async () => {
    let query = `select * from images `;
    return request(query);
};

model.GetPosts = ({}) => {
    let query = `select * from Post `;
    return request(query);
};
module.exports = model;
