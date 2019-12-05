import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { Router,Route,browserHistory,IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createSotre from './Store'
import About from "./components/About";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import FeatureTable from "./components/FeatureTable";
import ItemPage from "./pages/ItemPage";
import {createRest} from "./rest/rest";
import {loadActions} from "./reducers";

const  store = createSotre();
const history = syncHistoryWithStore(browserHistory, store);

createRest().then(()=>{
    loadActions();
    ReactDOM.render(
    <Provider store={store}>
            <Router history={history}>
                <Route exact path="/" component={ Home }/>
                <Route path="/About" component={ About }/>
                <Route path={'/Catalog'} component={Catalog}/>
                <Route path={'/Test'} component={FeatureTable}/>
                <Route path={'/Item/:id'} component={ItemPage}/>
            </Router>
    </Provider>
    , document.getElementById('root'))});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
