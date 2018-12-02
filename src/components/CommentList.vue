<template>

    <div :id="id"  :style="commentListStyle" >
        <Comment v-for="elem of commentArray" :commentElem="elem"/>
    </div>
</template>

<script>
    import Comment from './Comment.vue';
    export default {
        name: "CommentList",
        components: {
            Comment,

        },
        props: {
            id: {
                default: 'popup-commentlist',
                type: String,
            },
        },
        data() {
            return {
                screen: document.getElementById('popup-screen'),
                listHeight: 1000,
                comment: {
                    offset: 0,
                    max: 100,
                    hasNext: true,
                }
            }
        },
        methods:{
            infiniteHandler($state) {
            }
        },
        created:{
        },
        updated: function () {
            this.$nextTick(function () {
                this.listHeight=this.$store.state.screen.height
            })

        },
        computed: {
            commentArray() {
                const json = this.$store.state.commentJson;
                 return json.body.comments
            },
            commentListStyle: function () {
                const top=this.$store.state.caption.isVisible ? this.$store.state.caption.height :0
                return {
                    whiteSpace: 'pre-wrap',
                    zIndex: 10000,
                    width:`120px`,
                    height: `${this.$store.state.screen.height+10}px`,
                    display:'inline-block',
                    overflowY: 'scroll',
                    backgroundColor: 'white',
                    border: '1px solid #000',
                    position:'absolute',
                    top:`${top}px`,
                    left:`${this.$store.state.screen.width+10}px`,
                    float:'right',
                };

            },
            offset:function(){
                if (this.screen){
                    const clientRect = this.screen.getBoundingClientRect() ;
                    return {
                        top:this.screen.style.top,
                        left:clientRect.left+this.screen.clientWidth+ this.screen.clientWidth
                    }
                }else{
                    return {top:0,left:0}
                }
            },
        },
    }

    class PixivJson {
        constructor(json) {
            Object.assign(this, json);
        }
    }
</script>

<style scoped>
    #popup-commentlist {

    }
</style>
