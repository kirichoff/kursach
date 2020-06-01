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
model.GetShopItemsReport = () =>{
    // noinspection SqlDialectInspection
    let query = `
    SELECT    
     header
     , price     
FROM ShopItem;
`;
    return request(query);
};


model.GetAllShopItemsFilter = async ({category,min,max,searchQuery = '',lastId,minRating,maxRating}) =>{
    // noinspection SqlDialectInspection
    console.log(category,min,max,searchQuery,lastId)
    let q = category && `and ShopItem.CategoryId=${category}` || ' ';
    let categories =  await model.getCategory();
    let currentCategory =  categories.find(k=> k.categoryId === +category);

    if (currentCategory.categoryName === 'Все')
        q = ' ';
    let s ='';
    if(searchQuery)
        s = `and ShopItem.header like '%${searchQuery}%'`;
    lastId = lastId>0? `and ShopItemId> ${lastId}` : '';

    min = min || 1;
    max = max || Number.MAX_VALUE;
    let query = `
    SELECT 
        top 9
        ShopItemId
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
${q} ${s} ${lastId} and ShopItem.price between ${min} and ${max}
and ISNULL((select sum(ratingValue)/count(ratingId) from Rating where itemId = ShopItem.ShopItemId),0) between ${minRating || 0} and ${maxRating || 5}`;
    return  request(query);
};
model.GetRating = ({itemId})=> {
    let query = `select avg(ratingValue) as ratingValue  from Rating where itemId = ${itemId}`;
    return  request(query);
};
model.GetRatingUser = ({itemId,userId}) =>{
    let query = `select * from Rating where itemId = ${itemId} and userId = ${userId}`;
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

model.GetComments = ({itemId}) => {
    let query = `
     select
    ItemComment.content,
    ItemComment.userId,
    ItemComment.itemId,
    ItemComment.commentId,
    UserShop.login,
    UserShop.email
from
    MazShop.dbo.ItemComment
        left JOIN UserShop on UserShop.userId = ItemComment.userId
where ItemComment.itemId = ${itemId}`;

    return request(query);
}

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
    select login,orderId, phoneNumber,email,itemId,status,UserShop.userId as 'userId', 
        MazShop.dbo.OrderShop.count as count , startDate from UserShop INNER join OrderShop 
    on UserShop.userId=OrderShop.userId
  `;
  return request(query);
};

model.OrdersCountByCategory = async () =>{
    let query = `
  select *,
       (select sum(count) from OrderShop
           inner join ShopItem
               on OrderShop.itemId =ShopItem.ShopItemId
       where ShopItem.CategoryId = Category.categoryId) as count
from Category;
  `;
    return request(query);
};


model.MostPopular = async () =>{
    let query = `
select sum(count) as count,
       (select header from ShopItem where ShopItem.ShopItemId = OrderShop.itemId) as header,
        (select  sum(ratingValue)/count(ratingId) from Rating where itemId = OrderShop.itemId) as rating
from OrderShop
group by itemId`;
    return request(query);
};

model.InfoCustomers = async () =>{
    let query = `select sum(count) as count,
    (select login from UserShop where UserShop.userId = OrderShop.userId) as name,
    (select email from UserShop where UserShop.userId = OrderShop.userId) as email,
    (select phoneNumber from UserShop where UserShop.userId = OrderShop.userId) as phone
from OrderShop
group by userId
`;
    return request(query);
};



model.GetOrdersByItem = async () =>{
    let query = `
  select *,
       (select sum(count) from OrderShop
           inner join ShopItem
               on OrderShop.itemId =ShopItem.ShopItemId
       where ShopItem.CategoryId = Category.categoryId) as count
from Category;
  `;
    return request(query);
};

model.GetHeadersSearch = async ({value}) => {
    let query = `select top 7 header from MazShop.dbo.ShopItem where ShopItem.header like '%${value}%'`;
    return request(query);
};

model.GetImages = async ()=>{
    let query = `select * from MazShop.dbo.images `;
    return request(query);
};

model.GetPosts = ({})=>{
    let query = `select * from Post `;
    return request(query);
};
module.exports = model;
