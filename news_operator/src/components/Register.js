import React, {Component} from 'react';
import Bar from "./Bar";
import crypto from 'crypto'

class Register extends Component {
    sub(e){
        let inputs = e.target.childNodes
        console.log(inputs[0].value)
        console.log(inputs[1].value)

        let crupt = crypto.createHash('sha256');

        let hashed = crupt.update(inputs[1].value, "utf8");//utf8 here
        let result = crupt.digest("base64");


        fetch(`/api/Register?password=${result}&user=${inputs[0].value}`,{method: "GET"})
            .then((response) => response.json()
                .then( qwe => console.log(qwe) ) )


        e.preventDefault()
    }
    render() {
        return (
            <div>
                {/*<Bar/>*/}
                <form onSubmit={this.sub}>
                    <input type="email"/>
                    <input type="password"/>
                    <input type="submit" value={"регистрация"} />
                </form>
            </div>
        );
    }
}

export default Register;
