import OwnerSocket  from './OwnerSocket';

class Model {
    constructor() {
        this.owner = new OwnerSocket('owners')
    }
}

export default new Model();