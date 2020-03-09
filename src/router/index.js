import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/home',
      component: () => import(/* webpackChunkName: "home" */ '../pages/components/Home.vue'),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/index',
          component: () => import(/* webpackChunkName: "404" */ '@/pages/home/index/index.vue'),
          meta: { title: 'index' }
        },
        {
          path: '/addMenu',
          component: () => import(/* webpackChunkName: "404" */ '@/pages/home/menu/AddMenu.vue'),
          meta: { title: '添加菜单' }
        },
        {
          path: '/listMenu',
          component: () => import(/* webpackChunkName: "404" */ '@/pages/home/menu/ListMenu.vue'),
          meta: { title: '菜单列表' }
        },
        {
          path: '/addSpec',
          component: () => import(/* webpackChunkName: "404" */ '@/pages/home/spec/AddSpec.vue'),
          meta: { title: '添加规格' }
        },
        {
          path: '/404',
          component: () => import(/* webpackChunkName: "404" */ '@/pages/components/404.vue'),
          meta: { title: '404' }
        }
      ]
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ '@/pages/login/Login'),
      meta: { title: '登录' }
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
