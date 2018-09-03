import FirebaseHelper from '../FirebaseHelper';



class UploadHelper {
    constructor() {
        this.firebase = FirebaseHelper.getFirebase();
        this.storage = null;
        this.imageRef = null;
    }

    async upload(file, filename) {
        this.storage = this.firebase.storage();
        this.imageRef = this.storage.ref().child(`images/${filename}`);
        return await this.imageRef.put(file)
    }

    async dowload(filename) {
        this.storage = this.firebase.storage();
        return await this.storage.ref().child(`images/${filename}`).getDownloadURL();
    }
}

export default new UploadHelper();