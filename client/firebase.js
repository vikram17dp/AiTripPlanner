import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernauth-92272.firebaseapp.com",
  projectId: "mernauth-92272",
  storageBucket: "mernauth-92272.appspot.com",
  messagingSenderId: "348242080345",
  appId: "1:348242080345:web:5c7e4ac465a047258b7748"
};

export const app = initializeApp(firebaseConfig);