import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Async from './components/Async'
import Log from './components/Log'
import 'bulma/css/bulma.css'
import store from './store'

Vue.component('Async', Async);
Vue.component('Log', Log);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
