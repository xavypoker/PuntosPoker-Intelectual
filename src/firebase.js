// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBMVItjsBOCIEaT2v_xzuKBim_tAdARbU",
  authDomain: "poker-intelectual.firebaseapp.com",
  databaseURL: "https://poker-intelectual-default-rtdb.firebaseio.com",
  projectId: "poker-intelectual",
  storageBucket: "poker-intelectual.firebasestorage.app",
  messagingSenderId: "96573926927",
  appId: "1:96573926927:web:ccf861f25305145cf2fd7a",
  measurementId: "G-XJ52LR2ZGR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);