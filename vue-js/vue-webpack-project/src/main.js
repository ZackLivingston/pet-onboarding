import Vue from 'vue'
import App from './App.vue'
import ServerStatus from './ServerStatus.vue'
import ServerStatuses from './ServerStatuses.vue'

Vue.component('server-status', ServerStatus)
Vue.component('server-statuses', ServerStatuses)

export const eventBus = new Vue()

new Vue({
  el: '#app',
  render: h => h(App)
})


