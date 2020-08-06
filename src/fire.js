import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import "firebase/analytics";
import 'firebase/functions';
import * as firebaseui from 'firebaseui';

const firebaseConfig = {
    apiKey: "AIzaSyCTAFh-1QD0Ak4fBL5lLDXWBuPIeQchyPU",
    authDomain: "class-roll.firebaseapp.com",
    databaseURL: "https://class-roll.firebaseio.com",
    projectId: "class-roll",
    storageBucket: "class-roll.appspot.com",
    messagingSenderId: "707418309412",
    appId: "1:707418309412:web:4e5b153d1d80ddfb2269b1",
    measurementId: "G-T120Y4BDEY"
};

firebase.initializeApp(firebaseConfig);
if (process.env.NODE_ENV === 'development') {
    firebase.functions().useFunctionsEmulator('http://localhost:5001');
}
export const ui = new firebaseui.auth.AuthUI(firebase.auth());

// export const google = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();
export const auth = firebase.auth();
export const deadAuth = firebase.auth;
export const storage = firebase.storage();
export const functions = firebase.functions();