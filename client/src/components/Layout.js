import React, {useEffect, useState} from 'react';
import '../style/teststyle.css'
import Menu from "./Menu/Menu";

import Notification from "rambler-ui/Notification/Notification";
function Layout(props) {
    return (
        <div >
            <Menu/>
            <div className={`main ` + props.className} >
                {props.children}
            </div>
            <footer className={'footer'} >
                <div>
                    <div className={'Logo'}></div>
                    <div style={{display:'block'}}>МИНСКИЙ АВТОМОБИЛЬНЫЙ ЗАВОД</div>
                </div>
                <div>
                    220021, Республика Беларусь <br/>
                    г.Минск, ул.Социалистическая 2 <br/>
                    +375 17 217 22 22 | 8000 217 22 22 <br/>
                    web@maz.by <br/>
                </div>
            </footer>
        </div>
    );
}

export default Layout;
