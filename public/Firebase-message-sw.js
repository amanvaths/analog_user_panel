importScripts('https://www.gstatic.com/firebasejs/5.7.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.7.1/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: "678060846058"
})

const initMessaging = firebase.messaging();