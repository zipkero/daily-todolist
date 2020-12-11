import {composeWithDevTools} from 'redux-devtools-extension';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../modules';

const enhancers = composeWithDevTools(
    applyMiddleware(
        thunk,
    ),
);

const store = createStore(rootReducer, enhancers);

export default store;