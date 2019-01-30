import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Builder from './components/Builder'

Vue.config.productionTip = false

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
  {
    path: '/',
    redirect: '/01010203040102030o000000000000'
  },
  {    
    path: '/:id',
    component: Builder
  }]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
