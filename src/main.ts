import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueFire } from 'vuefire'  
import { firebaseApp } from './firebase'  

createApp(App)
  .use(router)
  .use(VueFire, {  
    firebaseApp, 
  })
  .mount('#app')