import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Provider } from 'react-redux'
import { BrowserRouter } from "react-router-dom"

const firebaseConfig = {
  apiKey: "AIzaSyAj_z4uNCAb8O6Vqmih-Fbs_Mm0cm2ZeYY",
  authDomain: "sweeptakes-28.firebaseapp.com",
  databaseURL: "https://sweeptakes-28-default-rtdb.firebaseio.com",
  projectId: "sweeptakes-28",
  storageBucket: "sweeptakes-28.appspot.com",
  messagingSenderId: "903090746477",
  appId: "1:903090746477:web:8d637ee0d9c5f74ee4fb64"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export { db };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
