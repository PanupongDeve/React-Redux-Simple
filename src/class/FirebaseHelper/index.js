import firebase from "firebase";
class FirebaseHelper {
  constructor() {
    this.config = {
      apiKey: "AIzaSyAHSEpEjHAoZiwJh0b_0ZDpXrP30G52x-s",
      authDomain: "asdad-da29f.firebaseapp.com",
      databaseURL: "https://asdad-da29f.firebaseio.com",
      projectId: "asdad-da29f",
      storageBucket: "asdad-da29f.appspot.com",
      messagingSenderId: "545663675875"
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
