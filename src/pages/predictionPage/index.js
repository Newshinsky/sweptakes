import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { child, get, getDatabase, ref, set } from "firebase/database";
import useInput from '../../hooks/useInput';
import { setAllMatch, setFirebasePrediction } from '../../projectSlice';

import img from "../../img/img.png"

import Loader from '../../components/loader/index'

import './index.scss';
const dateNow = new Date().toISOString();

const PredictionPage = () => {
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(true)

    const homeScore = useInput("");
    const awayScore = useInput("");
    const allMatch = useSelector(state => state.soccerScore.allMatch)
    const firebasePrediction = useSelector(state => state.soccerScore.firebasePrediction)

    const onSubmitClick = async (userID, match) => {
        const predictionMatch = {
            _id: match._id,
            away_score: awayScore.value[match._id + match.away_team_en],
            away_team_en: match.away_team_en,
            home_score: homeScore.value[match._id + match.home_team_en],
            home_team_en: match.home_team_en,
            userID: localStorage.userID
        }
        const db = getDatabase();
        const dbRef = ref(getDatabase());
        await get(child(dbRef, userID)).then((snapshot) => {
            if (snapshot.exists()) {
                set(ref(db, userID), [...snapshot.val(), predictionMatch])
            } else {
                set(ref(db, userID), [predictionMatch]);
            }
        })
        await get(child(dbRef, localStorage.userID)).then((snapshot) => {
            dispatch(setFirebasePrediction(snapshot.val()))
        })
    }

    useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, localStorage.userID)).then((snapshot) => {
            dispatch(setFirebasePrediction(snapshot.val()))
            setIsLoading(false)
        })

    }, [])

    useEffect(() => {
        const updatedAllMatch = [...allMatch].map((e) => {
            if (dateNow >= new Date(`${e.local_date} GMT+03:00`).toISOString()) {
                return { ...e, finished: "TRUE", time_elapsed: "finished" };
            }
            return e;
        });
        dispatch(setAllMatch(updatedAllMatch))
    }, [])

    const allMatchSort = [...allMatch].sort((a, b) =>
        new Date(a.local_date).getTime() - new Date(b.local_date).getTime()
    )
        .filter((e) => e.finished !== "TRUE");

    if (isLoading) {
        return <Loader />
    }
    return (
        <div className="prediction-page-wrapper">
            {allMatchSort.map((e) => {

                const isPredictionMade = firebasePrediction?.find(elem => e._id === elem._id)

                return (
                    <div className="match-info-wrapper" key={e._id + e.userID}>
                        <div className="prediction-match-item-wrapper">

                            <div className="home-team-wrapper">
                                <p> {e.home_team_en}</p>
                                <img src={!!e.home_flag ? e.home_flag : img} alt="home flag" />
                                {e.time_elapsed === "notstarted"
                                    ?
                                    <input
                                        id={e._id + e.home_team_en}
                                        maxLength="1"
                                        type="text"
                                        onChange={(event) => {
                                            homeScore.onChange(event, e._id + e.home_team_en)
                                        }}
                                        inputMode="tel"
                                        value={
                                            isPredictionMade
                                                ? isPredictionMade.home_score
                                                : homeScore.value[e._id + e.home_team_en]}
                                        disabled={isPredictionMade}
                                    />
                                    : <h1>{e.home_score}</h1>
                                }
                            </div>
                            <p className="colon"> :</p>
                            <div className="away-team-wrapper">
                                {e.time_elapsed === "notstarted"
                                    ? <input
                                        id={e._id + e.away_team_en}
                                        maxLength="1"
                                        type="text"
                                        onChange={(event) => {
                                            awayScore.onChange(event, e._id + e.away_team_en)
                                        }}
                                        inputMode="tel"
                                        value={
                                            isPredictionMade
                                                ? isPredictionMade.away_score
                                                : awayScore.value[e._id + e.away_team_en]
                                        }
                                        disabled={isPredictionMade}
                                    />
                                    : <h1>{e.away_score}</h1>
                                }
                                <img src={!!e.away_flag ? e.away_flag : img} alt="home flag" />
                                <p> {e.away_team_en}</p>
                            </div>
                        </div>
                        <div className="match-info-type">
                            <h1>{e.type} </h1>
                            <h1> {e.local_date}</h1>
                        </div>
                        {e.time_elapsed === "notstarted"
                            ? <button
                                className="submit-button"
                                onClick={() => onSubmitClick(localStorage.userID, e)}
                                disabled={isPredictionMade}
                            > {isPredictionMade ? "?????????????? ????????????" : "??????????????????????"} </button>
                            : <h2 className="finish-match"> ???????? ?? ???????????????? ?????? ???????????????? </h2>}

                    </div>
                )
            })}
        </div >
    );
}


export default PredictionPage;