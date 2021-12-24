// v9 compat packages are API compatible with v8 code
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAq2NVc1-093bFJ4F_m9bjTmYRg9KqFGbU",
  authDomain: "chat-app-school-42186.firebaseapp.com",
  projectId: "chat-app-school-42186",
  storageBucket: "chat-app-school-42186.appspot.com",
  messagingSenderId: "205448579853",
  appId: "1:205448579853:web:066d0d2e21bcda75237e44",
  measurementId: "G-2MGQXCEH2M",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
