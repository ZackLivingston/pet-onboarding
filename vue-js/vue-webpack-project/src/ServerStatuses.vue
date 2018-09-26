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
        <!-- can wrap component in keep-alive tags to cause its contents to persist even when not visible -->
    </div>
</template>

<script>
    import ServerStatus from './ServerStatus.vue'
    import TestOne from './testOne.vue'
    import TestTwo from './testTwo.vue'
    export default {
        data: function() {
            return {
                resetStatus: false,
                testWindow: 'test-one'
            }
        },
        components: {
            'server-status': ServerStatus,
            'test-one': TestOne,
            'test-two': TestTwo
        },
        methods: {
            reset() {
                console.log('Reset')
                this.resetStatus = !this.resetStatus
            }
        }
    }
</script>