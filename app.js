const express = require('express')
const request = require('request');
const bodyParser = require('body-parser')
const {WebhookClient,Payload} = require('dialogflow-fulfillment')
const {CHANNEL_SECRET,CHANNEL_ACCESS_TOKEN} = require('./config');
const firebase = require('./firebase');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))
app.get('/',(request,response)=>{
    response.send('App is running...');
})
app.post('/line-webhook',(request,response)=>{
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

app.post('/dialogflow-webhook', (request, response) => {
    // get agent from request
    let agent = new WebhookClient({request: request, response: response})
    console.log(request.body)
    // create intentMap for handle intent
    let intentMap = new Map();

    // add intent map 2nd parameter pass function
    intentMap.set('webhook-demo',handleWebHookIntent)

    // now agent is handle request and pass intent map
    agent.handleRequest(intentMap)
    

})

function handleWebHookIntent(agent){
    agent.add("Hello I am Webhook demo How are you...")
}

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{console.log(`app is running on port:${PORT}`)})

