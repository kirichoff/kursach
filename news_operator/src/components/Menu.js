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
                                this.props.GetCart({userId: r.userId});
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
                            placeholder={'имя'}
                            value={this.state.login}
                            onChange={this.updateValue('login')}
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
