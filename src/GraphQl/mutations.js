const {
    CharacteristicItem,
    ItemContent,
    ItemComment,
    ShopItem,
    ChartItem,
    User,
    Request,
    OrderShop} =  require('./GraphQl/types');
const {
    GraphQLInt,
    GraphQLBoolean,
    GraphQLString,
    GraphQLFloat,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
} = require('graphql');
const model = require('../Model/sqlInserts');
const addUser = {
    type: User,
    args: {
        password: {
            name: 'password',
            type: new GraphQLNonNull(GraphQLString)
        },
        login: {
            name: 'login',
            type: new GraphQLNonNull(GraphQLString)
        },
        rights: {
            name: 'rights',
            type: new GraphQLNonNull(GraphQLInt)
        },
        phoneNumber: {
            name: 'phoneNumber',
            type: new GraphQLNonNull(GraphQLInt)
        },
        email: {
            name: 'email',
            type: new GraphQLNonNull(GraphQLString)
        },
    },
    resolve: async function(root,params){
        let res =  await model.Register(params);
        if(res){
            return res
        }
        else {
            console.log(res)
        }
    }
};
const AddShopItem = {
    type: ShopItem,
    args: {
        price: {
            name: 'price',
            type: new GraphQLNonNull(GraphQLFloat)
        },
        login: {
            name: 'login',
            type: new GraphQLNonNull(GraphQLString)
        },
        previewImage: {
            name: 'previewImage',
            type: new GraphQLNonNull(GraphQLString)
        },
        header: {
            name: 'header',
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            name: 'description',
            type: new GraphQLNonNull(GraphQLString)
        },
    },
    resolve: async function(root,params){
        let res =  await model.AddShopItem(params);
        if(res){
            return res
        }
        else {
            console.log(res)
        }
    }
};
const AddOrder = {
    type: OrderShop,
    args: {
        ...OrderShop.getFields()
    },
    resolve: async function(root,params){
        let res =  await model.AddOrder(params);
        if(res){
            return res
        }
        else {
            console.log(res)
        }
    }
};
delete AddOrder.args.orderId;

AddOrder = definer(OrderShop,model.AddOrder,['orderId'])

function definer(object,req,exclude,add){
    let obj =  {
        type: OrderShop,
        args: {
            ...object.getFields(),
                ...add
        },
        resolve: async function(root,params){
            let res =  await req(params);
            if(res){
                return res
            }
            else {
                console.log(res)
            }
        }
    };
    for(let pt of exclude)
        delete obj.args[pt];
    return obj;
}


module.exports = {
    AddOrder: AddOrder,
    AddShopItem: AddShopItem,
    addUser: addUser,

};
