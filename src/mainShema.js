const _ = require('lodash');
// Authors и Posts получают данные в виде
// JSON массивов с соответствующих файлов
const model = require('./Model/mssqlRequest');
const mutations = require('./GraphQl/mutations');
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

const ItemPage = new GraphQLObjectType({
    name: 'ItemPage',
    description: 'ItemPage',
    fields: ()=> ({
        Characteristics: {type: new GraphQLList(CharacteristicItem),
            resolve: async (root,params)=> model.GetChar(root.item.userId)
        },
        ItemContents: {type: new GraphQLList(ItemContent),
            resolve: async (root,params)=>model.GetContent(root.item.userId)
        },
        ItemComments: {type: new GraphQLList(ItemComment),
            resolve: async (root,params)=> console.log(root)
        },
        item: {type: ShopItem,
            description: 'item',
            resolve: async (root,params)=> await model.GetShopItem(root.itemId)

        },
    })
});


const BlogQueryRootType = new GraphQLObjectType({
    name: "BlogAppSchema",
    description: "Blog Application Schema Query Root",
    fields: () => ({
        users:{
            type: new GraphQLList(User),
            description: "ALL users",
            resolve: async ()=> await model.GetAllUsers()
            },
        ItemPage: {
            type: ItemPage,
            args: {
              itemId:{
                  name: 'itemId',
                  type: new GraphQLNonNull(GraphQLInt)
              }
            },
            resolve: async (root,params) => model.GetShopItem(root.itemId),
        },
        Item: {
            type: ShopItem,
            args: {
                itemId:{
                    name: 'itemId',
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async (root,params) => await model.GetShopItem(root.itemId),
        },
        Cart: {
            type: new GraphQLList(ChartItem),
            args: {
                userId: {
                    name: 'userId',
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async (root,params) => await model.GetUserCart(params.userId)
        },
        Items: {
            type: ShopItem,
            resolve: async (root,params) => await model.GetAllShopItems(),
        },
        authorisation: {
            type: Request,
            description: "authorisation user",
            args:{
                name: {
                    name: 'name',
                    type:  new GraphQLNonNull(GraphQLString)
                },
                password: {
                    name: 'password',
                    type:  new GraphQLNonNull(GraphQLString)
                },
            },
            resolve: function (root,params) {
                return  model.GetUser(params.name,params.password)
            }
        },
    })
});
const Mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
     ...mutations
    }
});
const BlogAppSchema = new GraphQLSchema({
    query: BlogQueryRootType,
    mutation: Mutations
});
module.exports = BlogAppSchema;
