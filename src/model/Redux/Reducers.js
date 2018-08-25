import { combineReducers } from 'redux';
import reducerStore from './reducersStore';

class Reducers {

    constructor() {
        this.reducers = {}
    }

    getReducers() {
        
        const rootReducer = combineReducers(this.reducers);
        return rootReducer;
    }

    pluginReducer(newReducers) {
        newReducers.map(reducers => {
            return Object.assign(this.reducers, reducers)
        })
        
        return this;
    }
}

export default new Reducers().pluginReducer(reducerStore);