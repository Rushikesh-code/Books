import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from "firebase";
import {BrowserRouter} from 'react-router-dom';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgQH4onDjEIhkiohrrMqrhGpNloiyoQN8",
    authDomain: "list-app-test-9d4be.firebaseapp.com",
    projectId: "list-app-test-9d4be",
    storageBucket: "list-app-test-9d4be.appspot.com",
    databaseURL: "https://list-app-test-9d4be-default-rtdb.firebaseio.com",
    messagingSenderId: "990052244808",
    appId: "1:990052244808:web:3398dfc06bcd0a4519277d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    ,
    document.getElementById('root')
);
