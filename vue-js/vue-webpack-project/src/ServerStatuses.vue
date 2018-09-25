<template>
    <div>
        <server-status 
            v-for='server in 5' 
            v-bind:key="server" 
            :resetStatus='resetStatus' 
            @statusReset="resetStatus = $event"
            :reset='reset'>{{server}}</server-status>
        <button @click='reset'>Reset</button>
    </div>
</template>

<script>
    import ServerStatus from './ServerStatus.vue'
    export default {
        data: function() {
            return {
                resetStatus: false
            }
        },
        components: {
            'server-status': ServerStatus
        },
        methods: {
            reset() {
                console.log('Reset')
                this.resetStatus = !this.resetStatus
            }
        }
    }
</script>