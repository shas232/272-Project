// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Firebase configuration (replace these values with your actual Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyD9RUtW8AE3U2cC0YIcYUrZ2j8R0KV5z5o",
  authDomain: "project-c09ee.firebaseapp.com",
  projectId: "project-c09ee",
  storageBucket: "project-c09ee.appspot.com",
  messagingSenderId: "111220600092",
  appId: "1:111220600092:web:429dc6258870330ac3ded9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
