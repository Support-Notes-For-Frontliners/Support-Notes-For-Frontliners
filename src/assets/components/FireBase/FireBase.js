import app from "firebase/app";
import 'firebase/database';
import 'firebase/auth';

//init firebase
require('dotenv').config()


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API,
  authDomain: process.env.REACT_APP_DOM,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId:  process.env.REACT_APP_ID,
  storageBucket:  process.env.REACT_APP_BUCKET,
  messagingSenderId:  process.env.REACT_APP_SENDER,
  appId:  process.env.REACT_APP_APP_ID,
  measurementId:  process.env.REACT_APP_MEASUREMENT
};

class FireBase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.db = app.database();
        this.auth = app.auth();
    }
}

export default FireBase;