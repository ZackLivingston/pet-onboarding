<template>
    <div id='container'>
        <h3>Form:</h3>
        <form>
            <label for="name-input">Name: </label>
            <input type='text' id='name-input' v-model.lazy.trim='user.name'>
            <label for="email-input">Email: </label>
            <input type='email' id='email-input' v-model.lazy.trim='user.email'>
            <label for="age-input">Age: </label>
            <input type='number' id='age-input' v-model.lazy.number='user.age'>
            <label for="area"></label>
            <textarea id='area' v-model.lazy='area'/>
        </form>
        <div>
            <h3>Information:</h3>
            <p>Name: {{ user.name }}</p>
            <p>Email: {{ user.email }}</p>
            <p>Age: {{ user.age }}</p>
            <p style="white-space:pre">Area: {{ area }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                name: '',
                email: '',
                age: null
            },
            area: 'default'
        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
    #container {
        margin-top: 50px;
    }
</style>


