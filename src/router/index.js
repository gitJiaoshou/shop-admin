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
      meta: { title: '主页' },
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
          path: '/listSpec',
          component: () => import(/* webpackChunkName: "404" */ '@/pages/home/spec/ListSpec.vue'),
          meta: { title: '规格列表' }
        },
        {
          path: '/listSpecValue',
          component: () => import(/* webpackChunkName: "404" */ '@/pages/home/spec/ListSpecValue.vue'),
          meta: { title: '规格值' }
        },
        {
          path: '/addSpu',
          component: () => import(/* webpackChunkName: "404" */ '@/pages/home/spu/AddSpu.vue'),
          meta: { title: '添加spu' }
        },
        {
          path: '/listSpu',
          component: () => import(/* webpackChunkName: "404" */ '@/pages/home/spu/ListSpu.vue'),
          meta: { title: 'spu列表' }
        },
        {
          path: '/addSku',
          component: () => import(/* webpackChunkName: "404" */ '@/pages/home/sku/AddSku.vue'),
          meta: { title: '添加SKU' }
        },
        {
          path: '/listSku',
          component: () => import(/* webpackChunkName: "404" */ '@/pages/home/sku/ListSku.vue'),
          meta: { title: 'SKU列表' }
        },
        {
          path: '/addBanner',
          component: () => import(/* webpackChunkName: "404" */ '@/pages/home/banner/AddBanner.vue'),
          meta: { title: '添加banner' }
        },
        {
          path: '/listBanner',
          component: () => import(/* webpackChunkName: "404" */ '@/pages/home/banner/ListBanner.vue'),
          meta: { title: 'banner列表' }
        },
        {
          path: '/addBodyBanner',
          component: () => import(/* webpackChunkName: "404" */ '@/pages/home/body/AddBodyBanner.vue'),
          meta: { title: '添加六宫格' }
        },
        {
          path: '/listBodyBanner',
          component: () => import(/* webpackChunkName: "404" */ '@/pages/home/body/ListBodyBanner.vue'),
          meta: { title: '六宫格列表' }
        },
        {
          path: '/sendOrder',
          component: () => import(/* webpackChunkName: "404" */ '@/pages/home/order/SendOrder.vue'),
          meta: { title: '等待发货' }
        },
        {
          path: '/ingOrder',
          component: () => import(/* webpackChunkName: "404" */ '@/pages/home/order/IngOrder.vue'),
          meta: { title: '运送中' }
        },
        {
          path: '/successOrder',
          component: () => import(/* webpackChunkName: "404" */ '@/pages/home/order/SuccessOrder.vue'),
          meta: { title: '成功签收' }
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
