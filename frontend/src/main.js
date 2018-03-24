// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { sync } from 'vuex-router-sync'

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import routes from './router'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import VuexStore from './store/store'
import cors from 'cors'
import LoginInterceptors from './components/Login/interceptors'

Vue.use(Vuetify, { theme: {
  primary: '#01579B',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(cors)

Vue.config.productionTip = false

Vue.http.options.root = process.env.SERVER

const store = new Vuex.Store(VuexStore)
const router = new VueRouter({
  base: process.env.ROUTER_BASE,
  routes,
  mode: 'history'
})

LoginInterceptors.check_empty_token(router)
LoginInterceptors.check_auth(router)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
