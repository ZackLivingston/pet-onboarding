<template>
    <div>
        <h4>Test One</h4>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        deactivated() {
            console.log('Alive, but navigated away from')
        },
        activated() {
            console.log('Activated')
        }
    }
</script>