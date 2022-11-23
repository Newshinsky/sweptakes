import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllFirebasePrediction } from '../../projectSlice';
import './index.scss';

const ResultPage = () => {

    const dispatch = useDispatch()
    const allMatch = useSelector(state => state.soccerScore.allMatch)
    const allPredictions = useSelector(state => state.soccerScore.allPredictions)

    const allFinishedMatches = allMatch.filter(e => e.time_elapsed !== "notstarted").sort((a, b) =>
        new Date(b.local_date).getTime() - new Date(a.local_date).getTime()
)
    let allPredicionInArray = []

    const result = []

    if (!!allPredictions) {
        Object.keys(allPredictions).forEach(elem => allPredicionInArray.push(allPredictions[elem]))
        allPredicionInArray = allPredicionInArray.flat(Infinity)
    }

    useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, "/")).then((snapshot) => {
            dispatch(setAllFirebasePrediction(snapshot.val()))
        })
    }, [])

    const countVotes = () => {
        let allPredicionInArrayCopy = [...allPredicionInArray]
        for (let i = 0; i < allFinishedMatches.length; i++) {
            let matchPoints
            const oneMatch = allFinishedMatches[i]
            if (oneMatch["type"] === "group") {
                matchPoints = 100
            } else {
                matchPoints = 200
            }
            allPredicionInArrayCopy = allPredicionInArray.filter(e => e._id === oneMatch._id)
            let match = allPredicionInArrayCopy.map(e => {
                if (e.away_score == oneMatch.away_score && e.home_score == oneMatch.home_score) {
                    return e = { ...e, score: 3 }
                } else if (e.away_score - e.home_score == oneMatch.away_score - oneMatch.home_score) {
                    return e = { ...e, score: 2 }
                } else if (
                    (e.away_score - e.home_score > 0 && oneMatch.away_score - oneMatch.home_score > 0) ||
                    (e.away_score - e.home_score < 0 && oneMatch.away_score - oneMatch.home_score < 0) ||
                    (e.away_score - e.home_score == 0 && oneMatch.away_score - oneMatch.home_score == 0)
                ) {
                    return e = { ...e, score: 1 }
                } else {
                    return e = { ...e, score: 0 }
                }
            })
            const totalScore = match.reduce((s, i) => s = s + i.score, 0)
            const scoringPointData = match.map(e => {
                return { ...e, totalScore: isNaN(matchPoints / totalScore * e.score) ? 0 : matchPoints / totalScore * e.score }
            })
            const finalData = { scoringPointData: scoringPointData, match: oneMatch }
            result.push(finalData)
        }
    }
    countVotes()

    return (
        <div className="result-page-wrapper">
            {result.map(match => {
                return (
                    <div className="result-page-match" key={match._id}>
                        <div className="result-page-match-info">
                            <div className="result-page-match-finished-info">
                                <img src={match.match.home_flag} alt="home flag" />
                                <h1> {match.match.home_score}</h1>
                                <h1> : </h1>
                                <h1> {match.match.away_score}</h1>
                                <img src={match.match.away_flag} alt="away flag" />
                            </div>
                            <h1 className="result-page-match-type"> {match.match.type}</h1>
                        </div>

                        <div className="result-page-match-pred-wrapper">
                            {match.scoringPointData.map(pred => {
                                return (
                                    <div className="result-page-match-pred" key={pred._id + pred.userID}>
                                        <div className="player">
                                            <h6> Игрок</h6>
                                            <h3> {pred.userID}</h3>
                                        </div>
                                        <div className="match">
                                            <div className="match-label">
                                                <h6> Прогноз </h6>
                                            </div>
                                            <div className="match-info">
                                                <h2> {pred.home_score}</h2>
                                                <h2> :</h2>
                                                <h2> {pred.away_score}</h2>
                                            </div>
                                        </div>
                                        <div className="score">
                                            <h6> Очки</h6>
                                            <h2> {pred.score}</h2>
                                        </div>
                                        <div className="totalScore">
                                            <h6> Набранные баллы</h6>
                                            <h2>  {Math.round(pred.totalScore)}</h2>

                                        </div>

                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div >
    );
};

export default ResultPage;