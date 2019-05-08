import Vue from 'vue'
import Router from 'vue-router'
import login from 'pages/login.vue'
import index from 'pages/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },{
      path: '/index',
      name: 'index',
      component: index
    }
  ]
})
