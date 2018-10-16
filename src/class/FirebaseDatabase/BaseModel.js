import FirebaseHelper from '../FirebaseHelper';
import moment from 'moment';

class BaseModel {
    constructor(ref) {
        this.firebase = FirebaseHelper.getFirebase();
        this.moment = moment;
        this.ref = ref;
    }

    async getLastKey() {
        let key = -1;
        await this.firebase.database().ref(this.ref).orderByKey().limitToLast(1).once('value', (snapshort) => {
            snapshort.forEach(e => { key = e.key; });
        });
        return key;
    }

    async create(data) {
        data.createAt = this.moment().format();
        data.updateAt = this.moment().format();
        data.status = 'active';
        try {
            const key =  Number(await this.getLastKey())+1;
            data.id = key;
            
            await this.firebase.database().ref(`${this.ref}/${key}`).set(data);
            return true;  
        } catch (error) {
            throw error;
        }
    }

    async getAll(extend=false) {
        try {
            let snapshot = await this.firebase.database().ref(this.ref).once("value");
            let data = await snapshot.val()|| [];
            data = extend ? this.inCludeOptionalFields(data) : data;
            return data; 
        } catch (error) {
            throw error;
        }
    }

    async getWithSocket(reciveDataFunction, extend=false){
        try {
            await this.firebase.database().ref(this.ref).on("value", async (snapshot) => {
                let data = snapshot.val() || [];
                data = extend ? await this.inCludeOptionalFields(data) : data;
                await reciveDataFunction(data)
            });
        } catch (error) {
            throw error;
        }
    }

    async getById(id, extend=false) {
        try {
            let snapshot = await this.firebase.database().ref(`${this.ref}/${id}`).once("value");
            let data = await snapshot.val();
            data = extend ? this.inCludeOptionalField(data) : data;
            return data; 
        } catch (error) {
            throw error;
        }
    }

    async edit(id, newData) {
        try {
            const oldData = await this.get(id);
            if(oldData.status === "deleted"){
                throw "undefind"
            }
            let data = Object.assign({},oldData, newData);
            data.updateAt = this.moment().format();
            data.status = 'active';
            await this.firebase.database().ref(`${this.ref}/${id}`).set(data); 
            return true;
        } catch (error) {
            console.log("Error");
            throw error;
        }
    }

    async delete(id) {
        try {
            let oldData = await this.get(id);
            if(oldData.status === "deleted"){
                throw "undefind"
            }
            oldData.status = "deleted";
            oldData.deletedAt = this.moment().format();
            await this.firebase.database().ref(`${this.ref}/${id}`).set(oldData);
        } catch (error) {
            console.log("Error");
            throw error;
        }
    }
    
}

export default BaseModel;