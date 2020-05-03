import React, {Component} from 'react';
import {Popup} from "rambler-ui/Popup";
import Button from "rambler-ui/Button";
import Input from "rambler-ui/Input";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            isFail: false
        }
    }

    updateValue = type => e => {
        this.setState({
            [`${type}`]: e.target.value
        })
    };

    login = () => {
            this.props.Login(this.state).then(r => {
                if (r){
                    this.cancel()
                    this.props.GetCart({userId: r && r.userId || null});
                }else {
                    this.setState({isFail: true})
                }
            })
    }
    cancel = () => {
        this.props.cancel('LoginPopUp');
    }
    render() {
        let isFail = this.state.isFail
        return (
            <Popup
                title="Войдите"
                showClose
                isOpened={this.props.isOpen}
                backdropColor="blue"
                okButton={
                    <Button type="primary" size="small" onClick={this.login}>
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
                    <div style={{marginBottom: '5%', color: 'red'}}>
                        {isFail ?
                            'Неверное имя пользователя или пароль'
                            : null
                        }
                    </div>
                    <Input
                        style={{marginBottom: 5}}
                        type="email"
                        status={isFail? 'error' : null}
                        autoFocus
                        placeholder={'email'}
                        value={this.state.email}
                        onChange={this.updateValue('email')}
                    />
                    <Input
                        type="password"
                        autoFocus
                        placeholder={'пароль'}
                        status={isFail ? 'error' : null}
                        value={this.state.password}
                        onChange={this.updateValue('password')}
                    />
                </div>
            </Popup>
        );
    }
}

export default Login;