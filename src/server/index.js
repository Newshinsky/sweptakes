const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const store = require("store2")

const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.get('/login', async (req, res) => {

  console.log('login request');
  const loginRes = await axios.post('http://api.cup2022.ir/api/v1/user/login', {
    "email": "ck3025@xcoxc.com",
    "password": "28121994",
  })

  console.log(loginRes.data);
  res.send(loginRes.data);
  store.set('token', loginRes.data.data.token);
});

app.get('/match', async (req, res) => {

  console.log('match request');
  const token = store.get('token')

  const gameRes = await axios.get('http://api.cup2022.ir/api/v1/match', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  console.log(gameRes.data);
  res.send(gameRes.data);


});


app.listen(port, () => console.log('listening on port', port));