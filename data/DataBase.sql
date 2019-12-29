create table Category
(
    categoryName varchar(59),
    categoryId   int identity
        constraint Category_pk
            primary key nonclustered
)
go

create table Post
(
    image  varchar(max),
    postId int identity
        constraint Post_pk
            primary key nonclustered,
    text   varchar(300)
)
go

create table ShopItem
(
    ShopItemId  int identity
        constraint PK_ShopItemId
            primary key,
    description varchar(max),
    header      varchar(max),
    price       float default 1 not null
        constraint more_0
            check ([price] > 0),
    CategoryId  int
        constraint ShopItem_Category_categoryId_fk
            references Category
)
go

create table Characteristic
(
    charId      int identity
        constraint PK_Characteristic
            primary key,
    itemId      int
        constraint Fk_item_char
            references ShopItem
            on delete cascade,
    charName    varchar(50),
    charContent varchar(50)
)
go

create table ItemContent
(
    contentId int identity
        constraint PK_ItemContent
            primary key,
    itemId    int
        constraint Fk_item_content
            references ShopItem
            on delete cascade,
    content   varchar(max)
)
go

create table UserShop
(
    userId      int identity
        constraint PK_User
            primary key,
    login       varchar(50),
    password    varchar(100),
    phoneNumber int,
    email       varchar(70),
    rights      int default 2
)
go

create table Cart
(
    cartId int identity
        constraint PK_cart
            primary key,
    ItemId int
        constraint Fk_item
            references ShopItem
            on delete cascade,
    count  int,
    userId int
        constraint FK_user_Cart
            references UserShop
)
go

create unique index Cart_ItemId_uindex
    on Cart (ItemId)
go

create table ItemComment
(
    commentId int identity
        constraint PK_ItemComment
            primary key,
    itemId    int
        constraint Fk_item_comment
            references ShopItem
            on delete cascade,
    content   varchar(max),
    userId    int
        constraint Fk_user_Comment
            references UserShop
)
go

create table OrderShop
(
    orderId   int identity
        constraint PK_ItemComment_order
            primary key,
    itemId    int
        constraint Fk_item_order
            references ShopItem
            on delete cascade,
    userId    int
        constraint OrderShop_UserShop_userId_fk
            references UserShop,
    status    int default 1,
    startDate datetime,
    count     int default 1
)
go

create unique index UserShop_login_uindex
    on UserShop (login)
go

create unique index UserShop_email_uindex
    on UserShop (email)
go

create table images
(
    content varchar(max),
    imageId int identity
        constraint images_pk
            primary key nonclustered
)
go


