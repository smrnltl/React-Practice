import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers/rootReducer';

const initialState = {};

const middleware = [thunk];

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(reducer, initialState, enhancer);

//store.subscribe(() => console.log(store.getState()))



export default store;