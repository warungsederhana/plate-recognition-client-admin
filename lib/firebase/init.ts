import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZ-lrXiBcEdMnZhd4HV6Xu282ZxWAl9Bo",
  authDomain: "plate-recognition-5d6a9.firebaseapp.com",
  projectId: "plate-recognition-5d6a9",
  storageBucket: "plate-recognition-5d6a9.appspot.com",
  messagingSenderId: "1038821256245",
  appId: "1:1038821256245:web:445c975fa1c8785a37557c",
  measurementId: "G-26YDHXH7JB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
