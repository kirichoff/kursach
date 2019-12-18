import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { Router,Route,browserHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createStore from './Store'
import About from "./pages/About";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ItemPage from "./pages/ItemPage";
import {createRest} from "./rest/rest";
import {loadActions} from "./reducers";
import { ApplyTheme } from 'rambler-ui/theme'
import CartPage from "./pages/CartPage";
import StatsPage from "./pages/StatsPage";
import Profile from "./pages/Profile";
const  store = createStore();
const history = syncHistoryWithStore(browserHistory, store);

createRest().then(()=>{
    loadActions();
    ReactDOM.render(
        <ApplyTheme>
    <Provider store={store}>
            <Router history={history}>
                <Route exact path="/" component={ Home }/>
                <Route path="/About" component={ About }/>
                <Route path={'/Catalog'} component={Catalog}/>
                <Route path={'/Profile'} component={Profile} />
                <Route exdct path={'/Cart'} component={CartPage}/>
                <Route path={'/Item/:id'} component={ItemPage}/>
                <Route path={'/Stats'} component={StatsPage}/>
            </Router>
         </Provider>
        </ApplyTheme>
    , document.getElementById('root'))});
serviceWorker.unregister();
