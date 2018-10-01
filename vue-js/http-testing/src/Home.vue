<template>
  <div id="p-one">
    Home
    <div>
      <p>Count: {{counter}}</p>
      <p>Double Count: {{doubleCounter}}</p>
      <p>Square Count: {{squareCounter}}</p>
      <button @click='incrementAction(2)'>Increment</button>
      <button @click='decrementAction(2)'>Decrement</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import { mapActions } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      username: '',
      users: []
    }
  },
  methods: {
    ...mapMutations([
      'incrementCounter',
      'decrementCounter'
    ]),
    ...mapActions([
      'incrementAction',
      'decrementAction'
    ])
    // other methods
  },
  // computed: {
  //   count() {
  //     return this.$store.state.counter
  //   },
  //   doubleCount() {
  //     return this.$store.getters.doubleCounter
  //   }
  // },
  // alternatively,
  computed: {
    ...mapGetters([
      'doubleCounter',
      'squareCounter',
    ]),
    counter(payload) {
      return this.$store.state.counter
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
