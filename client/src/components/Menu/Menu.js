import React, {Component} from 'react';
import '../../style/menu.css'
import Bar from "../Bar";
import '../logo.png'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../reducers";
import {Link} from "react-router";
import Registration from "./popups/Registration";
import Login from "./popups/Login";

const values = ['Home', 'About', 'Contact'];
class Menu extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: values[1],
            RegisterPopUp:false,
            LoginPopUp: false,
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

    closePopup = (popup) => {
        this.setState({[`${popup}`]: false,isFail: false})
    };

    openPopUp = (popup) => () => {
        this.setState({[`${popup}`]: true})
    }

    render() {
        return (
            <div id="navbar"
                 style={{...this.state.navBar,...this.props.style}}>
                <div style={{width:'2em'}}>
                <img
                    style={{position: 'absolute',width: '3em'}}
                     src="../logo.png" alt=""
                />
                </div>
                    <Bar/>
                    <div style={{  marginTop: 10, marginBottom:5,   float: 'right'}}>
                        {
                            (this.props.state.User && this.props.state.User.userId)?
                            <Link
                                to={'/Profile'}
                                style={{marginTop: 5 ,marginLeft: 20,marginRight: 20,}} >{"Привет " + this.props.state.User.login +"!"}
                            </Link>
                            :
                            <div className={'regContainer'} >
                                <span
                                    className={'reg'}
                                    onClick={this.openPopUp('RegisterPopUp')}
                                >
                                Регистрация
                            </span>
                                <span
                                    className={'reg l'}
                                    onClick={this.openPopUp('LoginPopUp')}
                                    style={{marginLeft: 20} }
                                >
                                    Войти
                                </span>
                            </div>
                        }
                    </div>
                {/*//popups*/}
                <Login cancel={this.closePopup} isOpen ={this.state.LoginPopUp} {...this.props} />
              <Registration cancel={this.closePopup}  isOpen ={this.state.RegisterPopUp}  {...this.props} />
            </div>
        )
    }
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Menu);
