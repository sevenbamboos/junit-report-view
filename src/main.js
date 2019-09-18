import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Async from './components/Async'
import Log from './components/Log'
import 'bulma/css/bulma.css'
import store from './store'
import vuetify from './plugins/vuetify';

Vue.component('Async', Async);
Vue.component('Log', Log);

Vue.filter('localeDate', timeStampText => {
  if (!timeStampText) return ''
  const date = new Date(timeStampText);
  if (isNaN(date)) {
    console.warn();
    return timeStampText;
  } else {
    return date.toLocaleDateString();
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
