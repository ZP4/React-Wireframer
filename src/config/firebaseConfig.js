import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyAUHaEIUHWrq8C0Uc2uopc2FGz3_ipi_Jk",
    authDomain: "cse316finalproject-6da0b.firebaseapp.com",
    databaseURL: "https://cse316finalproject-6da0b.firebaseio.com",
    projectId: "cse316finalproject-6da0b",
    storageBucket: "cse316finalproject-6da0b.appspot.com",
    messagingSenderId: "1002398966076",
    appId: "1:1002398966076:web:9f7f9a15e7d548a341be39",
    measurementId: "G-5Z3MD2LF7L"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;