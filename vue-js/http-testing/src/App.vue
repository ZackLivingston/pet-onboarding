<template>
  <div id="app">
    <nav>
      <router-link to='/' active-class='active' exact><a>Home</a></router-link>
      <router-link to='/page-one' active-class='active'><a>Page One</a></router-link>
      <router-link to='/page-two' active-class='active'><a>Page Two</a></router-link>
      <router-link to='/user/1' active-class='active'><a>Profile</a></router-link>
    </nav>

    <h3>HTTP Things</h3>
    <div>
      <label for="username">Username</label>
      <input type="text" id='username' v-model='username' @keydown.enter='submit'>
    </div>
    <button @click='submit'>Submit</button>
    <button @click='submit("alt")'>Submit Alt</button>
    <button @click='getData'>Get</button>
    <h4 v-for='user in users' v-bind:key='user.key'>{{ user.user }}</h4>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      username: '',
      users: []
    }
  },
  methods: {
    submit(options) {
      // console.log(this.username)
      // this.$http.post('data.json', {user: this.username})
      // .then((response) => {
      //   console.log(response)
      // })
      if (!options) {
        this.resource.save({}, {user: this.username})
      } else {
        this.resource.saveAlt({user: this.username})
      }
      
      this.username = ''
    },
    getData() {
      // this.$http.get('data.json')
      // alternatively, 
      this.resource.get({})
      .then((res) => {
        res.json()
        .then((users) => {
          console.log(users)
          this.users = users
        })
      })
    }
  },
  components: {

  },
  computed: {

  },
  watch: {

  },
  resource: {

  },
  created() {
    const customActions = {
      saveAlt: {method: 'POST', url: 'alt.json'}
    }
    this.resource = this.$resource('data.json', {}, customActions)
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

.active {
  background-color: lightblue;
  padding: 5px;
}

</style>
