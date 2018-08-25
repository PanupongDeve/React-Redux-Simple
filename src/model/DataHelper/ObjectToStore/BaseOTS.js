
export default class BaseOTS {
    constructor() {
        this.loading = false;
        this.payload = null;
    }

    toDispatch(type, payload) {
        return (dispatch) => {
            dispatch({
                type,
                payload
            });
        }
        
    }

    toStore(payload, name) {
        const store = {};
        store[name] = payload;
        store.loading = this.loading;
        return store;
    }

    intialState() {
        return {
            loading: true
        }
    }

    
}