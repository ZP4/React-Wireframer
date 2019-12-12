import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyCQl1Y3gm_nd3D72tGCvsBiS5J7MrXhA1Q",
    authDomain: "wireframeproject-ef810.firebaseapp.com",
    databaseURL: "https://wireframeproject-ef810.firebaseio.com",
    projectId: "wireframeproject-ef810",
    storageBucket: "wireframeproject-ef810.appspot.com",
    messagingSenderId: "492612799429",
    appId: "1:492612799429:web:ea9fa3ae89748b57a859ac",
    measurementId: "G-VEK9F6RMWK"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;