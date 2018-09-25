<template>
    <div>
        <p>Server Status: {{ status }}</p>
        <p>Reset Status: {{ resetStatus }}</p>
        <button @click='changeStatus'>Change</button>
        <button @click='changeResetStatus'>Reset</button>
    </div>
</template>

<script>
    import {eventBus} from './main.js'
    export default {
        props: { // props can be used anywhere in this file, with this.propName
            'resetStatus': {
                type: Boolean,
                // required: true
                default: false
            },
            reset: Function
        }, 
        data: function() {
            return {
                status: 'Critical',
                //resetStatus: null
            }
        },
        methods: {
            changeStatus() {
                this.status = 'Normal'
            },
            changeResetStatus() {
                //this.resetStatus = !this.resetStatus
                //this.$emit('statusReset', this.resetStatus)
                // Alternatively, 
                this.reset()
                // Alternatively (kind of), since this is 
                // more for passing between siblings that
                // aren't the exact same thing, but it would
                // an unnecessary amount of time to set it up.
                // Basically, can emit an event here on the bus,
                // then listen for it from the created() hook
                // on the other component and do something
                // when it gets triggered. Could also store
                // the event as a function within the bus and
                // just call that function here instead of $emit
                eventBus.$emit('statusReset', this.resetStatus)
            }
        },
        created() {
            eventBus.$on('statusReset', () => {
                this.resetStatus = !this.resetStatus
            })
        }
    }
</script>