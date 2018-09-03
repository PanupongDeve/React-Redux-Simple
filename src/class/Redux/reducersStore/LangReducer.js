import LangOTS from '../../DataHelper/ObjectToStore/LangOTS';

const lang = (state = LangOTS.intialState(), action) => {
    switch (action.type) {
        case LangOTS.CHANGE_LANG:
            return LangOTS.saveLanguage(action.payload);
        default:
            state = LangOTS.intialState();
            return state;
    }
}

export default { lang }