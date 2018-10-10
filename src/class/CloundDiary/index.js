import cloudinary from 'cloudinary-core';
import CloundSetting from './CloundSetting';

const cloundSetting =  new CloundSetting();

class CloundDiary {
    constructor() {
        this.cl = null
        this.apiId = 'v1539172918',
        this.folder = 'Test'
    }

    setUp() {
        this.cl = new cloudinary.Cloudinary(cloundSetting.getSetting());
    }

    getImage(pathImage) {
        this.setUp();
        let imageURL = this.cl.url(`${this.apiId}/${this.folder}/${pathImage}`);
        console.log(imageURL);
    }
    
}

export default new CloundDiary();