import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyCi10HFbqbTiXHxuh4UIQzcJ-RaVa1BQ_4",
    authDomain: "nextjs-todolist-2a60b.firebaseapp.com",
    projectId: "nextjs-todolist-2a60b",
    storageBucket: "nextjs-todolist-2a60b.appspot.com",
    messagingSenderId: "299855778697",
    appId: "1:299855778697:web:c66e94c2690c920ba3c758"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);