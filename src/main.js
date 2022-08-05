import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueProgressBar from 'vue-progressbar'

import './assets/styles/index.css';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
window.axios = require('axios').default;
window.axios.defaults.headers.common["Authorization"] = "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGZkN2ViZDRmYzM0OTRmY2ZkMTkwODJkNjVmMWRkZSIsInN1YiI6IjYyZTVhMDg0ZjFiNTcxMDA1OTU2MGU2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Q0tgETdK1n15ZFRVM0LVRdCjihiOzaSpNc-bOvbH5As";

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
