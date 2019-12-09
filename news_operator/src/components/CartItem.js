import React, {useState} from 'react';
import {RemoveIcon} from "rambler-ui/icons/forms";
import Card from "react-bootstrap/Card";
import '../style/CartItem.css'
function CartItem(props) {

    const [count,setCount] = useState(1);
    return (
            <Card>

                <Card.Body>
                    <Card.Text>
                        <Card.Img style={{width: '100px'}}  variant="left" src="https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                        <span  style={{display:'inline-block'}} className={'p-header'}>
                            <div>{props.header}</div>
                            <div>{props.description}</div>
                        </span>
                        <input defaultValue={count} type={'number'} min={1}/>
                        <span className={'price'} >{props.price}</span>
                        <RemoveIcon className={'removeIco'} />
                    </Card.Text>
                </Card.Body>
            </Card>
    );
}

export default CartItem;
