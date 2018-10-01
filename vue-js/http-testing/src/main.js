import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import Router from 'vue-router'
import PageOne from './PageOne.vue'
import Home from './Home.vue'
import PageTwo from './PageTwo.vue'
import VueRouter from 'vue-router';
import User from './User.vue'
import EditUser from './EditUser.vue'
import UserBase from './UserBase.vue'
import { store } from './store/store.js'

Vue.use(VueResource)
Vue.use(Router)
Vue.http.options.root = "https://vue-experimentation.firebaseio.com/"
Vue.http.interceptors.push((request, next) => {
  console.log(request)
})

const router = new VueRouter({
  routes: [
    {path: '/page-one', component: PageOne},
    {path: '/page-two', component: PageTwo},
    {path: '', component: Home},
    {path: '/user', component: User, children: [
      {path: ':id', component: UserBase, children: [
        {path: 'edit', component: EditUser, name: 'editUser'}
      ], beforeEnter: (to, from, next) => {
        console.log('gonna go into edit user')
        next()
      }},
      // can replace component with componentS, an object with a default component and one or more named ones that can be accessed by named router-views
    ]},
    {path: '/redirect', redirect: '/user'},
    {path: '*', redirect: '/'}
  ]
})

router.beforeEach((to, from, next) => {
  console.log('Globul Before Each')
  console.log(to)
  console.log(from)
  next()
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
