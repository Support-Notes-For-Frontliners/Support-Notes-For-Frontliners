
require('dotenv').config();


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_URL,
    projectId: "support-notes-for-frontliners",
    storageBucket: process.env.REACT_APP_FIREBASE_BUCKET ,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID ,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };

  export default firebaseConfig;