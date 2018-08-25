//ไฟล์นี้สร้างเพื่อสามารถเช็คข้อมูลได้
import BaseDTO from './BaseDTO';
export default class CatDTO extends BaseDTO {
    constructor(data) {
        super();
        this.id = data._id || data.id;
        this.name = data.name; //ชื่อแมว
        this.age = data.age; // ชื่ออายุแมว 
        this.owner = data.owner; //ชื่อเจ้าของแมว
    }

    getObject() {
        return {
            id:this.id,
            name: this.name,
            age: this.age,
            owner: this.owner
        }
    }
}