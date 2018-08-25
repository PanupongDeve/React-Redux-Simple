import CatOTS from '../../DataHelper/ObjectToStore/CatOTS';

const catStore =   (state = CatOTS.intialState(), action) => {
    switch (action.type) {
        case CatOTS.fetchCats:
            const storeUpdate = CatOTS.toStore(action.payload, "cats");
            state = Object.assign(state, storeUpdate);
            return {...state}
        default:
            return state;
    }
}

export default { catStore }