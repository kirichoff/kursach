import React, {useState} from 'react';
import {RemoveIcon} from "rambler-ui/icons/forms";
import Card from "react-bootstrap/Card";
import '../style/CartItem.css'
function CartItem(props) {
    const [count,setCount] = useState(1);
    return (
            <Card>

                <Card.Body>
                    <div className={'cardbody'}  >
                        <Card.Img className={'imgg'} style={{width: '100px'}}  variant="left" src={props.previewImage} />
                        <div  style={{display:'inline-block'}} className={'p-header'}>
                            <h4>{props.header}</h4>
                            <div>{props.description}</div>
                        </div>
                        <div className={'count'} >
                        <input  defaultValue={count} type={'number'} min={1}/>
                        <span>  :колличество</span>
                        </div>
                        <span className={'price'} >{props.price} :цена</span>
                        <div className={'removeIco'}>
                            <RemoveIcon  />
                        </div>
                    </div>
                </Card.Body>
            </Card>
    );
}

export default CartItem;
