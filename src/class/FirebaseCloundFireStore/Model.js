import FirebaseHelper from "../FirebaseHelper";
import moment from "moment";
import status from '../../enums/status';
import actions_status from '../../enums/actions_status'


class Model {
  constructor() {
    this.firebase = FirebaseHelper.getFirebase();
    this.moment = moment;
  
  }

  createDatabase() {
    const db = this.firebase.firestore();

    db.settings({
      timestampsInSnapshots: true
    });

    return db;
  }

  async getLastKey() {
    const db = this.createDatabase();
    const querySnapshot = await db.collection(this.collection).orderBy("id", "desc").limit(1).get();
    let key = 0;
    querySnapshot.forEach(doc => {
      key = doc.data().id;
    })
    return key;
  }

  async create(data) {
    try {
      const db = this.createDatabase();
      data.createdAt = this.moment().format();
      data.updatedAt = this.moment().format();
      data.status = status.ACTIVE;
      data.id = await this.getLastKey() + 1;
      await db.collection(this.collection).add(data);
      return actions_status.SUCCESS;
     
    } catch (error) {
      throw Promise.reject(error);
    }
  }

  async getAll(functionExtended) {
    try {
      
      const db = this.createDatabase();
      const querySnapshot = await db.collection(this.collection).get();
      let data = [];
      querySnapshot.forEach((doc) => {
        let Objectdata = {
          documentId: doc.id
        }
        Objectdata = Object.assign(Objectdata, doc.data());
        data.push(Objectdata);
      });

      if(functionExtended) {
        const runAsyncCallBack = async () => {
          data = await functionExtended(data);
        }
        runAsyncCallBack();  
      }

      return data;
    } catch (error) {
      throw Promise.reject(error);
    }
  }

  async getAllWithRealtime(functionReviceData, functionExtended = false) {
    try {
      const db = this.createDatabase();
      let data = [];
      db.collection(this.collection).onSnapshot((querySnapshot) => {   
        querySnapshot.forEach((doc) => {
          let Objectdata = {
            documentId: doc.id
          }
          Objectdata = Object.assign(Objectdata, doc.data());
          data.push(Objectdata);
        })

        if(functionExtended) {
          const runAsyncCallBack = async () => {
            data = await functionExtended(data);
          }
          runAsyncCallBack();  
        }
        
        functionReviceData(data);

      });
    
    } catch (error) {
      throw Promise.reject(error);
    }
  }

  async getByDocumentId(documentId) {
    try {
      const db = this.createDatabase();
      const docRef = await db.collection(this.collection).doc(documentId);
      const doc = await docRef.get();
      let objectData = {
        documentId: doc.id
      }

      objectData = Object.assign(objectData, doc.data());
      return objectData;

    } catch (error) {
      throw Promise.reject(error);
    }
  }

  async updateByDocumentId(documentId, editData) {
    try {
      const db = this.createDatabase();
      editData.updatedAt = this.moment().format();
      editData.status = status.ACTIVE;

      await db.collection(this.collection).doc(documentId).update(editData);
      return actions_status.SUCCESS;
     
    } catch (error) {
      console.log("Error");
      throw Promise.reject(error);
    }
  }

  async deleteByDocumentId(documentId) {
    try {
      const db = this.createDatabase();
      const deletedData = {
        deletedAt : this.moment().format(),
        status : status.DELETED
      }

      await db.collection(this.collection).doc(documentId).update(deletedData);
      return actions_status.SUCCESS;
    } catch (error) {
      console.log("Error");
      throw Promise.reject(error);
    }
  }
}

export default Model;
