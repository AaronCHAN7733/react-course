import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDT8004qsWMJA_i4JPDyq3FppIaY8udfvg",
  authDomain: "reactjs-8535f.firebaseapp.com",
  projectId: "reactjs-8535f",
  storageBucket: "reactjs-8535f.appspot.com",
  messagingSenderId: "1061620234875",
  appId: "1:1061620234875:web:f42629a8327dbfbe68c0de"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // Initialize Firestore
