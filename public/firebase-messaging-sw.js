importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');
firebase.initializeApp({
  apiKey: "AIzaSyDDrPyqrC2ukPWSS643BDvAsFGhH_Oh8ok",
  authDomain: "todos-e93c9.firebaseapp.com",
  databaseURL: "https://todos-e93c9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todos-e93c9",
  storageBucket: "todos-e93c9.firebasestorage.app",
  messagingSenderId: "886262839227",
  appId: "1:886262839227:web:4a4c50df8a6ecdd700b69e",
  measurementId: "G-G5WS753TCB"
})
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification?.title || "PWA App";
    const notificationOptions = {
      body: payload.notification?.body || '',
      icon: payload.notification?.icon || '',
      data: payload.data,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
});

messaging.onMessage((payload) => {
  if (payload.notification.title) {
    const notificationTitle = payload.notification?.title || "PWA App";
    const notificationOptions = {
      body: payload.notification?.body || '',
      icon: payload.notification?.icon || '',
      data: payload.data,
    };
    self.registration.showNotification(notificationTitle, notificationOptions);
  }
});
