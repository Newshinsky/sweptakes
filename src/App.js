import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from "react-router-dom";

import { setAllMatch, setToken } from './projectSlice';

import NavBar from "./components/navBar/index";
import PredictionPage from './pages/predictionPage/index';
import ResultPage from './pages/resultPage/index';
import StandingPage from './pages/standingPage/index';

import './App.scss';

function App() {
  const dispatch = useDispatch()

  const [userID, setUserID] = useState(localStorage.userID)
  const [isLogin, setIsLogin] = useState(false)

  const onAlertClick = () => {
    localStorage.setItem('userID', userID);
    setIsLogin(true)
  }
  const onInputChange = (e) => {
    setUserID(e.target.value)
  }

  // useEffect(() => {
  //   const getToken = fetch("/login")
  //     .then((res) =>
  //       res.json()
  //     ).then(token => {
  //       return token
  //     })
  //   const setFetchToken = () => {
  //     getToken.then((token) => {
  //       dispatch(setToken(token.data.token))
  //     });
  //   };

  //   const getMatch = fetch("/match")
  //     .then((res) =>
  //       res.json()
  //     ).then(match => {
  //       return match
  //     })
  //   const setFetchMatch = () => {
  //     getMatch.then((match) => {
  //       dispatch(setAllMatch(match.data))
  //     });
  //   };
  //   setFetchToken()
  //   setFetchMatch()
  // }, []); получить матчи

  if (!isLogin && !localStorage.userID) {
    return <div className="App">
      <h1 className="app-h1">Введи свой ID</h1>
      <input
        className="app-input"
        onChange={onInputChange}
        value={userID}
        type="text"
      />
      <button onClick={onAlertClick}
        className="app-button"
      >
        Подтвердить
      </button>
    </div>
  }

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<PredictionPage />} />
        <Route path="/Result" element={<ResultPage />} />
        <Route path="/Standing" element={<StandingPage />} />
      </Routes>
    </div >
  );

}



export default App;
