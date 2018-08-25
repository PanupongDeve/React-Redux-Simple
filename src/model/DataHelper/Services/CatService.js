import BaseService from './BaseService';
import CatDTO from '../DTO/CatDTO';

class CatService extends BaseService {
    constructor(domain) {
        super(domain)
    }

    async getCats() {
        const data = await this.get();
        const catsData = data.cats;
        const catsObject = catsData.map(catData => {
            const catDTO = new CatDTO(catData);
            const catObject = catDTO.getObject();
            return catObject;
        });

        return catsObject;
    }

    async getCat(id) {
        const data = await this.getById(id);
        const catData = data.cat;
        const catDTO = new CatDTO(catData);
        const catObject = catDTO.getObject();
        return catObject;
    }

    
}

export default new CatService('cats');