import React, {useState} from 'react';
import '../style/Style.css'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {AiOutlineShoppingCart} from "react-icons/ai";
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
import {ClearIcon} from "rambler-ui/icons/forms";


function Bar(props) {
    let isAdmin = props.state.User && props.state.User.rights === 1 || null;
    return (
        <div className={'bar'} style={ {marginTop: '5px',display: props.show? 'flex':'none'  } }>
            <div onClick={()=>props.setShow(!props.show)} className={'openClose'} >
                <ClearIcon/>
                <input type="checkbox"/>
            </div>
            <Link className={ 'point' } to={ '/Catalog' }>Каталог</Link>
            {isAdmin?
                <Link className={ 'point' } to={ '/Stats' }>Отчеты</Link>
                :
                null
            }
            {isAdmin?
                <Link className={ 'point' } to={ '/Orders' }>Заказы</Link>
                :
                null
            }
            <Link className={ 'point' } to={ '/Report' }>обратная связь</Link>
            {isAdmin?
                null
                :
                <Link className={ 'point' } to={ '/Cart' }><AiOutlineShoppingCart size={'2em'} /></Link>
            }
        </div>
    );
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Bar);
