import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import currencyFilter from './filters/currency.filter'
import dateFilter from './filters/date.filter'

Vue.config.productionTip = false

Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
