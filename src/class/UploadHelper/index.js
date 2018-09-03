import FirebaseHelper from '../FirebaseHelper';

class UploadHelper {
    constructor() {
        this.firebase = FirebaseHelper.getFirebase();
        this.storage = null;
        this.imageRef = null;
    }

    async upload(file, folder, filename) {
        this.storage = this.firebase.storage();
        this.imageRef = this.storage.ref().child(`${folder}/${filename}`);
        return await this.imageRef.put(file)
    }

    async dowload(folder, filename) {
        this.storage = this.firebase.storage();
        return await this.storage.ref().child(`${folder}/${filename}`).getDownloadURL();
    }
}

export default new UploadHelper();