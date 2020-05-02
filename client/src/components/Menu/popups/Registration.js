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
            isFail: false
        }
    }

    register = () => {
            this.props.Register(this.state).then(res=>
                    (res.length && res[0].userId)? this.cancel() : this.setState({isFail: true}))
    }
    updateValue = type => e=> {
        this.setState({
            [`${type}`]: e.target.value
        })
    };

    cancel = () => {
        this.props.cancel('RegistrationPopUp');
    }
    render() {
        return (
            <Popup
                title="Регистрация"
                showClose={false}
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
                        {(this.state.isFail)? 'Ошибка: Неверные данные' : null}
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