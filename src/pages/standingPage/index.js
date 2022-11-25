import { child, get, getDatabase, ref } from "firebase/database";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAllFirebasePrediction } from '../../projectSlice';
import './index.scss';

const StandingPage = () => {

    const dispatch = useDispatch()
    const allMatch = useSelector(state => state.soccerScore.allMatch)
    const allPredictions = useSelector(state => state.soccerScore.allPredictions)
    const allFinishedMatches = allMatch.filter(e => e.finished === "TRUE")
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
            const oneMatch = allFinishedMatches[i]
            let matchPoints
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
            match.map(e => {
                return result.push({
                    userID: e.userID, totalScore: isNaN(matchPoints / totalScore * e.score) ? 0 : matchPoints / totalScore * e.score
                })
            })

        }

    }
    countVotes()

    return (
        <div className="standing-page-wrapper">
            {Array.from(result.reduce(
                (m, { userID, totalScore }) => m.set(userID, (m.get(userID) || 0) + totalScore), new Map
            ), ([userID, totalScore]) => ({ userID, totalScore })).sort((a, b) => b.totalScore - a.totalScore).map(e => {
                return (
                    <div className="standing-page-info" key={e.userID + e.totalScore}>
                        {e.userID === "Андрей" ?
                            <div className="standing-page-info-item">
                                <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Uruguay.svg/125px-Flag_of_Uruguay.svg.png"} alt="flag" />
                                <h1> {e.userID}    </h1>
                            </div> : null}
                        {e.userID === "Цыганский барон" ?
                            <div className="standing-page-info-item">
                                <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Portugal.svg/125px-Flag_of_Portugal.svg.png"} alt="flag" />
                                <h1> {e.userID}    </h1>
                            </div> : null}
                        {e.userID === "Анджей Дуда" ?
                            <div className="standing-page-info-item">
                                <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/125px-Flag_of_Brazil.svg.png"} alt="flag" />
                                <h1> {e.userID}    </h1>
                            </div> : null}
                        {e.userID === "Молодой Чингиз" ?
                            <div className="standing-page-info-item">
                                <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/125px-Flag_of_Brazil.svg.png"} alt="flag" />
                                <h1> {e.userID}    </h1>
                            </div> : null}
                        {e.userID === "Павлик" ?
                            <div className="standing-page-info-item"> 
                                <img src={"https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/125px-Flag_of_England.svg.png"} alt="flag" />
                                <h1> {e.userID}    </h1>
                            </div> : null}
                        <h1>{Math.round(e.totalScore)} points </h1>
                    </div>
                )
            })}

        </div >
    );
};

export default StandingPage;