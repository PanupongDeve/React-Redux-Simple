import BaseOTS from './BaseOTS';
import languageHelper from '../../languageHelper';

class LangOTS extends BaseOTS {
    constructor() {
        super();
        this.CHANGE_LANG = "change_lange";
    }

    intialState() {
        return languageHelper.setDefaultLanguage();
    }


    saveLanguage(lang) {
        languageHelper.saveLanguageToStorage(lang);
        return lang
    }

    
}

export default new LangOTS();