new Vue({
    el: '#app', //gives control of the contents of the #app div
    data: {
        title: 'Hello World', //will replace {{title}} with the contents of the title here
        link: 'https://google.ca',
        anchor: '<a href="https://google.ca">js-embedded link</a>', //can be vulnerable to cross-site scripting attacks from the link
        count: 0,
        input: '',
        attachRed: false,
        attachBlue: false,
        color: 'orange',
        show: false,
        array: ['a','b','c','d','e']
    },
    methods: {
        // can use event.stopPropagation() to avoid event bubbling beyond a certain point
        // alternatively, in the html, can use :eventName.stop to accomplish the same thing
        // .prevent does preventDefault, and .stop.prevent does both
        changeTitle: function(event) {
            this.title = event.target.value
        },
        // setTitle: function() {
        //     console.log('setting title from methods')
        //     this.title = 'Replaced'
        //     return this.title
        // },
        increment: function(step, event) {
            this.count += step
            if (event.target.style.color == 'red') {
                event.target.style.color = 'black'
            } else {
                event.target.style.color = 'red'
            }
        },
        sendAlert: function(event) {
            console.log(event.target.value)
            alert('Submitted: ' + event.target.value)
        }
    },
    computed: {
        // only runs these functions if any of the properties used change,
        // as opposed to functions in methods which are run every time
        // that any value in data is changed
        setTitle: function() {
            console.log('setting title from computed')
            this.title = 'Replaced'
            return this.title
        },
        computedStyle: function() {
            if (this.attachRed) {
                return {
                    backgroundColor: 'red',
                }
            }
            else {
                return {
                    backgroundColor: this.color
                }
            }
        }
    },
    watch: {
        // Watches the specified key, and executes the function whenever it is changed
        // When possible, it's slightly better to use computed, but watch is better
        // for asynchronous operations as it can wait for the relevant value to trigger
        // a callback function, which doesn't work with computed.
        counter: function(value) {
            console.log('counter changed: ' + value)
        }
    }
})

// can use $refs to access values from within a vue instance from the outside
// Vue.$mount('css selector') sets the el
// can put a template property in the Vue constructor and it will build its template from that string
// can then use Vue.$mount() and then append the Vue.$el to another element


Vue.component('my-cmp', {
    data: function() {
        return {
            status: 'Critical'
        }
    },
    methods: {
        helloWorld() {
            console.log('Hello World')
        }
    },
    template: "<div><p>Server Status: {{ status }}</p><button @click='helloWorld()'>Say Hello</button></div>"
})

new Vue({
    el: '#app2'
})

var cmp = {
    data: function() {
        return {
            status: 'Critical'
        }
    },
    methods: {
        helloWorld() {
            console.log('Hello World')
        }
    },
    template: "<div><p>Server Status: {{ status }}</p><button @click='helloWorld()'>Say Hello</button></div>"
}

new Vue({
    el: '#app3',
    components: {
        'my-cmp': cmp
    }
})
