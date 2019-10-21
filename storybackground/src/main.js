import Vue from 'vue'
import App from './App.vue'
import router from '@/routers'
import store from '@/stores'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueLazyload from 'vue-lazyload'
import { getStore } from "./utils/storage";
Vue.prototype.$axios = axios;

// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts

Vue.use(VueLazyload, {
  error: './assets/404.png',
  loading: './assets/loading.gif',
})

Vue.use(ElementUI);
Vue.config.productionTip = false

// 添加路由全局守卫判断是否登录
router.beforeEach((to, from, next) => {
  var result = JSON.parse(getStore('login'))
  if (result) {
    if (to.path === '/showStory') { //这就是跳出循环的关键
      next()
    } else {
      next()
    }
  }
  else {
    if (to.path === '/login') { //这就是跳出循环的关键
      next()
    } else {
      next('/login')
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
