import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import {reducer}  from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore() {
    const rootReducer = combineReducers({
        state: reducer,
        routing: routerReducer
    });

    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk)),
    );
}
