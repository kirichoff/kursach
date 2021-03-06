import React, {useState} from 'react';
import {RemoveIcon} from "rambler-ui/icons/forms";
import Card from "react-bootstrap/Card";
import '../style/CartItem.css'
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
import {connect} from "react-redux";
function CartItem(props) {

    return (
            <Card key={props.key}>
                <Card.Body>
                    <div className={'cardbody'}  >
                        <Card.Img className={'imgg'} style={{width: '180px'}}  variant="left" src={props.previewImage} />
                        <div  style={{display:'inline-block'}} className={'p-header'}>
                            <h4>{props.header}</h4>
                            <div>{props.description}</div>
                        </div>
                        <div className={'count'} >
                            <input defaultValue={ props.count || 1 }
                                   onChange={ (e) => props.setCount && props.setCount(e.target.value) || 1 }
                                   type={ 'number' } min={ 1 }/>
                        <span>  :количество</span>
                        </div>
                        <span className={'price'} >{props.price.toFixed(2) * (props.count || 1)}</span>
                        <div className={'removeIco'}>
                            <RemoveIcon onClick={()=>
                            {
                                console.log(props,'CartItem');
                                props.DeleteCartItem(props.itemId);
                            }
                            } />
                        </div>
                    </div>
                </Card.Body>
            </Card>
    );
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CartItem);
