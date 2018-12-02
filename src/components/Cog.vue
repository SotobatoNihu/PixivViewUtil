<template>
    <div id="popup-cog">
        <div class="icon" @click="toggleModal">
            <FontAwesome :icon="'cog'" style="margin:auto" />
        </div>
        <modal v-if="showModal" @close="toggleModal"/>
    </div>
</template>

<script>
    import FontAwesome from './FontAwesome.vue'
    import modal from './Modal.vue'
    import Util from '../lib/util'

    export default {
        name: "Cog",
        components: {
            FontAwesome,
            modal
        },

        data() {
            return {
                showModal: false
            }
        },
        methods: {
            toggleModal() {
                if (this.showModal) {
                    this.showModal = false
                    this.save()
                } else {
                    this.showModal = true
                }
            },
            save(){
                const util=new Util();
                const obj = {
                    changeIllustPageLayout: this.$store.state.enable.modifyIllustPage,
                    changeMemberPageLayout: this.$store.state.enable.modifyAutherPage,
                    openComment: true,
                    usePopup: this.$store.state.enable.pupupScreen,
                    popupCaption:true,
                    popupComment:true,
                    popupScale: this.$store.state.screen.scale
                }
                util.saveGmData(obj)
            }
        }
    }
</script>

<style scoped>
    .icon {
        width: 24px;
        height: 24px;
        position: relative;
        cursor: pointer;
    }
</style>
