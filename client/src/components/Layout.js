import React, {useEffect, useState} from 'react';
import '../style/teststyle.css'
import Menu from "./Menu";
import Notification from "rambler-ui/Notification/Notification";
function Layout(props) {
    return (
        <div>
            <Menu/>
            <div className={'main'} >
                {props.children}
            </div>
            <footer className={'footer'} >footer</footer>
        </div>
    );
}

export default Layout;
