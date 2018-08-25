import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { Provider, connect } from 'react-redux';
import Reducers from './Reducers';

class Redux {

    constructor() {
        this.reducers = Reducers.getReducers();
    }


    generateStore() {
        const CreateStoreApplyMiddleware = applyMiddleware(reduxThunk)(createStore);
        const store = CreateStoreApplyMiddleware(this.reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
        return store;
    }

    getProvider() {
        return Provider;
    }

    getConnect() {
        return connect;
    }
}

export default new Redux();