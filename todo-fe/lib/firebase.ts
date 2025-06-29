// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbMH0OkURdYImOb94FO8cz-pAfO5sNmE8",
  authDomain: "todo-8cd88.firebaseapp.com",
  projectId: "todo-8cd88",
  storageBucket: "todo-8cd88.firebasestorage.app",
  messagingSenderId: "1007975854254",
  appId: "1:1007975854254:web:aab329f90b7b0b2b543d3f",
  measurementId: "G-5CPLJVLP58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
