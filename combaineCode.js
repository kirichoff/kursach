/////// model.config.js
const sql = require("mssql");
const config =  {
    user: 'sa',
    password: '1234',
    server: 'localhost',
    port:1433,
    database: 'MazShop',
};
sql.on('error', err => {
    console.log(err)
});
module.exports = function request (query){
    return sql.connect(config).then(pool => {
        return pool.request()
            .query(query)
    }).then(result => {
        console.log('reqRES',result);
        return result.recordset;
    }).catch(err => {
        console.log('ERR',err);
        if (err === 'ECONNCLOSED'){
            return request(query)
        }
        return {error: err && err.originalError && err.originalError.info}
    });
};
/////// modelCombainer.js
module.exports =
    {
        get:
            {
                ...require('./sqlGet'),
                ...require('./sqlDelete'),
                ...require('./sqlUpdate'),
                ...require('./sqlStatistick')
            },
        post: {
            ...require('./sqlInserts'),

        }
    };
/////// sqlDelete.js
request = require('./model.config');
const model = {};
model.DeleteItemContent = ({contentId})=>{
    // Query
    let query = `
        delete
        from
            MazShop.dbo.ItemContent
            where
            contentId = ${contentId}
           `;
    return request(query);
};

model.DeleteItem = ({ShopItemId}) =>{
    let query = `
        delete
        from
            MazShop.dbo.ShopItem
            where
            ShopItemId = ${ShopItemId}
           `;
    return request(query);
};
model.DeleteCartItem = ({ShopItemId,userId}) =>{
    let query = `
        delete
        from
            MazShop.dbo.Cart
            where
            itemId = ${ShopItemId} and userId = ${userId}
           `;
    return request(query);
};

model.DeleteCategory = ({categoryId}) =>{
    let query = `
        delete
        from
            MazShop.dbo.Category
            where
            categoryId = ${categoryId}`;
    return request(query);
};
model.DeleteOrder =({orderId}) => {
   let query = `
    delete from MazShop.dbo.OrderShop where orderId=${orderId}`;
    return request(query);
} ;

module.exports=model;
/////// sqlGet.js
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
model.GetAllShopItems = () =>{
    // noinspection SqlDialectInspection
    let query = `
    SELECT ShopItemId
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
`;
    return request(query);
};


model.GetAllShopItemsFilter = ({category,min,max,searchQuery = ''}) =>{
    // noinspection SqlDialectInspection
    console.log('values',min,max,category);
    let q = category && `and ShopItem.CategoryId=${category}` || ' ';
    if (+category === 3){
        q=' ';
    }
    let s ='';
    if(searchQuery)
        s = `and ShopItem.header like '%${searchQuery}%'`;

    console.log(q);
    min = min || 1;
    max = max || Number.MAX_VALUE;
    let query = `
    SELECT ShopItemId
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
)  ${q} ${s} and ShopItem.price between ${min} and ${max} `;
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
    console.log('UserID',userId)
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
    select login,orderId, phoneNumber,email,itemId,UserShop.userId as 'userId', 
        MazShop.dbo.OrderShop.count as count , startDate from UserShop INNER join OrderShop 
    on UserShop.userId=OrderShop.userId
  `;
  return request(query);
};


module.exports = model;
/////// sqlInserts.js
request = require('./model.config');
const model = {};
model.Register = ({login,password,email,phoneNumber}) => {
    // Query
    let query = `
        Insert         
        into
             MazShop.dbo.UserShop
            (login,password,email,phoneNumber)            
        values
            ('${login}','${password}','${email}',${phoneNumber});
            select @@IDENTITY as userId
           `;
    return request(query);
};
model.AddShopItem = ({description,header,price,categoryId}) =>{
    console.log('add',description,header,price,categoryId);
    let query = `
        Insert         
        into
             MazShop.dbo.ShopItem
            (description,header,categoryId,price)           
        values
            ('${description}','${header}',${categoryId},${price});
            select @@IDENTITY as Id  
           `;
    return request(query);
};
model.AddOrder = ({itemId, userId, status, startDate,count})=>{
        console.log(itemId, userId, status, startDate,count);
        count = count || 1;
    let query = `
    insert       
    into
        MazShop.dbo.OrderShop
        (itemId, userId, status, startDate,count) values (${itemId},${userId},${status},'${startDate}',${count});
        delete from MazShop.dbo.Cart where Cart.ItemId = ${itemId}  
        `;
    return request(query)
};
model.AddItemContent = ({itemId, content}) =>{
    let query = `
    insert       
    into
        MazShop.dbo.ItemContent(itemId, content)
        values (${itemId},'${content}')
       `;
    return request(query)
};
model.AddItemComment = ({itemId, content,userId}) =>{
    let query = `
    insert       
    into
        MazShop.dbo.ItemComment(itemId, content, userId)
        values (${itemId},'${content}',${userId})
       `;
    return request(query)
};
model.AddChar = ({itemId, charName, charContent}) =>{
    let query = `
    insert       
    into
        MazShop.dbo.Characteristic(itemId, charName, charContent)
        values (${itemId},'${charName}','${charContent}')
       `;
    return request(query)
};
model.AddToCart = ({ItemId,count,userId})=>{
    // Query
    console.log('Add cart',{ItemId,count,userId})
    let query = `
        Insert         
        into
            MazShop.dbo.Cart
            (ItemId,count,userId)            
        values
            ('${ItemId}','${count}','${userId}')
           `;
    return request(query);
};

model.AddCartUser = async ({login,password,email,phoneNumber}) => {
        // Query
        let testing = `select userId from MazShop.dbo.UserShop where email = '${email}' `;
        let user = await request(testing);
        if(user.length > 0){
            return  user
        }
        let query = `
        Insert         
        into
             MazShop.dbo.UserShop
            (login,password,email,phoneNumber)            
        values
            ('${login}','${password}','${email}',${phoneNumber});
            select @@IDENTITY as userId
           `;
        return request(query);
    };
model.SetCategory = async ({categoryName}) =>{
  let query =`
    insert into Category(categoryName) values('${categoryName}');
  `;

  return request(query)
};

module.exports = model;
/////// httpHandler.js
module.exports = function httpHandler(app,model,exclude,path,type='get') {
    for(let name in model){
        if(exclude.find(el=> el === name))
            continue;
        app[type](`${path}${name}`, async (req,res)=>{
            console.log('reqqqqq');
            console.log(req);
            console.log(req.body);
            let q = type === 'get'? req.query : req.body;
            let re = await model[name](q);
            console.log('req',re);
            res.send(re);
        })
    }
};
/////// jwt.js
const jsonwebtoken = require('jsonwebtoken');
const privateKey = 'Kursachk po bd';
 function generate(user) {
    return jsonwebtoken.sign({
        data: user
    }, privateKey, { expiresIn: '1h' });
}
function verify(token) {
     try {
         return jsonwebtoken.verify(token, privateKey)
     }
     catch (e) {
         return false
     }
}

const jwt = {generate,verify};
module.exports = jwt;
/////// sqlStatistick.js
request = require('./model.config');
const model = {};


model.GetItemStats = ({}) =>{
    const query = `
select count(itemId)  as count,
            itemId,
       (select price from ShopItem where ShopItemId= itemId) as price,
       (select header from ShopItem where ShopItemId= itemId) as header,
       (select description from ShopItem where ShopItemId= itemId) as description
from OrderShop inner join ShopItem
on itemId=ShopItemId group by itemId
         `;
    return request(query);
};

model.GetItemStatsPrice = ({})=>{
  const query=`
   select price,header from  ShopItem`;
  return request(query)
};
module.exports = model;
/////// sqlUpdate.js
request = require('./model.config');
const model = {};
model.UpdateShopItem = ({description,header,price,categoryId,ShopItemId})=>{
    // Query
    console.log('up',description,header,price,categoryId,ShopItemId);
    let query = `
        update         
            MazShop.dbo.ShopItem
            SET description = '${description}',
             header = '${header}',
             price = ${price},
             categoryId = ${categoryId}           
            where ShopItemId = ${ShopItemId}
           `;
    return request(query);
};
model.UpdateUser = ({email,phoneNumber,password,login,userId}) => {
    let query = `
    update
     MazShop.dbo.UserShop
             SET login = '${login}',
             password = '${password}',
             phoneNumber = ${phoneNumber} ,
             email = '${email}'           
             where userId = ${userId}`;
    return request(query);
    };
model.UpdateCountCart = ({itemId,userId,count}) =>{
    console.log('count',itemId,userId,count)
    let query = `
    update
     MazShop.dbo.Cart
             SET count = '${count}'         
             where userId = ${userId} and ItemId=${itemId}`;
    return request(query);

};
module.exports = model;
/////// Bar.js
import React from 'react';
import '../style/Style.css'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {AiOutlineShoppingCart} from "react-icons/ai";
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";

function Bar(props) {
    let isAdmin = props.state.User && props.state.User.rights === 1 || null;
    return (
        <div style={ {marginTop: '5px'} }>
            <Link className={ ' point' } to={ '/' } onlyActiveOnIndex>Главная</Link>
            <Link className={ 'point' } to={ '/Catalog' }>Каталог</Link>
            <Link className={ 'point' } to={ '/About' }>О предприятии</Link>
            {isAdmin?
                <Link className={ 'point' } to={ '/Stats' }>Статистика</Link>
                :
                null
            }
            {isAdmin?
                <Link className={ 'point' } to={ '/Orders' }>Заказы</Link>
                :
                null
            }
            <Link className={ 'point' } to={ '/Cart' }><AiOutlineShoppingCart size={'2em'} /></Link>
        </div>
    );
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Bar);
/////// CartItem.js
import React, {useState} from 'react';
import {RemoveIcon} from "rambler-ui/icons/forms";
import Card from "react-bootstrap/Card";
import '../style/CartItem.css'
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
import {connect} from "react-redux";
function CartItem(props) {

    return (
            <Card key={props.key}>
                <Card.Body>
                    <div className={'cardbody'}  >
                        <Card.Img className={'imgg'} style={{width: '100px'}}  variant="left" src={props.previewImage} />
                        <div  style={{display:'inline-block'}} className={'p-header'}>
                            <h4>{props.header}</h4>
                            <div>{props.description}</div>
                        </div>
                        <div className={'count'} >
                            <input defaultValue={ props.count || 1 }
                                   onChange={ (e) => props.setCount && props.setCount(e.target.value) || 1 }
                                   type={ 'number' } min={ 1 }/>
                        <span>  :колличество</span>
                        </div>
                        <span className={'price'} >{props.price} :цена</span>
                        <div className={'removeIco'}>
                            <RemoveIcon onClick={()=>
                            {
                                console.log(props.ShopItemId,'CartItem');
                                props.DeleteCartItem(props.ShopItemId);
                            }
                            } />
                        </div>
                    </div>
                </Card.Body>
            </Card>
    );
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CartItem);
/////// CatalogItem.js
import React from 'react';
import '../style/catalogItem.css'
import Card from "react-bootstrap/Card";
import 'bootstrap/dist/css/bootstrap.min.css';


function CatalogItem(props) {
    return (
            <Card style={{marginBottom: 10,marginLeft:10 }}>
                <Card.Img variant="top" src={props.previewImage} />
                <Card.Body>
                    <Card.Title>{props.header}</Card.Title>
                    <Card.Text style={{height: '1.2em',
                        overflow: 'hidden',
                        width: '13vw'}}>
                        {props.description}
                    </Card.Text>
                    <div>
                        {props.link}
                        {props.cart}
                    </div>
                    <div style={{  marginLeft: 'auto%'}} >{props.delete}</div>
                </Card.Body>
            </Card>
    );
}

export default CatalogItem;
/////// CatalogNavbar.js
import React, {Component} from 'react'
import '../style/catalogNavbar.css'
import Input from "rambler-ui/Input";
import Button from "rambler-ui/Button";
import CategoryPiker from "./CategoryPiker";
import {EditIcon} from "rambler-ui/icons/forms";
import {Link} from "react-router";

export default class CatalogNavbar extends Component {
    state = {
        min: this.props.Nav.min,
        category: this.props.Nav.category,
        max: this.props.Nav.max
    };
    check = (index) =>(val)=>{
        let boxes= this.state.checkBoxes;
        boxes[index].checked = !boxes[index].checked;
        this.setState({checkBoxes: [...boxes] })
    };
    render() {

        let isAdmin = this.props.isAdmin;
        console.log('Nav',this.state);
        return (
        <div className={'catalogNavbar'} >
            <div style={{width: '14vw', marginBottom: 15}}>
                <h3>Категории {isAdmin?  <Link  to={'/Category'} ><EditIcon/></Link>:null} </h3>
                <CategoryPiker onChange={ (id) => {
                    this.setState({category: id});
                    this.state.category = id;
                    this.props.onChange({...this.state})
                }
                }
                />
                <h5>Цена от</h5>
                <Input
                    value={this.state.min}
                    onChange={(value)=>{
                        this.setState({min:value.target.value});
                        this.state.min = value.target.value
                        this.props.onChange(this.state)
                    }
                    }
                    type={ 'number' } />
                <h5>До</h5>
                <Input value={this.state.max}
                       onChange={(value)=>
                           {
                               this.setState({max:value.target.value});
                               this.state.max = value.target.value
                               this.props.onChange(this.state)
                           }
                       }
                       type={ 'number' } />
                <div style={{padding: '10% 21%'}} >
                    <Button onClick={()=>this.props.onClick()} >подобрать</Button>
                </div>
            </div>
        </div>
        )
    }
}
/////// CategoryPiker.js
import React, {useState,useEffect} from 'react';
import Select from "rambler-ui/Select";
import MenuItem from "rambler-ui/Menu/MenuItem";
import {rest} from '../rest/rest'


function CategoryPiker(props) {
    const findId =(value)=>  data.find(k=>k.categoryName == value);
    const [value,setValue] = useState( '');
    const [data,setData] =useState([]);
    useEffect(()=>{
        rest.getCategory().then(res=>
            {
                console.log('Category',res);
                setValue(
                    res.length &&
                    res.find(k=>k.categoryId === props.categoryId)
                    && res.find(k=>k.categoryId === props.categoryId).categoryName
                    || '' );
            if (res.length>0) {
                setData([...res]);
            }})
    },[]);
    return (
            <Select
                placeholder="Выберите категорию"
                lightPlaceholderColor={true}
                value={value}
                onChange={(e)=>{
                    console.log(e);
                    setValue(e);
                    if (props.onChange) props.onChange(findId(e).categoryId) ;
                }}
              // onSearch={filterData}
            >
                {data.map(item =>
                    <MenuItem
                        value={item.categoryName}
                        key={item.categoryId}>
                        {item.categoryName}
                    </MenuItem>
                )}
            </Select>
    );
}

export default CategoryPiker;
/////// FeatureItem.js
import React, {useRef, useState} from 'react';
import '../style/featureTable.css'
import TickIcon from 'rambler-ui/icons/forms/TickIcon'
import ClearIcon from 'rambler-ui/icons/forms/ClearIcon'
import EditIcon from 'rambler-ui/icons/forms/EditIcon'

function FeatureItem(props) {
    const form = useRef(null);
    const [isEdited, setEdited] = useState(false);

    let submit = (e) => {
        let inputs = form.current.children;
            props.onChange(inputs[0].children[0].value,inputs[1].children[0].value);
        setEdited(!isEdited)
    };
    return (
        <div className={'f-container'} >
            { !isEdited?
                <div className={'f-row'} >
                    <div className={'f-cell'}>{props.charName}</div>
                    <div  className={'f-cell'}>{props.charContent}</div>
                    {props.editable && !isEdited?
                        <div className={'f-cell icon-cell'} onClick={()=>setEdited(!isEdited)}><EditIcon/></div>
                        :
                        null
                    }
                </div>
                :
                <div  className={'f-row'} ref={form} >
                    <div className={'f-cell'}><input defaultValue={props.charName}  type="text"/></div>
                    <div className={'f-cell'}><input defaultValue={props.charContent} type="text"/></div>
                    <div className={'f-cell icon-cell'} onClick={submit}><TickIcon/></div>
                    <div className={'f-cell icon-cell'} onClick={()=>setEdited(!isEdited)}> <ClearIcon/> </div>
                </div>
            }
        </div>
    );
}

export default FeatureItem;
/////// Layout.js
import React, {useEffect, useState} from 'react';
import '../style/teststyle.css'
import Menu from "./Menu";
import Notification from "rambler-ui/Notification/Notification";
function Layout(props) {
    return (
        <div>
            <Menu/>
            <div className={'main'} >
                {props.children}
            </div>
            <footer className={'footer'} >footer</footer>
        </div>
    );
}

export default Layout;
/////// Menu.js
import React, {Component} from 'react';
import Button from 'rambler-ui/Button'
import '../style/menu.css'
import {Popup} from "rambler-ui/Popup";
import Input from "rambler-ui/Input";
import Bar from "./Bar";
import './logo.png'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
import {Link} from "react-router";

const values = ['Home', 'About', 'Contact'];
class Menu extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: values[1],
            customIsOpened:false,
            SignUpOpened: false,
            Key: '',
            login: '',
            password: '',
            phoneNumber: '',
            email:'',
            isKey: false,
            prevS: window.pageYOffset,
            navBar:{position: 'relative',top: '0px'},
            LogIn: {isLogin: false,isAdmin: false,name:'' }
        };
    }
    Scroll = ()=>{
        let nav = {position: "",top:"",zIndex: 200};
        let prevScrollpos = this.state.prevS;
        let currentScrollpos = window.pageYOffset;
        if (currentScrollpos <= 0) {
            nav.position = 'relative';
        } else {
            if (prevScrollpos > currentScrollpos) {
                nav.top = "0px";
                nav.position = 'fixed';
            } else {
                nav.top = "-100px";
            }
        }
        prevScrollpos = currentScrollpos;
        this.setState({navBar: nav, prevS: prevScrollpos })
    };

    componentDidMount() {
          window.addEventListener("scroll",this.Scroll)
    }
    componentWillUnmount() {
           window.removeEventListener("scroll",this.Scroll)
    }
    openPopup =()=> {
        this.setState({customIsOpened: true})
    };
    openPopup2 = ()=>{
        this.setState({SignUpOpened: true,name: '',pass: ''})
    };

    updateValue = type => e=> {
        this.setState({
            [`${type}`]: e.target.value
        })
    };
    closePopup = () => {
        this.setState({
            customIsOpened: false,
            isFail: false
        })
    };
    render() {
        return (
            <div id="navbar"
                 style={{...this.state.navBar,...this.props.style}}>
                <img style={{
                    width:'2em'
                }} src="./logo.png" alt=""/>
                    <Bar/>
                <div style={{ marginTop: 10}} >
                    <div style={ {  marginBottom:5,   float: 'right'}}>
                        {(this.props.state.User && this.props.state.User.userId)?
                            <Link
                                to={'/Profile'}
                                style={{marginTop: 5 ,marginLeft: 20,marginRight: 20,}} >{"Hi " + this.props.state.User.login +"!"}
                            </Link>
                            :
                            <div className={'regContainer'} >
                                <span
                                    className={'reg'}
                                    onClick={this.openPopup2}
                                    style={{}}
                                >
                                Регистрация
                            </span>
                                <span
                                    className={'reg l'}
                                    onClick={this.openPopup}
                                    style={{marginLeft: 20} }
                                >
                                    Войти
                                </span>
                            </div>
                        }
                    </div>
                </div>
                <Popup
                    title="Войдите"
                    showClose
                    isOpened={this.state.customIsOpened }
                    backdropColor="blue"
                    okButton={
                        <Button type="primary"  size="small" onClick={()=>{
                            this.props.Login(this.state).then(r=>{

                                this.props.GetCart({userId: r && r.userId||null});
                                this.setState({customIsOpened: !!!r})})
                        }
                        }
                        >
                            Ок
                        </Button>
                    }
                    cancelButton={
                        <Button type="flat" size="small" onClick={this.closePopup}>
                            Отмена
                        </Button>
                    }
                    onRequestClose={this.closePopup}>
                    <div style={{width: 400}}>
                        <div style={{marginBottom: '5%',color: 'red' }} >
                            {(!this.props.state.hasOwnProperty('User'))? null
                             :
                               (this.props.state.User
                                   && this.props.state.User.hasOwnProperty('login') )?
                                null
                                : 'Неверное имя пользователя или пароль'
                            }</div>
                        <Input
                            style={{marginBottom: 5}}
                            type="email"
                            status={(this.props.state.hasOwnProperty('User'))? 'error': null}
                            autoFocus
                            placeholder={'email'}
                            value={this.state.email}
                            onChange={this.updateValue('email')}
                        />
                        <Input
                            type="password"
                            autoFocus
                            placeholder={'пароль'}
                            status={(this.props.state.hasOwnProperty('User'))? 'error': null}
                            value={this.state.password}
                            onChange={this.updateValue('password')}
                        />
                    </div>
                </Popup>
                <Popup
                    title="Регистрация"
                    showClose={false}
                    isOpened={this.state.SignUpOpened}
                    backdropColor="blue"
                    okButton={
                        <Button type="primary" size="small" onClick={()=>this.props.Register(this.state)}>
                            Ок
                        </Button>
                    }
                    cancelButton={
                        <Button type="flat" size="small" onClick={()=> this.setState({
                            SignUpOpened: false,
                            isFail: false
                        })}>
                            Отмена
                        </Button>
                    }
                    onRequestClose={()=> this.setState({
                        SignUpOpened: false,
                        isFail: false
                    })}>
                    <div style={{width: 400}}>
                        <div style={{marginBottom: '5%',color: 'red' }} >{(this.state.isKey)? 'Неверный ключ' : null}</div>
                        <Input
                            style={{marginBottom: 5}}
                            type="email"
                            placeholder={'имя'}
                            status={(this.state.isFail)? 'error': null}
                            autoFocus
                            value={this.state.login}
                            onChange={this.updateValue('login')}
                        />
                        <Input
                            type="email"
                            style={{marginBottom: 5}}
                            autoFocus
                            placeholder={'email'}
                            value={this.state.email}
                            onChange={this.updateValue('email')}
                        />
                        <Input
                            type="password"
                            style={{marginBottom: 5}}
                            autoFocus
                            placeholder={'пароль'}
                            value={this.state.password}
                            onChange={this.updateValue('password')}
                        />
                        <Input
                            type="tel"
                            style={{marginBottom: 5}}
                            autoFocus
                            placeholder={'телефон'}
                            value={this.state.phoneNumber}
                            onChange={this.updateValue('phoneNumber')}
                        />
                    </div>
                </Popup>
            </div>
        )
    }
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Menu);
/////// MyChart.js
import React, { PureComponent } from 'react';
import {
    ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    Legend, BarChart,
} from 'recharts';
import Cell from "recharts/lib/component/Cell";
import { scaleOrdinal } from 'd3-scale';
import {  schemeSet3 } from 'd3-scale-chromatic';

const colors = scaleOrdinal(schemeSet3).range();

 function MyChart (props) {
        return (
            <BarChart
                width={500}
                height={400}
                data={props.data}
            >
                <CartesianGrid strokeDasharray="3 3"  />
                <XAxis   dataKey="header" />
                <YAxis dataKey={props.dataKey} />
                <Tooltip />
                <Legend />
                <Bar   dataKey={props.dataKey} name={props.name} barSize={30} fill="#413ea0">
                    {
                        props.data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                        ))
                    }
                </Bar>
            </BarChart>
        );
}
export default MyChart;
/////// MyChart2.js
import React from 'react';
import BarChart from "recharts/lib/chart/BarChart";
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";
import XAxis from "recharts/lib/cartesian/XAxis";
import YAxis from "recharts/lib/cartesian/YAxis";
import Legend from "recharts/lib/component/Legend";
import Bar from "./Bar";
import {Tooltip} from "recharts";

const data = [
    {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
    },
    {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
    },
    {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
    },
    {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
    },
    {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800,
        "amt": 2181
    },
    {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    }
];
function MyChart2(props) {
    return (
        <div>
            <BarChart width={730} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
        </div>
    );
}
export default MyChart2;
/////// NewsRendering.js
import React from 'react';
import Masonry from 'react-masonry-css'
import '../style/teststyle.css'

const breakpointColumnsObj = {
    default: 2,
};
function NewsRendering(props) {
    return (
<Masonry
    breakpointCols = {breakpointColumnsObj }
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column">
    {props.images.map((k,i)=><div key ={i}><img src={k} alt=""/></div>)}
</Masonry>
    );
}

export default NewsRendering;
/////// MyCarousel.js
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';

function MyCarousel(props) {
    return (
        <Carousel
            width={ props.style && props.style.width || '100%' }
            emulateTouch={ true }
            showArrows={ false }
            showStatus={ false }
            interval={ 5000 }
            autoPlay={ true }
            infiniteLoop={ true }
            showThumbs={ false }
            onChange ={(e)=> props.onChange && props.onChange(e) || null }
            >
            { props.items.map((k, index) =>
                <div key={ index }>
                    <img src={ k.content } alt={'img'}/>
                </div>) }
        </Carousel>
    );
}

export default MyCarousel
/////// OrderForm.js
import React, {useState} from 'react';
import '../style/order.css'
import {Input} from "rambler-ui";
import Button from "rambler-ui/Button";

function OrderForm(props) {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    return (
        <div className={ 'order-container' }>
            <h3>Ваши данные</h3>
            <div className={ 'phone' }>
                <h6>телефон</h6>
                <Input placeholder={ '+3752999999999' }
                       onChange={ (e) => setPhone(e.target.value) }
                       type={ 'tel' }
                       value={ phone }/>
            </div>
            <div className={ 'email' }>
                <h6>электронная почта</h6>
                <Input placeholder={ 'post@mail.com' }
                       onChange={ (e) => setEmail(e.target.value) }
                       type={ 'email' }
                       value={ email }/>
            </div>
            <div className={ 'name' }>
                <h6>Имя</h6>
                <Input placeholder={ 'Валера' }
                       onChange={ (e) => setName(e.target.value) }
                       type={ 'text' }
                       value={ name }/>
            </div>
            <div className={'btn-order'} >
                <Button onClick={()=>props.onSubmit(name,phone,email)} >Заказать</Button>
            </div>
        </div>
    );
}

export default OrderForm;
/////// PostItem.js
import React, {useState} from 'react';
import '../style/Home.css'
import Button from "rambler-ui/Button";
import {AddIcon, ClearIcon, TickIcon} from "rambler-ui/icons/forms";
function PostItem(props) {

    const [image,setImage] = useState(props.image);
    let node;
    let addImage = (e)=>{
        let f = e.target.files[0];
        let reader = new FileReader();
        reader.onload =()=> setImage(reader.result);
        reader.readAsDataURL(f)
    };
    const save = ()=>{
        if(props.id>0){

        }
        else {

        }
    };

    return (
            <div style={{margin:'70px'}} >
                <div className={'item-home'} >
                    <div style={{display: 'flex'}} >
                        <div
                            style={{background:`url(${image})`,
                                backgroundSize: 'cover'
                            }}
                            className={'no-image'}
                        >{image? '' : 'Изображение 360 x 280' }</div>
                    <textarea
                        readOnly={!props.isAdmin}
                        maxLength={580}
                        defaultValue={props.text}
                        placeholder={'текст'}
                        ref={n=> node=n }
                    />
                    </div>
                    <div style={{display: props.isAdmin?'flex':'none'}} >
                        <Button
                            overlay={<input onChange={addImage} type={'file'} />}
                            style={ {marginLeft: '13%'} }
                            type={ 'outline' }>
                            <AddIcon color={'blue'} />
                        </Button>
                        <Button
                            onClick={ ()=>{
                                setImage('')
                            }}
                            style={ {} }
                            type={ 'outline' }>
                            <ClearIcon color={'blue'} />
                        </Button>
                        <Button
                            onClick={save}
                            style={ {} }
                            type={ 'outline' }>
                            <TickIcon color={'blue'} />
                        </Button>
                    </div>
                </div>

            </div>
    );
}

export default PostItem;
/////// Price.js
import React from 'react';
import Button from "rambler-ui/Button";



function Price(props) {
    return (
        <div style={{float:'right'}}>
            <div style={{display:'inline-block',margin: '50px 50px'}} >
                {props.isAdmin?
                    <input
                        style={{textAlign:'center',border:'none'}}
                        value={props.price}
                        min={1}
                        onChange={(e,value)=> {
                            props.onChange(e.target.value)}
                        }
                        type="number"/>
                :
                    <h4>
                        {props.price} BYN
                    </h4>
                }
            </div>
            {!props.isAdmin?
                <Button type={'primary'}>
                    Добавить в корзину
                </Button>
                :
                null
            }
        </div>
    );
}

export default Price;
/////// NotifyError.js
import React, {useEffect, useState} from 'react';
import Notification from "rambler-ui/Notification/Notification";

function NotifyError(props) {
    return (
        <Notification
            isOpened={props.notify}
            title="Ошибка"
            body={props.error && props.error.message  || ''}
            onRequestClose={() => props.close && props.close()}
        />
    );
}

export default NotifyError;
/////// Serch.js
import {
    ComplexSearch,
    ServiceSearch,
    SimpleSearch,
    SuggestItem
} from 'rambler-ui/ComplexSearch'
import React, {Component} from 'react'
import SearchIcon from 'rambler-ui/icons/forms/SearchIcon'

const mediaInputResults = {
    global: [
        ['base', 'это россия детка русские приколы 2015 выпуск 8', '10', ''],
        [
            'base',
            'это рыночная форма в которой на рынке доминирует небольшое количество продавцов',
            '8',
            ''
        ],
        ['base', 'это россия детка её не победить', '7', ''],
        ['base', 'это ретро', '6', ''],
        ['base', 'это русская наследница с первой до последней серии', '5', ''],
        ['base', 'это рукопашный бой', '4', ''],
        [
            'base',
            'это расширение контролируется правилами и не может быть удалено или отключено',
            '3',
            ''
        ],
        ['base', 'это работает вк', '2', ''],
        ['base', 'это россия детка ютуб', '1', '']
    ],
    service: [
        ['base', 'кексы рецепты самые простые', '10', ''],
        ['base', 'кекусин кан', '9', ''],
        ['base', 'кекс', '8', ''],
        ['base', 'кексы', '7', ''],
        ['base', 'кекс фм', '6', ''],
        ['base', 'кекс шоп 2', '5', ''],
        ['base', 'кекс шоп 2 играть онлайн', '4', ''],
        ['base', 'кекс на кефире', '3', ''],
        ['base', 'кекс на сметане', '2', ''],
        ['base', 'кекс шоп 3 играть', '1', '']
    ]
}

const serviceInputResults = [
    ['base', 'это россия детка русские приколы 2015 выпуск 8', '10', ''],
    [
        'base',
        'это рыночная форма в которой на рынке доминирует небольшое количество продавцов',
        '8',
        ''
    ],
    ['base', 'это россия детка её не победить', '7', ''],
    ['base', 'это ретро', '6', ''],
    ['base', 'это русская наследница с первой до последней серии', '5', ''],
    ['base', 'это рукопашный бой', '4', ''],
    [
        'base',
        'это расширение контролируется правилами и не может быть удалено или отключено',
        '3',
        ''
    ],
    ['base', 'это работает вк', '2', ''],
    ['base', 'это россия детка ютуб', '1', '']
]

export default class SearchExample extends Component {
    state = {
        mediaSearchItems: [],
        serviceSearchItems: [],
        query: '',
        value: '',
        serviceValue: ''
    }

    fetchQuery = (query, options = {}) => {
        if (!query) {
            this.setState({mediaSearchItems: []})
            return false
        }

        if (options.sourceType === 'service')
            this.setState({
                mediaSearchItems: mediaInputResults.service,
                query
            })
        else
            this.setState({
                mediaSearchItems: mediaInputResults.global,
                query
            })
    }

    fetchServiceQuery = query => {
        if (!query) {
            this.setState({serviceSearchItems: []})
            return false
        }

        this.setState({
            serviceSearchItems: serviceInputResults,
            query
        })
    }

    renderHint() {
        return (
            <div className="hint">
                Например, <a href>напримерыч напримеров</a>
            </div>
        )
    }

    renderBottomLinks() {
        return (
            <div className="bottomLink">
                <a href>Сделать поиск по умолчанию!</a>
            </div>
        )
    }

    onPressEnter = query => {
        this.setState({value: query})
        this.goToSearch(query)
    }

    onServiceEnter = query => {
        this.setState({serviceValue: query})
        this.goToSearch(query)
    }

    onSelectItem = query => {
        this.setState({value: query, query})
    }

    onServiceSelectItem = query => {
        this.setState({serviceValue: query, query})
    }

    onItemClick = query => {
        this.goToSearch(query)
    }

    goToSearch = (query = '') => {
      this.props.find(query);
    };

    renderItem(string) {
        const query = this.state.query
        if (string.indexOf(query) === 0)
            return (
                <span>
          <b>{query}</b>
                    {string.replace(query, '')}
        </span>
            )
        return string
    }

    render() {
        return (
            <div>
                <h4>ServiceSearch</h4>
                <ServiceSearch
                    value={this.state.serviceValue}
                    onSearch={this.fetchServiceQuery.bind(this)}
                    onSelectItem={this.onServiceSelectItem}
                    onClickItem={this.onItemClick}
                    hint={this.renderHint()}
                    bottomLinks={this.renderBottomLinks()}
                    onPressEnter={this.onServiceEnter}
                    placeholder="Напишите 'это...'"
                    onSubmit={this.goToSearch}
                    inputLeftIcon={<SearchIcon />}>
                    {this.state.serviceSearchItems.map(item => (
                        <div key={item[0] + item[2]} style={{borderTop: '1px solid #eee'}}>
                            <SuggestItem value={item[1]}>
                                {this.renderItem(item[1])}
                            </SuggestItem>
                        </div>
                    ))}
                </ServiceSearch>
            </div>
        )
    }
}
/////// CartPage.js
import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import CartItem from "../components/CartItem";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
import OrderForm from "../components/OrderForm";
import Button from "rambler-ui/Button";
import NotifyError from "../components/NotifyError";

function CartPage(props) {
    let cartItems = props.state.cart;
    useEffect(()=>{
        props.GetCart();
    },[]);
    const [notification,setNotification] = useState(false);
    const [error,setError] = useState({message: ''});

    let user = props.state.User;
    user = user && user.userId  ||  null;
    let addOrder = (userId)=> {
        if(userId)
            for (let item of props.state.cart || [])
            {
                props.AddOrder({
                startDate: new Date().toISOString(),
                itemId: item.ShopItemId || item.itemId ,
                userId: userId,
                status: 0,
                    count:item.count
            })}
        props.ClearCart();
    };
    let handler = async (name,phone,email)=>{
        if (props.state.cart && props.state.cart.length) {
            if(email && name && phone && name) {
                let us = await props.AddCartUser({login: name, phoneNumber: phone, email, password: 'user'});
                addOrder(us[0].userId);
            }
            else {
                setError({message: 'все поля должны быть заполнены'});
                setNotification(true)
            }
        }
    };

    return (
        <Layout>
            <div>
                <NotifyError notify={notification} close={()=>setNotification(false)} error={error || null} />
                 {cartItems.map((item,index)=>
                    {
                     return <CartItem
                     key={index}
                         {...item}
                        setCount={(value)=> {
                            if (value > 0) props.SetCountCart(value, item.itemId || item.ShopItemId);
                            else {
                                setError({message: 'количество не может быть отрицательным'});
                                setNotification(true)}
                            }
                        }
                     />}
                     )}
            </div>

            {user?
                <div style={{margin: 'auto', marginTop: '5%',width: 107}} ><Button  onClick={()=>addOrder(user)} >Заказать</Button></div>
                :
                <OrderForm onSubmit={handler} />
            }
        </Layout>
    );
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CartPage);
/////// About.js
import React, {Component} from 'react';
import {connect} from "react-redux";
import Layout from "../components/Layout";

class About extends Component {
    render() {
        return (
                <Layout>
                About
                </Layout>
        );
    }
}
function mapStateToProps(state) {
    return {
        base: state
    }
}
export default connect(mapStateToProps)(About);
/////// Catalog.js
import React, {useState} from 'react';
import Layout from "../components/Layout";
import CatalogItem from "../components/CatalogItem";
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
import CatalogNavbar from "../components/CatalogNavbar";
import '../style/Catalog.css'
import Masonry from "react-masonry-css";
import {Link} from 'react-router'
import {useEffect } from 'react'
import IconButton from "rambler-ui/IconButton";
import {AddIcon} from "rambler-ui/icons/forms";
import Spinner from "rambler-ui/Spinner";
import NotifyError from "../components/NotifyError";
import Serch from "../components/Serch";
const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    770: 1

};

function Catalog(props) {
    const [rendData, setData] = useState(null);
    const [Nav, setNav] = useState({
        min: 1,
        max: 99999999999,
        category: 3
    });
    const [search,setSearch] = useState('');



    const get = (searchQuery = '') => {
        props.GetAllShopItemsFilter({...Nav,searchQuery: searchQuery}).then(data => {
                console.log('data',data);
            setData((data.length) ? data : []);
                if(data.error){
                    let ar = [];
                    ar.error= data.error;
                    setData(ar);
                }
            }
        )
    };
    useEffect( ()=>{
        get()
    },[]);

    let isAdmin = (props.state.User && props.state.User.rights === 1) ;
    console.log('Catalog',Nav)
    return (
        <Layout >
            <Serch find={(value)=> get(value)} />
            <div className={ 'catalog-container' }>
                <CatalogNavbar  isAdmin={isAdmin} onClick={ () => get() } Nav={Nav} onChange={ setNav }/>
                <div style={ {marginTop: 25} }>
                    { rendData && rendData.length !== 0?
                        <Masonry
                            breakpointCols={ breakpointColumnsObj }
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column">
                            { rendData !== null ? rendData.map((k, index) =>

                                    <CatalogItem link={
                                        <Link className={ 'Link-style' } to={ `/Item/${ k.ShopItemId }` }>
                                            подробнее
                                        </Link>
                                    }
                                                 cart={
                                                     <span
                                                     style={ {
                                                         marginLeft: '0.8vw'
                                                     } }
                                                     className={ 'Link-style' }
                                                     onClick={ () => {
                                                         props.AddToCart({...k})
                                                     } }>
                                             в корзину
                                         </span> }
                                                 delete={
                                                isAdmin?     <span
                                                         style={ {
                                                             marginLeft: '30%'
                                                         } }
                                                         className={ 'Link-style' }
                                                         onClick={ () => {
                                                             props.DeleteItem({ShopItemId: k.ShopItemId}).then(get())
                                                         } }>
                                                 удалить

                                         </span>
                                                    :
                                                    <span>

                                                    </span>
                                                 }

                                                 key={ index } { ...k }/>
                                )
                                :
                                <div style={ {
                                    position: 'absolute',
                                    top: ' 53vh',
                                    left: '56%'
                                } }><Spinner size={ 30 }/></div>
                            }

                        </Masonry>
                        :
                        <h1 style={{marginLeft: '100px'}} >Ничего не найдено</h1>
                    }
                    { isAdmin ?
                        <div style={{margin: 'auto',width:'47px',display: 'block'}} >
                            <Link
                                className={'Link-style'}
                                  to={ '/Item/editor' }>
                                <IconButton
                                    onClick={ ()=>{} }
                                    type={ 'primary' }>
                                    <AddIcon/>
                                </IconButton>
                            </Link>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </Layout>
    );
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Catalog);
/////// CategoryEdit.js
import React, {useEffect, useState} from 'react';
import {AddIcon, ClearIcon, TickIcon} from "rambler-ui/icons/forms";
import Button from "rambler-ui/Button";
import {rest} from "../rest/rest";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
import Layout from "../components/Layout";
import '../style/CategoryPage.css'
function CategoryEdit(props) {
    const [data,setData] = useState([]);
    const [isEdit,setEdit] = useState(false)
    let node;
    const refresh = ()=>{
        props.getCategory().then(res=>
        {
            setData([...res]);
        })
    };
    useEffect(()=>{
        refresh()
    },[data.length]);
    const add = ()=>{
        props.SetCategory({categoryName: node.value}).then(k=> refresh());
        setEdit(false);
    } ;

    return (
        <Layout>
            {data.map((item,i)=>{
                return (
                <div key={i} className={'category-Container'} >
                    <div style={{width:100}} >{item.categoryName}</div>
                    {item.categoryName !== 'Все'? <div>
                        <ClearIcon onClick={()=>
                            props.DeleteCategory({categoryId: item.categoryId})
                                .then(k=>refresh())}                                                    color={'blue'} />
                    </div>
                        :null}
                </div>)}
            )}
            {isEdit? <div >
                <input type="text" ref={nod=>node=nod} />
                <TickIcon  onClick={add} color={'blue'} />
                    <ClearIcon onClick={()=>setEdit(false) } color={'blue'} />
            </div>
                : null }
            <AddIcon onClick={()=>setEdit (true)}  color={'blue'} />
        </Layout>
    );
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CategoryEdit);
/////// Home.js
import React, {useState} from 'react';
import MyCarousel from "../components/MyCarousel";
import Layout from "../components/Layout";
import '../style/Home.css'
import PostItem from "../components/PostItem";
import Button from "rambler-ui/Button";
import {AddIcon, ClearIcon} from "rambler-ui/icons/forms";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
const array = [
    {content: './images/index-bg-1.jpg'},
    {content: './images/index-bg-2.jpg'},
    {content: './images/index-bg-3.jpg'}
];


const data = [
        {image: './images/bus.png',id: 3,text:
        'Продукция Минского автомобильного завода – это техника, соответствующая экологическим стандартам Евро-2, Евро-3, Евро-4, Евро-5, Е' +
        'вро-6Под маркой «МАЗ» с конвейера завода сходят седельные тягачи, бортовые автомобили, шасси под установку различного спецоборудования.Всего более 500 моделей и модификаций.'},
            {image: '',id: 1,text:
            'Продукция Минского автомобильного завода – это техника, соответствующая экологическим стандартам Евро-2, Евро-3, Евро-4, Евро-5, Е' +
            'вро-6Под маркой «МАЗ» с конвейера завода сходят седельные тягачи, бортовые автомобили, шасси под установку различного спецоборудования.Всего более 500 моделей и модификаций.'}
        ];


function Home(props) {
    let isAdmin = (props.state.User && props.state.User.rights === 1) ;
    return (
        <Layout>
            <div style={{width: '100%'}} >
            <MyCarousel items ={ array }/>

                {data.map((item,index)=>
                    <PostItem
                        key={index}
                        id={item.id}
                        isAdmin={isAdmin}
                        image={item.image}
                        text={item.text}
                    />)}
            </div>
        </Layout>
    );
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
/////// ItemPage.js
 import React from 'react';
import {useState,useEffect} from 'react'
import MyCarousel from "../components/MyCarousel";
 import FeatureItem from "../components/FeatureItem";
 import Layout from "../components/Layout";
import '../style/ItemPage.css'
 import Button from "rambler-ui/Button";
 import {AddIcon, ChevronRightIcon, ClearIcon} from "rambler-ui/icons/forms";
 import IconButton from "rambler-ui/IconButton";
 import {connect} from "react-redux";
 import {bindActionCreators} from "redux";
 import {actionCreators} from "../reducers";
 import Price from "../components/Price";
 import CategoryPiker from "../components/CategoryPiker";
 import NotifyError from "../components/NotifyError";


function ItemPage(props) {
    let description;
    let header;
    const isAdmin = (props.state.User && props.state.User.rights === 1);
    const id = props.params.id;
    const [shopItem,setShopItem] = useState({});
    const [price,setPrice] = useState(1);
    const [images,setImages] = useState([]);
    const [featureItems,setFeatureItems] = useState([] );
    const [current,setCurrent] = useState(0);
    const [deleteImages,setDeleteImages] = useState([]);
    const [category,setCategory] = useState(1);
    const [notification,setNotification] = useState(false);
    const [error,setError] = useState({});
    let fetchData = async () => {
        if(id !== 'editor'){
            let ShopItem =  await props.GetShopItem({ShopItemId:+id});
            setShopItem({...ShopItem[0]});
            setCategory(ShopItem[0] && ShopItem[0].CategoryId || 1);
            let Features = await props.GetChar({id}) || [];
            setFeatureItems(Features);
            let content = await props.GetContent({id}) || [];
            setImages(content);
            setPrice(ShopItem[0] && ShopItem[0].price || 221);
        }
    };
    useEffect(  ()=>{
            fetchData();
        }
    ,[id]);
    let addImage = (e)=>{
        let f = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () =>{
            setImages([
                ...images,
                {contentId: -1,itemId:id,content:reader.result}
            ])
        };
        reader.readAsDataURL(f);
    };
    const actionPiker = () =>{
        if (id === 'editor') add().then((val)=> (!val || val && !val.error)? props.router.push('/Catalog') : null
        );
        else update().then(()=>props.router.push('/Catalog'));
    };

    const update= async () =>{

        let params = {
            description: description.value,
            header:header.value,
            price:price,
            categoryId: category,
            ShopItemId: props.params.id
        };
        let res = await props.UpdateShopItem(params);
        for(let pt of featureItems){
            if(pt.charId === -1)
                props.AddChar(pt);
        }
        for(let img of images){
            if(img.contentId > 0)
                continue;
            props.AddItemContent(img);
        }
        for(let img of deleteImages){
            if(img.contentId < 0)
                continue;
            props.DeleteItemContent(img);
        }
    };

    let add = async()=>{

        let params = { description: description.value,
            header:header.value,
            price:price,
            categoryId: category};
        let res = await props.AddShopItem(
           {
             ...params
                });
        console.log('res',res)
        if(res.error){
            setError(res.error);
            setNotification(true);
            return res;
        }
        let id  = res[0] && res[0].Id || null;
        for(let pt of featureItems){
            if(pt.charId === -1)
            props.AddChar({itemId:id, charName: pt.charName,charContent: pt.charContent});
        }
        for(let img of images){
            if(img.contentId > 0)
                continue;
            props.AddItemContent({itemId: id, content:img.content});
        }
    };
    return (
        <Layout>
            <NotifyError notify={notification} close={()=>setNotification(false)} error={error || null} />
                <form>
                    <div className={'carousel'}  >
                        <MyCarousel
                            onChange={(e)=>setCurrent(e)}
                            style={{width: '100%'}}
                            items={images}
                        />
                        <div style={{display: isAdmin?'flex':'none'}} >
                        <Button
                            overlay={<input onChange={addImage} type={'file'} />}
                            style={ {marginLeft: '44%'} }
                            type={ 'primary' }>
                            <AddIcon color={'white'} />
                        </Button>
                        <Button
                            onClick={ ()=>{
                                setDeleteImages([...deleteImages,{...images[current]}]);
                                images.splice(current,1);
                                setImages([...images]);
                            }}
                            style={ {} }
                            type={ 'outline' }>
                            <ClearIcon color={'blue'} />
                        </Button>
                            </div>
                    </div>
                    <div className={'Price'} >
                        <Price isAdmin={isAdmin} onChange={(value)=>setPrice(value)} price={price}/>
                    </div>
                    <div className={'desc'}  >
                        <textarea
                            readOnly={!isAdmin}
                            maxLength={60}
                            className={'header'}
                            defaultValue={shopItem.header}
                            placeholder={'header'}
                            ref={node=>header=node}
                        />
                        <textarea
                            readOnly={!isAdmin}
                            maxLength={280}
                            defaultValue={shopItem.description}
                            placeholder={'описание'}
                            ref={node=>description=node}
                        />
                    </div>

                    <div  className={'FeatureContainer'} >
                        {featureItems.map((k,index)=>
                            <FeatureItem
                                editable = {isAdmin}
                                key={index}
                                onChange={(charName,charContent)=>{
                                    featureItems[index] =  {charId:k.charId,itemId:id,charName,charContent};
                                    setFeatureItems([...featureItems]);
                                    }
                                }
                                {...k}/> ) }
                        { isAdmin ?
                                <div>
                                    <div style={
                                        {marginLeft: 'auto', marginRight: 'auto', width: 65, marginTop: 20} }>
                                        <IconButton
                                        onClick={ ()=>
                                                setFeatureItems([
                                                    ...featureItems,
                                                    {charId: -1,itemId:id,charName:' текст ',charContent:' текст '}
                                                    ]) }
                                            style={ {marginLeft: 'auto', marginRight: 'auto'} }
                                            type={ 'primary' }>
                                            <AddIcon/>
                                        </IconButton>
                                    </div>
                                </div>: null }
                    </div>
                    { isAdmin?  <div className={'save'} >
                        <CategoryPiker val={'Тягач'} categoryId={category} onChange={(e)=> setCategory(e)} />
                            <Button
                                onClick={()=>actionPiker()}
                                style={{margin: 20}}
                                icon={<ChevronRightIcon />}
                                iconPosition="right"
                                type={'primary'}
                                loading={false}>
                                сохранить
                            </Button>
                        </div> : null }
                </form>
        </Layout>
    );
}
 export default connect(
     state => state,
     dispatch => bindActionCreators(actionCreators, dispatch)
 )(ItemPage);
/////// OrderPage.js
import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import {Table} from "react-bootstrap";
import {Link} from "react-router";
import {rest} from "../rest/rest";
import CategoryPiker from "../components/CategoryPiker";
import {actionCreators} from "../reducers";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux'

function OrderPage(props) {
    const [data,setData] = useState([]);
    const getOrders = ()=> {
        props.GetOrders().then(res=>{
            console.log(res);
            setData(res)
        });
    }
    useEffect(()=>{
        getOrders();
        },[data.orderId]);

    return (
        <Layout>
            <h1>Заказы</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Имя</th>
                    <th>email</th>
                    <th>телефон</th>
                    <th>дата</th>
                    <th>количество</th>
                    <th>id заказа</th>
                    <th>id товара</th>
                    <th>товар</th>
                    <th>завершить</th>
                </tr>
                </thead>
                <tbody>
                {data.map((k,index)=>
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{k.login}</td>
                        <td>{k.email}</td>
                        <td>{k.phoneNumber}</td>
                        <td>{ new Date(k.startDate).toLocaleDateString()}</td>
                        <td>{k.count}</td>
                        <td>{k.orderId}</td>
                        <td>{k.itemId}</td>
                        <td><Link to={`/Item/${k.itemId}`} >перейти</Link></td>
                        <td><span className={'point'} onClick={()=>props.DeleteOrder({orderId: k.orderId}).then(()=>getOrders())} >завершить</span></td>
                    </tr>
                )}
                </tbody>
            </Table>

        </Layout>
    );
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(OrderPage);

/////// Profile.js
import React, {useEffect, useState} from 'react';
import '../style/order.css'
import {Input} from "rambler-ui";
import Button from "rambler-ui/Button";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
import Layout from "../components/Layout";

function Profile(props) {
    let user = props.state && props.state.User || {};

    const [password,setPassword] = useState(user.password || '');
    const [email, setEmail] = useState(user.email || '');
    const [phone, setPhone] = useState(user.phoneNumber || '');
    const [name, setName] = useState(user.login || '');
    const [loading, setLoading] = useState(false);

    //let loading = false;

    useEffect(()=>{
        setPhone(user.phoneNumber || '');
        setPassword(user.password || '');
        setEmail(user.email || '');
        setName(user.login || '');
    },[user.userId])


    return (
        <Layout>
        {user.userId?
                <div className={'order-container'}>
                    <h3>Ваши данные</h3>
                    <div className={'phone'}>
                        <h6>телефон</h6>
                        <Input
                            placeholder={'+3752999999999'}
                               onChange={(e) => setPhone(e.target.value)}
                               type={'tel'}
                               value={phone}/>
                    </div>
                    <div className={'email'}>
                        <h6>электронная почта</h6>
                        <Input placeholder={'post@mail.com'}
                               onChange={(e) => setEmail(e.target.value)}
                               type={'email'}
                               value={email}/>
                    </div>
                    <div className={'name'}>
                        <h6>Имя</h6>
                        <Input placeholder={'Валера'}
                               onChange={(e) => setName(e.target.value)}
                               type={'text'}
                               value={name}/>
                    </div>
                    <div className={'password'}>
                        <h6>пароль</h6>
                        <Input placeholder={'пароль'}
                               onChange={(e) => setPassword(e.target.value)}
                               type={'password'}
                               value={password}/>
                    </div>
                    <div className={'btn-order'}>
                        <Button
                            loading={loading}
                            onClick={() => {
                            props.UpdateUser({
                                    email,
                                    password,
                                    phoneNumber: phone,
                                    login: name,
                                    userId: user.userId
                            })
                            setLoading(true)
                            setTimeout(()=>setLoading(false),1000)
                        }}>
                            сохранить
                        </Button>
                    </div>
                </div>
                :
                <div>
                    <h2>Пожалуйста войдите</h2>
                </div>
        }
        </Layout>
    );
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Profile);
/////// index.js
import {rest} from '../rest/rest'

const initialState = {};

export const actionCreators = {
    Login: ({email,password}) => async (dispatch, getState) => {
        const token = await rest.Login({email,password});
        dispatch({ type: "LOGIN",User: token[0] });
        return token[0];
    },
    Register: ({login,password,email,phoneNumber}
    ) => async (dispatch, getState) =>{
          let res = await rest.Register({login, password, email, phoneNumber});
          return  res;
    },
    DeleteCartItem: (itemId) => async (dispatch,getState)=> {
        let state = getState().state;
        if(state.User && state.User.userId){
            rest.DeleteCartItem({
                ShopItemId: itemId,
                userId: state.User.userId});
            let res = await rest.GetUserCart({userId: state.User.userId});
            dispatch({type: 'SET_CART',cart: res })
        }
        else {
            let cart = state.cart;
            cart.splice(cart.findIndex(k => k.itemId === itemId),1);
            dispatch({type: 'SET_CART',cart: cart })
        }
    }
        ,
    SetCountCart: (value,itemId) => async (dispatch,getState)=>{

        let state = getState().state;
        if(state.User && state.User.userId){
            console.log('Item',itemId)
            await rest.UpdateCountCart({count: value, itemId: itemId, userId: state.User.userId});
            let res = await rest.GetUserCart({userId: state.User.userId});
            dispatch({type: 'SET_CART',cart: res })
        }
        else {
            let cart = state.cart;
            let newCount =  cart.find(k => itemId === itemId);
            newCount.count = value;
            dispatch({type: 'SET_CART',cart: [...cart] })
        }

    },
    AddToCart: (Item) => async (dispatch,getState)=>{
        let state = getState().state;
        let exist = state.cart.find(k=>k.ShopItemId === Item.ShopItemId);
        if(state.User && state.User.userId) {
            console.log('add')
            if(!exist) {
                console.log('add3')
                console.log(Item);
                await rest.AddToCart({ItemId: Item.ShopItemId,userId: state.User.userId,count:1});
                dispatch({type: 'CART', cart: [...state.cart, Item]})
            }
        }
        else {
            console.log('add2')
            if (!exist) {
                dispatch({type: 'CART', cart:  [...state.cart, Item]})
            }
        }
        },
    ClearCart:  ()=> async (dispatch,getState)=>{
            dispatch({type: 'SET_CART',cart: [] })
    },
    GetCart: ()=> async (dispatch,getState)=>{
        let state = getState().state;
        console.log('User',state);
        if(state.User && state.User.userId){
            console.log('Cart')
                let res = await rest.GetUserCart({userId: state.User.userId});
                dispatch({type: 'SET_CART',cart: res })
            }
            else {
            console.log('Cart2')
            }
    }
};

export const loadActions = ()=>{
    const exclude = ['Login','AddToCart','DeleteCartItem'];
    for(let property in rest){
        if (exclude.find(el => el === property))
            continue;
        actionCreators[property] = (params) => async (dispatch, getState) => {
            let res = await rest[property](params);
            dispatch({type: 'DATA', data: res});
            return res;
        };
    }
};


export const reducer = (state = {data: [],cart:[]}, action) => {
    state = state || initialState;
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                User: action.User
            };
        case 'DATA' : return {
            ...state,
            data:action.data
        };
        case 'CART': return {
            ...state,
            cart:action.cart
        };
        case 'SET_CART': return {
            ...state,
            cart: [...action.cart]
        };
    }
    return state;
};
/////// StatsPage.js
import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import MyChart from "../components/MyChart";
import {rest} from "../rest/rest";
import MyChart2 from "../components/MyChart2";

function StatsPage(props) {
const [data,setData] = useState([]);
    const [data2,setData2] = useState([]);
useEffect(()=>{
    rest.GetItemStats().then(res=> res.length?setData(res) : null);
    rest.GetItemStatsPrice().then(res=>res.length?setData2(res) : null)
},[]);

console.log(data2)
    return (
        <Layout>
        <div style={{width: '120%'}}>
            <div style={{display: 'inline-block'}} >
                <h1 style={{textAlign:'center'}} >Популярность товара</h1>
            <MyChart
            dataKey={'count'}
            xAxis={'header'}
            yAxis={'count'}
            name={'количесвто'}
            data = {data} />
            </div>
            <div style={{display: 'inline-block'}}>
                <h1 style={{textAlign:'center'}} >Цены на товары</h1>
                <MyChart
                    dataKey={'price'}
                    xAxis={'header'}
                    yAxis={'price'}
                    name={'цена'}
                    data = {data2} />
            </div>
        </div>
        </Layout>
    );
}

export default StatsPage;
/////// rest.js
const server = 'http://localhost:5000/api';
const exclude = ['security','get'];
export const rest = {};
function reuest (server,api,type){
    return (params,token='') => {
        let query = '';
        if(type === 'get') {
           query = params && '?' + Object.keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&') || '';
        }
        let options = {
            method: type || 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
            };
        if(!type){
            options.body = JSON.stringify(params);
        }
        return fetch(server+api+query,options
        ).then(async data => {
                let j = await data.json();
                return j;
            })
            .catch(ex => ex);
    }
}
 export const createRest  = ()=> fetch(server+'/model',{method: 'GET'}).then(response=>response.json().then(res =>{
        let model  = res;
        console.log(model);
        for (let name of model.post) {
            if (exclude.find(el => el === name))
                continue;
            rest[name] = reuest(server + '/post/', name)
        }
     for (let name of model.get) {
         if (exclude.find(el => el === name))
             continue;
         rest[name] = reuest(server + '/get/', name,'get')
     }
    })
).catch(err=>console.log(err));




/////// CartItem.css
.p-header{
    font-family: Roboto, sans-serif;
   text-align: left;
    grid-area: headers;
}
.cardbody{
display: grid;
    grid-template-areas:
            "img headers price count removeIco";
}
.imgg{
    grid-area: img;
}
.count input{
    width: 17%;
    text-align: center;
}
.count{
float: right;
    padding: 4% 0%;
    grid-area: count;
}
.price{
    padding:  11%;
    grid-area: price;
    float: right;
    text-align: center;

}
.removeIco{
    grid-area:removeIco ;
    float: right;
    padding: 10% 40%;
}
.Link-style{
    color: #2d2c2c;
}
.Link-style:hover{
    color: #0053E6;
    text-decoration: none;
    cursor: pointer;
}
/////// authHelper.js
const constants = {tokenKey: 'TOKEN'};

export default {
    saveAuth: (userId, token) => {
        sessionStorage.setItem(constants.tokenKey, JSON.stringify({ userId: userId, access_token: token }));
    },

    clearAuth: () => {
        sessionStorage.removeItem(constants.tokenKey);
    },

    getId: () => {
        let item = sessionStorage.getItem(constants.tokenKey);
        let userId = 0;
        if (item) {
            userId = JSON.parse(item).userId;
        }
        return userId;
    },

    isLogged: () => {
        let item = sessionStorage.getItem(constants.tokenKey);
        if (item) {
            return true;
        } else {
            return false;
        }
    },

    getToken: () => {
        let item = sessionStorage.getItem(constants.tokenKey);
        console.log(sessionStorage);
        let token = null;
        if (item) {
            token = JSON.parse(item).access_token;
        }
        return token;
    }
}
/////// catalogNavbar.css
.catalogNavbar{
    display: inline-block;
    width: 30%;
}
.checkBox-Navbar{

}
.label-checkBox-Navbar{
    width: 100px;
}

/////// Catalog.css
.catalog-container{
 display: flex;
 width: 108.8%;
}
/////// EditorStyle.css
.RichEditor-root {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 25px;
    font-family: 'Georgia', serif;
    font-size: 14px;
    padding: 15px;
}

.RichEditor-editor {
    border-top: 1px solid #ddd;
    cursor: text;
    font-size: 16px;
    margin-top: 10px;
}

.RichEditor-editor .public-DraftEditorPlaceholder-root,
.RichEditor-editor .public-DraftEditor-content {
    margin: 0 -15px -15px;
    padding: 15px;
}

.RichEditor-editor .public-DraftEditor-content {
    min-height: 100px;
}

.RichEditor-hidePlaceholder .public-DraftEditorPlaceholder-root {
    display: none;
}

.RichEditor-editor .RichEditor-blockquote {
    border-left: 5px solid #eee;
    color: #666;
    font-family: 'Hoefler Text', 'Georgia', serif;
    font-style: italic;
    margin: 16px 0;
    padding: 10px 20px;
}

.RichEditor-editor .public-DraftStyleDefault-pre {
    background-color: rgba(0, 0, 0, 0.05);
    font-family: 'Inconsolata', 'Menlo', 'Consolas', monospace;
    font-size: 16px;
    padding: 20px;
}

.RichEditor-controls {
    font-family: 'Helvetica', sans-serif;
    font-size: 14px;
    margin-bottom: 5px;
    user-select: none;
}

.RichEditor-styleButton {
    color: #999;
    cursor: pointer;
    margin-right: 16px;
    padding: 2px 0;
    display: inline-block;
}

.RichEditor-activeButton {
    color: #5890ff;
}/////// CategoryPage.css
.category-Container div{

    display: inline-block;

}
/////// featureTable.css
.f-row{
    height: 25px;
}
.f-cell{
    display: inline-block;
    overflow: hidden;
    width: 30vw;
    border: #2d2c2c solid 1px;

}
.f-container  input{
    border: none;
    height: 23px;
    width: 100%;
    background: none;
}
.icon-cell{
    width: 23px;
}
/////// Home.css
.item-home{
    box-shadow: 3px 17px 114px -44px rgba(0,0,0,0.75);
    padding: 10px;
    border-radius: 20px;
    margin-bottom: 100px;
    transition: all linear .5s;
    animation: ease-in-out alternate infinite;
}
.item-home img{
    display: inline-block;
    border-radius: 20px;
    margin-right: 15px;
}
.item-home div{
    margin-top: 0;
    display: inline-block;
}
.item-home:hover{
    box-shadow: 3px 17px 114px -44px rgba(0,0,0,0.35);
    transform: scale(1.05);
    transition: all linear .5s;
    animation: ease-in-out alternate infinite;

}
.item-home textarea:focus{
    outline: none;
}
.item-home textarea{
    padding: 0 30px;
    display: block;
    height: 270px;
    resize: none;
    background: none;
    border: none;
    width: 100%;
}
.item-home .no-image {
    background-repeat: no-repeat;
    background-size: cover;
    display: inline-block;
    width: 100%;
    height: 278px;
    vertical-align: middle;
    line-height: 300px;
    text-align: center;
    background-color: rgba(114, 114, 114, 0.1);
    border-radius: 20px;
}
/////// ImgBox.css
font-face{
    font-family: "Segoe UI Symbol", serif;
    font-family: "Rockwell Extra Bold", serif;
}
.inner-shadow{
    width: 100%;
    height: 100%;
    box-shadow: inset 2px -88px 97px -4px rgba(0,0,0,0.65);
    border-radius: 20px;
}
.ImageBox
{
    border-radius: 20px;
    margin-bottom: 10px;
    background-size: cover;
    transition: all ease-in-out 100ms;
    z-index: 2;
}
.sec{
 margin: -0.2px;
}
.ImageBox:hover{
    box-shadow: 0px 26px 50px 8px rgba(0, 0, 0, 0.6);
    transform: translate(0, -1px);
    animation-direction: alternate;
    background-color: rgba(198,200,182,0.22);
}

.mainText{
    display: block;
    color: white;
    float: bottom;
    margin-top: 10px;
    display: inline-block;
    position: relative;
    margin-top: 39vh;
    font-family: "Droid Sans Mono Dotted", serif;
    margin-left: 4vh;
    margin-bottom: 4vh;
}
.linkstyle{
    color: white;
    font-family: 'Helvetica', sans-serif;
    font-size: 2.7vw;
    text-decoration: none;
}
.i{
    width: 79vw;
    float: bottom;
    background-size: cover;
    margin-left: 10%;
    height: 50vh;
    background-position: center;
    margin-bottom: 2%;
    margin-top: 1%;
}
/////// menu.css
#navbar {
    font-family: Roboto, sans-serif;
    padding-left: 15%;
    padding-right: 14.3%;
    z-index: 100000;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2%;
    top: 0;
    background-color: #ffffff;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.13) 0 1px 20px;
    transition: all ease-in-out 0.8s;
}
.LnStyle{
    color: #212121;
    text-decoration: none;
    margin-left: 20%;
    margin-top: 20%;
}
.LnStyle:hover {
    text-decoration: none;
    color: #274BC8;
}
.LnStyle:focus{
    color: #274BC8;
    text-decoration: none;
}
@media (max-width: 767px) {
    .LnStyle {
        margin-left: 5%;
    }
    .LnStyle{
        margin-left: 5%;
    }
    #navbar{
        grid-template-columns: 10% 65% 25%;
    }
}
.reg{
    font-family: Roboto, sans-serif;
    font-size: 15px;
}
.reg:hover{
 color: #0053E6;
}
.regContainer{
    margin-top: -5px;
}
/////// ItemPage.css
.FeatureContainer{
    margin-top: 20px;
    display: grid;
    align-items: center;
    justify-content: center
}
.desc {
    font-family: Roboto, sans-serif;
    height: 100px;
    background: none;
    border: none;
    width: 100%;
    padding:0 15px;
}
.desc textarea{
    padding: 0 30px;
    display: block;
    height: 300px;
    resize: none;
    background: none;
    border: none;
    width: 100%;
}
.desc .header{
    text-align: center;
    resize: none;
    padding: 0 0px;
    width: 100%;
    display: block;
    height: 90px;
    font-size: large;
    font-weight: bold;
    background: none;
    border: none;
}
.desc input:focus{
    outline: none;
}
.desc textarea:focus{
    outline: none;
}
.carousel-item{
width: 50%;
    height: 10%;
}
.desc{
    width: 30vw;
    grid-area: desc;
}
.carousel{
    grid-area: carousel;
}
.Price{
    grid-area: price;
}
.FeatureContainer{
    grid-area: FeatureContainer;
}
.save{
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
    grid-area: save;
}
form{
    display: grid;
    grid-template-areas:
            "carousel  desc"
            "price price"
            "FeatureContainer FeatureContainer "
                "save save ";
}
/////// Style.css

.Bar{
    position: fixed;
    position: static;
    font-family: "Roboto Condensed";
    display: flex;
    justify-content: center;
    width: 99%;
    height: 1%;
    align-items: center;
    padding: 0.1%;
    text-align: center;
    margin-bottom:1%;
    text-decoration: none;
    position: center;
    box-shadow: 4px 94px 300px -61px rgba(0,0,0,0.75);

}

.point{
    margin-left: 15px;
    font-size: 12px;
    text-align: center;
    position: center;
    text-decoration: none;
    color: #212121;
    letter-spacing:1px;
    font-family: Roboto, sans-serif;
    text-transform:uppercase;
}
.point:hover{
    color: #0053E6;
    text-decoration: none;
}
.box{
    display: flex;
    justify-content: center;
}
.header-style{
    text-align: center;
    margin-right: 40%;
font-family: "Roboto";
font-size: 350%;
    display: block;
    position: center;
    color: #1A1A1A;
    margin-bottom: 2%;
}
.newspage-div{
justify-content: center;
}

.img-style{
    border-radius: 3%;
    display: block;
    margin: auto;
    width: 75em;
    height: 35em;
    margin-bottom: 6%;
    position: center;
    image-resolution: from-image;
    box-shadow: 2px 9px 48px 2px rgba(0,0,0,0.31);
}
.img-style:hover
{
    box-shadow: 2px 9px 48px 2px rgba(0,0,0,0.51);
}
.img-style::after{
    background-color: black;

}

p{
    font-family: Roboto;
}
.Post-page{
    display:grid;
    grid-template-columns: 1fr;
    position: center;
    margin-left: 30vmin;


   justify-content: center;
}

.date{
    height: 100px;
    width: 100px;
    background-color: #61dafb;
}


.footer{
    margin-top: 55vh;
    position: relative;
    background-color: rgb(45, 44, 44);
    font-family: "Roboto Condensed", sans-serif;
    font-size: 5vh;
    color: white;
    padding-top: 4vh;
    padding-bottom: 4vh;
    text-align: center;
}

.submite{
    margin-top: 5vh;
    margin-bottom: 10vh;
    position: center;
    padding: 2vmin;
    margin-left: 50%;
    background-color: white;
    border-radius: 10px;
}

.tag{
    font-family: "Roboto Condensed", serif;
    color: #212121;
    margin: 1vw;
    font-size: 3vmin;
}
.tag-bar{
    justify-content: center;
    display: flex;
}
.Post{
    display: block;
    height: 10vh;
    width: 70vw;
    margin-bottom: 1%;
}
.point-style{
    border:  1px solid rgba(0, 0, 0, 0.27);
    border-radius: 10px;
    padding: 10px;
    height: 2vmin;
    margin-left: 30%;
    width: 30vmin;
}
.test-class{
    position: relative;
    display: grid;
    padding-left: 10%;
    padding-right: 10%;
    /*grid-template-columns: calc(100%/3) calc(100%/3) calc(100%/3);*/
    grid-template-columns: 1fr 1fr ;
    grid-column-gap: 2vh;
    grid-row-gap: 2vh;
}



@media screen and (max-width: 600px ) {
    .test-class{ grid-template-columns: 1fr;
        grid-row-gap: 0.3%;
    }

    .point {
        margin: 3vmin;
    }
}
.input-style{
    margin-left:10% ;
    background: none;
    border: none;
    outline: none;
}

.input-image{
    position: absolute;
    z-index: 200;
    outline: none;
    margin-left: 14.5%;
    opacity: 0;
    cursor: pointer;
}
.img-style2{
    transition: all ease-in-out .5s ;
    animation-direction: alternate;
}

.input-image:hover +.img-style2{

    box-shadow: 2px 9px 48px 2px rgba(0, 0, 0, 0.51);
}
.upload{
    transition: all ease-in-out .5s ;
    animation-direction: alternate;
    background-color: #1A1A1A;
}

.input-image:hover + .upload{
    background-color: #272727;
}

.uploadText{
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    font-family: "Roboto Condensed", serif;
    color: white;
    z-index: 190;
    font-size: xx-large;
    position: absolute;
    margin-left: 14em;
    margin-top: 6.5em;
}
.uploadText span{
    display: block;
    width: 6em;

}
.uploadText img{
    width: 2em;
    height: 2em;
    margin-top: -2%;
    margin-left: 1%;
}
#root{
    background-color: white;
}
/////// catalogItem.css
/////// order.css
.order-container{
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
    width: 70%;
    padding: 2% 15%;
    margin: auto;
    margin-top: 5%;
}
.btn-order{
    margin: auto;
    margin-top: 20px;
}
/////// teststyle.css
.one {
    width: 100px;
    height: 100px;
    background: black;
}
.two {
    width: 100px;
    height: 100px;
    background: red;
}
.one:hover + .two{
    background-color: #5890ff;
}
.main{
    margin-bottom: 300px;
    margin-left: 15%;
    margin-right: 15%;
}
.my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;
    margin-left: -30px; /* gutter size offset */
    width: 95%;
}
.my-masonry-grid_column {
    padding-left: 30px; /* gutter size */
    background-clip: padding-box;
}

/* Style your items */
.my-masonry-grid_column > div { /* change div to reference your elements you put in <Masonry> */

}
