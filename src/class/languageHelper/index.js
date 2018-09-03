
class languageHelper {

    switchLang(text) {
        const lang = this.getLang();
        switch (lang) {
            case 'th':
                return text.th;
            case 'en' :
                return text.en;
        } 
    }

    getLang() {
        return localStorage.getItem('language');
    }

    setDefaultLanguage() {
        localStorage.setItem('language', 'en');
        return 'en';
    }

    saveLanguageToStorage(lang) {
        localStorage.setItem('language', lang);
    }
}


export default new languageHelper();
