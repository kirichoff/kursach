import React, {Component} from 'react'
import '../style/catalogNavbar.css'
import Input from "rambler-ui/Input";
import Button from "rambler-ui/Button";
import CategoryPiker from "./CategoryPiker";
import {EditIcon} from "rambler-ui/icons/forms";
import {Link} from "react-router";

export default class CatalogNavbar extends Component {
    render() {
        let isAdmin = this.props.isAdmin;
        let nav = this.props.Nav
        console.log('Nav', nav);
        return (
            <div className={'catalogNavbar'}>
                <div style={{width: '14vw', marginBottom: 15}}>
                    <h3>Категории {isAdmin ? <Link to={'/Category'}><EditIcon/></Link> : null} </h3>
                    <CategoryPiker onChange={(id) => this.props.onChange({...nav,category: id})}
                    />
                    <h5>Цена от</h5>
                    <Input
                        value={nav.min}
                        onChange={(value) =>  this.props.onChange({...nav,min: value.target.value})}
                        type={'number'}/>
                    <h5>До</h5>
                    <Input value={nav.max}
                           onChange={(value) => this.props.onChange({...nav,max: value.target.value})}
                           type={'number'}/>
                    <div style={{padding: '10% 21%'}}>
                        <Button onClick={() => this.props.onClick()}>подобрать</Button>
                    </div>
                </div>
            </div>
        )
    }
}
