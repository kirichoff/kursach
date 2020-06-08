import React, {useState,useEffect} from 'react';
import Select from "rambler-ui/Select";
import MenuItem from "rambler-ui/Menu/MenuItem";
import {rest} from '../rest/rest'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";


function CategoryPiker(props) {
    const findId = (value) =>  categories.find(k=>k.categoryName == value);
    const [categories,setCategories] = useState([]);
    const [value,setValue] = useState( '' || props.category);

    let count = async (arr) =>{
        let arr2 = []
            for(let it of arr){
                let co = await props.GetCategoryCount({categoryId: it.categoryId})
                if(co[0].count>0){
                    arr2.push(it)
                }
            }
            return arr2;
    }

    useEffect(()=>{
        rest.getCategory().then( async res=>
        {
            if (res.length>0) {
                let cat = (!props.state.User || props.state.User === 2)? await count([...res]) : res;
                setCategories(cat)
            }})
    },[props.state.User]);

    let categoryName = categories.length &&
        categories.find(k=>k.categoryId === props.categoryId)
        &&
        categories.find(k=>k.categoryId === props.categoryId).categoryName
        ||
        ''

    return (
            <Select
                placeholder="Выберите категорию"
                lightPlaceholderColor={true}
                value={categoryName}
                onChange={(e)=>{
                    console.log(e);
                    setValue(e);
                    if (props.onChange) props.onChange(findId(e).categoryId) ;
                }}
              // onSearch={filterData}
            >
                {categories.map(item =>
                    <MenuItem
                        value={item.categoryName}
                        key={item.categoryId}>
                        {item.categoryName}
                    </MenuItem>
                )}
            </Select>
    );
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CategoryPiker);
