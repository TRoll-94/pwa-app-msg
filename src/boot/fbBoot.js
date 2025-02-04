import { boot } from 'quasar/wrappers'
import {getCurrentUser, VueFire, VueFireAuth} from "vuefire";
import { initializeApp } from 'firebase/app'


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


export default boot( async ({app}) => {
  app.use(VueFire, {
    firebaseApp,
    modules: [
      VueFireAuth(),
    ],
  })

  app.config.globalProperties.$fb = firebaseApp

  let d = await getCurrentUser();
})
