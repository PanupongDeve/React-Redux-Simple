import LangOTS from '../../class/DataHelper/ObjectToStore/LangOTS';


export const switchLang = (lang) => async (dispatch) => {
    LangOTS.toDispatch(LangOTS.CHANGE_LANG, lang)(dispatch);
}