import React, {useEffect, useState} from 'react';
import {AddIcon, ClearIcon, TickIcon} from "rambler-ui/icons/forms";
import Button from "rambler-ui/Button";
import {rest} from "../rest/rest";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
import Layout from "../components/Layout";
import '../style/CategoryPage.css'
function CategoryEdit(props) {
    const [data,setData] = useState([]);

    useEffect(()=>{
        props.getCategory().then(res=>
        {
                setData([...res]);
        })
    },[data.length]);

    return (
        <Layout>
            {data.map((item,i)=>
                <div className={'category-Container'} >
                    <input defaultValue={ item.categoryName} type={'text'} />
                    <div>  <TickIcon color={'blue'} /></div>
                    <div> <ClearIcon color={'blue'} /></div>
                </div>
            )}
            <AddIcon color={'blue'} />
        </Layout>
    );
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CategoryEdit);
