import firebase from "firebase";
// import "firebase/auth";
// import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCo0M6t23lPZEpOGvqbnVmgkAb3EiFmI88",
  authDomain: "webloginsystem.firebaseapp.com",
  projectId: "webloginsystem",
  storageBucket: "webloginsystem.appspot.com",
  messagingSenderId: "832086828596",
  appId: "1:832086828596:web:f0928022e9862be6790c61",
  measurementId: "G-1PJFN4D7CC",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, db, timeStamp, googleProvider };
