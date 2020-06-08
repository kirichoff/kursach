import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import MessageFragment from "./MessageFragment";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../../reducers";
import {Table} from "react-bootstrap";

function Report(props) {
    let user = props.state.User
    const [data, setData] = useState([])


    useEffect(() => {
        props.GetReports().then(
            d => setData(d || [])
        )
    }, [])

    return (
        <Layout>
            <div style={{marginBottom: '55%'}}>
                <h1>Обратная связь</h1>
                {
                    !user || user.rights == 2 ?
                        <MessageFragment/>
                        :
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Имя</th>
                                    <th>email</th>
                                    <th>Сообщение</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.map((k, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{k.login}</td>
                                        <td>{k.email}</td>
                                        <td>{k.message}</td>
                                        <td><span className={'point'}
                                                  onClick={() =>
                                                      props.DeleteReport({reportId: k.reportId}).then(()=>
                                                          props.GetReports().then(
                                                              d => setData(d || [])
                                                          )
                                                      )
                                                  }
                                        >удалить</span></td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                        </div>
                }
            </div>
        </Layout>
    );
}

export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Report);
