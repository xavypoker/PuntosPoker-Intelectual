import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };