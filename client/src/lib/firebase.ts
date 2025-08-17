import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAamEKTMNgJmxj9zFVtidv0DlsPZfiHM70",
  authDomain: "jashanfilms-13995.firebaseapp.com",
  projectId: "jashanfilms-13995",
  storageBucket: "jashanfilms-13995.firebasestorage.app",
  messagingSenderId: "298367387254",
  appId: "1:298367387254:web:d600879bbfe45ac37a0157",
  measurementId: "G-ML78ZXTH4T"
};

console.log("Initializing Firebase with config:", {
  ...firebaseConfig,
  apiKey: "***" // Hide API key in logs
});

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

console.log("Firebase initialized successfully");