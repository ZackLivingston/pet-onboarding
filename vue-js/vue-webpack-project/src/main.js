import Vue from 'vue'
import App from './App.vue'
import ServerStatus from './ServerStatus.vue'
import ServerStatuses from './ServerStatuses.vue'

Vue.component('server-status', ServerStatus)
Vue.component('server-statuses', ServerStatuses)

Vue.directive('highlight', { // creates v-highlight
  bind(el, binding, vnode) {
    var delay = 0
    if (binding.modifiers['delayed']) {
      delay = 3000
    }
    setTimeout(() => {
      if (binding.arg == 'background') {
        el.style.backgroundColor = binding.value
      } else {
        el.style.color = binding.value
      }
    }, delay)
    
  }
})

export const eventBus = new Vue()

new Vue({
  el: '#app',
  render: h => h(App)
})
