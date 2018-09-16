import Model from './Model';

class User extends Model {
    constructor() {
        super();
        this.collection = 'User';
    }

}

export default new User();