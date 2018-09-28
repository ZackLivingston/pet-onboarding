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
    slot, h4 {
        margin-top: 15px;
        margin-bottom: 2px;
    }

    slot, p {
        margin-top: 5px;
        margin-bottom: 15px;
    }
</style>
