// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCw7QOW7xX_qzBIIpAMXnis8lliujMKcK8",
  authDomain: "plastic-wise.firebaseapp.com",
  projectId: "plastic-wise",
  storageBucket: "plastic-wise.firebasestorage.app",
  messagingSenderId: "358810222586",
  appId: "1:358810222586:web:baac04e43885952adfee43",
  measurementId: "G-9XH17C474E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
