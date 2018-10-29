import CatService from './CatService';
import OwnerService from './OwnerService';
import TwiloClientService from './TwiloClientService';

class Model {
    constructor() {
        this.cats = new CatService('cats');
        this.owner = new OwnerService('owners');
        this.twlio = new TwiloClientService('twChat');
    }
}

export default new Model();