const express = require('express')
const request = require('request');
const bodyParser = require('body-parser')
const {WebhookClient,Payload} = require('dialogflow-fulfillment')
const lineMessaging = require('./classes/line-messaging');
const firebase = require('./firebase');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))
app.get('/',(request,response)=>{
    response.send('App is running...');
})
app.post('/line-webhook',(request,response)=>{
    if(request.body.events.length > 0){
        var replyToken = request.body.events[0].replyToken;
        var message = request.body.events[0].message.text;
        
        console.log(`Message token : ${ replyToken }`);
        console.log(`Message from chat : ${ message }`);
    
    }
    lineMessaging.replyMessage(replyToken, message).then(function (rs) {

        console.log(`Reply message result : ${ rs }`);

        response.json({
            status: 200,
            message: `Sent message!`
        });
    });
})


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{console.log(`app is running on port:${PORT}`)})

