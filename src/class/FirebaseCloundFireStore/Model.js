import FirebaseHelper from "../FirebaseHelper";
import moment from "moment";
import status from '../../enums/status';

const { ACTIVE, DELETED } = status;

class Model {
  constructor() {
    this.firebase = FirebaseHelper.getFirebase();
    this.moment = moment;
    this.ACTIVE = ACTIVE;
    this.DELETED = DELETED;
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
      data.createAt = this.moment().format();
      data.updateAt = this.moment().format();
      data.status = this.ACTIVE;
      data.id = await this.getLastKey() + 1;
      const docRef = await db.collection(this.collection).add(data);
     
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const db = this.createDatabase();
      
      db.collection(this.collection).onSnapshot((querySnapshot) => {
        let data = [];
        querySnapshot.forEach((doc) => {
          let Objectdata = {
            documentId: doc.id
          }
          Objectdata = Object.assign(Objectdata, doc.data());
          data.push(Objectdata);
          //to save with dispatch
        })
        console.log(data);
      });
    
    } catch (error) {
      throw error;
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
      throw error;
    }
  }




  async patch(url, newData) {
    try {
      const db = this.createDatabase();
      const oldData = await this.get(url);
      if (oldData.status === this.DELETED) {
        throw "undefind";
      }
      const data = Object.assign({}, oldData, newData);
      data.updateAt = this.moment().format();
      data.status = this.ACTIVE;

      return true;
    } catch (error) {
      console.log("Error");
      throw error;
    }
  }

  async delete(url) {
    try {
      const db = this.createDatabase();
      let oldData = await this.get(url);
      if (oldData.status === this.DELETED) {
        throw "undefind";
      }
      oldData.status = this.DELETED;
      oldData.deletedAt = this.moment().format();
    } catch (error) {
      console.log("Error");
      throw error;
    }
  }
}

export default Model;
