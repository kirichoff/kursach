import React, {Component} from 'react'
import Checkbox from 'rambler-ui/Checkbox'
import Select from "rambler-ui/Select";
import MenuItem from "rambler-ui/Menu/MenuItem";
import '../style/catalogNavbar.css'
const data = [...Array(5)].map((item, i) => `Foo${i}`);

export default class CatalogNavbar extends Component {
    state = {
        value: 'general',
        value1: null,
        data,
        checkBoxes: [
            {name: 'val1',checked: true},
            {name: 'val1',checked: false},
            {name: 'val1',checked: true},
        ]
    };
    setValue = (value)=>{
        this.setState({value1: value});
        };
    filterData = search => {
        const filteredData =
            search === ''
                ? data
                : data.filter(item => search !== '' && item.indexOf(search) > -1)

        this.setState({
            data: filteredData
        })
    };
    check = (index) =>(val)=>{
        let boxes= this.state.checkBoxes;
        boxes[index].checked = !boxes[index].checked;
        this.setState({checkBoxes: [...boxes] })
    };
    render() {
        return (
        <div className={'catalogNavbar'} >
            <div style={{width: '70%', marginBottom: 15}}>
                <h3>Категории</h3>
                <Select
                    placeholder="Type something..."
                    lightPlaceholderColor={true}
                    value={this.state.value1}
                    onChange={this.setValue}
                    onSearch={this.filterData}>
                    {this.state.data.map(item =>
                        <MenuItem value={item} key={item}>
                            {item}
                        </MenuItem>
                    )}
                </Select>
                <div>
                <h4>Под Категории</h4>
                    {this.state.checkBoxes.map((item,index)=>
                        <Checkbox
                            checked={item.checked}
                            key={index}
                            onCheck={this.check(index)}
                            checkboxClassName={'checkBox-Navbar'}
                            labelClassName={'label-checkBox-Navbar'}
                            size={'medium'}
                        >{item.name}
                        </Checkbox>
                    )}
                </div>
            </div>
        </div>
        )
    }
}
