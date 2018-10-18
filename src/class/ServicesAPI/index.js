import CatService from './CatService';
import OwnerService from './OwnerService';

class Model {
    constructor() {
        this.cats = new CatService('cats');
        this.owner = new OwnerService('owners');
    }
}

export default new Model();