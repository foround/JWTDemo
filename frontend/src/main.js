// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router';
Vue.use(VueRouter)
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'
import bootstrapVue from 'bootstrap-vue'
Vue.use(bootstrapVue)

import qs from 'qs'
import axios from 'axios'
import VueAxios from 'vue-axios';
Vue.use(VueAxios,axios)
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(config =>{
  
  let {data,url} = config
  if(/\/(login)(\?)?/.test(url) === false){
    let token = localStorage.getItem('token') || null
    data = {...data,token:token}
  }
  config.data = qs.stringify(data)
  return config
})

axios.interceptors.response.use(response =>{
  response = response.status === 200? response.data: response;
  if(response.errcode === 2002){
    alert(response.errMsg)
    setTimeout(() =>{
      router.replace('/')
    },500)
  }
  return response
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
