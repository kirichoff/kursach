import React, {Component} from 'react';
import Bar from "./Bar";
import crypto from 'crypto'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {actionCreators} from "../reducers";
import Layout from "./Layout";
class Login extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            password: '',
            login: ''
        }
    }
    sub = (e) =>{
        e.preventDefault();
        let inputs = e.target.childNodes;
        console.log(inputs[0].value);
        console.log(inputs[1].value);

        this.setState({password: inputs[1].value, login:inputs[0].value});
        let crypt = crypto.createHash('sha256');

        let hashed = crypt.update(inputs[1].value, "utf8");//utf8 here
        let result = crypt.digest("base64");

        console.log("prop");
        console.log(this.props.data);
    };
    render() {
        console.log(this.props);
        return (
            <Layout>
                <form onSubmit={this.sub}>
                    <input type="text"/>
                    <input type="password"/>
                    <input type="submit" value={"вхоод"} />
                </form>
            </Layout>
        );
    }
}
export default connect(
    state => state,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Login);
