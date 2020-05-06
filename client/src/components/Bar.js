import React from 'react';
import '../style/Style.css'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {AiOutlineShoppingCart} from "react-icons/ai";
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";

function Bar(props) {
    let isAdmin = props.state.User && props.state.User.rights === 1 || null;
    return (
        <div style={ {marginTop: '5px'} }>
            <Link className={ ' point' } to={ '/' } onlyActiveOnIndex>Главная</Link>
            <Link className={ 'point' } to={ '/Catalog' }>Каталог</Link>
            {isAdmin?
                <Link className={ 'point' } to={ '/Stats' }>Статистика</Link>
                :
                null
            }
            {isAdmin?
                <Link className={ 'point' } to={ '/Orders' }>Заказы</Link>
                :
                null
            }
            <Link className={ 'point' } to={ '/Cart' }><AiOutlineShoppingCart size={'2em'} /></Link>
        </div>
    );
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Bar);
