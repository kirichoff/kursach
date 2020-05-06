import React, {Component} from 'react';
import {Popup} from "rambler-ui/Popup";
import Button from "rambler-ui/Button";
import Input from "rambler-ui/Input";


class Registration extends Component {

    constructor(props, context) {
        super(props, context);
        this.state={
            login: '',
            password: '',
            phoneNumber: '',
            adminKey: '',
            email:'',
            isFail: false,
            emailStatus: '',
            phoneNumberStatus: '',
            passwordStatus: '',
        }
    }

    register = () => {
        let s = this.state;
        if(s.emailStatus == 'success' && s.phoneNumberStatus == 'success' && s.passwordStatus == 'success') {
            this.props.Register(this.state).then(res => {
                if (res.length && res[0].userId) {
                    this.cancel();
                    this.setState({
                        login: '',
                        password: '',
                        phoneNumber: '',
                        adminKey: '',
                        email:'',
                        isFail: false,
                        emailStatus: '',
                        phoneNumberStatus: '',
                        passwordStatus: '',
                    })
                }
                else {
                    this.setState({isFail: true})
                }
            })
        }
    }
    updateValue = type => e=> {
        this.setState({
            [`${type}`]: e.target.value
        })
        this.checkData(type,e.target.value)
    };
    cancel = () => {
        this.props.cancel('RegisterPopUp');
    }


    checkData(field,value){
        console.log(field,value)
        let regex = {
            'email':'^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$',
            'phoneNumber':'^\\+?[0-9]{3}-?[0-9]{6,12}$',
            'password':'^(?=.*\\d).{8,15}$'
        }

        let reg = new RegExp(regex[field])

        let status = reg.test(value)? 'success' : 'error';
            console.log('status',status)
        this.setState({
            [`${field}Status`] : status
        })
    }

    render() {
        console.log(this.state)
        return (
            <Popup
                title="Регистрация"
                showClose={true}
                isOpened={this.props.isOpen}
                backdropColor="blue"
                okButton={
                    <Button type="primary" size="small" onClick={ this.register}>
                        Ок
                    </Button>
                }
                cancelButton={
                    <Button type="flat" size="small" onClick={this.cancel}>
                        Отмена
                    </Button>
                }
                onRequestClose={this.cancel}>
                <div style={{width: 400}}>
                    <div style={{marginBottom: '5%',color: 'red' }} >
                        {(this.state.isFail)? 'Ошибка: пользователь с таким email уже есть' : null}
                    </div>
                    <Input
                        style={{marginBottom: 5}}
                        type="email"
                        placeholder={'имя'}
                        autoFocus
                        value={this.state.login}
                        onChange={this.updateValue('login')}
                    />
                    <Input
                        type="email"
                        style={{marginBottom: 5}}
                        autoFocus
                        placeholder={'email'}
                        status={this.state.emailStatus}
                        value={this.state.email}
                        onChange={this.updateValue('email')}
                    />
                    <Input
                        type="password"
                        style={{marginBottom: 5}}
                        autoFocus
                        status={this.state.passwordStatus}
                        placeholder={'пароль'}
                        value={this.state.password}
                        onChange={this.updateValue('password')}
                    />
                    <Input
                        type="tel"
                        style={{marginBottom: 5}}
                        autoFocus
                        placeholder={'телефон'}
                        status={this.state.phoneNumberStatus}
                        value={this.state.phoneNumber}
                        onChange={this.updateValue('phoneNumber')}
                    />
                    <Input
                        type="text"
                        style={{marginBottom: 5}}
                        autoFocus
                        placeholder={'ключ администратора(необязтельно)'}
                        value={this.state.adminKey}
                        onChange={this.updateValue('adminKey')}
                    />
                </div>
            </Popup>
        );
    }
}
export default Registration;