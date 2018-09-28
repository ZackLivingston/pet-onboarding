<template>
    <div>
        User #{{ id }} {{prop}}
        <router-link :to="{name: 'editUser'}">Edit</router-link> <!-- could also attach a params object, and a query object, don't need it here though -->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            id: this.$route.params.id,
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
    },
    props: ['prop']
}
</script>

<style lang="scss" scoped>

</style>
