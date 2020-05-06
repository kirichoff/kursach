import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { Router,Route,browserHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createStore from './Store'
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ItemPage from "./pages/ItemPage";
import {createRest} from "./rest/rest";
import {loadActions} from "./reducers";
import { ApplyTheme } from 'rambler-ui/theme'
import CartPage from "./pages/CartPage";
import StatsPage from "./pages/StatsPage";
import Profile from "./pages/Profile";
import OrderPage from "./pages/OrderPage";
import CategoryEdit from "./pages/CategoryEdit";
const  store = createStore();
const history = syncHistoryWithStore(browserHistory, store);
serviceWorker.register();
createRest().then(()=>{
    loadActions();
    ReactDOM.render(
        <ApplyTheme>
    <Provider store={store}>
            <Router history={history}>
                <Route exact path="/" component={ Home }/>
                <Route exact path={'/Catalog'} component={Catalog}/>
                <Route path={'/Profile'} component={Profile} />
                <Route exdct path={'/Cart'} component={CartPage}/>
                <Route path={'/Item/:id'} component={ItemPage}/>
                <Route path={'/Stats'} component={StatsPage}/>
                <Route path={'/Orders'} component={OrderPage}/>
                <Route path={'/Category'} component={CategoryEdit}/>
            </Router>
         </Provider>
        </ApplyTheme>
    , document.getElementById('root'))});
serviceWorker.unregister();
