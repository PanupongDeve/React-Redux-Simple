import FirebaseHelper from '../FirebaseHelper';
import moment from 'moment';

class Model {
    constructor() {
        this.firebase = FirebaseHelper.getFirebase();
        this.moment = moment;
    }

    async getLastKey(url) {
        let key = -1;
        await this.firebase.database().ref(url).orderByKey().limitToLast(1).once('value', (snapshort) => {
            snapshort.forEach(e => { key = e.key; });
        });
        return key;
    }

    async post(url, data) {
        data.createAt = this.moment().format();
        data.updateAt = this.moment().format();
        data.status = 'active';
        try {
            const key =  Number(await this.getLastKey(url))+1;
            data.id = key;
            
            const result = await this.firebase.database().ref(`${url}/${key}`).set(data);
            console.log(result); 
            return true;  
        } catch (error) {
            throw error;
        }
    }

    async get(url) {
        try {
            let snapshot = await this.firebase.database().ref(url).once("value");
            const data = await snapshot.val();
            return data; 
        } catch (error) {
            throw error;
        }
    }

    async socket(url, reciveDataFunction){
        try {
            await this.firebase.database().ref(url).on("value", async (snapshot) => {
                await reciveDataFunction(snapshot.val())
            });
        } catch (error) {
            throw error;
        }
    }

    async patch(url, newData) {
        try {
            const oldData = await this.get(url);
            if(oldData.status === "deleted"){
                throw "undefind"
            }
            const data = Object.assign({},oldData, newData);
            data.updateAt = this.moment().format();
            data.status = 'active';
            await this.firebase.database().ref(url).set(data); 
            return true;
        } catch (error) {
            console.log("Error");
            throw error;
        }
    }

    async delete(url) {
        try {
            let oldData = await this.get(url,'one');
            if(oldData.status === "deleted"){
                throw "undefind"
            }
            oldData.status = "deleted";
            oldData.deletedAt = this.moment().format();
            await this.firebase.database().ref(url).set(oldData);
        } catch (error) {
            console.log("Error");
            throw error;
        }
    }
    
}

export default Model;