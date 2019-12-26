import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import CartItem from "../components/CartItem";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
import OrderForm from "../components/OrderForm";
import {forEach} from "react-bootstrap/cjs/ElementChildren";
import Button from "rambler-ui/Button";
import NotifyError from "../components/NotifyError";

function CartPage(props) {
    let cartItems = props.state.cart;
    useEffect(()=>{
        props.GetCart();
    },[]);
    const [notification,setNotification] = useState(false);
    const error = {message: 'все поля должны быть заполнены'};
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
                        setCount={(value)=> props.SetCountCart(value,item.itemId || item.ShopItemId )}
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
