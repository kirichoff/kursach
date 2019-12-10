import React from 'react';
import '../style/teststyle.css'
import Menu from "./Menu";
function Layout(props) {
    return (
        <div>
            <Menu/>
            <div className={'main'} >
                {props.children}
            </div>
            <footer className={'footer'} >foter</footer>
        </div>
    );
}

export default Layout;
