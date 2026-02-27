import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
   apiKey: "AIzaSyCDpYWf2LrX0EsZeyUp_svDUbxVsWfKlOw",
  authDomain: "marwan-site.firebaseapp.com",
  databaseURL: "https://marwan-site-default-rtdb.firebaseio.com",
  projectId: "marwan-site",
  storageBucket: "marwan-site.firebasestorage.app",
  messagingSenderId: "512067015820",
  appId: "1:512067015820:web:ecf1ad2e3bfc0799d057a9",
  measurementId: "G-3PBJLDEZHM"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);