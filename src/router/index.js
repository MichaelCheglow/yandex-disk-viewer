import Vue from 'vue'
import Router from 'vue-router'

import PageMain from '@/components/PageMain.vue'
import PageCallback from '@/components/PageCallback.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: PageMain
  },
  {
    path: '/callback',
    component: PageCallback
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

export default router
