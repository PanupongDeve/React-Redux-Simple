import Model from './Model';

class Product extends Model {
    constructor() {
        super();
        this.ref = '/product/';
    }

    async create(data) {
        return await this.post(this.ref, data);
    }

    async getAll() {
        let products = await this.get(this.ref);
        products = products.filter(product => product.status === "active");
        return products
    }

    async getWithSocket(reciveDataFunction) {
        await this.socket(this.ref, reciveDataFunction);
    }

    async getById(id) {
        try {
            const product = await this.get(`${this.ref}${id}`);
            if(product.status === "deleted") {
                throw "Undefind"
            }
            return product;
        } catch (error) {
            throw error
        }     
    }

    async edit(id, data) {
        return await this.patch(`${this.ref}${id}`, data);
    }

    async remove(id) {
        await this.delete(`${this.ref}${id}`);
    }
}


export default new Product();