import BaseOTS from './BaseOTS';

class CatOTS extends BaseOTS {
    constructor() {
        super();
        this.fetchCats = "fetch_cats";
        this.fetchCat = "fetch_cat";
    }

    
}

export default new CatOTS();