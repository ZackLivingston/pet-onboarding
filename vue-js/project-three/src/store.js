import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        user: {
            funds: 200,
            portfolio: { // number of each stock owned
                KFC: 0,
                apple: 0,
                ford: 0,
                uber: 0
            }
        },
        stocks: { // price per share
            KFC: 20,
            apple: 100,
            ford: 40,
            uber: 400
        },
        msg: {
            text: '',
            colour: ''
        }
    },
    getters: {
        getUser: state => {
            return state.user
        },
        getPortfolio: state => {
            return state.user.portfolio
        },
        getStocks: state => {
            return state.stocks
        },
        getMsg: state => {
            return state.msg
        }
    },
    mutations: { // cannot do async here
        setMsg: (state, payload) => {
            state.msg.text = payload.text
            state.msg.colour = payload.colour
            setTimeout(() => {
                state.msg = {text: '', colour: ''}
            }, 3000)
        },
        increaseFunds: (state, payload) => {
            state.user.funds += payload
        },
        decreaseFunds: (state, payload) => {
            state.user.funds -= payload
        },
        increaseStock: (state, payload) => {
            state.user.portfolio[payload.name] += parseInt(payload.count)
        },
        decreaseStock: (state, payload) => {
            state.user.portfolio[payload.name] -= payload.count
        },
        endDay: (state) => {
        // new cost is either between 0.8-1.2 times the original, or 0.5-1.5 times
            for (var key in state.stocks) {
                const price = state.stocks[key]
                const changeRange = Math.random() > 0.1 ? 0.2 : 0.4
                const change = Math.random() * changeRange * 2 * price
                if (changeRange * price < 2) { // ensures that price changes even when very low
                    if (change < changeRange) {
                        var newPrice = Math.floor((price * (1 - changeRange)) + change)
                    } else {
                        var newPrice = Math.ceil((price * (1 - changeRange)) + change)
                    }
                } else {
                    var newPrice = Math.round((price * (1 - changeRange)) + change)
                }
                state.stocks[key] = newPrice
            }
        }
    },
    actions: { // can do async here and then commit to the mutations
        saveGame: context => {
            const user = this.a.getters.getUser
            const stocksObj = this.a.getters.getStocks
            const stocks = {KFC: stocksObj.KFC, apple: stocksObj.apple, ford: stocksObj.ford, uber: stocksObj.uber}
            Vue.http.get('save.json')
            .then((res) => {
                if (res) {
                    Vue.http.put('save.json', {
                        user: {
                            funds: user.funds,
                            portfolio: user.portfolio
                        },
                        stocks: stocks
                    })
                    .then(() => {
                        context.commit('setMsg', {text: 'Game Saved', colour: 'green'})
                    })
                } else {
                    Vue.http.post('save.json', {
                        user: {
                            funds: user.funds,
                            portfolio: user.portfolio
                        },
                        stocks: stocks
                    })
                    .then(() => {
                        context.commit('setMsg', {text: 'Game Saved', colour: 'green'})
                    })
                }
            })
        },
        loadGame: context => {
            Vue.http.get('save.json')
            .then(res => {
                res.json()
                .then(save => {
                    context.state.user = save.user
                    context.state.stocks = save.stocks
                    context.commit('setMsg', {text: 'Save Loaded', colour: 'green'})
                })
            })
        }
    }
})