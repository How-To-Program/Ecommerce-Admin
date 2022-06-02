// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5Y5X2SInQBJDIIbRk7n4uZL5CXLUCdkM",
  authDomain: "shop-abecf.firebaseapp.com",
  projectId: "shop-abecf",
  storageBucket: "shop-abecf.appspot.com",
  messagingSenderId: "553066984585",
  appId: "1:553066984585:web:de77c22775f81346a50258"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;