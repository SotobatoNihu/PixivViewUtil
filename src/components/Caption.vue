<template>

  <div :id="id" :style="captionStyle">
    <div class="description" v-html="captionHtml"/>
    <div class="appendum">
      <div class="tags" style="display: inline-block">
        <span v-for="tagElem of tagArray">
          <span v-if="tagElem.locked">*</span><a href="https://dic.pixiv.net/a/{{tagElem.tag}}">{{ tagElem.tag }}<span
            :class="[ ( tagElem.romaji || tagElem.locked ) ? 'pixpedia-icon' : pixpedia-no-icon ]"/> </a>
        </span>
      </div>
      <div class="information">
        <div v-text="date"/>
        <PixivIcons :icon="'like'"/>
        <span class="like" v-text="like"/>
        <PixivIcons :icon="'bookmark'"/>
        <span id="bookmark" v-text="bookmark"/>
        <PixivIcons :icon="'view'"/>
        <span id="view" v-text="view"/>
      </div>
    </div>
  </div>
</template>

<script>
    import PixivIcons from './PixivIcons.vue';

    export default {
        name: 'Caption',
        components: {
            PixivIcons,
        },
        props: {
            id: {
                default: 'popup-caption',
                type: String,
            },
        },
        data() {
            return {
                captionWidth: 100,
            };
        },

        computed: {
            tagArray() {
                const json = this.$store.state.pixivJson;
                return json.body.tags.tags;
            },
            captionHtml() {
                const json = this.$store.state.pixivJson;
                return json.body.description;
            },
            date() {
                const json = this.$store.state.pixivJson;
                const date = new Date(json.body.createDate);
                return `upload:${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
            },
            like() {
                const json = this.$store.state.pixivJson;
                return ` ${json.body.likeCount} `;
            },
            bookmark() {
                const json = this.$store.state.pixivJson;
                return ` ${json.body.bookmarkCount} `;
            },
            view() {
                const json = this.$store.state.pixivJson;
                return `${json.body.viewCount}`;
            },

            toggleCaption: function() {
                this.$store.commit('toggleCaption');
                return false;
            },
            captionStyle: function() {
                return {
                    width: `${this.$store.state.screen.width + 10}px`,
                    height: 'auto',
                    display: 'block',
                    backgroundColor: 'white',
                    border: '1px solid #000',
                };
            },

        },
        updated: function() {
            this.$nextTick(function() {
                this.$store.commit('captionHeight', this.$el.clientHeight);
            });
        },
    };
</script>

<style scoped>

    .description {
        white-space: pre-line;
        z-index: 10001;
        word-wrap: break-word;
        width: auto;
        height: 70%;
        max-height: 70%;
        overflow-y: scroll;
        scrollbar-width: thin;
    }

    .appendum {
        width: auto;
        height: auto;
        max-height: 30%;
        overflow-y: scroll;
    }

    .information {
        background-color: white;
        font-size: x-small;
        width: auto;
        height: auto;
        max-height: 20%;
        color: #999999;
        line-height: 1;
    }

    .pixpedia-icon {
        display: inline-block;
        margin-left: 2px;
        width: 15px;
        height: 14px;
        vertical-align: -2px;
        text-decoration: none;
        background: url(https://s.pximg.net/www/images/inline/pixpedia.png) no-repeat;
    }

    .pixpedia-no-icon {
        display: inline-block;
        margin-left: 2px;
        width: 15px;
        height: 14px;
        vertical-align: -2px;
        text-decoration: none;
        background: url(https://s.pximg.net/www/images/inline/pixpedia-no-item.png) no-repeat;
    }


</style>
