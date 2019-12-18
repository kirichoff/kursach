import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import CartItem from "../components/CartItem";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
import OrderForm from "../components/OrderForm";
import {forEach} from "react-bootstrap/cjs/ElementChildren";
import Button from "rambler-ui/Button";

function CartPage(props) {
    const  [cartItems,setCart] = useState([]);

    useEffect(()=>{
        props.GetCart();
        setCart(props.state.cart);
    },[cartItems,props]);
    let user = props.state.User;
    user = user && user.userId  ||  null;
    let addOrder = (userId)=> {
            for (let item in props.state.cart || [])
            props.AddOrder({
                startDate: Date.now(),
                itemId: item.ShopItemId,
                userId: userId,
                status: 0
            })
    };
    let handler = async (name,phone,email)=>{
        if (props.cart.length) {
            let us = await props.Register({login: name, phoneNumber: phone, email, password: 'user'});
            addOrder(us[0].userId)
        }
    };




    return (
        <Layout>
            <div>
                 {cartItems.map((item,index)=>
                     <CartItem
                     key={index}
                         {...item}
                     />
                     )}
            </div>

            {user?
                <div style={{margin: 'auto',width: 107}} ><Button  onClick={()=>addOrder(user)} >Заказать</Button></div>
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
