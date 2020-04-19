request = require('./model.config');
const model = {};


model.GetItemStats = ({}) => {
    const query = `
select sum(count) as count,
            itemId,
       (select price from ShopItem where ShopItemId= itemId) as price,
       (select header from ShopItem where ShopItemId= itemId) as header,
       (select description from ShopItem where ShopItemId= itemId) as description
from OrderShop inner join ShopItem
on itemId=ShopItemId group by itemId
         `;
    return request(query);
};

model.GetItemStatsPrice = ({}) => {
    const query = `
   select price,header from  ShopItem`;
    return request(query)
};
model.GetRatingStats = ({}) => {
    const query = `
   select count(ratingId) as count ,ratingValue from  Rating group by ratingValue 
    `;
    return request(query)
};

module.exports = model;
