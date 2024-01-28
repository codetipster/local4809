// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqn6GDiqfGhsf9zkOO_ovqKf0IlP3pkMg",
  authDomain: "local4809-eb61b.firebaseapp.com",
  projectId: "local4809-eb61b",
  storageBucket: "local4809-eb61b.appspot.com",
  messagingSenderId: "953207243075",
  appId: "1:953207243075:web:9b6470520205c2db6ceff6",
  measurementId: "G-8YLB7WP6RY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export { app, analytics, storage };