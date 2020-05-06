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
    const [data, setData] = useState([]);
    const [isEdit, setEdit] = useState(false)
    let node;
    const refresh = () => {
        props.getCategory().then(res => {
            setData([...res]);
        })
    };
    useEffect(() => {
        refresh()
    }, [data.length]);
    const add = () => {
        props.SetCategory({categoryName: node.value}).then(k => refresh());
        setEdit(false);
    };

    return (
        <Layout>
            {data.map((item, i) => {
                    return (
                        <div key={i} className={'category-Container'}>
                            <div style={{width: 250}}>{item.categoryName}</div>
                            {item.categoryName !== 'Все' ? <div>
                                    <ClearIcon onClick={() =>
                                        props.DeleteCategory({categoryId: item.categoryId})
                                            .then(k => refresh())}
                                               color={'blue'}/>
                                </div>
                                : null}
                        </div>)
                }
            )}
            {isEdit ? <div>
                    <input type="text" ref={nod => node = nod}/>
                    <TickIcon onClick={add} color={'blue'}/>
                    <ClearIcon onClick={() => setEdit(false)} color={'blue'}/>
                </div>
                : null}
            <AddIcon onClick={() => setEdit(true)} color={'blue'}/>
        </Layout>
    );
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(CategoryEdit);
