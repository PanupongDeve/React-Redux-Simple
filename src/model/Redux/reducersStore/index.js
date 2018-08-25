import notify from './notifyReducer';
import catsStore from './catStoreReducer';

const reducerStore = []

reducerStore.push(notify);
reducerStore.push(catsStore);


export default reducerStore;