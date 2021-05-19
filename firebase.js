const firebase = require('firebase').default;
const {firebaseConfig} = require('./config')
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const userColl = firestore.collection('Users');
const db = {
    async get(userID){
        return (await userColl.doc(userID).get()).data();
    }
    ,
    async create (userId) {
        return await userColl.doc(userId).set({
            isActive: true,
            createdAt: now()
        });
    },
}