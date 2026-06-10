import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBq83qdJ-oVV7mmShS59LxUWSyvrM13Xqc",
  authDomain: "wiora-86788.firebaseapp.com",
  projectId: "wiora-86788",
  storageBucket: "wiora-86788.appspot.com",
  messagingSenderId: "1054570249585",
  appId: "1:1054570249585:web:b9eaea721c1bf12d46cad0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);