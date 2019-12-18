import React, {Component} from 'react'
import '../style/catalogNavbar.css'
import Input from "rambler-ui/Input";
import Button from "rambler-ui/Button";
import CategoryPiker from "./CategoryPiker";

export default class CatalogNavbar extends Component {
    state = {
        value: 'general',
        min: 1,
        category: 0,
        max: 200000000000
    };
    check = (index) =>(val)=>{
        let boxes= this.state.checkBoxes;
        boxes[index].checked = !boxes[index].checked;
        this.setState({checkBoxes: [...boxes] })
    };
    render() {
        return (
        <div className={'catalogNavbar'} >
            <div style={{width: '14vw', marginBottom: 15}}>
                <h3>Категории</h3>
                <CategoryPiker onChange={ (id) => {
                    this.setState({category: id});
                    this.props.onChange(this.state)
                }
                }
                />
                <h5>Цена от</h5>
                <Input
                    value={this.state.min}
                    onChange={(value)=>{this.setState({min:value.target.value});
                        this.props.onChange(this.state)}
                    }
                    type={ 'number' } />
                <h5>До</h5>
                <Input value={this.state.max}
                       onChange={(value)=>
                           {
                               this.setState({max:value.target.value
                           }
                           );
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
