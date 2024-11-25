import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCS9_4et7hgwShiLff9rJwlLXzGGvrlGg4",
  authDomain: "chatoop-hb7.firebaseapp.com",
  projectId: "chatoop-hb7",
  storageBucket: "chatoop-hb7.firebasestorage.app",
  messagingSenderId: "61047583938",
  appId: "1:61047583938:web:80ccea38af19f011b3775b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleAuth = new GoogleAuthProvider()

export const db = getFirestore(app)

export const usersRef = collection(db,'users') 
export const postsRef = collection(db,'posts')