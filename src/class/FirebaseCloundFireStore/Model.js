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

  async post(collection, data) {
    try {
      const db = this.createDatabase();
      data.createAt = this.moment().format();
      data.updateAt = this.moment().format();
      data.status = this.ACTIVE;
      const docRef = await db.collection(collection).add(data);
     
    } catch (error) {
      throw error;
    }
  }

  async get(url) {
    try {
      const db = this.createDatabase();
      db.collection(url).onSnapshot((querySnapshot) => {
        let data = []
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        })
        console.log(data);
      });
    
    } catch (error) {
      throw error;
    }
  }

  async socket(url, reciveDataFunction) {
    try {
      const db = this.createDatabase();
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
