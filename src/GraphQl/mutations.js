const {
    CharacteristicItem,
    ItemContent,
    ItemComment,
    ShopItem,
    ChartItem,
    User,
    Request,
    OrderShop} =  require('./types');
const model = require('../Model/sqlInserts');

function definer(object,req,exclude,add){
    let obj =  {
        type: Request,
        args: {
            ...(object)?object.getFields() : null ,
            ...add
        },
        resolve: async function(root,params){
            let res =  await req(params);
            if(res){
                return res
            }
            else {
                console.log(res)
                return (res)
            }
        }
    };
    for(let pt of exclude)
        delete obj.args[pt];
    return obj;
}

AddShopItem = definer(ShopItem,model.AddShopItem,['ShopItemId','previewImageRaw']);

AddOrder = definer(OrderShop,model.AddOrder,['orderId','item']);

AddItemComment = definer(ItemComment,model.AddItemComment,['commentId','user']);

AddChar = definer(CharacteristicItem,model.AddChar,['charId']);

AddItemContent = definer(ItemContent,model.AddItemContent,['contentId']);

AddToCart = definer(ChartItem,model.AddToCart,['chartId','item','user']);

addUser = definer(User,model.Register,['userId']);

module.exports = {
    AddOrder: AddOrder,
    AddShopItem: AddShopItem,
    addUser: addUser,
    AddItemComment,
    AddItemContent,
    AddToCart,
    AddChar
};
