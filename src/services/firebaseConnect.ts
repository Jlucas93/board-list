import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA43GskibSgtk0fC4vB-2ZSv2C_wcqlw3k",
  authDomain: "board-list-55269.firebaseapp.com",
  projectId: "board-list-55269",
  storageBucket: "board-list-55269.appspot.com",
  messagingSenderId: "980646743743",
  appId: "1:980646743743:web:303053953fdeafc4dec00a"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export { db }