import React from 'react';
import '../style/Style.css'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import  {useRouteMatch} from "react-router-dom";

function Bar({activeOnlyWhenExact}) {
    return (
        <div style={ {marginTop: '17px'} }>
            <Link className={ ' point' } to={ '/' } onlyActiveOnIndex>Главная</Link>
            <Link className={ 'point' } to={ '/Catalog' }>Каталог</Link>
            <Link className={ 'point' } to={ '/About' }>О предприятии</Link>
            <Link className={ 'point' } to={ '/Cart' }>Корзина</Link>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        base: state
    }
}
export default connect(mapStateToProps)(Bar);
