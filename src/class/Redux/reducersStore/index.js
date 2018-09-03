import notify from './notifyReducer';
import catsStore from './catStoreReducer';
import LangReducer from './LangReducer'

const reducerStore = []

reducerStore.push(notify);
reducerStore.push(catsStore);
reducerStore.push(LangReducer);


export default reducerStore;