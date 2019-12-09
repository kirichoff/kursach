import React, {Component} from 'react';
import Login from "./Login";
import Register from "./Register";

class You extends Component {
    render() {
        // http://localhost:8080/resources?password=123&user=qwe
        let a;
        return (
            <div>
                Вход
            <Login/>
            <Register/>
            </div>
        );
    }
}

export default You;
