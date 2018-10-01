/* 
Needs:
Stocks tab, 4 stocks with different prices, can buy x shares
Portfolio shows owned stocks, can sell x shares
At end of day, prices change
Track funds
Save & Load data from db
*/

// tools
import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import Router from 'vue-router'
import { store } from './store.js'

// pages
import Stocks from './components/Stocks.vue'
import Portfolio from './components/Portfolio.vue'


Vue.use(VueResource)
Vue.use(Router)
Vue.http.options.root = "https://vue-experimentation.firebaseio.com/"

const router = new Router({
  routes: [
    {path: '', component: Stocks},
    {path: '/buy', component: Stocks},
    {path: '/sell', component: Portfolio},
    //{path: '*', redirect: '/'}
  ]
})


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
