import axios from 'axios';
import { setAllMatch } from '../projectSlice'


export const registerAPI = () => {
    const data = JSON.stringify({
        "name": "Alex ",
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

export const loginAPI = () => {
    const data = JSON.stringify({
        "email": "ck3025@xcoxc.com",
        "password": "28121994",
    });

    axios.post('/api/v1/user/login', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error)
    })
}

export const getAllMatchAPI = () => dispatch => {
    axios.get('/api/v1/match', {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzYyOTQ0ZjZjYWNjMDZmNDhkZDViYWEiLCJpYXQiOjE2NjgzMTc2OTYsImV4cCI6MTY2ODQwNDA5Nn0.EIFHa7ZvUW9c4MVmiYVxlH3ZoJSfOnLSyY6sX-FdGco"}`
        }
    })
        .then((response) => {
            dispatch(setAllMatch(response.data.data))
        }).catch((error) => {
            console.log('object :>> ', error);
        })
}
