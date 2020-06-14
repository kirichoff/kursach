import React, {useEffect, useState} from 'react';
import Input from "rambler-ui/Input";
import Textarea from "rambler-ui/Textarea";
import Button from "rambler-ui/Button";
import RamblerMailIcon from 'rambler-ui/icons/services/RamblerMailIcon'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../reducers";


function MessageFragment(props) {
    const [message,setMessage] = useState('');
    const [login,setLogin] = useState('');
    const [email,setEmail] = useState('');
    const [isSending,setSending] = useState(false)
    useEffect(()=>{
        let user = props.state.User
        if(user){
            setLogin(user.login)
            setEmail(user.email)
        }
    })
    return (
        <div>
            <h4>Имя</h4>
            <Input
                style={{marginBottom: 5}}
                type="email"
                placeholder={'имя'}
                autoFocus
                value={login}
                onChange={e=> setLogin(e.target.value)}
            />
            <h4>Email</h4>
            <Input
                type="email"
                style={{marginBottom: 5}}
                autoFocus
                placeholder={'email'}
                value={email}
                onChange={e=> setEmail(e.target.value)}
            />
            <h4>Сообщение</h4>
            <Textarea
                variation="regular"
                value={message}
                onChange={(val)=> setMessage(val.target.value)}
                placeholder="Текст"
                style={{width: '500px'}}
                textareaStyle={{minHeight: '100px'}}
                iconRight={<RamblerMailIcon />}
                iconLeft={<RamblerMailIcon />}
            />

            <Button
                loading={isSending}
            onClick={()=>{
                    props.AddReport({email,login,message})
                    setSending(true)
                    setTimeout(()=> setSending(false),1500)
                }
            }
            >Отправить</Button>

        </div>
    );
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(MessageFragment);
