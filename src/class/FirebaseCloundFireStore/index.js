import Product from './Product';
import Brand from './Brand';
import Type from './Type';

class Model {
    constructor() {
        this.product = new Product('product');
        this.brand = new Brand('brand');
        this.type = new Type('type');
    }
}

export default new Model();