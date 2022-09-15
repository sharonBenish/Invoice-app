import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia"
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDJf7r_TcO2SPQLRIkm4MEwsFTv1_rY_Yw",
  authDomain: "invoice-app-72c2a.firebaseapp.com",
  projectId: "invoice-app-72c2a",
  storageBucket: "invoice-app-72c2a.appspot.com",
  messagingSenderId: "131477846224",
  appId: "1:131477846224:web:f50958fe3b5ea5211686d5"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const app = createApp(App);
const pinia = createPinia()
app.use(router).use(pinia)
app.mount('#app')
