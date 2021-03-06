import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload';
import App from './App.vue';

Vue.use(ElementUI);
Vue.use(VueLazyload);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => h(App),
});
