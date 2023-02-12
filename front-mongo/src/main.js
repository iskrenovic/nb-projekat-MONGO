import Vue from 'vue'
import App from './App.vue'
import store from '@/api-service'
import router from '@/router/router'
import VueCookies from 'vue-cookies'
import axios from 'axios'


axios.defaults.baseURL = process.env.API_ENDPOINT;
Vue.config.productionTip = false
Vue.use(VueCookies);
new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app')
  
