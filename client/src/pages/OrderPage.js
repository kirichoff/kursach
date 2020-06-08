import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import {Table} from "react-bootstrap";
import {Link} from "react-router";
import {actionCreators} from "../reducers";
import {bindActionCreators} from "redux";
import {connect} from 'react-redux'
import Input from "rambler-ui/Input";

function OrderPage(props) {
    const [data, setData] = useState([]);
    const [filted, setFilted] = useState([]);
    const [search, setSearch] = useState('')
    const getOrders = () => {
        props.GetOrders().then(res => {
            console.log(res);
            setData(res)
            setFilted(res)
        });
    }
    useEffect(() => {
        getOrders();
    }, [data.orderId]);
    return (
        <Layout>
            <h1>Заказы</h1>
            <div style={{marginTop: '20px', marginBottom: '20px'}}>
                <h2>Найти</h2>
                <Input
                    value={search}
                    placeholder={'email/имя/товар/номер'}
                    onChange={(e) => {
                        if(e.target.value != ''){
                            setFilted(
                                data.filter(it=>
                                    it.email.indexOf(e.target.value) > -1 ||
                                    it.login.indexOf(e.target.value) > -1 ||
                                    it.header.indexOf(e.target.value) > -1||
                                    it.phoneNumber.indexOf(e.target.value) > -1
                                )
                            )
                        }else {
                            setFilted(data)
                        }
                        setSearch(e.target.value)
                    }
                    }
                />
            </div>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Имя</th>
                    <th>email</th>
                    <th>телефон</th>
                    <th>дата</th>
                    <th>количество</th>
                    <th>Название товара</th>
                    <th>товар</th>
                    <th>завершить</th>
                </tr>
                </thead>
                <tbody>
                {filted.map((k, index) =>
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{k.login}</td>
                        <td>{k.email}</td>
                        <td>{k.phoneNumber}</td>
                        <td>{new Date(k.startDate).toLocaleDateString()}</td>
                        <td>{k.count}</td>
                        <td>{k.header}</td>
                        <td><Link to={`/Item/${k.itemId}`} onlyActiveOnIndex>перейти</Link></td>
                        <td>
                            <span style={{color: k.status == 1 ? "green" : ""}}
                                  className={'point'} onClick={
                                () => k.status != 1 ? props.DeleteOrder({orderId: k.orderId})
                                    .then(() => getOrders()) : null
                            }>
                           {k.status == 1 ? 'завершен' : "завершить"}
                        </span>
                        </td>
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

