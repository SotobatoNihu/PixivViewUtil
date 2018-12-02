<template >
    <div
            id="popup-outer-container"
            v-show="isVisible"
            :style="containerStyle"
           >
        <Caption v-if="visibleCaption" v-show="screenLoaded"/>

        <Illust v-if ="isIllust" />
        <Ugoira  v-bind:visible="isVisible" v-else-if ="isUgoira" />
        <Manga  v-else />

        <CommentList v-if="visibleCommentList" v-show="screenLoaded"/>
        <div class="togglebar togglebar-horizontal is-clickable" @click="toggleCaption">
                <i v-if="visibleCaption" class="arrow down is-clickable"  />
                <i v-if="! visibleCaption" class="arrow up is-clickable"  />
        </div>
        <div class="togglebar togglebar-vertical is-clickable" @click="toggleComment">
            <i v-if="visibleCommentList" class="arrow left is-clickable"  />
            <i v-if="! visibleCommentList" class="arrow right is-clickable"  />
        </div>
    </div>

</template>


<script>
    import Caption from './Caption.vue';
    import Illust from './IllustScreen.vue';
    import Manga from './MangaScreen.vue';
    import Ugoira from'./UgoiraScreen.vue'
    import CommentList from './CommentList.vue';
    import Util from '../lib/util'
    export default {
        name: 'MainContainer',
        components: {
            Caption,
            Illust,
            Manga,
            Ugoira,
            CommentList,
        },
        data() {
            return{
                illustId:null,
            }
        },
        beforeCreate(){
        },


        computed: {
            myData: function () {
                const json = this.$store.state.pixivJson;
                return json.body.illustTitle;
            },
            isVisible: function () {
                return this.$store.state.screen.isVisible;
            },
            screenLoaded:function(){
                return this.$store.state.screen.isLoaded;
            },
            visibleCaption: function () {
                return this.$store.state.caption.isVisible;
            },
            visibleCommentList: function () {
                return this.$store.state.comment.isVisible;
            },
            isIllust:function(){
                return this.$store.state.pixivJson.body.illustType === 0 && this.$store.state.pixivJson.body.pageCount < 2
            },

            isManga:function(){
                return this.$store.state.pixivJson.body.illustType === 1 || (this.$store.state.pixivJson.body.pageCount && this.$store.state.pixivJson.body.pageCount > 1);
            },

            isUgoira:function(){
                return this.$store.state.pixivJson.body.illustType === 2
            },
            containerStyle: function () {
               const  scroll = (window.pageYOffset !== undefined) ? window.pageYOffset : document.documentElement.scrollTop;
                return {
                    zIndex: 10000,
                    position: 'relative',
                   display: 'block',
                    top: `${scroll+window.innerHeight/2}px`,
                    left: `${window.innerWidth/2}px`,
                    transform:  'translate(-50%,-50%)',
                    width: `auto` ,
                    height:`auto`,

                };
            },
        },

        mounted() {
            // const app = this;
            const store = this.$store;
            const el=this.$el
            document.querySelectorAll('a[href*="member_illust.php?mode=medium&illust_id="]').forEach(link => {
                link.addEventListener('mouseenter', function () {
                    const clickElem = this.querySelector('.non-trim-thumb') || this;

                    //clickElem.preventDefault()
                    clickElem.setAttribute('onclick', 'console.log();return false;');
                    if(clickElem.classList.contains('ugoku-illust')){
                       // console.log(`isugoira:${true}`)
                        store.commit('isUgoira',true);
                    }else{
                        store.commit('isUgoira',false);
                    }

                    const url = this.getAttribute('href');
                    const matches = url.match(/(.)+illust_id=([0-9]+)(&.+)?/);
                    const preLoadID = Number(matches[2]);
                    this.illustId=preLoadID
                    store.commit('setIllustID', preLoadID);
                    //app.data().illusID = illustID;
                    clickElem.addEventListener('click', function () {
                        //console.log('click!');
                        //console.log(preLoadID);
                        el.style.top=`${window.pageYOffset+window.innerHeight/2}px`,
                         el.style.left= `${window.innerWidth/2}px`,
                        store.commit('fetchScreen');
                    });
                });

            });

        },
        destroyed: function () {

        },

        methods: {
            toggleComment: function () {
                this.$store.commit('toggleComment');
            },
            toggleCaption: function () {
                this.$store.commit('toggleCaption');
            },
            hide: function () {
                this.$store.commit('hide');
                // //background-color:#c1c1c1;
            },
        },
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped >


    .arrow {
        position: absolute;
        z-index: 10002;
        border: solid #c1c1c1;
        border-width: 0 3px 3px 0px;
        display: inline-block;
        padding: 3px;
        top:50%;
        left: 50%;
        cursor: pointer;
    }

    .right {
        left:-1px;
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
    }

    .left {
        left:1px;
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
    }

    .up {
        transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);
    }

    .down {
        top:0%;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
    }

    .togglebar{
        position: absolute;
        border-radius:  10px 10px 10px 10px ;
        border:1px solid #d4d4d4;
        cursor: pointer;
        z-index: 10001;
        background-color:#f8f8f8;
    }

    .togglebar-horizontal{
        width: 100px;
        height:10px;
        left:50%;
        transform:  translate(-50%,0%);
    }
    .togglebar-vertical{
        width: 10px;
        height:100px;
        top: 50%;
        right:0;
        transform:  translate(0%,-50%);
    }

    </style>



