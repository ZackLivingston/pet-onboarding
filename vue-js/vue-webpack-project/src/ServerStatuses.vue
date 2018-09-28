<template>
    <div>
        <slot name='header'></slot>
        <slot name='sub-header'>sub-header</slot>
        <server-status 
            v-for='server in 5' 
            v-bind:key="server" 
            :resetStatus='resetStatus' 
            @statusReset="resetStatus = $event"
            :reset='reset'>{{server}}</server-status>
        <button @click='reset'>Reset</button>
        <slot name='paragraph'></slot>
        <button @click="testWindow = 'test-one'">Test One</button>
        <button @click="testWindow = 'test-two'">Test Two</button>
        <keep-alive>
            <component :is="testWindow">Component Content</component>  
        </keep-alive>
        <form-vue></form-vue>
        <h5 v-highlight:background="'red'">Custom Directive</h5>
        <h5 v-highlight.delayed="'red'">Custom Directive</h5>
        <p>{{ text | toUppercase }}</p>
    </div>
</template>

<script>
    import ServerStatus from './ServerStatus.vue'
    import TestOne from './testOne.vue'
    import TestTwo from './testTwo.vue'
    import Form from './Form.vue'

    export default {
        data: function() {
            return {
                resetStatus: false,
                testWindow: 'test-one',
                text: 'Test Text'
            }
        },
        components: {
            'server-status': ServerStatus,
            'test-one': TestOne,
            'test-two': TestTwo,
            'form-vue': Form
        },
        methods: {
            reset() {
                console.log('Reset')
                this.resetStatus = !this.resetStatus
            }
        },
        directives: {
            // directive functions go here, as a string name: object containing the necessary hooks
        },
        mixins: [], // lets you import data, methods, filters, etc. from another file (have to import first) and it'll automatically add it to this object's data, methods, etc.
        filters: {
            toUppercase(val) {
                return val.toUpperCase()
            }
        }
    }
</script>