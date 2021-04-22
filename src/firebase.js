import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCFNoDBN__uKmiMHGzRD_uTDqDL080Qr0g",
  authDomain: "atzuma2021.firebaseapp.com",
  databaseURL:
    "https://atzuma2021-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "atzuma2021",
  storageBucket: "atzuma2021.appspot.com",
  messagingSenderId: "344786996213",
  appId: "1:344786996213:web:9559779ad421c947756ebc",
};
const app = firebase.initializeApp(firebaseConfig);
const db = app.database();
export { db };
