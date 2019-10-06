import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/homePage'),
      children: [
        {
          path: 'showStory',
          component: () => import('@/components/story'),
        },
        {
          path: 'addStory',
          component: () => import('@/components/story/addStory'),
        },
        {
          path: 'showArticle',
          component: () => import('@/components/article'),
        },
        {
          path: 'addArticle',
          component: () => import('@/components/article/addArticle'),
        },
        {
          path: 'updateArticle',
          component: () => import('@/components/article/updateArticle'),
        },
        {
          path: 'user',
          component: () => import('@/components/user'),
        },
        {
          // 路由错误是跳转到该路由
          path: '/',
          redirect: '/showStory'
        }
      ]
    },
    {
      // 路由错误是跳转到该路由
      path: '/',
      redirect: '/showStory'
    },
    {
      // 路由错误是跳转到该路由
      path: '/*',
      redirect: '/'
    }
  ]
})
