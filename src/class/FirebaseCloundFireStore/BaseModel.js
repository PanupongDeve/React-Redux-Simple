import FirebaseHelper from "../FirebaseHelper";
import moment from "moment";


class BaseModel {
  constructor(collection) {
    this.firebase = FirebaseHelper.getFirebase();
    this.moment = moment;
    this.collection = collection;
  
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
      data.status = 'ACTIVE';
      data.id = await this.getLastKey() + 1;
      await db.collection(this.collection).add(data);
      return 'SUCCESS';
     
    } catch (error) {
      throw Promise.reject(error);
    }
  }

  async getAll(extend=false) {
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

      data = extend ? await this.inCludeOptionalFields(data) : data;

      // if(extend) {
      //   const runAsyncCallBack = async () => {
      //     data = await functionExtended(data);
      //   }
      //   runAsyncCallBack();  
      // }

      return data;
    } catch (error) {
      throw Promise.reject(error);
    }
  }

  async getAllWithRealtime(functionReviceData, extend=false) {
    try {
      const db = this.createDatabase();
      let data = [];
      db.collection(this.collection).onSnapshot(async (querySnapshot) => {   
        querySnapshot.forEach((doc) => {
          let Objectdata = {
            documentId: doc.id
          }
          Objectdata = Object.assign(Objectdata, doc.data());
          data.push(Objectdata);
        })
        data = extend ? await this.inCludeOptionalFields(data) : data;
        // if(functionExtended) {
        //   const runAsyncCallBack = async () => {
        //     data = await functionExtended(data);
        //   }
        //   runAsyncCallBack();  
        // }
        
        functionReviceData(data);

      });
    
    } catch (error) {
      throw Promise.reject(error);
    }
  }

  async getByDocumentId(documentId, extend=false) {
    try {
      const db = this.createDatabase();
      const docRef = await db.collection(this.collection).doc(documentId);
      const doc = await docRef.get();
      let objectData = {
        documentId: doc.id
      }

      objectData = Object.assign(objectData, doc.data());
      objectData = extend ? await this.inCludeOptionalField(objectData) : objectData;
      return objectData;

    } catch (error) {
      throw Promise.reject(error);
    }
  }

  async updateByDocumentId(documentId, editData) {
    try {
      const db = this.createDatabase();
      editData.updatedAt = this.moment().format();
      editData.status = 'ACTIVE';

      await db.collection(this.collection).doc(documentId).update(editData);
      return 'SUCCESS';
     
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
        status : 'DELETED'
      }

      await db.collection(this.collection).doc(documentId).update(deletedData);
      return 'SUCCESS';
    } catch (error) {
      console.log("Error");
      throw Promise.reject(error);
    }
  }
}

export default BaseModel;
