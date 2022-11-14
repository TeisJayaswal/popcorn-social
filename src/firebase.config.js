/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore/lite";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaxp_xAZAlE-hFFkdc-aeowFESqTKgxPc",
  authDomain: "popcorn-c36ca.firebaseapp.com",
  projectId: "popcorn-c36ca",
  storageBucket: "popcorn-c36ca.appspot.com",
  messagingSenderId: "926862448107",
  appId: "1:926862448107:web:732a700a3760d5752d75ae",
  measurementId: "G-95X0HJWPSN",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const db = firebaseApp.firestore();

export default db;
