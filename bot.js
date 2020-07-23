const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TOKEN, {polling: true});
const app = require('firebase/app'), firebase = app.initializeApp({
    apiKey: "AIzaSyDLkYdTTDYD9Jlqk96tthmvdZ9Bg9uAyag",
    authDomain: "tg-firebase-react-app.firebaseapp.com",
    databaseURL: "https://tg-firebase-react-app.firebaseio.com",
    projectId: "tg-firebase-react-app",
    storageBucket: "tg-firebase-react-app.appspot.com",
    messagingSenderId: "509204905829",
    appId: "1:509204905829:web:0b03b73ebfa35aeb2eeb8c",
    measurementId: "G-G8ZW8G1XE6"
});
require ('firebase/database')

bot.on('message', msg => {
    let text = msg.text
    const urlRX = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

    console.log('1')
    if (urlRX.test(text)){
        console.log('2')
        firebase.database().ref('urls').once('value').then(snap => {
            console.log('3')
            let urls = snap.val()
            console.log('4')
            if (urls) {
                console.log('5.1')
                firebase.database().ref('urls').set(urls + ', ' + text)
            } else {
                console.log('5.2')
                firebase.database().ref('urls').set(text)
            }
        })
    }
})