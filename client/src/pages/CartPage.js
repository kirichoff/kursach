import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import CartItem from "../components/CartItem";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
import OrderForm from "../components/OrderForm";
import Button from "rambler-ui/Button";
import NotifyError from "../components/NotifyError";
import CartPopupFragment from "../components/CartPopupFragment";
import '../style/Cart.css'

const styl = {float: 'right',}

function CartPage(props) {
    let cartItems = props.state.cart;
    useEffect(() => {
        props.GetCart();
    }, []);
    const [notification, setNotification] = useState(false);
    const [error, setError] = useState({message: ''});
    const [popup, setPopup] = useState(false)

    let user = props.state.User;
    user = user && user.userId || null;
    let addOrder = (userId) => {
        if (cartItems.length) {
            if (userId)
                for (let item of props.state.cart || []) {
                    props.AddOrder({
                        startDate: new Date().toISOString(),
                        itemId: item.ShopItemId || item.itemId,
                        userId: userId,
                        status: 0,
                        count: item.count
                    })
                }
            setPopup(true);
            props.ClearCart();
        }
    };
    let handler = async (name, phone, email) => {
        if (props.state.cart && props.state.cart.length) {
            let regex = {
                'email': '^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$',
                'phone': '^\\+?[0-9]{3}-?[0-9]{6,12}$',
            }
            if (email && phone && name) {
                if (!new RegExp(regex['phone']).test(phone)) {
                    setError({message: 'неверный телефон'});
                    setNotification(true)
                    return;
                }
                let emailReg = new RegExp(regex['email']).test(email);
                if (!emailReg) {
                    setError({message: 'неверный email'});
                    setNotification(true)
                    return;
                }
                let us = await props.AddCartUser({login: name, phoneNumber: phone, email, password: 'user'});
                addOrder(us[0].userId);
            } else {
                setError({message: 'все поля должны быть заполнены'});
                setNotification(true)
            }
        }
    };

    let total = () => {
        let sum = 0;
        cartItems.forEach(item => sum += item.price * (item.count || 1))
        return sum;
    }

    return (
        <Layout>
            <CartPopupFragment
                isOpen={popup}
                cancel={() => setPopup(!popup)}
            />
            <div>
                <NotifyError notify={notification} close={() => setNotification(false)} error={error || null}/>
                {cartItems.map((item, index) => {
                        return <CartItem
                            key={index}
                            {...item}
                            setCount={(value) => {
                                if (value > 0) props.SetCountCart(value, item.itemId || item.ShopItemId);
                                else {
                                    setError({message: 'количество не может быть отрицательным'});
                                    setNotification(true)
                                }
                            }
                            }
                        />
                    }
                )}
            </div>
            {
                cartItems.length?
                    <div className={'bottom-container'}>
                <div className={'price-container'}>
                    <div>
                        <span className={'label'}>Итого:</span>
                        <span className={'text'}>{total().toFixed(2)}</span>
                    </div>
                    <div>
                        <span className={'label'}>Цена с НДС:</span>
                        <span className={'text'}>{(total() + (total() * 20 / 100)).toFixed(2)}</span>
                    </div>
                </div>
                        <Button
                            style={{width:'100%'}}
                        type={"secondary"}
                            onClick={()=> props.ClearCart()
                                }
                        >
                            Очистить
                        </Button>

                    </div>
                    :
                    null
            }
            {user ?
                <div style={{margin: 'auto', marginTop: '15%', width: 107}}><Button
                    onClick={() => addOrder(user)}>Заказать</Button></div>
                :
                <OrderForm onSubmit={handler}/>
            }
        </Layout>
    );
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CartPage);
