const model = require('./Model/mssqlRequest');
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
const Request = new GraphQLObjectType({
    name: 'Request',
    fields: ()=> ({
        request: {type: GraphQLString}
    })
});
module.exports = {
    ChartItem: ChartItem,
    Request: Request,
    User: User,
    CharacteristicItem: CharacteristicItem,
    OrderShop: OrderShop,
    ItemContent: ItemContent,
    ItemComment: ItemComment,
};
