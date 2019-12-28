import React, {Component} from 'react'
import '../style/catalogNavbar.css'
import Input from "rambler-ui/Input";
import Button from "rambler-ui/Button";
import CategoryPiker from "./CategoryPiker";
import {EditIcon} from "rambler-ui/icons/forms";
import {Link} from "react-router";

export default class CatalogNavbar extends Component {
    state = {
        min: this.props.Nav.min,
        category: this.props.Nav.category,
        max: this.props.Nav.max
    };
    check = (index) =>(val)=>{
        let boxes= this.state.checkBoxes;
        boxes[index].checked = !boxes[index].checked;
        this.setState({checkBoxes: [...boxes] })
    };
    render() {

        let isAdmin = this.props.isAdmin;
        console.log('Nav',this.state);
        return (
        <div className={'catalogNavbar'} >
            <div style={{width: '14vw', marginBottom: 15}}>
                <h3>Категории {isAdmin?  <Link  to={'/Category'} ><EditIcon/></Link>:null} </h3>
                <CategoryPiker onChange={ (id) => {
                    this.setState({category: id});
                    this.state.category = id;
                    this.props.onChange({...this.state})
                }
                }
                />
                <h5>Цена от</h5>
                <Input
                    value={this.state.min}
                    onChange={(value)=>{
                        this.setState({min:value.target.value});
                        this.state.min = value.target.value
                        this.props.onChange(this.state)
                    }
                    }
                    type={ 'number' } />
                <h5>До</h5>
                <Input value={this.state.max}
                       onChange={(value)=>
                           {
                               this.setState({max:value.target.value});
                               this.state.max = value.target.value
                               this.props.onChange(this.state)
                           }
                       }
                       type={ 'number' } />
                <div style={{padding: '10% 21%'}} >
                    <Button onClick={()=>this.props.onClick()} >подобрать</Button>
                </div>
            </div>
        </div>
        )
    }
}
