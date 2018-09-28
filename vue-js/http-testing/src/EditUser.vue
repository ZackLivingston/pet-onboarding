<template>
    <div>
        EDIT USER
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            id: this.$route.params.id
        }
    },
    watch: {
        '$route'(to, from) {
            this.id = to.params.id
        }
    },
    created() {
        console.log('Created Edit User')
    },
    beforeRouteEnter(to, from, next) {
        console.log('before route enter, in component itself')
        next()
    },
    beforeRouteLeave(to, from, next) {
        console.log('about to leave')
        next()
    }
}
</script>

<style lang="scss" scoped>

</style>
