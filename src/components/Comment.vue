<template>
    <div class="popup-comment">
        <span v-if="isStamp"><img
                :src="'https://s.pximg.net/common/images/stamp/generated-stamps/' + commentElem.stampId+'_s.jpg?20180605'"></span>
        <span v-else v-html="getComment"/><br/>
        <span class="popup-comment-info">{{ commentElem.userName}}<br/>{{commentElem.commentDate }}</span>
    </div>
    <span v-if="hasReply">reply</span>
</template>

<script>
    import {commentElement, emoji} from '../lib/jsonInterface';

    export default {
        name: "Comment",
        props: {
            commentElem: commentElement,
        },
        data() {
            return {
                emoji: emoji
            }
        },
        methods: {},
        computed: {
            isStamp() {
                if (this.commentElem.stampId !== null) {
                    return true
                }
                else return false;
            },
            hasReply() {
                return this.commentElem.hasReplies
            },
            getStampUrl() {
                return `https://s.pximg.net/common/images/stamp/generated-stamps/${commentElem.stampId}_s.jpg?20180605`
            },

            replaceAll(str, beforeStr, afterStr) {
                var reg = new RegExp(beforeStr, "g");
                return str.replace(reg, afterStr);
            },

            getComment() {
                const comment = this.commentElem.comment
                if (comment.includes(')')) {
                    let replaceComment = comment
                    Object.keys(emoji).forEach(function (key) {
                        const regexp = new RegExp(key, 'g');
                        replaceComment = replaceComment.replace(regexp, `<span style="width: 14px; height: 14px; display: inline-block; background-image: url('https://s.pximg.net/common/images/emoji/${emoji[key]}.png'); background-size: contain;"></span>`)
                    });
                    return replaceComment
                } else {
                    return comment
                }
            },
            getName() {
                return this.commentElem.userName;
            },
            getDate() {
                return this.commentElem.commentDate;
            },

            getEmoji(comment) {
            },
            commentInfo() {
                return "hoge"
            }
        },
    }
</script>

<style scoped>
    .popup-comment {
        background: #EEEEEE;
        margin: 5px;
        margin-right: 15px
    }

    img {
        width: 48px;
        height: 48px;
    }

    .popup-ugoira-stamp {
        width: 48px;
        height: 48px;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 2px;
    }

    .popup-comment-info {
        font-size: xx-small;
        text-align: left;
        color: #999999;
    }
</style>
