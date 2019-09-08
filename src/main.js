import Vue from 'vue';
// import { plugin } from 'vue-function-api';
import VueClipboard from 'vue-clipboard2';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element';

Vue.config.productionTip = false;
// Vue.use(plugin);
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
