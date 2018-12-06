<template>
  <span :id="id" :style="mangaStyle">
    <div ref="wrapper" class="scroll_wrapper">
      <div id="manga__main" ref="scrollable">
        <img
                v-for="imgUrl in ImageUrls"
                :src="imgUrl"
                :key="number"
                :style="imgStyle">
      </div>
    </div>
      <!--
          <Carousel :imgList="ImageUrls"/>
          <div id="manga__main">
                  <img :src="imgUrl" v-for="imgUrl in ImageUrls" v-bind:key="number" :style="imgStyle"/>
          </div>

            <div class="scrollbar is-clickable">
              <div class="scrollbar-thumb is-clickable" ref="thumb" :style="thumbStyle"/>
              </div>
               -->
  </span>
</template>

<script>
    import Screen from "./MixinScreen.vue";


    export default {
        name: "Manga",
        mixins: [Screen],
        data() {
            return {
                width: 1000,
                height: 1000,
                scrollWidth: 0,
                active: false,
                onmouse: false,
            };
        },
        computed: {

            ImageUrls: function() {
                let imgElemArray = [];
                const json = this.$store.state.pixivJson;
                const firstPageURL = json.body.urls.regular.replace(/\/...x...\//, '/600x600/');
                const pageNum = json.body.pageCount;
                for (let i = 0; i < pageNum; i++) {
                    const url = firstPageURL.replace('p0', 'p' + i);
                    imgElemArray.push(url);
                }
                return imgElemArray;
            },

            getHeight: function() {
                const store = this.$store;
                const height = window.innerHeight * this.$store.state.screen.scale;
                store.commit('screenHeight', height);
                return height;
            },
            getWidth: function() {
                const store = this.$store;
                const width = window.innerWidth * this.$store.state.screen.scale;
                store.commit('screenWidth', width);
                return width;
            },

            getSize: function() {
                this.height = window.innerHeight * this.$store.state.screen.scale;
                this.width = window.innerWidth * this.$store.state.screen.scale;
                this.$store.commit('screenWidth', this.width);
                this.$store.commit('screenHeight', this.height);
                return { width: this.width, height: this.height };
            },

            mangaStyle: function() {
                const size = this.getSize;
                return {
                    border: '5px solid black',
                    backgroundColor: '#111',
                    position: 'relative',
                    whiteSpace: 'nowrap',
                    width: '100%',
                    height: 'auto',
                    maxWidth: `${size.width}px`,
                    maxHeight: `${size.height + 17}px`,
                    float: 'left',
                    overflow: 'hidden',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                };
            },
            thumbStyle: function() {
                return {
                    left: `${this.scrollWidth}px`,
                };
            },
        },
        watch: {
            scrollWidth: function() {
                this.$refs.scrollable.scrollLeft = this.scrollWidth;
            },
        },
        updated: {},
        mounted() {
            const store = this.$store;
            const wrapper = this.$refs.wrapper;
            let onmouse = this.onmouse;
            wrapper.addEventListener('scroll', function(event) {
                store.state.screen.dragging = true;
                return false;
            });
            wrapper.addEventListener('mouseover', function(event) {
                onmouse = true;
            });
            wrapper.addEventListener('mouseout', function(event) {
                onmouse = false;
            });
            wrapper.addEventListener('mousemove', function(event) {
                onmouse = true;
            });
            wrapper.addEventListener('wheel', function(event) {
                onmouse = true;
            });
            document.addEventListener('wheel', function(event) {
                if (event.target.id === 'manga__main' || onmouse) {
                    event.preventDefault();
                    const scrollValue = event.deltaY > 0 ? 100 : -100;
                    wrapper.scrollBy(scrollValue, 0);
                }
            });
        },
        methods: {},
    };
</script>

<style scoped lang="scss">
    .scroll_wrapper {
        height: calc(100% - 17px);
        width: 100%;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
    }
</style>
