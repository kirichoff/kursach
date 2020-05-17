import React, {useState,useEffect} from 'react';
import Select from "rambler-ui/Select";
import MenuItem from "rambler-ui/Menu/MenuItem";
import {rest} from '../rest/rest'


function CategoryPiker(props) {
    const findId = (value) =>  categories.find(k=>k.categoryName == value);
    const [categories,setCategories] = useState([]);
    const [value,setValue] = useState( '');
    useEffect(()=>{
        rest.getCategory().then(res=>
            {
            if (res.length>0) {
                setCategories([...res])
            }})
    },[]);

    let categoryName = categories.length &&
        categories.find(k=>k.categoryId === props.categoryId)
        && categories.find(k=>k.categoryId === props.categoryId).categoryName
        || ''

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

export default CategoryPiker;
