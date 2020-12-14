import rootReducer from '../modules';
import {composeWithDevTools} from 'redux-devtools-extension';
import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga';

const saga = createSagaMiddleware();

const enhancer = composeWithDevTools(applyMiddleware(
    saga,
));

const store = createStore(rootReducer, enhancer);

saga.run(rootSaga);

export default store;