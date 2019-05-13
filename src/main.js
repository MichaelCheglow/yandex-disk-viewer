import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import { store } from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAsyncOperations from 'vue-async-operations'

import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(VueAsyncOperations)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
