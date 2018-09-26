<template>
    <div id='container'>
        <h3 id='title'>Quotes: </h3>
        <div id='bar-container'>
            <div id='bar' :style='setWidth'>
                <h3><slot></slot>/10</h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {

        }
    },
    props: ['count'],
    computed: {
        setWidth() {
            if (this.count > 0) {
                return {width: ((this.count/10) * 100).toString()+'%', backgroundColor: 'green'}
            } else {
                return {width: '100%', backgroundColor: 'white'};
            }
        }
    },
    components: {

    }
}
</script>

<style lang="scss" scoped>
    #container {
        width: 80%;
        margin: 0 auto 0 auto;
        display: flex;
        h3 {
            margin-top: 3px;
            margin-bottom: 3px;
        }
    }

    #title {
        margin-right: 10px;
    }

    #bar-container {
        width: 100%;
        border: 1px solid gray
    }

    #bar {
        text-align: center;
        background-color: green;
        min-width: 40px;
    }

</style>
