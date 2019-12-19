import React, {useState} from 'react';
import {RemoveIcon} from "rambler-ui/icons/forms";
import Card from "react-bootstrap/Card";
import '../style/CartItem.css'
function CartItem(props) {
    console.log(props)
    return (
            <Card key={props.key}>
                <Card.Body>
                    <div className={'cardbody'}  >
                        <Card.Img className={'imgg'} style={{width: '100px'}}  variant="left" src={props.previewImage} />
                        <div  style={{display:'inline-block'}} className={'p-header'}>
                            <h4>{props.header}</h4>
                            <div>{props.description}</div>
                        </div>
                        <div className={'count'} >
                            <input defaultValue={ props.count }
                                   onChange={ (e) => props.setCount && props.setCount(e.target.value) || null }
                                   type={ 'number' } min={ 1 }/>
                        <span>  :колличество</span>
                        </div>
                        <span className={'price'} >{props.price} :цена</span>
                        <div className={'removeIco'}>
                            <RemoveIcon onClick={()=>props.DeleteCartIte  && props.DeleteCartItem(props.ShopItemId) || null } />
                        </div>
                    </div>
                </Card.Body>
            </Card>
    );
}

export default CartItem;
