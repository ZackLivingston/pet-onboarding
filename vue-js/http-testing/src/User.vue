<template>
    <div>
        <router-view :prop='prop'></router-view>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            prop: 'prop'
        }
    },
    methods: {
        edit() {
            this.$router.push(`/user/${this.id}/edit`)
        }
    },
    watch: {
        '$route'(to, from) {
            this.id = to.params.id
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
