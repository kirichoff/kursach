import React from 'react';
import Layout from "../components/Layout";
import CartItem from "../components/CartItem";

function CartPage() {
    let cartItems = [{price: '1333',description:'qqqq',header:'eqweqeq'},{}];
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
        </Layout>
    );
}

export default  CartPage;
