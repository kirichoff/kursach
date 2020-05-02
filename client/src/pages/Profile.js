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
    const [phoneNumber, setPhone] = useState(user.phoneNumber || '');
    const [login, setLogin] = useState(user.login || '');
    const [loading, setLoading] = useState(false);



    useEffect(()=>{
        setPhone(user.phoneNumber || '');
        setPassword(user.password || '');
        setEmail(user.email || '');
        setLogin(user.login || '');
    },[user.userId])

    let exit = () => {
        props.UserExit();
        props.router.push('/catalog')
    }

    let updateUser = () => {
        props.UpdateUser({email, password, phoneNumber, login, userId: user.userId})
        setLoading(true)
        setTimeout(() => setLoading(false), 1000)
    }

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
                               value={phoneNumber}/>
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
                               onChange={(e) => setLogin(e.target.value)}
                               type={'text'}
                               value={login}/>
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
                            width={"11vw"}
                            onClick={updateUser}>
                            сохранить
                        </Button>
                        <Button
                            width={"11vw"}
                            style={{marginLeft: 20}}
                            type={'outline'}
                            loading={loading}
                            onClick={exit}>
                            выйти
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
