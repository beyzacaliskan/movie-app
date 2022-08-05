import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueProgressBar from 'vue-progressbar'

import './assets/styles/index.css';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
window.axios = require('axios').default;
window.axios.defaults.headers.common["Authorization"] = "Bearer " + process.env.VUE_APP_AUTH_KEY;

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
