// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhWL-Ra2sa-7D1BWBFgHhIzBbUYXA8WZM",
  authDomain: "int305-fb.firebaseapp.com",
  projectId: "int305-fb",
  storageBucket: "int305-fb.firebasestorage.app",
  messagingSenderId: "88888131151",
  appId: "1:88888131151:web:bd7d3e00b1ad864c9a743a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db  = getFirestore(app)
export default db; 
