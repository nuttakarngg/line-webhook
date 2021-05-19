const express = require('express')
const request = require('request');
const bodyParser = require('body-parser')
const {CHANNEL_SECRET,CHANNEL_ACCESS_TOKEN} = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))
app.get('/',(request,response)=>{
    response.send('App is running...');
})
app.post('/webhook',(request,response)=>{
    if(request.body.events.length > 0){
        let replyToken = request.body.events[0].replyToken;
        let msg = request.body.events[0].message.text;
        
        console.log(`Message token : ${ replyToken }`);
        console.log(`Message from chat : ${ msg }`);
    
    }
    response.json({
        status: 200,
        message: `Webhook is working!`
    });
})
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{console.log(`app is running on port:${PORT}`)})

