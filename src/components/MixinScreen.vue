<template>
  <span :id="id" :style="screenStyle">
    <img :src=" screenImg " :style="imgStyle">
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
            return {
                width: 1000,
                height: 1000,
            };
        },

        computed: {
            screenImg: function() {
                return this.$store.state.pixivJson.body.urls.regular;
            },
            getSize: function() {
                const imgWidth = this.$store.state.pixivJson.body.width;
                const imgHeight = this.$store.state.pixivJson.body.height;
                const wscale = (window.innerWidth * this.$store.state.screen.scale) / imgWidth;
                const hscale = (window.innerHeight * this.$store.state.screen.scale) / imgHeight;
                const scale = wscale < hscale ? wscale : hscale;
                const _height = imgHeight * scale;
                const _width = imgWidth * scale;
                this.$store.commit('screenWidth', _width);
                this.$store.commit('screenHeight', _height );
                return { height: _height, width: _width };
            },
            imgStyle: function() {
                const size = this.getSize;
                return {
                    width: 'auto',
                    height: 'auto',
                    pointerEvents: 'none',
                    maxWidth: `${size.width}px`,
                    maxHeight: `${size.height}px`,
                };
            },
            screenStyle: function() {
                const size = this.getSize;
                return {
                    border: '5px solid black',
                    backgroundColor: '#111',
                    position: 'relative',
                    width: 'auto',
                    height: 'auto',
                    maxWidth: `${size.width}px`,
                    maxHeight: `${size.height}px`,
                    float: 'left',
                    backgroundImage: `url(${this.screenImg})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                };
            },
        },
        updated() {
            this.$nextTick(function() {
                this.$store.commit('screenLoaded');
            });
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
