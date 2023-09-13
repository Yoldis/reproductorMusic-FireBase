
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDAJ_8Pma3M1Ymnb5jP0rTP6M8DzhGmvSQ",
  authDomain: "musicapp-c130e.firebaseapp.com",
  projectId: "musicapp-c130e",
  storageBucket: "musicapp-c130e.appspot.com",
  messagingSenderId: "703512926529",
  appId: "1:703512926529:web:550974b0d4441524f329c0"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(app);
export const FirebaseStorage = getStorage(app);
export const FirebaseDB = getFirestore(app);