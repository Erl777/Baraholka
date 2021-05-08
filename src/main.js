import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import currencyFilter from './filters/currency.filter';
import dateFilter from './filters/date.filter';
import axios from 'axios';
import Vuelidate from 'vuelidate';

Vue.config.productionTip = false;
axios.interceptors.response.use((response) => {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

Vue.use(Vuelidate)

Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
