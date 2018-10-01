import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        counter: 0
    },
    getters: {
        doubleCounter: state => {
            return state.counter * 2
        },
        squareCounter: (state, payload) => {
            return state.counter ** 2
        },
    },
    mutations: { // cannot do async here
        incrementCounter: (state, payload) => {
            console.log(payload)
            state.counter += payload
        },
        decrementCounter: (state, payload) => {
            state.counter -= payload
        }
    },
    actions: { // can do async here and then commit to the mutations
        incrementAction: (context, payload) => {
            context.commit('incrementCounter', payload)
        },
        decrementAction: (context, payload) => {
            context.commit('decrementCounter', payload)
        }
    }
})
