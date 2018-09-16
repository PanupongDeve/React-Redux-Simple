import Model from './Model';
import role from './Role';

class User extends Model {
    constructor() {
        super();
        this.collection = 'User';
    }

    async extendRole(users) {
        try {
            let usersExtend = users;
            const roles = await role.getAll();

            usersExtend = usersExtend.map(user => {
                roles.forEach(role => {
                    if(role.documentId === user.role_documentId) {
                        user.role = role;
                    }
                });

                return user;
            });

            return usersExtend;      
        } catch (error) {
            throw Promise.reject(error);
        }
    }

}

export default new User();