import FirebaseHelper from '../FirebaseHelper';
import model from '../FirebaseCloundFireStore';
import role from '../../enums/role';



class FirebaseAuth {
    constructor() {
        this.firebase = FirebaseHelper.getFirebase();
    }

    async signUp(email, password) {
        try {
            const response = await this.firebase.auth().createUserWithEmailAndPassword(email, password);
            const data = {
                email: email,
                uid: response.user.uid
            }
            await this.saveUserProfileToDatabase(data);
            return await this.isUser() ? true : false;
        } catch (error) {
            console.log(error);
        }
    }

    async signUpWithUsername(username, password) {
        try {
            const email = this.migrateToEmail(username);
            const response = await this.firebase.auth().createUserWithEmailAndPassword(email, password);
            const data = {
                username,
                uid: response.user.uid,
                role: role.CUSTOMER
            }
            await this.saveUserProfileToDatabase(data);
            return await this.isUser() ? true : false;
        } catch (error) {
            console.log(error);
        }
    }



    async signUpWithGoogle() {

    }

    async signUpWithFacebook() {

    }

    async saveUserProfileToDatabase(data) {
        try {
            await model.user.create(data);  
        } catch (error) {
            console.log(error);  
        }
        
    }

    async isAuth() {
        let isAuth;
        await this.firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                isAuth = true;
            } else {
                isAuth = false;
            }
          });
        return isAuth;
    }

    async getUID() {
        let uid;
        await this.firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              uid = user.uid;
            } 
          });
        return uid;
    }


    async login(email, password) {
        try {
            this.firebase.auth().signInWithEmailAndPassword(email, password);
            
            return await this.isUser() ? true : false;
        } catch (error) {
            console.log(error);
        }
    }

    async loginWithUsername(username, password) {
        try {
            const email = this.migrateToEmail(username);
            this.firebase.auth().signInWithEmailAndPassword(email, password);
            
            return await this.isUser() ? true : false;
        } catch (error) {
            console.log(error);
        }
    }

    async loginWithGoogle() {

    }

    async loginWithFacebook() {
        
    }

    async logout() {
        await this.firebase.auth().signOut();
    }

    migrateToEmail(username) {
        return `${username}@${username}.com`
    }

}


export default new FirebaseAuth();