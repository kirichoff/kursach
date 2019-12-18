import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import CartItem from "../components/CartItem";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
import OrderForm from "../components/OrderForm";

function CartPage(props) {
    const  [cartItems,setCart] = useState([]);

    useEffect(()=>{
        props.GetCart();
        setCart(props.state.cart);
    },[cartItems,props]);
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
            <OrderForm/>
        </Layout>
    );
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CartPage);
