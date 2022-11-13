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
            ), ([userID, totalScore]) => ({ userID, totalScore })).map(e => {
                return (
                    <div className="standing-page-info" key={e.userID + e.totalScore}>
                        <h1>{e.userID}    </h1>
                        <h1>{Math.round(e.totalScore)} points </h1>
                    </div>
                )
            })}

        </div >
    );
};

export default StandingPage;