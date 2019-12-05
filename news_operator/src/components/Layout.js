import React from 'react';
import Bar from "./Bar";
import '../style/teststyle.css'
function Layout(props) {
    return (
        <div>
            <Bar/>
            <div className={'main'} >
                {props.children}
            </div>
            <footer>foter</footer>
        </div>
    );
}

export default Layout;
