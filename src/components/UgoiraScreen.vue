<template>
  <span id="popup-ugoira" :style="screenStyle">
    <img v-bind:src=" screenImg " :style="imgStyle"/>
  </span>
</template>
<script>
    //const store = this.$store;
    //import {ZipImagePlayer} from '../lib/zip_player';
    import {Util} from '../lib/util';
    import {ugoiraResponse} from '../lib/jsonInterface'

    export default {
        name: 'Ugoira',
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

        updated() {
           // this.$store.commit('screenWidth', this.$el.clientWidth);
           // this.$store.commit('screenHeight', this.$el.clientHeight);
        },
        watch: {
            visible: function () {
               // console.log(`visible?${ this.visible}`)
                if (this.visible) {
                    console.log("ugoira start!")
                    this.getSize;
                    this.$nextTick(function () {
                        const screen = document.getElementById('popup-ugoira')
                        if (screen) {
                            screen.innerText = ''
                            this.canvas = document.createElement('canvas');
                            this.canvas.id = 'ugoira-canvas'
                            this.canvas.style.pointerEvents='none';
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
                            autosize: true,
                        }
                        //const canvas =this.$refs.canvasElm
                        //this.player = new ZipImagePlayer(options);
                        //this.player.play()
                        this.player = new ZipImagePlayer(options);
                        const player = this.player
                        const canvas = this.canvas
                        let width=this.width
                        let height=this.height
                        //


                        let count = 0;
                        const store = this.$store;
                        const setLoop = setInterval( () =>{

                            const images = player._frameImages
                            if (images && images.length > 0) {

                                store.commit('screenWidth', images[0].width);
                                store.commit('screenHeight', images[0].height);
                                this.width=canvas.width
                                this.height=canvas.height
                                //console.log(`size modified ,canvas.size ${images[0].width} this.size${this.width}`)
                                clearInterval(setLoop);
                                player.play()
                            }

                            if (count > 100) {
                                clearInterval(setLoop);
                            }
                            count++
                        }, 100)
                        setLoop;
                    })
                } else {
                    if (this.player) {
                        this.player.stop()
                        //this.player=null
                    }
                    this.canvas = null
                }
            }
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
                //const width=screenMax <imgWidth ? screenMax:imgWidth
                this.$store.commit('screenWidth', this.width);
                this.$store.commit('screenHeight', this.height);
                //console.log(`with:${width},height:${height}`)
                //return {width: width, height: height}
            },
            screenStyle: function () {
               // const size = this.getSize;
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
