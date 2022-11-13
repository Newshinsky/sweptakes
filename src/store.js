import { configureStore } from '@reduxjs/toolkit'
import soccerReducer from './projectSlice'

export default configureStore({
    reducer: {
        soccerScore: soccerReducer
    }
})