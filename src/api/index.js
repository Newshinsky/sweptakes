import axios from 'axios';
import { setAllMatch, setAllMatchError, setToken } from '../projectSlice.js'


export const registerAPI = () => {
    const data = JSON.stringify({
        "name": "Alex",
        "email": "ck3025@xcoxc.com",
        "password": "28121994",
        "passwordConfirm": "28121994"
    });
    axios.post('/api/v1/user', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
}

export const loginAPI = () => dispatch => {
    const data = JSON.stringify({
        "email": "ck3025@xcoxc.com",
        "password": "28121994",
    });

    axios.post('/api/v1/user/login', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        dispatch(setToken(response.data.data.token))
    }).catch((error) => {
        console.log(error)
    })
}

export const getAllMatchAPI = (token) => dispatch => {

    axios.get('/api/v1/match', {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
        .then((response) => {
            dispatch(setAllMatch(response.data.data))
        }).catch((error) => {
            dispatch(setAllMatchError(error.response.status))
            console.log('error :>> ', error.response.status);
        })
}
