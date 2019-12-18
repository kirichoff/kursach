import React, {useState,useEffect} from 'react';
import Select from "rambler-ui/Select";
import MenuItem from "rambler-ui/Menu/MenuItem";
import {rest} from '../rest/rest'


function CategoryPiker(props) {
    const findId =(value)=>  data.find(k=>k.categoryName == value);
    const [value,setValue] = useState( '');
    const [data,setData] =useState([]);
    let filterData = search => {
        const filteredData =
            search === ''
                ? data
                : data.filter(item => search !== '' && item.indexOf(search) > -1);
       setData({
            data: filteredData
        })
    };
    useEffect(()=>{
        rest.getCategory().then(res=>
            {
                setValue(
                    res.find(k=>k.categoryId === props.categoryId)
                    && res.find(k=>k.categoryId === props.categoryId).categoryName
                    || '' );
            if (res.length>0) {
                setData(res);
            }})
    },[]);



    return (
            <Select
                placeholder="Выберите категорию"
                lightPlaceholderColor={true}
                value={value}
                onChange={(e)=>{
                    setValue(e);
                    if (props.onChange) props.onChange(findId(e).categoryId) ;
                }}
              // onSearch={filterData}
            >
                {data.map(item =>
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
