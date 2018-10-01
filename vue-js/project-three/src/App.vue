<template>
  <div id="app">
    <nav>
      <div id='navigation'>
        <router-link to='/buy' active-class='active' exact><a>Buy</a></router-link>
        <router-link to='/sell' active-class='active' exact><a>Sell</a></router-link>
      </div>
      <div id='profile'>
        <a @click='endDay'>End Day</a>
        <a @click='saveGame'>Save Game</a>
        <a @click='loadGame'>Load Game</a>
        <a id='funds'>Funds: ${{ funds }} (Stock: ${{ worth }})</a>
      </div> 
    </nav>
    <div id="notifications">
      <p id='msg' :class='{red: msgRed, green: msgGreen}'>{{ msg }}</p>
    </div>
    <div id='main-view'>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {mapMutations} from 'vuex'

export default {
  name: 'app',
  data: function() {
    return {
      msgGreen: false,
      msgRed: false
    }
  },
  methods: {
    ...mapActions([
      'saveGame',
      'loadGame'
    ]),
    ...mapMutations([
      'endDay'
    ])
  },
  computed: {
    funds() {
      return this.$store.getters.getUser.funds
    },
    worth() {
      const stocks = this.$store.getters.getStocks
      const portfolioObj = this.$store.getters.getPortfolio
      const portfolio = {apple: portfolioObj['apple'], ford: portfolioObj['ford'], KFC: portfolioObj['KFC'], uber: portfolioObj['uber']}
      var stockWorth = 0
      Object.keys(portfolio).forEach((key) => {
        stockWorth += portfolio[key] * stocks[key]
      })
      return stockWorth
    },
    msg() {
      const msg = this.$store.getters.getMsg
      if (!msg.text) {
        this.msgGreen = false
        this.msgRed = false
        return null
      } else {
        msg.colour === 'green' ? this.msgGreen = true : this.msgRed = true
      }
      return msg.text
    }
  },
  created() {
    this.$store.getters.getFunds
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

#main-view {
  width: 80%;
  margin: 0 auto 0 auto;
  border: 1px solid black;
}

nav {
  width: 80%;
  margin: 0 auto 0 auto;
  display: flex;
  justify-content: space-between;
}

#navigation {
  display: flex;
  a {
    margin-right:10px;
  }
}

#profile {
  a {
  margin-right: 10px;
  text-decoration: underline;
  }
  #funds {
    text-decoration: none;
    margin-right: 0;
  }
}

#notifications {
  min-height: 30px;
  max-height: 30px;
  width: 80%;
  margin: 3px auto 3px auto;
  padding: 0;
  display: flex;
  align-items: center;
}

#msg {
  margin: 0;
  width: 100%;
  text-align: center;
  color: white;
  padding: 3px 0 3px 0;
}

.green {
  background-color: green
}

.red {
  background-color: red
}

</style>
