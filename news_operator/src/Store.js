import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import {reducer}  from './reducers/index';

export default function configureStore() {
    const rootReducer = combineReducers({
        state: reducer,
        routing: routerReducer
    });

    return createStore(
        rootReducer,
        compose(applyMiddleware(thunk))
    );
}
