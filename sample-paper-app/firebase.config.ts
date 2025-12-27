import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6N898BktHcgaVVfKoFPcvBxlJm9uXdIQ",
  authDomain: "sample-paper-app-0.firebaseapp.com",
  projectId: "sample-paper-app-0",
  storageBucket: "sample-paper-app-0.firebasestorage.app",
  messagingSenderId: "125392778903",
  appId: "1:125392778903:web:dfac3d2617d1414b0cdbd2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage(app);

const timestamp = Timestamp;

export { db, auth, timestamp, storage }