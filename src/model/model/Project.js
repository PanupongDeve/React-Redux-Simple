import Model from './Model';

class Product extends Model {
    constructor() {
        super();
        this.ref = '/project/';
    }

    async create(data) {
        return await this.post(this.ref, data)
    }

    async getAll() {
        let projects = await this.get(this.ref);
        projects = projects.filter(project => project.status === "active");
        return projects
    }

    async getById(id) {
        try {
            const project = await this.get(`${this.ref}${id}`);
            if(project.status === "deleted") {
                throw "Undefind"
            }
            return project;
        } catch (error) {
            throw error
        }     
    }

    async edit(id, data) {
        await this.patch(`${this.ref}${id}`, data);
    }

    async remove(id) {
        await this.delete(`${this.ref}${id}`);
    }
}


export default new Product();