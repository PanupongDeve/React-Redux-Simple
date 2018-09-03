import BaseService from './BaseService';
import CatDTO from '../DTO/CatDTO';

class CatService extends BaseService {
    constructor(domain) {
        super(domain)
    }

    async getCats() {
        const data = await this.get();
        const cats = data.cats;
        return cats;
    }

    async getCat(id) {
        const data = await this.getById(id);
        const cat = data.cat;
        return cat;
    }

    
}

export default new CatService('cats');