import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDsUT7h7My9lnm7tvyN75Tu11PDuAuBrjE",
    authDomain: "ibportfolio.firebaseapp.com",
    projectId: "ibportfolio",
    storageBucket: "ibportfolio.firebasestorage.app",
    messagingSenderId: "191750299548",
    appId: "1:191750299548:web:08e51a1287d090b9b33259",
    measurementId: "G-KVYKV7PT85"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);