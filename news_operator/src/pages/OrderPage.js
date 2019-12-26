import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import {Table} from "react-bootstrap";
import {Link} from "react-router";
import {rest} from "../rest/rest";
import CategoryPiker from "../components/CategoryPiker";
import {actionCreators} from "../reducers";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux'

function OrderPage(props) {
    const [data,setData] = useState([]);
    useEffect(()=>{
        props.GetOrders().then(res=>{
           console.log(res);
           setData(res)
       });

        },[data.orderId]);

    return (
        <Layout>
            <h1>Заказы</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Имя</th>
                    <th>email</th>
                    <th>телефон</th>
                    <th>дата</th>
                    <th>количество</th>
                    <th>id заказа</th>
                    <th>id товара</th>
                    <th>товар</th>
                    <th>завершить</th>
                </tr>
                </thead>
                <tbody>
                {data.map((k,index)=>
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{k.login}</td>
                        <td>{k.email}</td>
                        <td>{k.phoneNumber}</td>
                        <td>{ new Date(k.startDate).toLocaleDateString()}</td>
                        <td>{k.count}</td>
                        <td>{k.orderId}</td>
                        <td>{k.itemId}</td>
                        <td><Link to={`/Item/${k.itemId}`} >перейти</Link></td>
                        {/*<td><span className={'point'} onClick={()=>props.DeleteOrder({orderId: k.orderId})} >завершить</span></td>*/}
                    </tr>
                )}
                </tbody>
            </Table>

        </Layout>
    );
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(OrderPage);

