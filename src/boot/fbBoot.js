import { boot } from 'quasar/wrappers'
import {getCurrentUser, VueFire, VueFireAuth} from "vuefire";
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getMessaging, isSupported, getToken } from "firebase/messaging";
import {onMessage} from "@firebase/messaging";
import {Notify} from "quasar";


export const firebaseApp = initializeApp({
  apiKey: "AIzaSyDDrPyqrC2ukPWSS643BDvAsFGhH_Oh8ok",
  authDomain: "todos-e93c9.firebaseapp.com",
  databaseURL: "https://todos-e93c9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todos-e93c9",
  storageBucket: "todos-e93c9.firebasestorage.app",
  messagingSenderId: "886262839227",
  appId: "1:886262839227:web:4a4c50df8a6ecdd700b69e",
  measurementId: "G-G5WS753TCB"
})
const vapid = 'BKm8V3UybQRMttfiRBnwmgcK_YAYTBNnLgoHKMW2AT9SGPxae6TBy224WJJkZT9cSXQG_H6VP78kTD2pFPs_3gM';
export const $fb = {}


export const db = getFirestore(firebaseApp)
export default boot( async ({app}) => {
  app.use(VueFire, {
    firebaseApp,
    modules: [
      VueFireAuth(),
    ],
  })

  await navigator?.serviceWorker?.register('/firebase-messaging-sw.js', {
    scope: '/firebase-cloud-messaging-push-scope'
  })

  let getTokenInner = async () => {
    console.warn('This method not implemented yet');
  }
  app.config.globalProperties.$fb = {};
  app.config.globalProperties.$fb.getToken = getToken
  $fb.getToken = getToken
  if (await isSupported()) {
    const msg = getMessaging(firebaseApp);
    app.config.globalProperties.$fb.msg = msg;
    getTokenInner = async () => {
      return await getToken(msg, {vapidKey: vapid})
    }
    app.config.globalProperties.$fb.getToken = getTokenInner
    $fb.getToken = getTokenInner
  }

  app.config.globalProperties.$fb = firebaseApp
  await getCurrentUser();
})
