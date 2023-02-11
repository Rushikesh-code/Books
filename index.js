import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import Sign from './sign';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAI9OKWvrQUnMMhlSOOIJB37t9F_ZqA8j8",
    authDomain: "triangle-3dbd4.firebaseapp.com",
    projectId: "triangle-3dbd4",
    storageBucket: "triangle-3dbd4.appspot.com",
    messagingSenderId: "445124115817",
    appId: "1:445124115817:web:2d4bc1473ec3c15b3b91f8",
    measurementId: "G-SXNBDTLYYD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const authSub =()=> firebase.auth().onAuthStateChanged((user) => {
    if(user)
    {
        ReactDOM.render(<App user={user}/>, document.getElementById('root'))
    }
   else {
        ReactDOM.render(
            <Sign/>,
            document.getElementById('root')
        );
    }})
authSub();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
