<template>
    <div>
        <h2>BUY STOCKS FROM MARKET</h2>
        <div id='buy-container'>
            <div v-for="(company, key) in stocks" :key="key" class='individual-container'>
                <div>
                    <h4>{{key.charAt(0).toUpperCase() + key.slice(1)}}</h4>
                    <p>Cost: {{ company }}</p>
                    <p>Owned: {{ portfolio[key] }}</p>
                </div>
                <div>
                    <label for="buy"></label>
                    <input :id='key' type="number" @keyup.enter='buy(key)'>
                    <button @click="buy(key)">Buy</button>
                </div>
            </div>
        </div>
    </div>
</template>




<script>
import { mapActions } from 'vuex'

export default {
    methods: {
        buy(key) {
            const target = document.getElementById(key)
            const count = target.value
            if (count <= 0) {
                this.$store.commit('setMsg', {text: "You cannot buy negative stocks.", colour: 'red'})
            } else {
                target.value = null
                const cost = this.stocks[key] * count
                if (cost <= this.$store.getters.getUser.funds) {
                    this.$store.commit('decreaseFunds', (cost))
                    this.$store.commit('increaseStock', {name: key, count: count})
                } else {
                    this.$store.commit('setMsg', {text: "You don't have enough money.", colour: 'red'})
                }
            }
            
            
        }
    },
    computed: {
        portfolio() {
            return this.$store.getters.getPortfolio
        },
        stocks() {
            return this.$store.getters.getStocks
        }
    },
    created() {
        const stocks = this.$store.getters.getStocks
        this.stocks.KFC = stocks.KFC
        this.stocks.ford = stocks.ford
        this.stocks.apple = stocks.apple
        this.stocks.uber = stocks.uber
    }
}
</script>






<style lang="scss" scoped>
    #buy-container {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding: 10px;
    }

    .individual-container {
        box-sizing: border-box;
        border: 1px solid gray;
        margin: 5px;
        padding: 7px;
        flex-grow: 1;
        max-width: 50%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        h4, p {
            margin: 3px 0 3px 0;
        }
    }
</style>