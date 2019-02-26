import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Builder from './components/Builder'

Vue.config.productionTip = false

Vue.use(VueRouter)

let savedid_ele = document.getElementById('savedid')
let default_id = (savedid_ele && savedid_ele.innerText != '') ? savedid_ele.innerText : '01010203040b02030o000000000000' 

const router = new VueRouter({
  routes: [
  {
    path: '/',
    redirect: '/' + default_id
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
