import React, {Component} from 'react';
import '../Style.css'
import {connect} from 'react-redux'
import {Link} from 'react-router'
class Bar extends Component {
    render() {
        return (
            <div>
                <div className={"Bar"}>
                    <img style={{
                        width:'4em'
                    }} src="./logo.png" alt=""/>
                    <Link className={'point'} to={'/'} >Главная</Link>
                    <Link className={'point'} to={'/Catalog'} >Каталог</Link>
                    <Link className={'point'} to={'/You'} >Личный кабинет</Link>
                    <Link className={'point'} to={'/Post'} >О предприятии</Link>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        base: state
    }
}
export default connect(mapStateToProps)(Bar);
