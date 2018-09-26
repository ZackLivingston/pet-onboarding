<template>
    <div @click='destroyQuote'>
        <slot></slot>
    </div>
</template>

<script>

export default {
    data: function() {
        return {
            
        }
    },
    props: ['deleteQuote', 'quote'],
    methods: {
        destroyQuote() {
            this.deleteQuote(this.quote)
        }
    },
    components: {

    }
}
</script>

<style>
</style>
