
use master

create DATABASE MazShop
collate Cyrillic_General_CI_AS
;
go
use MazShop
go
create table Category
(
    categoryName varchar(59),
    categoryId   int identity(1000,1)
        constraint Category_pk
            primary key nonclustered
)
go

create unique index Category_categoryName_uindex
    on Category (categoryName)
go

create table Post
(
    image  varchar(max),
    postId int identity(1000,1)
        constraint Post_pk
            primary key nonclustered,
    text   varchar(300)
)
go

create table ShopItem
(
    ShopItemId  int identity(1000,1)
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
    charId      int identity(1000,1)
        constraint PK_Characteristic
            primary key,
    itemId      int
        constraint Fk_item_char
            references ShopItem
            on delete cascade,
    charName    varchar(350),
    charContent varchar(350)
)
go

create table ItemContent
(
    contentId int identity(1000,1)
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
    userId      int identity(1000,1)
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
    cartId int identity(1000,1)
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
    commentId int identity(1000,1)
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
    orderId   int identity(1000,1)
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

create table Rating
(
    ratingId    int identity(1000,1)
        constraint Rating_pk
            primary key nonclustered,
    ratingValue float,
    userId      int
        constraint Rating_UserShop_userId_fk
            references UserShop
            on delete cascade,
    itemId      int
        constraint Rating_ShopItem_ShopItemId_fk
            references ShopItem
            on delete cascade
)
go

create unique index UserShop_email_uindex
    on UserShop (email)
go

create table images
(
    content varchar(max),
    imageId int identity(1000,1)
        constraint images_pk
            primary key nonclustered
)
go


