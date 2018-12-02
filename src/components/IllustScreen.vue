<template>
    <span  :style="screenStyle" >
    <img v-bind:src=" screenImg " :style="imgStyle"/>
  </span>
</template>

<script>
    import Screen from "./MixinScreen.vue"
    export default {
        name: "Illust",
        mixins: [Screen],
    }
</script>

<style scoped>

</style>
