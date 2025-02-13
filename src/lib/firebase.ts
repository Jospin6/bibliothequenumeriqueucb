import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAYIxZkfF2LASP3FYhocElT59ujW_0TrpY",
    authDomain: "bibliothequenumeriqueucb-369f6.firebaseapp.com",
    projectId: "bibliothequenumeriqueucb-369f6",
    storageBucket: "bibliothequenumeriqueucb-369f6.firebasestorage.app",
    messagingSenderId: "120475997005",
    appId: "1:120475997005:web:1b405d9d7c4fde60bbdd04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de Firestore
const db = getFirestore(app);

// Initialisation de Storage
const storage = getStorage(app);

export { db, storage };