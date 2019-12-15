import React from 'react';
import '../style/Style.css'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {AiOutlineShoppingCart} from "react-icons/ai";

function Bar({activeOnlyWhenExact}) {
    return (
        <div style={ {marginTop: '5px'} }>
            <Link className={ ' point' } to={ '/' } onlyActiveOnIndex>Главная</Link>
            <Link className={ 'point' } to={ '/Catalog' }>Каталог</Link>
            <Link className={ 'point' } to={ '/About' }>О предприятии</Link>
            <Link className={ 'point' } to={ '/Stats' }>Статистика</Link>
            <Link className={ 'point' } to={ '/Cart' }><AiOutlineShoppingCart size={'2em'} /></Link>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        base: state
    }
}
export default connect(mapStateToProps)(Bar);
