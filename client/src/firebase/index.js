import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCRNiOTETug4mIa5ib4U5zOWZvh7twqPgs",
    authDomain: "inventory-2897b.firebaseapp.com",
    projectId: "inventory-2897b",
    storageBucket: "inventory-2897b.appspot.com",
    messagingSenderId: "359584693941",
    appId: "1:359584693941:web:415ad04c9208c8722048fc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
