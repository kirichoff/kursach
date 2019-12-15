import React, {useState} from 'react';
import {RemoveIcon} from "rambler-ui/icons/forms";
import Card from "react-bootstrap/Card";
import '../style/CartItem.css'
function CartItem(props) {
    console.log(props)
    const [count,setCount] = useState(1);
    return (
            <Card>

                <Card.Body>
                    <div className={'cardbody'}  >
                        <Card.Img className={'imgg'} style={{width: '100px'}}  variant="left" src="https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
                        <div  style={{display:'inline-block'}} className={'p-header'}>
                            <div>{props.header}</div>
                            <div>{props.description}</div>
                        </div>
                        <div className={'count'} >
                        <input  defaultValue={count} type={'number'} min={1}/>
                        </div>
                        <span className={'price'} >{props.price}</span>
                        <div className={'removeIco'}>
                            <RemoveIcon  />
                        </div>
                    </div>
                </Card.Body>
            </Card>
    );
}

export default CartItem;
