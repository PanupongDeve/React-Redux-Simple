//ไฟล์นี้สร้างเพื่อสามารถเช็คข้อมูลได้
import BaseDTO from './BaseDTO';
class CatDTO extends BaseDTO {
    constructor() {
        super();
    }

    getObject(data) {
        return {
            id: data.id,
            name: data.name,
            age: data.age,
            owner: data.owner
        }
    }

    getArrayObject(datas) {
        return datas.map(data => {
            return {
                id: data.id,
                name: data.name,
                age: data.age,
                owner: data.owner
            }
        })
    }
}

export default new CatDTO();