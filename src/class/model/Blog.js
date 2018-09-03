import Model from './Model';

class Product extends Model {
    constructor() {
        super();
        this.ref = '/blog/';
    }

    async create(data) {
        
        return await this.post(this.ref, data)
    }

    async getAll() {
        let blogs = await this.get(this.ref);
        blogs = blogs.filter(blog => blog.status === "active");
        return blogs
    }

    async getById(id) {
        try {
            const blog = await this.get(`${this.ref}${id}`);
            if(blog.status === "deleted") {
                throw "Undefind"
            }
            return blog;
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