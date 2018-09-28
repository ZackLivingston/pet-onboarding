<template>
  <div id="app">
    <count :count='count'>{{ count }}</count>
    <submit :submit-quote='submitQuote'></submit>
    <div id='display-container'>
      <display v-for='(quote, index) in quotes' v-bind:key='index' :deleteQuote='deleteQuote' :quote='quote' class='display-item'>
        <h4>{{ quote.quote }}</h4>
        <p>- <span>{{ quote.author }}</span></p>
      </display>
    </div>
  </div>
</template>

<script>

import Submit from './components/Submit.vue'
import Display from './components/Display.vue'
import Count from './components/Count.vue'

export default {
  data: function() {
    return {
      quotes: [],
      count: 0
    }
  },
  methods: {
    submitQuote(quote) {
      if (this.count < 10) {
        this.quotes.push(quote)
        this.count++
      } else {
        alert('You have too many quotes')
      }
    },
    deleteQuote(quote) {
      this.quotes.splice(this.quotes.indexOf(quote), 1)
      this.count--;
    }
  },
  components: {
    'submit': Submit,
    'count': Count,
    'display': Display
  },
}
</script>

<style lang="scss" scoped>
  #display-container {
    width: 80%;
    margin: 20px auto 0 auto;
    display: flex;
    flex-wrap: wrap;
    border: 1px solid black;
    background-color: lightblue;
    padding: 0 2% 0 2%;
  }

  .display-item {
    width: 20%;
  }

  span {
    font-style: italic
  }

  #quote-header {
    text-align: center;
  }

</style>
