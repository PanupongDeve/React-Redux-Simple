import firebase from 'firebase';
class FirebaseHelper {
    constructor() {
        this.config = {
            apiKey: "",
            authDomain: "",
            databaseURL: "",
            projectId: "",
            storageBucket: "",
            messagingSenderId: ""
          };
    }


    plugin() {
        console.log("mount firebase");
        firebase.initializeApp(this.config);
    }

    getFirebase() {
        return firebase;
    }
}

export default new FirebaseHelper();