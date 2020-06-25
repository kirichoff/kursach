import React, {useState} from 'react';
import '../style/order.css'
import {Input} from "rambler-ui";
import Button from "rambler-ui/Button";

function OrderForm(props) {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    return (
        <div className={ 'order-container' }>
            <h3>Ваши данные</h3>
            <div className={ 'phone' }>
                <h6>телефон</h6>
                <Input
                        placeholder={ '+3752999999999' }
                        status={new RegExp('^[0-9]{9}$').test(phone)? "success": 'error'}
                       onChange={ (e) => setPhone(e.target.value.slice(5,e.target.value.length)) }
                       type={ 'tel' }
                       value={ "+" + 375 + " " +phone }/>
            </div>
            <div className={ 'email' }>
                <h6>электронная почта</h6>
                <Input placeholder={ 'post@mail.com' }
                       onChange={ (e) => setEmail(e.target.value) }
                       type={ 'email' }
                       value={ email }/>
            </div>
            <div className={ 'name' }>
                <h6>Имя</h6>
                <Input placeholder={ 'Валера' }
                       onChange={ (e) => setName(e.target.value) }
                       type={ 'text' }
                       value={ name }/>
            </div>
            <div className={'btn-order'} >
                <Button onClick={()=>props.onSubmit(name,phone,email)} >Заказать</Button>
            </div>
        </div>
    );
}

export default OrderForm;
