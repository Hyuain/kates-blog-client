import Vue from 'vue'
import './plugins/element.js'
import router from './router'
import store from './store'
import App from './App.vue'
import Util from './helpers/util.js'

Vue.use(Util)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
