import Model from './Model';

class User extends Model {
    constructor() {
        super();
        this.collection = 'User';
    }

    async create(data) {
        await this.post(this.collection, data);
    }

    async getAll() {
        await this.get(this.collection)
    }
}

export default new User();