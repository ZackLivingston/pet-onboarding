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
                    <input :id='key' type="number">
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
            target.value = null

            const cost = this.stocks[key] * count
            if (cost <= this.$store.getters.getUser.funds) {
                this.$store.commit('decreaseFunds', (cost))
                this.$store.commit('increaseStock', {name: key, count: count})
            } else {
                this.$store.commit('setMsg', {text: "You don't have enough money.", colour: 'red'})
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
        this.stocks.ford = stocks.ford
        this.stocks.apple = stocks.apple
        this.stocks.uber = stocks.uber
        this.stocks.KFC = stocks.KFC
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
        border: 1px solid gray;
        margin: 5px;
        padding: 4px;
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: space-around;
        h4, p {
            margin: 3px 0 3px 0;
        }
    }
</style>