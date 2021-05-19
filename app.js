const express = require('express')
const request = require('request');
const bodyParser = require('body-parser')
const {CHANNEL_SECRET,CHANNEL_ACCESS_TOKEN} = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.get('/',(request,response)=>{
    response.send('App is running...');
})
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{console.log(`app is running on port:${PORT}`)})

