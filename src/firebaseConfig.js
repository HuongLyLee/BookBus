import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5B2I5OVw0yqfeNip-8Z916DDb1jZFw8w",
  authDomain: "book-bus-937de.firebaseapp.com",
  projectId: "book-bus-937de",
  storageBucket: "book-bus-937de.appspot.com",
  messagingSenderId: "1082428237032",
  appId: "1:1082428237032:web:eea9f652752c5d8dda955d",
  measurementId: "G-96W4GSF1N8"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
