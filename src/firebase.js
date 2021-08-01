import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
const firebaseConfig = {
  apiKey: "AIzaSyCNwOoZHeNEP-0SjZf2bVVprqHsb-Fq0Ig",
  authDomain: "kieng-ddb81.firebaseapp.com",
  databaseURL: "https://kieng-ddb81.firebaseio.com",
  projectId: "kieng-ddb81",
  storageBucket: "kieng-ddb81.appspot.com",
  messagingSenderId: "756304258143",
  appId: "1:756304258143:web:7be30d7bb6a0e2a92a27ea",
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const functions = firebase.functions();
