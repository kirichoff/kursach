import React, {Component} from 'react';
import Bar from "./Bar";
import crypto from 'crypto'
import { Query,graphql } from "react-apollo";
import gql from "graphql-tag";
import {withApollo} from "@apollo/react-hoc";
import query from "apollo-cache-inmemory/lib/fragmentMatcherIntrospectionQuery";


const request =  gql`    
   query ($name: String!, $password: String!){
        authorisation(name: $name, password: $password){
            request
            }
        }
`;
const users = gql`    
    {
        users{
            password,
            userId
        }
    }
`;
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
        this.props.client.query({
            query: request,
            variables: {password: inputs[1].value, name:inputs[0].value}
        }).then(r=>console.log(r)).catch(e=>console.log(e));
        console.log("prop");
        console.log(this.props.data);
    };
    render() {
        console.log(this.props)
        return (
            <div>
                <Bar/>
                <form onSubmit={this.sub}>
                    <input type="text"/>
                    <input type="password"/>
                    <input type="submit" value={"вхоод"} />
                </form>
            </div>
        );
    }
}
export default withApollo(Login);
