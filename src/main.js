// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

if (process.env.NODE_ENV !== 'production') {
  const localhost = 'http://localhost:8081'
  axios.defaults.baseURL = localhost
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = localhost
}
axios.defaults.headers.get['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
})
