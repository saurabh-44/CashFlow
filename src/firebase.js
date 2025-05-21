import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRde8R3_EQY4K1H4CfFOTnAsD7U5Z2mco",
  authDomain: "cashflow-92911.firebaseapp.com",
  projectId: "cashflow-92911",
  storageBucket: "cashflow-92911.firebasestorage.app",
  messagingSenderId: "393109652345",
  appId: "1:393109652345:web:357d69b480be4b3f7d65a8",
  measurementId: "G-N5PQFJHKZ4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
