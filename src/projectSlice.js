import { createSlice } from '@reduxjs/toolkit'

export const soccerScore = createSlice({
    name: 'soccerScore',
    initialState: {
        allMatch: [],
        firebasePrediction: [],
        allPredictions: [],
        allMatchErrorStatus: null,
        token: null
    },
    reducers: {
        setAllMatch: (state, action) => {
            state.allMatch = action.payload
        },
        setFirebasePrediction: (state, action) => {
            state.firebasePrediction = action.payload
        },
        setAllFirebasePrediction: (state, action) => {
            state.allPredictions = action.payload
        },
        setAllMatchError: (state, action) => {
            state.allMatchErrorStatus = action.payload
        },
        setToken: (state, action) => {
            state.token = action.payload
        },
    }
})

export const { setAllMatch, setFirebasePrediction, setAllFirebasePrediction, setMatch, setAllMatchError, setToken } = soccerScore.actions

export default soccerScore.reducer