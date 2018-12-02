<template>
  <span :id="id" :style="screenStyle">
    <img v-bind:src=" screenImg " :style="imgStyle"/>
  </span>
</template>
<script>
    //const store = this.$store;
    export default {
        name: 'Screen',
        props: {
            id: 'popup-screen',
        },

        data() {
            return{
                width:1000,
                height:1000
            }
        },
        updated() {
            this.$nextTick(function () {
            this.$store.commit('screenLoaded');
            })
        },

        computed: {
            screenImg: function () {
                return this.$store.state.pixivJson.body.urls.regular
            },
            getSize: function () {
                const store = this.$store;
                const imgWidth = this.$store.state.pixivJson.body.width
                const imgHeight = this.$store.state.pixivJson.body.height
                const wscale = (window.innerWidth * this.$store.state.screen.scale) / imgWidth
                const hscale = (window.innerHeight * this.$store.state.screen.scale) / imgHeight
                const scale = wscale < hscale ? wscale : hscale
                this.height = imgHeight * scale
                this.width = imgWidth * scale
                this.$store.commit('screenWidth', this.width);
                this.$store.commit('screenHeight', this.height);
            },
            imgStyle: function () {
                const size = this.getSize;
                return {
                    width: 'auto',
                    height: 'auto',
                    pointerEvents: 'none',
                    maxWidth: `${this.width}px`,
                    maxHeight: `${this.height}px`,
                }
            },
            screenStyle: function () {
                const size = this.getSize;
                return {
                    border: '5px solid black',
                    backgroundColor: '#111',
                    position: 'relative',
                    width: 'auto',
                    height: 'auto',
                    maxWidth: `${this.width}px`,
                    maxHeight: `${this.height}px`,
                    float: 'left',
                    backgroundImage: `url(${this.screenImg})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                };
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
