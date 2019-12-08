import React, {Component} from 'react';
import Button from 'rambler-ui/Button'
import '../style/menu.css'
import {Popup} from "rambler-ui/Popup";
import Input from "rambler-ui/Input";
import Bar from "./Bar";

const values = ['Home', 'About', 'Contact'];
class Menu extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: values[1],
            customIsOpened: false,
            SignUpOpened: false,
            Key: '',
            name: '',
            pass: '',
            isKey: false,
            isFail: false,
            prevS: window.pageYOffset,
            navBar:{position: 'relative',top: '0px'},
            LogIn: {isLogin: false,isAdmin: false,name:'' }
        };
    }
    Scroll = ()=>{
        console.log('scroll');
        let nav = {position: "",top:"",zIndex: 200};
        let prevScrollpos = this.state.prevS
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
    }

    componentDidMount() {
          window.addEventListener("scroll",this.Scroll)
    }
    componentWillUnmount() {
           window.removeEventListener("scroll",this.Scroll)
    }
    openPopup =()=> {
        this.setState({customIsOpened: true})
        // this.setState({
        //     [`${type}IsOpened`]: true
        // })
    }
    openPopup2 = ()=>{
        this.setState({SignUpOpened: true,name: '',pass: ''})
    }

    updateValue = type => e=> {
        this.setState({
            [`${type}`]: e.target.value
        })
    }
    async getLogin ()
    {
        console.log(this.state)
        if (this.state.pass != '') {
            const url = `api/SampleData/Login?name=${this.state.name}&pas=${this.state.pass}`;
            const response = await fetch(url, {method: "GET"});
            const Log = await response.json();
            if (Log == "true") {
                this.props.LogIn(true)
                this.setState({
                    LogIn:
                        {isLogin: true, isAdmin: Log.isAdmin, name: this.state.name}
                })
                this.closePopup()
            } else {
                this.setState({isFail: true});
            }
        }
    }
    async Reg()
    {
        const url = `api/SampleData/Reg?name=${this.state.name}&pas=${this.state.pass}&key=${this.state.Key}`;
        const response = await fetch(url);
        const Log = await response.json();

        if(Log.key){
            this.setState({name: '',pass: '',SignUpOpened: false,
                isFail: false});
        }
        else {
            this.setState({isKey: true})
        }
    }
    closePopup = () => {
        this.setState({
            customIsOpened: false,
            isFail: false
        })
    }
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
                        {(this.state.LogIn.isLogin)?
                            <div style={{marginTop: 10 ,marginLeft: 20,marginRight: 20,}} >{"Hi " + this.state.name +" !    "}</div>
                            :
                            <div >
                                <Button
                                    onClick={this.openPopup2}
                                    type={'outline'}
                                    size={'small'}
                                    rounded={false}
                                    style={{height: '30px'}}
                                >
                                Регистрация
                            </Button>
                                <Button
                                    onClick={this.openPopup}
                                    style={{marginLeft: 20,marginRight: 10, height: '30px' } }
                                    size={'small'}
                                    rounded={false}
                                >
                                    Войти
                                </Button>
                            </div> }
                    </div>
                </div>
                <Popup
                    title="Войдите"
                    showClose
                    isOpened={this.state.customIsOpened}
                    backdropColor="blue"
                    okButton={
                        <Button type="primary"  size="small" onClick={()=>{}}
                        //    this.getLogin()}
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
                        <div style={{marginBottom: '5%',color: 'red' }} >{(this.state.isFail)? 'Неверное имя пользователя или пароль' : null}</div>
                        <Input
                            style={{marginBottom: 5}}
                            type="email"
                            status={(this.state.isFail)? 'error': null}
                            autoFocus
                            placeholder={'имя'}
                            value={this.state.name}
                            onChange={this.updateValue('name')}
                        />
                        <Input
                            type="password"
                            autoFocus
                            placeholder={'пароль'}
                            status={(this.state.isFail)? 'error': null}
                            value={this.state.pass}
                            onChange={this.updateValue('pass')}
                        />
                    </div>
                </Popup>
                <Popup
                    title="Регистрация"
                    showClose={false}
                    isOpened={this.state.SignUpOpened}
                    backdropColor="blue"
                    okButton={
                        <Button type="primary" size="small" onClick={()=>console.log('Reg')}>
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
                            value={this.state.name}
                            onChange={this.updateValue('name')}
                        />

                        <Input
                            type="password"
                            style={{marginBottom: 5}}
                            autoFocus
                            placeholder={'пароль'}
                            value={this.state.pass}
                            onChange={this.updateValue('pass')}
                        />
                        <Input
                            type="text"
                            placeholder={'ключ'}
                            autoFocus
                            status={(this.state.isKey)? 'error': null}
                            value={this.state.Key}
                            onChange={this.updateValue('Key')}
                        />
                    </div>
                </Popup>
            </div>
        )
    }
}

export default Menu;
