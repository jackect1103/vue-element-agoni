import Vue from 'vue'
import App from './App.vue'
import router from '@/routers'
import store from '@/stores'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

Vue.prototype.$axios = axios;

// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
