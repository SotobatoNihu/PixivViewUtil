<template>
  <span id="popup-ugoira" :style="screenStyle">
    <img :src=" screenImg " :style="imgStyle">
  </span>
</template>
<script>
    //const store = this.$store;
    //import {ZipImagePlayer} from '../lib/zip_player';
    import { ZipImagePlayer } from '../lib/zip_player.iife';
    import Screen from "./MixinScreen.vue";

    export default {
        name: 'Ugoira',
        mixins: [Screen],
        props: {
            id: 'popup-screen',
            visible: false,
        },
        data() {
            return {
                isVisible: this.visible,
                width: 600,
                height: 600,
            };
        },
        computed: {
            /*
            screenImg: function() {
                return this.$store.state.pixivJson.body.urls.regular;
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
            */
        },
        watch: {
            visible: function() {
                // console.log(`visible?${ this.visible}`)
                if (this.visible) {
                    console.log("ugoira start!");
                    const size = this.getSize;
                    const screen = document.getElementById('popup-ugoira');
                    if (screen) {
                        screen.innerText = '';
                        this.canvas = document.createElement('canvas');
                        this.canvas.id = 'ugoira-canvas';
                        this.canvas.style.pointerEvents = 'none';
                        screen.appendChild(this.canvas);
                    }
                    const options = {
                        canvas: this.canvas,
                        metadata: this.$store.state.ugoiraJson.body,
                        source: this.$store.state.ugoiraJson.body.src,
                        mime_type: this.$store.state.ugoiraJson.body.mime_type,
                        chunkSize: 10000,
                        loop: true,
                        autoStart: false,
                        //autosize: true,
                        autoscale: true,
                        width: size.width,
                        height: size.height,
                    };
                    //const canvas =this.$refs.canvasElm
                    //this.player = new ZipImagePlayer(options);
                    //this.player.play()
                    this.player = new ZipImagePlayer(options);
                    const player = this.player;
                    player.play();

                } else {
                    if (this.player) {
                        this.player.stop();
                        //this.player=null
                    }
                    this.canvas = null;
                }
            },
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #ugoira-canvas {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>
