<template>
    <div>
        <h2>SELL STOCKS FROM PORTFOLIO</h2>
        <div id='sell-container'>
            <div v-if='Object.keys(portfolio).filter(key => {return portfolio[key] > 0}).length === 0'>
                <h3>NO STOCKS AVAILABLE</h3>
            </div>
            <div id='portfolio' v-else>
                <div v-for="(company, key) in portfolio" :key="key" v-if='portfolio[key]' class='individual-container'>
                    <div>
                        <h4>{{key.charAt(0).toUpperCase() + key.slice(1)}}</h4>
                        <p>Cost: {{ stocks[key] }}</p>
                        <p>Owned: {{company}}</p>
                    </div>
                    <div>
                        <label for="sell"></label>
                        <input :id='key' type="number" @keyup.enter='sell(key)'>
                        <button @click="sell(key)">Sell</button>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>




<script>
export default {
    computed: {
        portfolio() {
            const portfolio = this.$store.getters.getPortfolio
            return this.$store.getters.getPortfolio
        },
        stocks() {
            return this.$store.getters.getStocks
        }
    },
    methods: {
        sell(key) {
            const target = document.getElementById(key)
            const count = target.value
            if (count <= 0) {
                this.$store.commit('setMsg', {text: "You cannot sell negative stocks.", colour: 'red'})
            } else {
                if (this.$store.getters.getPortfolio[key] >= count) {
                    target.value = null
                    this.$store.commit('increaseFunds', (this.stocks[key] * count))
                    this.$store.commit('decreaseStock', {name: key, count: count})
                } else {
                    this.$store.commit('setMsg', {text: "You don't have that much stock.", colour: 'red'})
                }
            }
        }
    }
}
</script>






<style lang="scss" scoped>
    #portfolio {
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