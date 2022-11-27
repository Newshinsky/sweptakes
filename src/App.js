import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from "react-router-dom";

import { getAllMatchAPI, loginAPI } from "./api/index"

import { setToken, setAllMatch } from './projectSlice'

import NavBar from "./components/navBar/index";
import PredictionPage from './pages/predictionPage/index';
import ResultPage from './pages/resultPage/index';
import StandingPage from './pages/standingPage/index';
import Loader from './components/loader/index'

import './App.scss';

function App() {
  const dispatch = useDispatch()

  const [userID, setUserID] = useState(localStorage.userID)
  const [isLogin, setIsLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const errorStatus = useSelector(state => state.soccerScore.allMatchErrorStatus)
  const allMatch = useSelector(state => state.soccerScore.allMatch)

  const onAlertClick = () => {
    localStorage.setItem('userID', userID);
    setIsLogin(true)
  }
  const onInputChange = (e) => {
    setUserID(e.target.value)
  }

  useEffect(() => {
    const getToken = fetch("/login")
      .then((res) =>
        res.json()
      ).then(token => {
        return token
      })
    const setFetchToken = () => {
      getToken.then((token) => {
        dispatch(setToken(token.data.token))
      });
    };

    const getMatch = fetch("/match")
      .then((res) =>
        res.json()
      ).then(match => {
        return match
      })
    const setFetchMatch = () => {
      getMatch.then((match) => {
        dispatch(setAllMatch(match.data))
      });
    };
    setFetchToken()
    setFetchMatch()
    setIsLoading(false)
  }, []);


  if (isLoading) {
    return <Loader />
  }

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
      {/* {(errorStatus === 429
        ? <h1 className="App-error-message">  Превышено количество запросов, попробуй через 5 минут</h1>
        : null)}
      {(errorStatus === 401
        ? <>
          <h1 className="App-error-message"> Тыкни и жди </h1>
          <button
            className="App-error-button"
            onClick={onLoginButtonClick}>
            Получить данные
          </button>
        </>
        : null)
      } */}
    </div >
  );

}



export default App;
