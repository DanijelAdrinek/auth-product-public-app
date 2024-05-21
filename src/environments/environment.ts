// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyC0bydiWKiShqhr7dNpg8W9-gCk__pGaa4",

  authDomain: "angular-auth-product-app.firebaseapp.com",

  projectId: "angular-auth-product-app",

  storageBucket: "angular-auth-product-app.appspot.com",

  messagingSenderId: "982643213649",

  appId: "1:982643213649:web:6c9a33956a090411683f70",

  measurementId: "G-J9ZWL4R8E7"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);