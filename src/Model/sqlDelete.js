request = require('./model.config');
const model = {};
model.DeleteItemContent = ({contentId})=>{
    // Query
    console.log(contentId)
    let query = `
        delete
        from
            MazShop.dbo.ItemContent
            where
            contentId = ${contentId}
           `;
    return request(query);
};
module.exports=model;
