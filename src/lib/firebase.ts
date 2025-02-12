import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA43_J-6ebswWcOF52IYnDJ3Dxw1Zaz4Q0",
    authDomain: "bibliothequenumeriqueucb-b2813.firebaseapp.com",
    projectId: "bibliothequenumeriqueucb-b2813",
    storageBucket: "bibliothequenumeriqueucb-b2813.appspot.com",
    messagingSenderId: "1020815074696",
    appId: "1:1020815074696:web:fa258efeb7f30d85e2463d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de Firestore
const db = getFirestore(app);

// Initialisation de Storage
const storage = getStorage(app);

export { db, storage };