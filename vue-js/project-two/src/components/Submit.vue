<template>
    <div id='main'>
        <h3>Submit New Quote</h3>
        <div id="quote-submit">
            <label for="quote-input">Quote: </label>
            <input id='quote-input' type='text' v-model='quote' @keypress.enter='onSubmit'/>
        </div>
        
        <div id='author-submit'>
            <label for='author-input'>Author: </label>
            <input id='author-input' type='text' v-model='author' @keypress.enter='onSubmit'/>
            <button @click='onSubmit'>Submit</button>
        </div>
    </div>
</template>

<script>

export default {
    data: function() {
        return{
            quote: '',
            author: ''
        }
    },
    props: ['submitQuote'],
    methods: {
        onSubmit() {
            if (this.quote !== '' && this.author !== '') {
                this.submitQuote({quote:'"'+this.quote+'"', author: this.author})
                this.quote = ''
                this.author = ''
                document.getElementById('quote-input').focus()
            } else {
                alert('Make sure you have completed all fields')
            }
        },
    },
    components: {

    },
}
</script>

<style lang="scss" scoped>
    #main {
        width: 80%;
        margin: 1% auto 1% auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #quote-submit {
        width: 100%;
        display: flex;
        align-items: top;
    }

    #quote-input {
        width: 100%;
        margin-left: 10px;
    }

    #author-submit {
        width: 100%;
        display: flex;
        margin: 5px 0 0 0;
    }

    #author-input {
        width: 100%;
        margin-left: 10px;
        min-width: 15%;
    }

    button {
        text-align: center;
        max-width: 400px;
    }

    label {
        min-width: 50px;
        max-width: 50px;
    }

</style>
