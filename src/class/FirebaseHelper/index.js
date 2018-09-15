import firebase from "firebase";
class FirebaseHelper {
  constructor() {
    this.config = {
      apiKey: "AIzaSyDHZNBG2O7BibDeOXgF2VZz_fBM4CRSdkY",
      authDomain: "portfolio-ta.firebaseapp.com",
      databaseURL: "https://portfolio-ta.firebaseio.com",
      projectId: "portfolio-ta",
      storageBucket: "portfolio-ta.appspot.com",
      messagingSenderId: "516995854840"
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
