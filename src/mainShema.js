const _ = require('lodash');
// Authors и Posts получают данные в виде
// JSON массивов с соответствующих файлов
const model = require('./mssqlRequest');
const {GraphQLBoolean} = require("graphql/type/scalars");
const {GraphQLInt} = require("graphql/type/scalars");
const CombainMutations = require('./Mutations')


const {
    // Здесь базовые типы GraphQL, которые нужны в этом уроке
    GraphQLString,
    GraphQLFloat,
    GraphQLList,
    GraphQLObjectType,
    /* Это необходимо для создания требований
       к полям и аргументам */
    GraphQLNonNull,
    // Этот класс нам нужен для создания схемы
    GraphQLSchema,

} = require('graphql');

const User = new GraphQLObjectType({
    name: 'user',
    description: 'user name',
    fields: ()=> ({
        userId: { type: GraphQLInt},
        login: { type: new GraphQLNonNull(GraphQLString)},
        password: { type: new GraphQLNonNull(GraphQLString)},
        phoneNumber: { type: GraphQLInt},
        email: { type: GraphQLString},
        rights: { type: GraphQLInt},
    })
});
const ShopItem = new GraphQLObjectType({
    name: 'ShopItem',
    description: 'item',
    fields: ()=> ({
        ShopItemId: { type: GraphQLInt},
        header: { type: GraphQLString},
        description: { type: GraphQLString},
        previewImage: { type: GraphQLString},
        price: {type: GraphQLFloat}
    })
});

const OrderShop = new GraphQLObjectType({
    name: 'OrderShop',
    description: 'order',
    fields: ()=> ({
        orderId: {type: GraphQLInt},
        userId: {type: GraphQLInt},
        itemId: {type: GraphQLInt},
        status: {type: GraphQLInt},
        item: {type: ShopItem,
        description: 'item',
            resolve: async (root,params)=> await model.GetShopItem(root.itemId)
        },
    })
});

const ItemContent = new GraphQLObjectType({
    name: 'ItemContent',
    description: 'ItemContent r',
    fields: ()=> ({
        contentId: {type: GraphQLInt},
        itemId: {type: GraphQLInt},
        content: {type: GraphQLString}
    })
});
const ItemComment = new GraphQLObjectType({
    name: 'ItemComment',
    description: 'ItemComment',
    fields: ()=> ({
        commentId: {type: GraphQLInt},
        itemId: {type: GraphQLInt},
        content: {type: GraphQLString},
        user: {type: User}
    })
});
const CharacteristicItem = new GraphQLObjectType({
        name: 'CharacteristicItem',
        fields: ()=> ({
           charId: {type: GraphQLInt},
           itemId: {type: GraphQLInt},
           CharName: {type: GraphQLString},
           charContent: {type: GraphQLString}
        })
    }
);

const ChartItem = new GraphQLObjectType({
        name: 'ChartItem',
        fields: ()=> ({
            chartId: {type: GraphQLInt},
            itemId: {type: GraphQLInt},
            count: {type: GraphQLString},
            userId: {type: GraphQLInt},
            item: {type: ShopItem, description: 'item',
                resolve: async (root,params)=> await model.GetShopItem(root.itemId),
                user: {type: User,
                resolve:  async (root,params)=> await model.GetUserById(root.itemId)
                }
            },

        })
    }
);


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









const Request = new GraphQLObjectType({
    name: 'Request',
    fields: ()=> ({
        request: {type: GraphQLString}
    })
});
const Mutations = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser:  addUser,
    }
});


const BlogAppSchema = new GraphQLSchema({
    query: BlogQueryRootType,
    mutation: Mutations
});

module.exports = BlogAppSchema;
