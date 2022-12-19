// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhOvme6d1jdD13lqNyVOnCk2LX9B-Ge5Q",
  authDomain: "password-app-963a5.firebaseapp.com",
  projectId: "password-app-963a5",
  storageBucket: "password-app-963a5.appspot.com",
  messagingSenderId: "572213232705",
  appId: "1:572213232705:web:f75148947a0ade439132c0",
  measurementId: "G-DCVJNZ9V01"
};

// Initialize Firebase
let app;
if(firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
}else {
    app = firebase.app();
}

export {firebase};