// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB30jHsLQi0kWx4iYHequAkWCAkoVdVMr8",
  authDomain: "busy-buy-1-ed3eb.firebaseapp.com",
  projectId: "busy-buy-1-ed3eb",
  storageBucket: "busy-buy-1-ed3eb.appspot.com",
  messagingSenderId: "968085057809",
  appId: "1:968085057809:web:c9646b1822653119231cb0",
  measurementId: "G-B4T7HQDGPQ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);



  



