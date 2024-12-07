import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "aitripplanner-eb1b6.firebaseapp.com",
  projectId: "aitripplanner-eb1b6",
  storageBucket: "aitripplanner-eb1b6.appspot.com",
  messagingSenderId: "1078269613713",
  appId: "1:1078269613713:web:b90b6ad48285ef6527d130"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
